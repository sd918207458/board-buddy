import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Request() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const [submitMessage, setSubmitMessage] = useState("");

  // 使用 useEffect 確保只在客戶端渲染
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 處理輸入變更
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // 模擬提交 API
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("提交成功！我們已收到您的退換貨申請。");
    }, 2000);
  };

  if (!isMounted) {
    return null; // 在服務端渲染階段不渲染任何內容
  }

  return (
    <>
      <Navbar />
      {isMounted && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52]">
          <div className="card w-full max-w-lg mx-auto overflow-hidden bg-white dark:bg-gray-800 shadow-lg lg:max-w-4xl rounded-lg">
            <div className="w-full p-4">
              <Breadcrumbs />
            </div>

            <section className="p-6">
              <h2 className="text-2xl font-semibold text-[#003E52] dark:text-white text-center">
                退換貨處理
              </h2>
            </section>

            {/* 表單 */}
            <form onSubmit={handleSubmit} className="font font-control m-4">
              <h2 className="text-xl font-semibold text-[#003E52] dark:text-white text-center">
                訂單資料
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                {/* 姓名 */}
                <div className="form-control">
                  <label
                    htmlFor="name"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">姓名</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入姓名"
                    required
                  />
                </div>

                {/* 信箱 */}
                <div className="form-control">
                  <label
                    htmlFor="email"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">信箱</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入信箱"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 手機號碼 */}
                <div className="form-control">
                  <label
                    htmlFor="phone"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">手機號碼</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入手機號碼"
                    required
                  />
                </div>

                {/* 訂單編號 */}
                <div className="form-control">
                  <label
                    htmlFor="orderNumber"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">訂單編號</span>
                  </label>
                  <input
                    id="orderNumber"
                    name="orderNumber"
                    type="text"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入訂單編號"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 訂單日期 */}
                <div className="form-control">
                  <label
                    htmlFor="orderDate"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">訂單日期</span>
                  </label>
                  <input
                    id="orderDate"
                    name="orderDate"
                    type="date"
                    value={formData.orderDate}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    required
                  />
                </div>

                {/* 商品名稱 */}
                <div className="form-control">
                  <label
                    htmlFor="productName"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">商品名稱</span>
                  </label>
                  <input
                    id="productName"
                    name="productName"
                    type="text"
                    value={formData.productName}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入商品名稱"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 商品型號 */}
                <div className="form-control">
                  <label
                    htmlFor="productModel"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">商品型號</span>
                  </label>
                  <input
                    id="productModel"
                    name="productModel"
                    type="text"
                    value={formData.productModel}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入商品型號"
                    required
                  />
                </div>

                {/* 商品數量 */}
                <div className="form-control">
                  <label
                    htmlFor="productQuantity"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">商品數量</span>
                  </label>
                  <input
                    id="productQuantity"
                    name="productQuantity"
                    type="number"
                    value={formData.productQuantity}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入商品數量"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* 退貨原因 */}
                <div className="form-control">
                  <label
                    htmlFor="returnReason"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">退貨原因</span>
                  </label>
                  <textarea
                    id="returnReason"
                    name="returnReason"
                    value={formData.returnReason}
                    onChange={handleChange}
                    className="textarea textarea-bordered border-[#036672] focus:border-[#024c52]"
                    placeholder="請輸入退貨原因"
                    required
                  ></textarea>
                </div>
              </div>

              {/* 提交按鈕與狀態訊息 */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary bg-[#036672] hover:bg-[#024c52] border-none ${
                    isSubmitting ? "loading" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "提交表單"}
                </button>
              </div>

              {/* 提交成功訊息 */}
              {submitMessage && (
                <div className="mt-4 text-center text-green-500">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
