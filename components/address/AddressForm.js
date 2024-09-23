
import React, { useState, useEffect } from "react";
import taiwanDistricts from "@/public/taiwan_districts.json";


const AddressForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  isLoading,
  closeModal,

}) => {
  // 提取城市列表
  const cities = taiwanDistricts.map((city) => city.name);
  const [areas, setAreas] = useState([]);

  // 當選擇城市變更時，更新區域列表
  useEffect(() => {
    const selectedCity = taiwanDistricts.find(
      (city) => city.name === formData.city
    );
    setAreas(selectedCity ? selectedCity.districts : []);
  }, [formData.city]);

  // 表單輸入字段數據
  const inputFields = [
    { id: "username", label: "收貨人姓名", placeholder: "姓名" },
    { id: "phone", label: "收貨人手機", placeholder: "手機號碼" },
    { id: "street", label: "街道", placeholder: "街道" },
    { id: "detailedAddress", label: "詳細地址", placeholder: "詳細地址" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg mb-4 text-gray-800">
        {isEditing ? "編輯地址" : "新增地址"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 表單輸入欄位 */}
        {inputFields.map(({ id, label, placeholder }) => (
          <div className="form-control" key={id}>
            <label className="label" htmlFor={id}>
              <span className="label-text ">{label}</span>
            </label>
            <input
              id={id}
              type="text"
              name={id}
              value={formData[id]}
              onChange={handleChange}
              placeholder={`請輸入${placeholder}`}
              className="input input-bordered w-full text-black"
              required
            />
          </div>
        ))}

        {/* 城市選擇 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text ">城市</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="select select-bordered w-full text-black"
            required
          >
            <option value="">請選擇城市</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* 區域選擇 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text ">區域</span>
          </label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="select select-bordered w-full text-black"
            required
            disabled={!formData.city}
          >
            <option value="">請選擇區域</option>
            {areas.map((area) => (
              <option key={area.zip} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* 預設地址選擇 */}
        <div className="form-control">
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                handleChange({
                  target: { name: "isDefault", value: e.target.checked },
                })
              }
              className="checkbox"
            />
            <span className="label-text ml-2">將此設為我的預設地址</span>
          </label>
        </div>
      </div>

      {/* 操作按鈕 */}
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
          style={{ backgroundColor: "#003E52" }}
          onClick={closeModal} // 添加這行代碼來調用 closeModal 函數
        >
          取消
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
