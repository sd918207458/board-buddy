import React, { useState, useEffect } from "react";
import taiwanDistricts from "@/public/taiwan_districts.json";
import {
  useShip711StoreCallback,
  useShip711StoreOpener,
} from "@/hooks/use-ship-711-store";

const AddressForm = ({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  isLoading,
  closeModal,
}) => {
  const [areas, setAreas] = useState([]);

  // 引用 7-11 門市選擇的 hooks
  const { store711, openWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 }
  );

  // 回傳門市資訊並將名稱和地址填入對應欄位
  useShip711StoreCallback((storeInfo) => {
    if (storeInfo) {
      handleChange({
        target: { name: "storeName", value: storeInfo.storename },
      });
      handleChange({
        target: { name: "storeAddress", value: storeInfo.storeaddress },
      });
    }
  });

  // 根據選擇的城市來更新區域
  useEffect(() => {
    const selectedCity = taiwanDistricts.find(
      (city) => city.name === formData.city
    );
    setAreas(selectedCity ? selectedCity.districts : []);
  }, [formData.city]);

  const renderInput = (
    label,
    name,
    value,
    placeholder,
    required = false,
    readOnly = false
  ) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="input input-bordered w-full text-black"
        required={required}
        readOnly={readOnly}
      />
    </div>
  );

  const renderSelect = (
    label,
    name,
    value,
    options,
    required = false,
    disabled = false
  ) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        name={name}
        value={value || ""}
        onChange={handleChange}
        className="select select-bordered w-full text-black"
        required={required}
        disabled={disabled}
      >
        <option value="">{`請選擇${label}`}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg mb-4 text-gray-800">
        {isEditing ? "編輯地址" : "新增地址"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderSelect(
          "收貨方式",
          "deliveryMethod",
          formData.deliveryMethod,
          [
            { value: "homeDelivery", label: "宅配到府" },
            // { value: "convenienceStore", label: "超商取貨" }, // 註釋掉超商取貨選項
          ],
          true
        )}

        {formData.deliveryMethod === "homeDelivery" && (
          <>
            {renderInput(
              "收件人姓名",
              "username",
              formData.username,
              "請輸入收件人姓名",
              true
            )}
            {renderInput(
              "聯絡電話",
              "phone",
              formData.phone,
              "請輸入聯絡電話",
              true
            )}
            {renderSelect(
              "城市",
              "city",
              formData.city,
              taiwanDistricts.map((city) => city.name),
              true
            )}
            {renderSelect(
              "區域",
              "area",
              formData.area,
              areas.map((area) => area.name),
              true,
              !formData.city
            )}
            {renderInput("街道", "street", formData.street, "請輸入街道", true)}
            {renderInput(
              "詳細地址",
              "detailed_address",
              formData.detailed_address,
              "請輸入詳細地址",
              true
            )}
          </>
        )}

        {/* 
        {formData.deliveryMethod === "convenienceStore" && (
          <>
            {renderSelect(
              "選擇超商",
              "storeType",
              formData.storeType,
              [
                { value: "7-11", label: "7-11" },
                { value: "FamilyMart", label: "全家" },
              ],
              true
            )}

            {formData.storeType === "7-11" && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">選擇7-11門市</span>
                  </label>
                  <button
                    type="button"
                    onClick={openWindow}
                    className="btn btn-primary w-full"
                  >
                    選擇門市
                  </button>
                  {renderInput(
                    "門市名稱",
                    "storeName",
                    store711.storeName || formData.storeName,
                    "請選擇店鋪",
                    true,
                    true
                  )}
                  {renderInput(
                    "門市地址",
                    "storeAddress",
                    store711.storeAddress || formData.storeAddress,
                    "請選擇店鋪",
                    true,
                    true
                  )}
                </div>
              </>
            )}
          </>
        )}
        */}
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
