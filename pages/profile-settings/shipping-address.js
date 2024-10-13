// shipping-address.js
import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddressCard from "@/components/address/AddressCard";
import AddressForm from "@/components/address/AddressForm";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 常量提取
const API_BASE_URL = "http://localhost:3005/api";
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  return fetch(url, { ...options, headers, credentials: "include" });
};

// 初始表單數據函數
const initialFormData = (userData = {}) => ({
  username: userData.username || "",
  phone: userData.phone_number || "",
  city: "",
  area: "",
  street: "",
  detailed_address: "",
  isDefault: false,
  address_id: null,
  deliveryMethod: "homeDelivery",
  storeType: "",
  storeName: "",
  storeAddress: "",
});

// Initial form data function
const initialFormData = (userData = {}) => ({
  username: userData.username || "",
  phone: userData.phone_number || "",
  city: "",
  area: "",
  street: "",
  detailed_address: "",
  isDefault: false,
  address_id: null,
  deliveryMethod: "homeDelivery",
  storeType: "",
  storeName: "",
  storeAddress: "",
});

export default function ShippingAddress() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(initialFormData());
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserInfo();
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        username: userData.username,
        phone: userData.phone_number,
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        username: userData.username,
        phone: userData.phone_number,
      }));
    }
  }, [userData]);

  // Fetch user info
  const fetchUserInfo = async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/users/check`);
      const result = await response.json();
      if (response.ok && result?.data?.user) {
        setUserData(result.data.user);
      } else {
        handleError("無法加載用戶資料");
      }
    } catch (error) {
      handleError("無法加載用戶資料", error);
    }
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/shipment/addresses`
      );
      const result = await response.json();
      if (response.ok) {
        setAddresses(result.data || []);
      } else {
        handleError(result.message || "無法加載地址數據");
      }
    } catch (error) {
      handleError("無法加載地址數據", error);
    }
  };

  const handleError = (message, error = null) => {
    console.error(message, error);
    toast.error(message);
  };

  const handleError = (message, error = null) => {
    console.error(message, error);
    toast.error(message);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${API_BASE_URL}/shipment/addresses/${formData.address_id}`
      : `${API_BASE_URL}/shipment/addresses`;

    // 確保 storeName 和 storeAddress 包含在發送的數據中
    const requestData = {
      ...formData,
      storeName: formData.storeName || "",
      storeAddress: formData.storeAddress || "",
    };

    console.log("提交的資料：", requestData);

    try {
      const response = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(requestData),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "提交地址失敗");

      setAddresses((prevAddresses) =>
        isEditing
          ? prevAddresses.map((addr) =>
              addr.address_id === formData.address_id ? result.data : addr
            )
          : [...prevAddresses, result.data]
      );
      resetForm();
      closeModal();
      toast.success("地址已成功保存！");
    } catch (error) {
      handleError("提交地址失敗", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit address
  const handleEdit = (address) => {
    setIsEditing(true);
    setFormData({ ...initialFormData(userData), ...address });
    openModal();
  };

  // Handle delete address
  const handleDelete = async (addressId) => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/shipment/addresses/${addressId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("刪除地址失敗");
      if (!response.ok) throw new Error("刪除地址失敗");

      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.address_id !== addressId)
      );
      toast.success("地址已成功刪除！");
    } catch (error) {
      handleError("刪除地址失敗", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle set default address
  const handleSetDefault = async (addressId) => {
    try {
      const response = await fetchWithAuth(
        `${API_BASE_URL}/shipment/addresses/${addressId}/default`,
        { method: "PUT" }
      );
      if (!response.ok) throw new Error("設定預設地址失敗");
      if (!response.ok) throw new Error("設定預設地址失敗");

      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.address_id === addressId,
        }))
      );
      toast.success("預設地址已設定！");
    } catch (error) {
      handleError("設定預設地址失敗", error);
    }
  };
  // Reset form
  const resetForm = () => {
    setFormData(initialFormData(userData));
    setIsEditing(false);
  };

  const openModal = () => document.getElementById("my_modal_1").showModal();
  const closeModal = () => document.getElementById("my_modal_1").close();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <Breadcrumbs />
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
            我的地址
          </h2>
          <section className="max-w-4xl mx-auto grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {addresses.length > 0 ? (
              <TransitionGroup component={null}>
                {addresses.map((address) => (
                  <CSSTransition
                    key={address.address_id}
                    timeout={300}
                    classNames="fade"
                  >
                    <AddressCard
                      address={address}
                      handleEdit={() => handleEdit(address)}
                      handleDelete={() => handleDelete(address.address_id)}
                      handleSetDefault={() =>
                        handleSetDefault(address.address_id)
                      }
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            ) : (
              <div className="card text-center p-4 text-gray-800 col-span-2">
                <p>您目前沒有地址，請新增地址。</p>
              </div>
            )}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body flex justify-between">
                <h2 className="card-title">新增地址</h2>
                <button className="btn btn-primary" onClick={openModal}>
                  新增
                </button>
              </div>
            </div>
          </section>
        </div>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box relative relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <AddressForm
              formData={formData}
              handleChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              isLoading={isLoading}
              closeModal={closeModal} // 傳入 closeModal 確保取消按鈕也能正常關閉模態窗
              closeModal={closeModal} // 傳入 closeModal 確保取消按鈕也能正常關閉模態窗
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>關閉</button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>關閉</button>
          </form>
        </dialog>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
