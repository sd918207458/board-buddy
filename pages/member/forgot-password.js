import React, { useState } from "react";
import Footer from "@/components/footer";
import { CSSTransition } from "react-transition-group";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

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

export default function ForgotPassword() {
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("請輸入有效的電子信箱");
      return;
    }
    setErrorMessage("");
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
        setErrorMessage(""); // 清空錯誤信息
      } else {
        setErrorMessage(result.message || "無法發送驗證碼，請重試。");
      }
    } catch (error) {
      setErrorMessage("伺服器錯誤，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitVerificationCode = () => {
    if (!validateVerificationCode()) {
      setErrorMessage("請輸入有效的6位數驗證碼");
      return;
    }
    setErrorMessage("");
    setShowNewPasswordFields(true);
  };

  const handleSubmitNewPassword = async () => {
    const passwordError = validatePasswords();
    if (passwordError) {
      setErrorMessage(passwordError);
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
        alert("密碼重置成功！");
        setEmail("");
        setVerificationCode("");
        setNewPassword("");
        setConfirmPassword("");
        setShowNewPasswordFields(false);
      } else {
        console.error("重置密碼失敗:", result);
        setErrorMessage(result.message || "重置密碼失敗，請重試！");
      }
    } catch (error) {
      console.error("伺服器錯誤:", error);
      setErrorMessage(`${error.message || "伺服器錯誤"} - 請稍後再試。`);
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
                src="https://merakiui.com/images/logo.svg"
                alt="Logo"
              />
            </div>

            <h2 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-200 mt-4">
              忘記密碼
            </h2>

            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}

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
                className={`btn btn-neutral bg-[#003E52] ${
                  isLoading ? "loading" : ""
                }`}
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
                <label htmlFor="VerificationCode" className="label">
                  <span className="label-text">驗證碼</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="VerificationCode"
                    type="text"
                    placeholder="6位數驗證碼"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="input input-bordered w-1/2"
                  />
                  <button
                    className="btn btn-neutral w-1/4"
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
                  <label htmlFor="NewPassword" className="label">
                    <span className="label-text">新密碼</span>
                  </label>
                  <div className="relative">
                    <input
                      id="NewPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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

                <div className="form-control mt-4">
                  <label htmlFor="ConfirmNewPassword" className="label">
                    <span className="label-text">確認新密碼</span>
                  </label>
                  <input
                    id="ConfirmNewPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input input-bordered w-full"
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
                  className={`btn btn-neutral btn-block bg-[#003E52] ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={handleSubmitNewPassword}
                  disabled={isLoading}
                >
                  確認送出
                </button>
              </div>
            </CSSTransition>

            <div className="mt-4 text-center">
              想起密碼了?{" "}
              <a href="login" className="link">
                登入
              </a>{" "}
              吧!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
