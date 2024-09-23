import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

import AddressCard from "@/components/address/AddressCard";
import AddressForm from "@/components/address/AddressForm";

import { CSSTransition, TransitionGroup } from "react-transition-group";


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

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);


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
      resetForm();

      closeModal();
    }, 1000);
  };



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

  return (
    <>
      <Navbar />

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
                  ))}
                </TransitionGroup>
              ) : (
                <div className="card text-center p-4 text-gray-800 col-span-2">
                  <p>您目前沒有地址，請新增地址。</p>
                </div>
              )}

              {/* 新增付款方式卡片 */}
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
            {
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
            }
          </TransitionGroup>

        </div>
      </div>
      <Footer />
    </>
  );
}
