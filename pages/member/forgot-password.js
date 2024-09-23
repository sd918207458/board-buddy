import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const [showVerificationCode, setShowVerificationCode] = useState(false); // 控制驗證碼欄位顯示
  const [showNewPasswordFields, setShowNewPasswordFields] = useState(false); // 控制新密碼和確認新密碼欄位顯示

  // 點擊「取得驗證碼」按鈕時觸發
  const handleGetVerificationCode = () => {
    setShowVerificationCode(true);
  };

  // 點擊「送出驗證碼」按鈕時觸發
  const handleSubmitVerificationCode = () => {
    setShowNewPasswordFields(true);
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
              忘記密碼
            </h2>

            {/* 電子信箱輸入欄 */}
            <div className="form-control mt-4">
              <label htmlFor="LoggingEmailAddress" className="label">
                <span className="label-text">電子信箱</span>
              </label>
              <div className="flex items-center">
                <input
                  id="LoggingEmailAddress"
                  type="email"
                  placeholder="example@example.com"
                  className="input input-bordered w-full"
                />
                <button
                  className="btn btn-neutral ml-2 bg-[#003E52]"
                  onClick={handleGetVerificationCode}
                >
                  取得驗證碼
                </button>
              </div>
            </div>

            {/* AnimatePresence 讓驗證碼欄位帶有動畫效果 */}
            <AnimatePresence>
              {showVerificationCode && (
                <motion.div
                  key="verification-code"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="form-control mt-4"
                >
                  <label htmlFor="VerificationCode" className="label">
                    <span className="label-text">驗證碼</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id="VerificationCode"
                      type="text"
                      placeholder="驗證碼"
                      className="input input-bordered w-1/2"
                    />
                    <button
                      className="btn btn-neutral w-1/4"
                      onClick={handleSubmitVerificationCode}
                    >
                      送出驗證碼
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AnimatePresence 讓新密碼和確認新密碼欄位帶有動畫效果 */}
            <AnimatePresence>
              {showNewPasswordFields && (
                <>
                  <motion.div
                    key="new-password"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="form-control mt-4"
                  >
                    <label htmlFor="NewPassword" className="label">
                      <span className="label-text">新密碼</span>
                    </label>
                    <input
                      id="NewPassword"
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                    />
                  </motion.div>

                  <motion.div
                    key="confirm-password"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="form-control mt-4"
                  >
                    <label htmlFor="ConfirmNewPassword" className="label">
                      <span className="label-text">確認新密碼</span>
                    </label>
                    <input
                      id="ConfirmNewPassword"
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* 提交按鈕 */}
            <AnimatePresence>
              {showNewPasswordFields && (
                <motion.div
                  key="submit-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6"
                >
                  <button className="btn btn-neutral btn-block bg-[#003E52]">確認送出</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 已記得密碼提示 */}
            <div className="mt-4 text-center">
              想起密碼了?{" "}
              <a href="login" className="link">
                登入
              </a>
              吧!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
