import React, { useState, useEffect, useCallback } from "react";
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

// Initial state for payment methods
const initialMethodState = {
  id: null,
  type: "cash",
  cardNumber: "",
  expiryDate: "",
  cardType: "",
  onlinePaymentService: "",
};

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null); // 用來追蹤應用的優惠券
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

  // 優惠券應用邏輯
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
    if (name === "cardNumber" && value.length < 16) {
      error = "信用卡號必須為16位數字";
    } else if (
      name === "expiryDate" &&
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
    ) {
      error = "到期日格式錯誤，請按照 MM/YY 格式";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "expiryDate") {
        // 限制只允許數字輸入
        let formattedValue = value.replace(/\D/g, "");

        // 自動插入 `/` 符號當輸入 4 位數時
        if (formattedValue.length >= 3) {
          formattedValue = `${formattedValue.slice(
            0,
            2
          )}/${formattedValue.slice(2, 4)}`;
        }

        // 設定最新的狀態
        setCurrentMethod((prev) => ({
          ...prev,
          [name]: formattedValue,
        }));

        // 只有在滿足 4 位數字時才進行驗證
        if (formattedValue.length === 5) {
          validateField(name, formattedValue);
        }
      } else {
        // 處理其他欄位的變更
        setCurrentMethod((prev) => ({
          ...prev,
          [name]: value,
        }));
        validateField(name, value);
      }
    },
    [setCurrentMethod]
  );

  const validateForm = () => {
    const newErrors = {};
    if (currentMethod.type === "creditCard") {
      if (!currentMethod.cardNumber || currentMethod.cardNumber.length !== 16) {
        newErrors.cardNumber = "信用卡卡號格式錯誤，請輸入16位數字";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(currentMethod.expiryDate)) {
        newErrors.expiryDate = "到期日格式錯誤，請按照MM/YY格式";
      }
    }
    if (
      currentMethod.type === "onlinePayment" &&
      !currentMethod.onlinePaymentService
    ) {
      newErrors.onlinePaymentService = "請選擇線上支付服務";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    let paymentData;
    if (currentMethod.type === "creditCard") {
      if (!/^\d{16}$/.test(currentMethod.cardNumber)) {
        toast.error("信用卡號碼格式錯誤，請輸入16位數字");
        setIsLoading(false);
        return;
      }

      paymentData = {
        type: currentMethod.type,
        card_number: currentMethod.cardNumber,
        card_type: currentMethod.cardType,
        expiration_date: currentMethod.expiryDate,
        is_default: currentMethod.isDefault || false,
      };
    } else if (currentMethod.type === "onlinePayment") {
      if (!currentMethod.onlinePaymentService) {
        toast.error("請選擇線上支付服務");
        setIsLoading(false);
        return;
      }

      paymentData = {
        type: currentMethod.type,
        online_payment_service: currentMethod.onlinePaymentService,
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
      onlinePaymentService: method.online_payment_service || "",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentMethod(initialMethodState); // 重置為空表單
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

  // 模擬的可用優惠券
  const availableCoupons = [
    {
      coupon_id: 1,
      discount_type: "percent",
      discount_value: 10, // 10% 折扣
      expiry_date: "2024-12-31",
    },
    {
      coupon_id: 2,
      discount_type: "amount",
      discount_value: 100, // NT$100 折抵
      expiry_date: "2024-11-30",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <Breadcrumbs />
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
                      <span className="badge badge-primary ">預設</span>
                    )}
                    <p>付款方式: {method.payment_type}</p>
                    {method.card_number && <p>卡號: {method.card_number}</p>}
                    {method.expiration_date && (
                      <p>到期日: {method.expiration_date}</p>
                    )}

                    <div className="flex justify-between mt-4">
                      {/* 編輯與刪除按鈕 */}
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

                      {/* 設為預設按鈕，如果是預設的卡片，按鈕消失 */}
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

              {/* 新增付款方式按鈕 */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex justify-between">
                  <h2 className="card-title">新增錢包</h2>
                  <button className="btn btn-primary" onClick={handleAddNew}>
                    新增
                  </button>
                </div>
              </div>
            </section>

            {/* 優惠券區塊 */}
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
                    <span className="label-text">選擇付款方式</span>
                  </label>
                  <select
                    name="type"
                    value={currentMethod.type}
                    onChange={handleChange}
                    className="select select-bordered"
                  >
                    <option value="creditCard">信用卡付款</option>
                    <option value="cash">現金付款</option>
                    {/* <option value="onlinePayment">線上付款</option> */}
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
                        maxLength="16"
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
                        pattern="\d{2}/\d{2}"
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
                      >
                        <option value="">選擇卡片類型</option>
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="Amex">Amex</option>
                      </select>
                    </div>
                  </>
                )}

                {currentMethod.type === "onlinePayment" && (
                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">選擇線上付款方式</span>
                    </label>
                    <select
                      name="onlinePaymentService"
                      value={currentMethod.onlinePaymentService}
                      onChange={handleChange}
                      className="select select-bordered"
                    >
                      <option value="Line Pay">Line Pay</option>
                      <option value="ECPay">ECPay</option>
                    </select>
                    {errors.onlinePaymentService && (
                      <p className="text-red-500">
                        {errors.onlinePaymentService}
                      </p>
                    )}
                  </div>
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

      {/* ToastContainer for notifications */}
      <ToastContainer />
      <Footer />
    </>
  );
}
