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
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

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
        console.error("未找到預設付款方式", result.message);
      }
    } catch (error) {
      console.error("獲取預設付款方式失敗", error);
    }
  };

  useEffect(() => {
    fetchDefaultPaymentMethod();
  }, []);

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
        console.error("獲取付款方式失敗，返回消息:", result.message);
      }
    } catch (error) {
      console.error("獲取付款方式失敗", error.message);
    }
  };

  const applyCoupon = (couponCode) => {
    return new Promise((resolve, reject) => {
      if (couponCode === "DISCOUNT10") {
        setDiscount(10);
        resolve(10);
      } else {
        reject("Invalid coupon");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentMethod((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const paymentData = {
        member_id: localStorage.getItem("member_id"),
        card_number: currentMethod.cardNumber.replace(/\s/g, "").slice(-4),
        card_type: currentMethod.cardType,
        expiration_date: currentMethod.expiryDate,
        cardholder_name: currentMethod.cardholderName,
      };

      let response;
      if (isEditing) {
        response = await fetch(
          `http://localhost:3005/api/payment-methods/${currentMethod.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(paymentData),
          }
        );
      } else {
        response = await fetch("http://localhost:3005/api/payment-methods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(paymentData),
        });
      }

      const result = await response.json();
      if (result.status === "success") {
        alert(isEditing ? "付款方式已更新" : "付款方式已成功添加");
        fetchPaymentMethods();
        closeModal();
      } else {
        console.error("提交失敗，返回消息:", result.message);
        alert("提交失敗，請重試");
      }
    } catch (error) {
      console.error("提交失敗", error.message);
      alert("伺服器錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

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
      console.error("設置預設付款方式失敗", error);
      alert("伺服器錯誤，請稍後再試");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/payment-methods/${id}`,
        {
          method: "DELETE",
          credentials: "include", // 確保 cookie 被發送
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
      console.error("刪除失敗", error);
      alert("伺服器錯誤，請稍後再試");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMethod({
      id: null,
      type: "cash",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
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
                        <p>付款方式: {method.method}</p>
                        {method.cardNumber && <p>卡號: {method.cardNumber}</p>}
                        {method.expiryDate && (
                          <p>到期日: {method.expiryDate}</p>
                        )}
                        {method.isDefault && (
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
                      name="method"
                      value={currentMethod.method}
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
