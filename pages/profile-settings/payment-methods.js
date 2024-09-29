import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Coupon from "@/components/payment/Coupon";

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [discount, setDiscount] = useState(0); // 儲存優惠券折扣
  const [currentMethod, setCurrentMethod] = useState({
    id: null,
    type: "cash", // 預設為現金付款
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    isDefault: false,
    onlinePaymentService: "", // 存儲線上付款服務
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 初始獲取付款方式
  useEffect(() => {
    fetchPaymentMethods();
    fetchDefaultPaymentMethod();
  }, []);

  // 獲取所有付款方式
  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/payment-methods",
        {
          method: "GET",
          credentials: "include", // 確保 cookie 被發送
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setPaymentMethods(result.data);
      } else {
        console.error("獲取付款方式失敗:", result.message);
      }
    } catch (error) {
      console.error("獲取付款方式失敗:", error.message);
    }
  };

  // 獲取預設付款方式
  const fetchDefaultPaymentMethod = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/payment-methods/default",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setSelectedPaymentMethod(result.data);
      } else {
        console.error("未找到預設付款方式:", result.message);
      }
    } catch (error) {
      console.error("獲取預設付款方式失敗:", error.message);
    }
  };

  // 套用優惠券
  const applyCoupon = (couponCode) => {
    return new Promise((resolve, reject) => {
      if (couponCode === "DISCOUNT10") {
        setDiscount(10);
        resolve(10);
      } else {
        reject("無效的優惠券");
      }
    });
  };

  // 處理表單變更
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentMethod((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 編輯付款方式
  const handleEdit = (method) => {
    setIsEditing(true);
    setCurrentMethod({
      id: method.id,
      type: method.payment_type,
      cardholderName: method.cardholder_name || "",
      cardNumber: method.card_number || "",
      expiryDate: method.expiration_date || "",
      isDefault: method.is_default,
      onlinePaymentService: method.online_payment_service || "",
    });
    openModal();
  };

  // 提交付款方式
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const paymentData = buildPaymentData();
      const method = currentMethod.id ? "PUT" : "POST";
      const url = currentMethod.id
        ? `http://localhost:3005/api/payment-methods/${currentMethod.id}`
        : "http://localhost:3005/api/payment-methods";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("付款方式已成功保存");
        fetchPaymentMethods();
        closeModal();
      } else {
        alert("提交失敗，請重試");
      }
    } catch (error) {
      alert("伺服器錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  // 建立付款資料
  const buildPaymentData = () => {
    if (currentMethod.type === "creditCard") {
      return {
        member_id: localStorage.getItem("member_id"),
        card_number: currentMethod.cardNumber.replace(/\s/g, "").slice(-4),
        card_type: currentMethod.cardType,
        expiration_date: currentMethod.expiryDate,
        cardholder_name: currentMethod.cardholderName,
        is_default: currentMethod.isDefault,
      };
    } else if (currentMethod.type === "onlinePayment") {
      return {
        member_id: localStorage.getItem("member_id"),
        payment_type: "onlinePayment",
        online_payment_service: currentMethod.onlinePaymentService,
        is_default: currentMethod.isDefault,
      };
    } else {
      return {
        member_id: localStorage.getItem("member_id"),
        payment_type: "cash",
        is_default: currentMethod.isDefault,
      };
    }
  };

  // 設置預設付款方式
  const handleSetDefault = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/payment-methods/set-default/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        alert("已設為預設付款方式");
        fetchPaymentMethods();
      } else {
        alert("設置預設付款方式失敗");
      }
    } catch (error) {
      alert("伺服器錯誤，請稍後再試");
    }
  };

  // 刪除付款方式
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/payment-methods/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        alert("付款方式已刪除");
        fetchPaymentMethods();
      } else {
        alert("刪除失敗");
      }
    } catch (error) {
      alert("伺服器錯誤，請稍後再試");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentMethod({
      id: null,
      type: "cash",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      onlinePaymentService: "",
      isDefault: false,
    });
    setIsEditing(false);
  };

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
              <TransitionGroup component={null}>
                {paymentMethods.map((method) => (
                  <CSSTransition
                    key={method.id}
                    timeout={300}
                    classNames="fade"
                  >
                    <div className="card bg-base-100 shadow-xl mb-4">
                      <div className="card-body">
                        <h2 className="card-title">付款方式</h2>
                        <p>付款方式: {method.payment_type}</p>
                        {method.card_number && (
                          <p>卡號: {method.card_number}</p>
                        )}
                        {method.expiration_date && (
                          <p>到期日: {method.expiration_date}</p>
                        )}
                        {method.is_default && (
                          <span className="badge badge-primary">預設</span>
                        )}
                        <div className="flex justify-between">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleEdit(method)}
                          >
                            編輯
                          </button>
                          <button
                            className="btn btn-error"
                            onClick={() => handleDelete(method.id)}
                          >
                            刪除
                          </button>
                          <button
                            className="btn btn-outline"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            設為預設
                          </button>
                        </div>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>

              {/* 新增付款方式卡片 */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex justify-between">
                  <h2 className="card-title">新增錢包</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsEditing(false);
                      openModal();
                    }}
                  >
                    新增
                  </button>
                </div>
              </div>
            </section>
            <section className="max-w-4xl mx-auto mt-6">
              <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
                我的優惠券
              </h2>

              <Coupon applyCoupon={applyCoupon} />

              {discount > 0 && (
                <p className="text-green-500 mt-4">優惠券折扣: NT${discount}</p>
              )}
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
                    <option value="onlinePayment">線上付款</option>
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
                      />
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">到期日</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={currentMethod.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="input input-bordered"
                      />
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
                  </div>
                )}

                <div className="form-control mt-4">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={currentMethod.isDefault}
                      onChange={handleChange}
                      className="checkbox"
                    />
                    <span className="label-text ml-2">
                      設為我的預設付款方式
                    </span>
                  </label>
                </div>

                <div className="modal-action">
                  <button
                    className={`btn btn-success ${isLoading ? "loading" : ""}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isEditing ? "保存修改" : "新增錢包"}
                  </button>
                  <button className="btn" onClick={closeModal}>
                    取消
                  </button>
                </div>
              </div>
            </dialog>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
