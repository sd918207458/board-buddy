import React, { useState, useEffect } from "react";
import taiwanDistricts from "@/public/taiwan_districts.json";
import {
  useShip711StoreCallback,
  useShip711StoreOpener,
} from "@/hooks/use-ship-711-store"; // 引入7-11運送商店的回傳和開啟勾子

const AddressForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  isLoading,
  closeModal,
}) => {
  const cities = taiwanDistricts.map((city) => city.name);
  const [areas, setAreas] = useState([]);

  // useShip711StoreOpener的使用
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711", // 使用你在伺服器設置的 callback URL
    { autoCloseMins: 3 }
  );

  // 回傳門市資訊的勾子，處理選擇 7-11 門市後的資料
  useShip711StoreCallback((storeInfo) => {
    console.log("7-11 門市資訊：", storeInfo); // 查看回傳的門市資訊
    if (storeInfo) {
      handleChange({
        target: {
          name: "storeName",
          value: storeInfo.storeName,
        },
      });
      handleChange({
        target: {
          name: "storeAddress",
          value: storeInfo.storeAddress,
        },
      });
    }
  });

  // 更新區域選項根據城市
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">收貨方式</span>
          </label>
          <select
            name="deliveryMethod"
            value={formData.deliveryMethod || ""}
            onChange={handleChange}
            className="select select-bordered w-full text-black"
            required
          >
            <option value="homeDelivery">宅配到府</option>
            <option value="convenienceStore">超商取貨</option>
          </select>
        </div>

        {formData.deliveryMethod === "homeDelivery" && (
          <>
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">收件人姓名</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                placeholder="請輸入收件人姓名"
                className="input input-bordered w-full text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="phone">
                <span className="label-text">聯絡電話</span>
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="請輸入聯絡電話"
                className="input input-bordered w-full text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="city">
                <span className="label-text">城市</span>
              </label>
              <select
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
                className="select select-bordered w-full text-black"
                required
              >
                <option value="">請選擇城市</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="area">
                <span className="label-text">區域</span>
              </label>
              <select
                name="area"
                value={formData.area || ""}
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
                <span className="label-text">街道</span>
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={formData.street || ""}
                onChange={handleChange}
                placeholder="請輸入街道"
                className="input input-bordered w-full text-black"
                required
              />
            </div>

            <div className="form-control">
              <label className="label" htmlFor="detailed_address">
                <span className="label-text">詳細地址</span>
              </label>
              <input
                id="detailed_address"
                type="text"
                name="detailed_address"
                value={formData.detailed_address || ""}
                onChange={handleChange}
                placeholder="請輸入詳細地址"
                className="input input-bordered w-full text-black"
                required
              />
            </div>
          </>
        )}

        {formData.deliveryMethod === "convenienceStore" && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">選擇超商</span>
              </label>
              <select
                name="storeType"
                value={formData.storeType || ""}
                onChange={handleChange}
                className="select select-bordered w-full text-black"
                required
              >
                <option value="">請選擇超商</option>
                <option value="7-11">7-11</option>
                <option value="FamilyMart">全家</option>
              </select>
            </div>

            {formData.storeType === "7-11" && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">選擇7-11門市</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => openWindow()}
                    className="btn btn-primary w-full"
                  >
                    選擇門市
                  </button>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">門市名稱</span>
                    </label>
                    <input
                      type="text"
                      name="storeName"
                      value={store711.storeName || formData.storeName || ""}
                      placeholder="請選擇店鋪"
                      className="input input-bordered w-full text-black"
                      readOnly
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">門市地址</span>
                    </label>
                    <input
                      type="text"
                      name="storeAddress"
                      value={
                        store711.storeAddress || formData.storeAddress || ""
                      }
                      placeholder="請選擇店鋪"
                      className="input input-bordered w-full text-black"
                      readOnly
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="form-control">
        <label className="cursor-pointer flex items-center">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault || false}
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
