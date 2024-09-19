import React, { useState, useEffect } from "react";
import taiwanDistricts from "@/public/taiwan_districts.json"; // 假設 JSON 檔案放在此路徑

const AddressForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  isLoading,
  closeModal,
}) => {
  // 從 taiwanDistricts 提取城市名稱
  const cities = taiwanDistricts.map((city) => city.name);

  const [areas, setAreas] = useState([]);

  // 當城市變更時，更新區域
  useEffect(() => {
    if (formData.city) {
      const selectedCity = taiwanDistricts.find(
        (city) => city.name === formData.city
      );
      if (selectedCity) {
        setAreas(selectedCity.districts);
      } else {
        setAreas([]);
      }
    } else {
      setAreas([]);
    }
  }, [formData.city]);

  return (
    <form
      className="w-full bg-white modal-box w-11/12 max-w-5xl p-4"
      onSubmit={handleSubmit}
    >
      <h3 className="font-bold text-lg mb-4 text-gray-800">
        {isEditing ? "編輯地址" : "新增地址"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        {/* 城市選擇 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">城市</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="select select-bordered w-full"
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
            <span className="label-text">區域</span>
          </label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
            disabled={!formData.city} // 當沒有選擇城市時，區域下拉選單不可用
          >
            <option value="">請選擇區域</option>
            {areas.map((area) => (
              <option key={area.zip} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="cursor-pointer flex items-center">
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
};

export default AddressForm;
