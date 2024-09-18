import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const InputField = ({ label, type, id, placeholder, value, onChange }) => (
  <div className="form-control mt-4">
    <label htmlFor={id} className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full"
    />
  </div>
);

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 表單驗證
    if (!email.includes("@")) {
      setErrorMessage("請輸入有效的電子信箱");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("密碼必須至少包含6個字元");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("密碼和確認密碼不一致");
      return;
    }
    if (!termsAccepted) {
      setErrorMessage("您必須同意條款與隱私政策");
      return;
    }

    // 模擬註冊過程
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("註冊成功！");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#003E52]">
        <div className="card max-w-sm lg:max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body w-full px-6 py-8">
            <div className="flex justify-center">
              <img
                className="w-auto h-8"
                src="https://merakiui.com/images/logo.svg"
                alt="Logo"
              />
            </div>

            <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-200 mt-4">
              註冊
            </h2>

            {/* 錯誤提示 */}
            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* 電子信箱輸入欄 */}
              <InputField
                label="電子信箱"
                type="email"
                id="email"
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* 密碼欄位 */}
              <div className="form-control mt-4">
                <label htmlFor="password" className="label">
                  <span className="label-text">密碼</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* 確認密碼欄位 */}
              <InputField
                label="確認密碼"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* 條款與隱私政策 */}
              <div className="form-control mt-4">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className="label-text ml-2">
                    一旦創建賬戶，即意味著您同意我們的條款和隱私政策。
                  </span>
                </label>
              </div>

              {/* 註冊按鈕 */}
              <div className="mt-6">
                <button
                  className={`btn w-full btn-neutral btn-block bg-[#003E52] ${
                    isLoading ? "loading" : ""
                  }`}
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? "註冊中..." : "註冊"}
                </button>
              </div>
            </form>

            {/* 已有帳戶提示 */}
            <div className="flex items-center justify-center mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                已經有帳戶了?{" "}
                <a href="login" className="link">
                  登入
                </a>
                吧!
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
