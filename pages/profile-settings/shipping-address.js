import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ShippingAddress() {
  // 狀態管理所有地址和當前編輯的地址
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
    area: "",
    street: "",
    detailedAddress: "",
    isDefault: false,
    id: null, // 用來標識當前是否為編輯狀態
  });

  const [isEditing, setIsEditing] = useState(false); // 是否在編輯狀態

  // 處理表單輸入的變更
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // 編輯模式，更新現有地址
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === formData.id ? formData : addr))
      );
    } else {
      // 新增模式，添加新地址
      setAddresses((prev) => [
        ...prev,
        { ...formData, id: Date.now() }, // 使用時間戳作為唯一ID
      ]);
    }
    // 重置表單和編輯狀態
    setFormData({
      username: "",
      phone: "",
      city: "",
      area: "",
      street: "",
      detailedAddress: "",
      isDefault: false,
      id: null,
    });
    setIsEditing(false);
    document.getElementById("my_modal_4").close();
  };

  // 編輯地址
  const handleEdit = (address) => {
    setFormData(address);
    setIsEditing(true);
    document.getElementById("my_modal_4").showModal();
  };

  // 刪除地址
  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  // 設為預設地址
  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id, // 只有當前選中的設為預設
      }))
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="w-full max-w-lg mx-auto bg-base-100 shadow-lg rounded-lg lg:max-w-4xl">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>

          <section className="p-6">
            <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
              我的地址
            </h2>
          </section>

          <section className="p-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              常用地址
            </h3>
          </section>

          {/* 地址列表 */}
          {addresses.map((address) => (
            <div key={address.id} className="p-4">
              <div className="card bg-base-100 shadow-xl w-full">
                <div className="card-body">
                  <h2 className="card-title">{address.username}</h2>
                  <p>
                    {address.city} {address.area} {address.street}{" "}
                    {address.detailedAddress}
                  </p>
                  <p>手機號碼: {address.phone}</p>
                  <div className="card-actions justify-end space-x-4">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={() => handleEdit(address)}
                    >
                      編輯
                    </button>
                    <button
                      className="btn btn-outline btn-error"
                      onClick={() => handleDelete(address.id)}
                    >
                      刪除
                    </button>
                    {!address.isDefault && (
                      <button
                        className="btn btn-outline btn-success"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        設為預設
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 新增地址按鈕 */}
          <div className="p-4">
            <div className="card bg-base-100 shadow-xl w-full">
              <div className="card-body flex justify-between">
                <h2 className="card-title">新增地址</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => document.getElementById("my_modal_4").showModal()}
                >
                  新增
                </button>
              </div>
            </div>
          </div>

          {/* 地址表單 Modal */}
          <dialog id="my_modal_4" className="modal">
            <form className="modal-box w-11/12 max-w-5xl" onSubmit={handleSubmit}>
              <h3 className="font-bold text-lg mb-4">{isEditing ? "編輯地址" : "新增地址"}</h3>

              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {/* 收貨人姓名 */}
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    <span className="label-text">收貨人姓名</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="請輸入姓名"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* 收貨人手機 */}
                <div className="form-control">
                  <label className="label" htmlFor="phone">
                    <span className="label-text">收貨人手機</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="請輸入手機號碼"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* 收貨地址 */}
                <div className="form-control col-span-2">
                  <label className="label">
                    <span className="label-text">收貨地址</span>
                  </label>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* 城市選擇 */}
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">請選擇城市</option>
                      <option value="台北市">台北市</option>
                      <option value="新北市">新北市</option>
                    </select>

                    {/* 區域選擇 */}
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">請選擇區域</option>
                      <option value="士林區">士林區</option>
                      <option value="大安區">大安區</option>
                    </select>
                  </div>

                  {/* 街道輸入 */}
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="請輸入街道"
                     
                      className="input input-bordered w-full"
                      required
                    />
                    <input
                      type="text"
                      name="detailedAddress"
                      value={formData.detailedAddress}
                      onChange={handleChange}
                      placeholder="請輸入詳細地址"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 預設地址選擇 */}
              <div className="flex mt-4">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="checkbox"
                  />
                  <span className="label-text ml-2">將此設為我的預設地址</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "保存修改" : "新增地址"}
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  取消
                </button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
      <Footer />
    </>
  );
}
