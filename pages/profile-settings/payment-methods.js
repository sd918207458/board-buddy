import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 替換為 React Transition Group

export default function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardholderName: "王大明",
      cardNumber: "0000 0000 0000 0000",
      expiryDate: "12/24",
      isDefault: true,
    },
  ]);

  const [isMounted, setIsMounted] = useState(false); // 用於追踪是否在客戶端
  const [currentMethod, setCurrentMethod] = useState({
    id: null,
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 增加加載狀態
  const [isModalOpen, setIsModalOpen] = useState(false); // 管理 modal 的開關狀態

  useEffect(() => {
    setIsMounted(true); // 在客戶端掛載時設置
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentMethod((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true); // 設置加載狀態
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
      setIsLoading(false); // 解除加載狀態
      closeModal();
    }, 1000); // 模擬加載延遲
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
              {/* 使用 CSSTransition 和 TransitionGroup */}
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
                          <p>卡號: {method.cardNumber}</p>
                          <p>到期日: {method.expiryDate}</p>
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
          </div>

          {/* Modal for Editing/Adding Payment Method */}
          {isModalOpen && (
            <dialog open className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  {isEditing ? "編輯錢包" : "新增錢包"}
                </h3>

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  {/* Credit Card Number */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">信用卡卡號</span>
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={currentMethod.cardNumber}
                      onChange={handleChange}
                      placeholder="0000 0000 0000 0000"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">到期日</span>
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={currentMethod.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>

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
                    disabled={isLoading} // 加載中時禁用按鈕
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
