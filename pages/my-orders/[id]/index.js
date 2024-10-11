// 退貨申請頁面（Request.jsx）
import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}) => (
  <div className="form-control">
    <label htmlFor={name} className="label text-gray-700 dark:text-gray-300">
      <span className="label-text">{label}</span>
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="input input-bordered border-[#036672] focus:border-[#024c52]"
      placeholder={`請輸入${label}`}
      required={required}
    />
  </div>
);

export default function Request() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderNumber: "",
    orderDate: "",
    productName: "",
    productModel: "",
    productQuantity: "",
    returnReason: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // 從 LocalStorage 中讀取選中的訂單資料
    const storedOrder = JSON.parse(localStorage.getItem("selectedOrder"));

    if (storedOrder) {
      setSelectedOrder(storedOrder);
      setFormData({
        ...formData,
        orderNumber: storedOrder.orderId,
        orderDate: new Date(storedOrder.date).toISOString().split("T")[0], // 格式化日期
        productName: storedOrder.items[0]?.product_name || "",
        productModel: storedOrder.items[0]?.product_type || "",
        productQuantity: storedOrder.items[0]?.quantity || 1,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 提交邏輯
    toast.success("提交成功！");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52]">
        <div className="card w-full max-w-lg mx-auto overflow-hidden bg-white dark:bg-gray-800 shadow-lg lg:max-w-4xl rounded-lg">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>

          <form onSubmit={handleSubmit} className="m-4">
            <h2 className="text-xl font-semibold text-[#003E52] dark:text-white text-center">
              退換貨處理
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="訂單編號"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={(e) =>
                  setFormData({ ...formData, orderNumber: e.target.value })
                }
                required
              />
              <InputField
                label="訂單日期"
                name="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={(e) =>
                  setFormData({ ...formData, orderDate: e.target.value })
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="商品名稱"
                name="productName"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                required
              />
              <InputField
                label="商品型號"
                name="productModel"
                value={formData.productModel}
                onChange={(e) =>
                  setFormData({ ...formData, productModel: e.target.value })
                }
                required
              />
            </div>
            <InputField
              label="商品數量"
              name="productQuantity"
              type="number"
              value={formData.productQuantity}
              onChange={(e) =>
                setFormData({ ...formData, productQuantity: e.target.value })
              }
              required
            />
            <InputField
              label="退貨原因"
              name="returnReason"
              type="text"
              value={formData.returnReason}
              onChange={(e) =>
                setFormData({ ...formData, returnReason: e.target.value })
              }
              required
            />
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary bg-[#036672] hover:bg-[#024c52] border-none"
              >
                提交表單
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}
