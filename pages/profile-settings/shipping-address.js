import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddressCard from "@/components/address/AddressCard";
import AddressForm from "@/components/address/AddressForm";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function ShippingAddress() {
  // 確保 addresses 的初始值為空陣列
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    city: "",
    area: "",
    street: "",
    detailedAddress: "",
    isDefault: false,
    id: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3005/api/shipment/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to submit address");
      const result = await response.json();

      // 檢查 addresses 是否為陣列，如果不是，設置為空陣列
      setAddresses((prevAddresses) => {
        return Array.isArray(prevAddresses)
          ? [...prevAddresses, result.data]
          : [result.data];
      });

      resetForm();
      closeModal();
    } catch (error) {
      console.error("Error submitting address:", error);
      setErrorMessage("提交地址失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/shipment/address/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete address");
      setAddresses(addresses.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      setErrorMessage("刪除地址失敗");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3005/api/shipment/address/${id}/default`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to set default address");
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }));
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error setting default address:", error);
      setErrorMessage("設定預設地址失敗");
    }
  };

  const resetForm = () => {
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
  };

  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  // 連到後端
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/shipment/addresses",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 確保你有實現認證和授權機制
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAddresses(data.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setErrorMessage("無法加載地址數據");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <Breadcrumbs />

            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
              我的地址
            </h2>

            <section className="max-w-4xl mx-auto grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              {addresses && addresses.length > 0 ? (
                <TransitionGroup component={null}>
                  {addresses.map((address) => {
                    // 防禦性檢查，確保 address 是有效的物件且有 id
                    if (!address || !address.id) return null;
                    return (
                      <CSSTransition
                        key={address.id}
                        timeout={300}
                        classNames="fade"
                      >
                        <AddressCard
                          address={address}
                          handleEdit={() => {
                            setIsEditing(true);
                            setFormData(address);
                            openModal();
                          }}
                          handleDelete={() => handleDelete(address.id)}
                          handleSetDefault={() => handleSetDefault(address.id)}
                        />
                      </CSSTransition>
                    );
                  })}
                </TransitionGroup>
              ) : (
                <div className="card text-center p-4 text-gray-800 col-span-2">
                  <p>您目前沒有地址，請新增地址。</p>
                </div>
              )}

              {/* 新增地址卡片 */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body flex justify-between">
                  <h2 className="card-title">新增地址</h2>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsEditing(false);
                      openModal();
                    }}
                  >
                    新增
                  </button>
                </div>
              </div>
            </section>
          </div>

          <TransitionGroup>
            <CSSTransition timeout={300} classNames="fade">
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <AddressForm
                    formData={formData}
                    handleChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    handleSubmit={handleSubmit}
                    isEditing={isEditing}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    closeModal={closeModal} // 傳遞 closeModal 函數
                  />
                </div>
              </dialog>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      <Footer />
    </>
  );
}
