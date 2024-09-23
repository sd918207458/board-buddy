import React from "react";

const AddressForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  isLoading,
  closeModal,
}) => (
  <form
    className="w-full bg-white modal-box w-11/12 max-w-5xl p-4"
    onSubmit={handleSubmit}
  >
    <h3 className="font-bold text-lg mb-4 text-gray-800">
      {isEditing ? "編輯地址" : "新增地址"}
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Repeated form elements like this could potentially be refactored into a sub-component */}
      {["username", "phone", "street", "detailedAddress"].map((field) => (
        <div className="form-control" key={field}>
          <label className="label" htmlFor={field}>
            <span className="label-text">
              {
                {
                  username: "收貨人姓名",
                  phone: "收貨人手機",
                  street: "街道",
                  detailedAddress: "詳細地址",
                }[field]
              }
            </span>
          </label>
          <input
            id={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`請輸入${
              {
                username: "姓名",
                phone: "手機號碼",
                street: "街道",
                detailedAddress: "詳細地址",
              }[field]
            }`}
            className="input input-bordered w-full"
            required
          />
        </div>
      ))}

      {/* Example of select fields which could also be refactored */}
      {["city", "area"].map((field) => (
        <div className="form-control" key={field}>
          <label className="label">
            <span className="label-text">
              {field === "city" ? "城市" : "區域"}
            </span>
          </label>
          <select
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">請選擇{field === "city" ? "城市" : "區域"}</option>
            {field === "city" ? (
              <>
                <option value="台北市">台北市</option>
                <option value="新北市">新北市</option>
              </>
            ) : (
              <>
                <option value="士林區">士林區</option>
                <option value="大安區">大安區</option>
              </>
            )}
          </select>
        </div>
      ))}

      <div className="form-control">
        <label className=" cursor-pointer  flex items-center">
          <input type="checkbox" defaultChecked className="checkbox" />
          <span className="label-text ml-2">將此設為我的預設地址</span>
        </label>
      </div>
    </div>

    <div className="modal-action mt-4">
      <button
        type="submit"
        className={`btn btn-primary ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
        style={{ backgroundColor: "#003E52" }}
      >
        {isEditing ? "保存修改" : "新增地址"}
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={closeModal}
        style={{ backgroundColor: "#003E52" }}
      >
        取消
      </button>
    </div>
  </form>
);

export default AddressForm;
