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

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg mb-4 text-gray-800">
        {isEditing ? "編輯地址" : "新增地址"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 收貨方式選擇 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text ">收貨方式</span>
          </label>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            className="select select-bordered w-full text-black"
            required
          >
            <option value="homeDelivery">宅配到府</option>
            <option value="convenienceStore">超商取貨</option>
          </select>
        </div>

        {/* 如果選擇「宅配到府」，顯示地址欄位 */}
        {formData.deliveryMethod === "homeDelivery" && (
          <>
            <div className="form-control">
              <label className="label" htmlFor="city">
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

            <div className="form-control">
              <label className="label" htmlFor="area">
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

            <div className="form-control">
              <label className="label" htmlFor="street">
                <span className="label-text ">街道</span>
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="請輸入街道"
                className="input input-bordered w-full text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="detailedAddress">
                <span className="label-text ">詳細地址</span>
              </label>
              <input
                id="detailedAddress"
                type="text"
                name="detailedAddress"
                value={formData.detailedAddress}
                onChange={handleChange}
                placeholder="請輸入詳細地址"
                className="input input-bordered w-full text-black"
                required
              />
            </div>
          </>
        )}

        {/* 如果選擇「超商取貨」，顯示選擇超商與店鋪資訊 */}
        {formData.deliveryMethod === "convenienceStore" && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">選擇超商</span>
              </label>
              <select
                name="storeType"
                value={formData.storeType}
                onChange={handleChange}
                className="select select-bordered w-full text-black"
                required
              >
                <option value="">請選擇超商</option>
                <option value="7-11">7-11</option>
                <option value="FamilyMart">全家</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text ">店鋪代碼/名稱</span>
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="請輸入超商店鋪名稱或代碼"
                className="input input-bordered w-full text-black"
                required
              />
            </div>
          </>
        )}
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
          <span className="label-text m-4">將此設為我的預設地址</span>
        </label>
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
          className="btn text-white"
          style={{ backgroundColor: "#003E52" }}
          onClick={closeModal}
        >
          取消
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
