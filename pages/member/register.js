import React, { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 可重用的輸入欄位組件
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  // 表單驗證邏輯
  const validateForm = () => {
    if (!username) {
      return "請輸入使用者名稱";
    }
    if (!email.includes("@")) {
      return "請輸入有效的電子信箱";
    }
    if (password.length < 6) {
      return "密碼必須至少包含6個字元";
    }
    if (password !== confirmPassword) {
      return "密碼和確認密碼不一致";
    }
    if (!termsAccepted) {
      return "您必須同意條款與隱私政策";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError); // 使用 react-toastify 顯示錯誤
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json(); // 捕捉錯誤響應

      if (response.status === 201) {
        toast.success("註冊成功");
        router.push("/member/login");
      } else {
        toast.error(data.message || "註冊失敗"); // 顯示伺服器錯誤訊息
      }
    } catch (error) {
      console.error("錯誤:", error);
      toast.error("伺服器錯誤，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#003E52]">
        <div className="card max-w-sm lg:max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body w-full px-6 py-8">
            <div className="flex justify-center">
              <img
                className="w-auto h-8"
                src="/Board-Buddy-logo.png"
                alt="Logo"
              />
            </div>

            <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-200 mt-4">
              註冊
            </h2>

            <form onSubmit={handleSubmit}>
              {/* 使用者名稱輸入欄 */}
              <InputField
                label="使用者名稱"
                type="text"
                id="username"
                placeholder="使用者名稱"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

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

      {/* ToastContainer for react-toastify notifications */}
      <ToastContainer />

      <Footer />
    </>
  );
}
