import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CouponSelector from "@/components/payment/Coupon";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper function for API requests with token
const fetchData = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "伺服器錯誤");
  return data;
};

// Helper function for sending data to the server
const sendData = (url, method, data) =>
  fetchData(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// Helper function to determine card type based on card number
const determineCardType = (cardNumber) => {
  if (/^4\d{12}(\d{3})?$/.test(cardNumber)) {
    return "Visa";
  } else if (
    /^5[1-5]\d{14}$/.test(cardNumber) ||
    /^2(2[2-9][1-9]|[3-6]\d|7[01])\d{12}$/.test(cardNumber)
  ) {
    return "MasterCard";
  } else if (/^3[47]\d{13}$/.test(cardNumber)) {
    return "Amex";
  } else if (/^6(?:011|5\d{2}|4[4-9]\d)\d{12}$/.test(cardNumber)) {
    return "Discover";
  }
  return "Unknown";
};

// Helper function to format card number
const formatCardNumber = (value) => {
  const sanitizedValue = value.replace(/\D/g, ""); // Only digits allowed
  const parts = [];
  for (let i = 0; i < sanitizedValue.length; i += 4) {
    parts.push(sanitizedValue.substring(i, i + 4));
  }
  return parts.join(" "); // Add a space every four digits
};

// Helper function to format expiry date as MM/YY
const formatExpiryDate = (value) => {
  const sanitizedValue = value.replace(/\D/g, ""); // Only digits allowed
  if (sanitizedValue.length >= 3) {
    return (
      sanitizedValue.substring(0, 2) + "/" + sanitizedValue.substring(2, 4)
    );
  }
  return sanitizedValue;
};

// Initial state for payment methods
const initialMethodState = {
  id: null,
  type: "cash",
  cardNumber: "",
  expiryDate: "",
  cardType: "",
};

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [currentMethod, setCurrentMethod] = useState(initialMethodState);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const result = await fetchData(
        "http://localhost:3005/api/payment-methods"
      );
      if (result.status === "success") {
        setPaymentMethods(result.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setDefaultPaymentMethod = async (id) => {
    try {
      const result = await sendData(
        `http://localhost:3005/api/payment-methods/set-default/${id}`,
        "PUT"
      );
      if (result.status === "success") {
        toast.success("已設置為預設付款方式");
        fetchPaymentMethods();
      }
    } catch (error) {
      toast.error("設置預設付款方式失敗");
    }
  };

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    toast.success(
      `優惠券已成功應用: ${
        coupon.discount_type === "percent"
          ? `${coupon.discount_value}% 折扣`
          : `NT$${coupon.discount_value} 折抵`
      }`
    );
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "cardNumber" && value.replace(/\s/g, "").length < 16) {
      error = "信用卡號必須為16位數字";
    } else if (
      name === "expiryDate" &&
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
    ) {
      error = "到期日格式錯誤，請按照 MM/YY 格式";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedCardNumber = formatCardNumber(value);
      setCurrentMethod((prev) => ({
        ...prev,
        cardNumber: formattedCardNumber,
        cardType: determineCardType(formattedCardNumber.replace(/\s/g, "")), // 去掉空格再判斷卡片類型
      }));
    } else if (name === "expiryDate") {
      const formattedExpiryDate = formatExpiryDate(value);
      setCurrentMethod((prev) => ({
        ...prev,
        expiryDate: formattedExpiryDate,
      }));
    } else {
      setCurrentMethod((prev) => ({ ...prev, [name]: value }));
    }

    validateField(name, value); // 驗證欄位
  };

  const validateForm = () => {
    const newErrors = {};
    if (currentMethod.type === "creditCard") {
      if (
        !currentMethod.cardNumber ||
        currentMethod.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        newErrors.cardNumber = "信用卡卡號格式錯誤，請輸入16位數字";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(currentMethod.expiryDate)) {
        newErrors.expiryDate = "到期日格式錯誤，請按照MM/YY格式";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    let paymentData;
    if (currentMethod.type === "creditCard") {
      if (!/^\d{16}$/.test(currentMethod.cardNumber.replace(/\s/g, ""))) {
        toast.error("信用卡號碼格式錯誤，請輸入16位數字");
        setIsLoading(false);
        return;
      }

      paymentData = {
        type: currentMethod.type,
        card_number: currentMethod.cardNumber.replace(/\s/g, ""), // 去除空格
        card_type: currentMethod.cardType,
        expiration_date: currentMethod.expiryDate,
        is_default: currentMethod.isDefault || false,
      };
    } else if (currentMethod.type === "cash") {
      paymentData = {
        type: currentMethod.type,
        is_default: currentMethod.isDefault || false,
      };
    }

    const method = currentMethod.id ? "PUT" : "POST";
    const url = currentMethod.id
      ? `http://localhost:3005/api/payment-methods/${currentMethod.id}`
      : "http://localhost:3005/api/payment-methods";

    try {
      const result = await sendData(url, method, paymentData);
      if (result.status === "success") {
        toast.success("付款方式已成功保存");
        fetchPaymentMethods();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      toast.error("伺服器錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (method) => {
    setIsEditing(true);
    setCurrentMethod({
      id: method.payment_id,
      type: method.payment_type,
      cardNumber: method.card_number || "",
      cardType: method.card_type || "",
      expiryDate: method.expiration_date || "",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentMethod(initialMethodState);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const result = await sendData(
        `http://localhost:3005/api/payment-methods/${id}`,
        "DELETE"
      );
      if (result.status === "success") {
        toast.success("付款方式已刪除");
        setPaymentMethods((prev) =>
          prev.filter((method) => method.payment_id !== id)
        );
      }
    } catch (error) {
      toast.error("伺服器錯誤，請稍後再試");
    }
  };

  const resetForm = () => {
    setCurrentMethod(initialMethodState);
    setIsEditing(false);
  };

  const availableCoupons = [
    {
      coupon_id: 1,
      discount_type: "percent",
      discount_value: 10,
      expiry_date: "2024-12-31",
    },
    {
      coupon_id: 2,
      discount_type: "amount",
      discount_value: 100,
      expiry_date: "2024-11-30",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
         
            <section className="max-w-4xl mx-auto mt-6">
              <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
                我的錢包
              </h2>
            </section>

            <h3 className="text-l font-semibold text-gray-700 capitalize dark:text-white mb-6">
              常用錢包
            </h3>
            <section className="max-w-4xl mx-auto grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.payment_id}
                  className="card bg-base-100 shadow-xl mb-4 relative"
                >
                  <div className="card-body">
                    <h2 className="card-title">付款方式</h2>
                    {method.is_default && (
                      <span className="badge badge-primary">預設</span>
                    )}
                    <p>付款方式: {method.payment_type}</p>
                    {method.card_number && <p>卡號: {method.card_number}</p>}
                    {method.expiration_date && (
                      <p>到期日: {method.expiration_date}</p>
                    )}
                    <div className="flex justify-between mt-4">
                      <div>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(method)}
                        >
                          編輯
                        </button>
                        <button
                          className="btn btn-error ml-2"
                          onClick={() => handleDelete(method.payment_id)}
                        >
                          刪除
                        </button>
                      </div>
                      {!method.is_default && (
                        <button
                          className="btn btn-primary ml-auto bg-blue-500"
                          onClick={() =>
                            setDefaultPaymentMethod(method.payment_id)
                          }
                        >
                          設為預設
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex justify-between">
                  <h2 className="card-title">新增錢包</h2>
                  <button className="btn btn-primary" onClick={handleAddNew}>
                    新增
                  </button>
                </div>
              </div>
            </section>

            <section className="max-w-4xl mx-auto mt-6">
              <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
                我的優惠券
              </h2>
              <CouponSelector
                availableCoupons={availableCoupons}
                applyCoupon={applyCoupon}
              />
            </section>
          </div>

          {isModalOpen && (
            <dialog open className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  {isEditing ? "編輯錢包" : "新增錢包"}
                </h3>
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">付款方式</span>
                  </label>
                  <select
                    name="type"
                    value={currentMethod.type}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="creditCard">信用卡付款</option>
                    <option value="cash">現金付款</option>
                  </select>
                </div>

                {currentMethod.type === "creditCard" && (
                  <>
                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">信用卡卡號</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={currentMethod.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        className="input input-bordered"
                        maxLength="19" // 包含空格的長度
                        required
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">到期日 (MM/YY)</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={currentMethod.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="input input-bordered"
                        maxLength="5"
                        required
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">卡片類型</span>
                      </label>
                      <select
                        name="cardType"
                        value={currentMethod.cardType}
                        onChange={handleChange}
                        className="select select-bordered"
                        required
                        disabled // 卡片類型自動選擇，不允許手動更改
                      >
                        <option value="">選擇卡片類型</option>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Amex">Amex</option>
                        <option value="Discover">Discover</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="modal-action">
                  <button
                    className={`btn btn-success ${isLoading ? "loading" : ""}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isEditing ? "保存修改" : "新增錢包"}
                  </button>
                  <button className="btn" onClick={() => setIsModalOpen(false)}>
                    取消
                  </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
}
