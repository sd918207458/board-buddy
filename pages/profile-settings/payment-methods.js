import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavbarSwitcher";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Coupon from "@/components/payment/Coupon"; // 引入優惠券組件

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "cash", // 付款方式類型
      method: "現金付款",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      isDefault: true,
    },
  ]);

  const [discount, setDiscount] = useState(0); // 儲存優惠券折扣
  const [isMounted, setIsMounted] = useState(false);
  const [currentMethod, setCurrentMethod] = useState({
    id: null,
    type: "cash", // 預設為現金付款
    method: "現金付款",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 處理應用優惠券的邏輯
  const applyCoupon = (couponCode) => {
    return new Promise((resolve, reject) => {
      // 模擬與後端進行優惠券驗證
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

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (isEditing) {
        setPaymentMethods((prev) =>
          prev.map((method) =>
            method.id === currentMethod.id ? currentMethod : method
          )
        );
      } else {
        setPaymentMethods((prev) => [
          ...prev,
          { ...currentMethod, id: Date.now() },
        ]);
      }

      if (currentMethod.isDefault) {
        setPaymentMethods((prev) =>
          prev.map((method) =>
            method.id === currentMethod.id
              ? { ...method, isDefault: true }
              : { ...method, isDefault: false }
          )
        );
      }
      setIsLoading(false);
      closeModal();
    }, 1000);
  };

  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id
          ? { ...method, isDefault: true }
          : { ...method, isDefault: false }
      )
    );
  };

  const handleEdit = (method) => {
    setCurrentMethod(method);
    setIsEditing(true);
    openModal();
  };

  const handleDelete = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMethod({
      id: null,
      type: "cash", // 預設為現金付款
      method: "現金付款",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    });
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
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
              {isMounted && (
                <TransitionGroup component={null}>
                  {paymentMethods.map((method) => (
                    <CSSTransition
                      key={method.id}
                      timeout={300}
                      classNames="fade"
                    >
                      <div className="card bg-base-100 shadow-xl mb-4">
                        <div className="card-body ">
                          <h2 className="card-title">付款方式</h2>
                          <p>付款方式: {method.method}</p>
                          {method.cardNumber && (
                            <p>卡號: {method.cardNumber}</p>
                          )}
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
              )}

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

              {/* 優惠券組件 */}
              <Coupon applyCoupon={applyCoupon} />

              {discount > 0 && (
                <p className="text-green-500 mt-4">優惠券折扣: NT${discount}</p>
              )}
            </section>
          </div>

          {/* Modal for Editing/Adding Payment Method */}
          {isModalOpen && (
            <dialog open className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  {isEditing ? "編輯錢包" : "新增錢包"}
                </h3>

                {/* 付款方式選擇 */}
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

                {/* 根據選擇顯示不同的輸入欄位 */}
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

                {/* Set Default Payment Method */}
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

                {/* Modal Actions */}
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
