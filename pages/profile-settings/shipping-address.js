import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddressCard from "@/components/address/AddressCard";
import AddressForm from "@/components/address/AddressForm";
import { useModal } from "@/hooks/useModal"; // 引入 useModal hook

export default function ShippingAddress() {
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

  const [isMounted, setIsMounted] = useState(false); // 用於追踪是否在客戶端

  useEffect(() => {
    setIsMounted(true); // 在客戶端掛載時設置
  }, []);

  const { isOpen, openModal, closeModal } = useModal(); // 使用 useModal hook
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 提交表單處理
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (isEditing) {
        setAddresses((prev) =>
          prev.map((addr) => (addr.id === formData.id ? formData : addr))
        );
      } else {
        setAddresses((prev) => [...prev, { ...formData, id: Date.now() }]);
      }
      setIsLoading(false);
      closeModal();
    }, 1000);
  };

  // 刪除地址處理
  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  // 設置默認地址處理
  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <Breadcrumbs />
            <section className="max-w-4xl mx-auto mt-6">
              <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
                我的地址
              </h2>
            </section>

            {/* 只有在掛載完成後才渲染地址列表 */}
            {isMounted && (
              <section className="max-w-4xl mx-auto grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className=" space-y-4">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        handleEdit={() => {
                          setIsEditing(true);
                          setFormData(address);
                          openModal();
                        }}
                        handleDelete={() => handleDelete(address.id)}
                        handleSetDefault={() => handleSetDefault(address.id)}
                      />
                    ))
                  ) : (
                    <div className="card text-center p-4 text-gray-800">
                      <p>您目前沒有地址，請新增地址。</p>
                      <button
                        className="btn btn-primary mt-4 w-full bg-[#003E52]"
                        onClick={() => {
                          setIsEditing(false);
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
                          openModal();
                        }}
                      >
                        新增地址
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* 只有在掛載完成後才渲染模態窗口 */}
          {isMounted && isOpen && (
            <dialog open className="modal" onClose={closeModal}>
              <AddressForm
                formData={formData}
                handleChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                handleSubmit={handleSubmit}
                isEditing={isEditing}
                isLoading={isLoading}
                closeModal={closeModal}
              />
            </dialog>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
