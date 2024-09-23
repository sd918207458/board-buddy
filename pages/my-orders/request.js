import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavbarSwitcher";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CSSTransition } from "react-transition-group";

// 可重用的輸入欄位組件
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
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 表單驗證邏輯
  const validateForm = () => {
    const {
      name,
      email,
      phone,
      orderNumber,
      orderDate,
      productQuantity,
      returnReason,
    } = formData;
    if (
      !name ||
      !email ||
      !phone ||
      !orderNumber ||
      !orderDate ||
      !productQuantity ||
      !returnReason
    ) {
      return "請填寫所有必填欄位";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "請輸入有效的電子郵件地址";
    }
    if (!/^\d{10,12}$/.test(phone)) {
      return "請輸入有效的手機號碼";
    }
    return null;
  };

  // 表單提交處理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 模擬提交處理
      setSubmitMessage("提交成功！我們已收到您的退換貨申請。");
      setFormData({
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
    } catch (error) {
      setErrorMessage("提交失敗，請稍後重試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <Navbar />
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

          <form onSubmit={handleSubmit} className="m-4">
            <h2 className="text-xl font-semibold text-[#003E52] dark:text-white text-center">
              訂單資料
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="姓名"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
              <InputField
                label="信箱"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="手機號碼"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
              <InputField
                label="訂單編號"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="訂單日期"
                name="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
              <InputField
                label="商品名稱"
                name="productName"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="商品型號"
                name="productModel"
                value={formData.productModel}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
              <InputField
                label="商品數量"
                name="productQuantity"
                type="number"
                value={formData.productQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

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
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="textarea textarea-bordered border-[#036672] focus:border-[#024c52]"
                placeholder="請輸入退貨原因"
                required
              ></textarea>
            </div>

            {/* CSSTransition 動畫效果 */}
            <CSSTransition
              in={!!errorMessage}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div className="mt-4 text-center text-red-500">
                {errorMessage}
              </div>
            </CSSTransition>

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

            <CSSTransition
              in={!!submitMessage}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div className="mt-4 text-center text-green-500">
                {submitMessage}
              </div>
            </CSSTransition>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
