import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

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

  const [currentMethod, setCurrentMethod] = useState({
    id: null,
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  // 處理表單輸入變更
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentMethod((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 保存付款方式（新增或編輯）
  const handleSubmit = () => {
    if (isEditing) {
      // 編輯現有的付款方式
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === currentMethod.id ? currentMethod : method
        )
      );
    } else {
      // 新增付款方式
      setPaymentMethods((prev) => [
        ...prev,
        { ...currentMethod, id: Date.now() },
      ]);
    }

    // 確保只有一張卡被設為預設卡
    if (currentMethod.isDefault) {
      setPaymentMethods((prev) =>
        prev.map((method) =>
          method.id === currentMethod.id
            ? { ...method, isDefault: true }
            : { ...method, isDefault: false }
        )
      );
    }

    closeModal();
  };

  // 設置為預設付款方式
  const handleSetDefault = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) =>
        method.id === id
          ? { ...method, isDefault: true }
          : { ...method, isDefault: false }
      )
    );
  };

  // 編輯付款方式
  const handleEdit = (method) => {
    setCurrentMethod(method);
    setIsEditing(true);
    document.getElementById("my_modal_4").showModal();
  };

  // 刪除付款方式
  const handleDelete = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  // 重置表單並關閉模態框
  const closeModal = () => {
    setCurrentMethod({
      id: null,
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    });
    setIsEditing(false);
    document.getElementById("my_modal_4").close();
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

            <section className="max-w-4xl mx-auto">
              <h3 className="text-l font-semibold text-gray-700 capitalize dark:text-white mb-6">
                常用錢包
              </h3>

              {/* 現有付款方式卡片 */}
              {paymentMethods.map((method) => (
                <div key={method.id} className="card bg-base-100 shadow-xl mb-4">
                  <div className="card-body">
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
              ))}

              {/* 新增付款方式卡片 */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex justify-between">
                  <h2 className="card-title">新增錢包</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsEditing(false);
                      document.getElementById("my_modal_4").showModal();
                    }}
                  >
                    新增
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Modal for Editing/Adding Payment Method */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                {isEditing ? "編輯錢包" : "新增錢包"}
              </h3>

              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {/* Cardholder's Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">付款人姓名</span>
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={currentMethod.cardholderName}
                    onChange={handleChange}
                    placeholder="請輸入姓名"
                    className="input input-bordered w-full"
                  />
                </div>

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

                {/* CVV */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">驗證碼</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={currentMethod.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
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
                <button className="btn btn-success" onClick={handleSubmit}>
                  {isEditing ? "保存修改" : "新增錢包"}
                </button>
                <button className="btn" onClick={closeModal}>
                  取消
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <Footer />
    </>
  );
}

