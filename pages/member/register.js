import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#003E52]">
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
              註冊
            </h2>

            {/* 電子信箱輸入欄 */}
            <div className="form-control mt-4">
              <label htmlFor="email" className="label">
                <span className="label-text">電子信箱</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@example.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* 密碼欄位 */}
            <div className="form-control mt-4">
              <label htmlFor="password" className="label">
                <span className="label-text">密碼</span>
              </label>
              <input
                id="password"
                type="text"
                placeholder="********"
                className="input input-bordered w-full"
              />
            </div>

            {/* 確認密碼欄位 */}
            <div className="form-control mt-4">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text">確認密碼</span>
              </label>
              <input
                id="confirmPassword"
                type="text"
                placeholder="********"
                className="input input-bordered w-full"
              />
            </div>

            {/* 條款與隱私政策 */}
            <div className="form-control mt-4">
              <label className="cursor-pointer label">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="label-text ml-2">
                  一旦創建賬戶，即意味著您同意我們的條款和隱私政策。
                </span>
              </label>
            </div>

            {/* 註冊按鈕 */}
            <div className="mt-6">
              <button className="btn  w-full  btn-neutral btn-block bg-[#003E52]">
                註冊
              </button>
            </div>

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
