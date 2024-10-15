import React, { useState } from "react";
import Footer from "@/components/footer";
import { CSSTransition } from "react-transition-group";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify"; // 引入 react-toastify
import "react-toastify/dist/ReactToastify.css"; // 引入 react-toastify 樣式

// 可重用的輸入欄位組件
const InputField = ({ label, type, id, placeholder, value, onChange }) => (
  <div className="form-control mt-4">
    <label htmlFor={id} className="label">
      <span className="label-text text-[#003E52]">{label}</span>
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full border-gray-300 focus:border-[#003E52] focus:ring-[#003E52] text-black"
    />
  </div>
);

export default function ForgotPassword() {
  const router = useRouter();
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateVerificationCode = () => verificationCode.length === 6;
  const validatePasswords = () => {
    if (newPassword.length < 6) return "密碼至少需要6個字元";
    if (newPassword !== confirmPassword) return "兩次輸入的密碼不一致";
    return "";
  };

  const handleGetVerificationCode = async () => {
    if (!validateEmail(email)) {
      toast.error("請輸入有效的電子信箱");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3005/api/reset-password/otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        setShowVerificationCode(true);
        toast.success("驗證碼已發送至您的信箱");
      } else {
        toast.error(result.message || "無法發送驗證碼，請重試。");
      }
    } catch (error) {
      toast.error("伺服器錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVerificationCode = () => {
    if (!validateVerificationCode()) {
      toast.error("請輸入有效的6位數驗證碼");
      return;
    }
    setShowNewPasswordFields(true);
    toast.success("驗證碼正確，請輸入新密碼");
  };

  const handleSubmitNewPassword = async () => {
    const passwordError = validatePasswords();
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3005/api/reset-password/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            token: verificationCode,
            password: newPassword,
          }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        toast.success("密碼重置成功！");
        // 清除表單資料
        setEmail("");
        setVerificationCode("");
        setNewPassword("");
        setConfirmPassword("");
        setShowNewPasswordFields(false);

        // 跳轉到登入頁面
        router.push("/member/login");
      } else {
        toast.error(result.message || "重置密碼失敗，請重試！");
      }
    } catch (error) {
      toast.error("伺服器錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#003E52]">
        <div className="card max-w-sm lg:max-w-4xl bg-white shadow-xl">
          <div className="card-body w-full px-6 py-8">
            <div className="flex justify-center">
              <img
                className="w-auto h-8"
                src="/Board Buddy logo.png"
                alt="Logo"
              />
            </div>

            <h2 className="text-center text-2xl font-bold text-[#003E52] mt-4">
              忘記密碼
            </h2>

            <InputField
              label="電子信箱"
              type="email"
              id="LoggingEmailAddress"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-4 flex items-center">
              <button
                className={`btn btn-neutral bg-[#003E52] text-white ${
                  isLoading ? "loading" : ""
                } hover:bg-[#004d63] focus:bg-[#002f42]`}
                onClick={handleGetVerificationCode}
                disabled={isLoading}
              >
                取得驗證碼
              </button>
            </div>

            <CSSTransition
              in={showVerificationCode}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <div className="form-control mt-4">
                <label
                  htmlFor="VerificationCode"
                  className="label text-[#003E52]"
                >
                  <span className="label-text">驗證碼</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="VerificationCode"
                    type="text"
                    placeholder="6位數驗證碼"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input input-bordered w-1/2 border-gray-300 focus:border-[#003E52] focus:ring-[#003E52] text-black"
                  />
                  <button
                    className="btn btn-neutral w-1/4 bg-[#003E52] text-white hover:bg-[#004d63] focus:bg-[#002f42]"
                    onClick={handleSubmitVerificationCode}
                  >
                    送出驗證碼
                  </button>
                </div>
              </div>
            </CSSTransition>

            <CSSTransition
              in={showNewPasswordFields}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <>
                <div className="form-control mt-4">
                  <label htmlFor="NewPassword" className="label text-[#003E52]">
                    <span className="label-text">新密碼</span>
                  </label>
                  <div className="relative">
                    <input
                      id="NewPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input input-bordered w-full border-gray-300 focus:border-[#003E52] focus:ring-[#003E52] text-black"
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

                <div className="form-control mt-4">
                  <label
                    htmlFor="ConfirmNewPassword"
                    className="label text-[#003E52]"
                  >
                    <span className="label-text">確認新密碼</span>
                  </label>
                  <input
                    id="ConfirmNewPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full border-gray-300 focus:border-[#003E52] focus:ring-[#003E52] text-black"
                  />
                </div>
              </>
            </CSSTransition>

            <CSSTransition
              in={showNewPasswordFields}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <div className="mt-6">
                <button
                  className={`btn btn-neutral btn-block bg-[#003E52] text-white ${
                    isLoading ? "loading" : ""
                  } hover:bg-[#004d63] focus:bg-[#002f42]`}
                  onClick={handleSubmitNewPassword}
                  disabled={isLoading}
                >
                  確認送出
                </button>
              </div>
            </CSSTransition>

            <div className="mt-4 text-center">
              想起密碼了?{" "}
              <a href="login" className="link text-[#003E52]">
                登入
              </a>{" "}
              吧!
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer for toast notifications */}
      <ToastContainer />
      <Footer />
    </>
  );
}
