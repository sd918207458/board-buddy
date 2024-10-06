import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

import AddressCard from "@/components/address/AddressCard";
import AddressForm from "@/components/address/AddressForm";
import { CSSTransition, TransitionGroup } from "react-transition-group";

<<<<<<< HEAD
=======
// Helper function to get token
const getToken = () => localStorage.getItem("token");

// Helper function to make authenticated fetch requests
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    ...options.headers,
  };
  return fetch(url, { ...options, headers, credentials: "include" });
};
>>>>>>> Login

export default function ShippingAddress() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(initialFormData());
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

<<<<<<< HEAD

  const handleSubmit = (e) => {
=======
  // Load user info and addresses on component mount
  useEffect(() => {
    fetchUserInfo();
    fetchAddresses();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:3005/api/users/check"
      );
      const userDataResponse = await response.json();
      if (userDataResponse?.data?.user) {
        setUserData(userDataResponse.data.user);
        setFormData((prevFormData) => ({
          ...prevFormData,
          username: userDataResponse.data.user.username || "",
          phone: userDataResponse.data.user.phone_number || "",
        }));
      }
    } catch (error) {
      console.error("無法加載用戶資料:", error);
      setErrorMessage("無法加載用戶資料");
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:3005/api/shipment/addresses"
      );
      const data = await response.json();
      setAddresses(data.data || []); // 修正錯誤處理
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setErrorMessage("無法加載地址數據");
    }
  };

  const handleSubmit = async (e) => {
>>>>>>> Login
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:3005/api/shipment/addresses/${formData.address_id}`
      : "http://localhost:3005/api/shipment/addresses";

<<<<<<< HEAD

    if (!formData.username || !formData.phone || !formData.city) {
      setErrorMessage("請填寫所有必填欄位");
      setIsLoading(false);
      return;
    }


    setTimeout(() => {
      if (isEditing) {
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === formData.id ? formData : addr))
        );
      } else {
        setAddresses((prev) => [...prev, { ...formData, id: Date.now() }]);
      }

      setIsLoading(false);
=======
    try {
      const response = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error("Failed to submit address");

      setAddresses((prevAddresses) =>
        isEditing
          ? prevAddresses.map((addr) =>
              addr.address_id === formData.address_id ? result.data : addr
            )
          : [...prevAddresses, result.data]
      );
>>>>>>> Login
      resetForm();

      closeModal();
    } catch (error) {
      console.error("Error submitting address:", error);
      setErrorMessage("提交地址失敗");
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD


  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };



  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
=======
  const handleEdit = (address) => {
    setIsEditing(true);
    setFormData({
      ...formData,
      ...address,
      username: address.username || userData?.username,
      phone: address.phone || userData?.phone_number,
    });
    openModal();
  };

  const handleDelete = async (addressId) => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth(
        `http://localhost:3005/api/shipment/addresses/${addressId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete address");

      setAddresses((prevAddresses) =>
        prevAddresses.filter((addr) => addr.address_id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
      setErrorMessage("刪除地址失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:3005/api/shipment/addresses/${addressId}/default`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("Failed to set default address");

      setAddresses((prevAddresses) =>
        prevAddresses.map((addr) => ({
          ...addr,
          isDefault: addr.address_id === addressId,
        }))
      );
    } catch (error) {
      console.error("Error setting default address:", error);
      setErrorMessage("設定預設地址失敗");
    }
>>>>>>> Login
  };


  const resetForm = () => {
<<<<<<< HEAD

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
=======
    setFormData(initialFormData(userData));
>>>>>>> Login
    setIsEditing(false);

  };

<<<<<<< HEAD
  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").close();

  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <Breadcrumbs />
=======
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
>>>>>>> Login

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
<<<<<<< HEAD
                  </div>
                </dialog>
              </CSSTransition>
            }
          </TransitionGroup>

=======
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
>>>>>>> Login
        </div>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <AddressForm
              formData={formData}
              handleChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              handleSubmit={handleSubmit}
              isEditing={isEditing}
              isLoading={isLoading}
              errorMessage={errorMessage}
              closeModal={closeModal}
            />
          </div>
        </dialog>
      </div>
      <Footer />
    </div>
  );
}

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
});
