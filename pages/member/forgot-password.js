import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ForgotPassword() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="card  max-w-sm lg:max-w-4xl bg-base-100 shadow-xl">
  
          <div className="card-body w-full  px-6 py-8">
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
              <input
                id="LoggingEmailAddress"
                type="email"
                placeholder="example@example.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* 驗證碼欄位 */}
            <div className="form-control mt-4">
              <label htmlFor="VerificationCode" className="label">
                <span className="label-text">驗證碼</span>
              </label>
              <div className="flex items-center gap-3">
                <button className="btn btn-neutral w-1/4">取得驗證碼</button>
                <input
                  id="VerificationCode"
                  type="text"
                  placeholder="驗證碼"
                  className="input input-bordered w-1/2"
                />
              </div>
            </div>

            {/* 新密碼輸入欄 */}
            <div className="form-control mt-4">
              <label htmlFor="NewPassword" className="label">
                <span className="label-text">新密碼</span>
              </label>
              <input
                id="NewPassword"
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
              />
            </div>

            {/* 提交按鈕 */}
            <div className="mt-6">
              <button className="btn btn-primary btn-block">
                確認送出
              </button>
            </div>

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
