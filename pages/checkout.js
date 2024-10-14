import { useState } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddressFormProduct from "@/components/AddressFormProduct/AddressFormProduct";
import Sidecart from "@/components/Sidecart/Sidecart";
import Checkout from "@/components/checkout/checkout";

export default function CheckoutPage() {
  // 使用 useState 來控制 AddressFormProduct 是否顯示
  const [showAddressForm, setShowAddressForm] = useState(false);
  // 按鈕的點擊處理函數
  const handleShowForm = () => {
    setShowAddressForm(true); // 按下按鈕後顯示地址表單
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Breadcrumbs /> */}
      <div className="flex justify-center">
        {/* Sidecart 固定在左邊 */}
        <div className="fixed left-40 top-20 w-72 h-[calc(100vh-100px)] overflow-y-auto z-50">
          <Sidecart />
        </div>

        {/* Checkout 部分不被 Sidecart 擋住，並居中排列 */}
        <div className="flex-1 max-w-3xl  ml-[23rem] p-3  ">
          {/* <h1>購物車內容</h1> */}
          <Checkout />
          {/* 顯示按鈕，按下後顯示表單 */}
          <div className="flex justify-end items-center">
            {!showAddressForm && (
              <button
                onClick={handleShowForm} // 點擊時調用 handleShowForm
                className="mt-4 px-4 py-2 bg-[#003E52] text-white rounded"
              >
                結帳
              </button>
            )}
          </div>

          {/* 當 showAddressForm 為 true 時顯示 AddressFormProduct */}
          {showAddressForm && <AddressFormProduct />}
          {/* <h1>地址資訊</h1> */}
          {/* <AddressFormProduct /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
