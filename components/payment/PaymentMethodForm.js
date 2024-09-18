const PaymentMethodForm = ({
  currentMethod,
  isEditing,
  isLoading,
  handleSubmit,
  handleChange,
  closeModal,
}) => {
  return (
    <dialog id="my_modal_4" className="modal">
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
            <span className="label-text ml-2">設為我的預設付款方式</span>
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
  );
};

export default PaymentMethodForm;
