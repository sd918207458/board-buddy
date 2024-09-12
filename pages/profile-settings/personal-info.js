import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatePicker1 from "@/components/datepicker";

export default function PersonalInfo() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="card w-full max-w-lg mx-auto overflow-hidden bg-base-100 shadow-lg lg:max-w-4xl">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>

          <section className="p-6">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
              個人資料設定
            </h2>

            <form>
              {/* 上傳頭像 */}
              <div className="form-control my-4 items-center">
                <label className="label">上傳頭像</label>
                <div className="flex items-center space-x-4">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <label htmlFor="file" className="flex items-center">
                    <input type="file" id="file" className="hidden" />
                    <button className="btn btn-outline btn-primary">
                      上傳 & 移除
                    </button>
                  </label>
                </div>
              </div>

              {/* 使用者資料輸入 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-control">
                  <label htmlFor="username" className="label">
                    <span className="label-text">使用者名稱</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="phone" className="label">
                    <span className="label-text">手機號碼</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="emailAddress" className="label">
                    <span className="label-text">電子信箱</span>
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text">密碼</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="first_name" className="label">
                    <span className="label-text">姓氏</span>
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="last_name" className="label">
                    <span className="label-text">名字</span>
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    className="input input-bordered"
                  />
                </div>

                {/* 生日選擇器 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">生日</span>
                  </label>
                  <DatePicker1 />
                </div>

                {/* 性別選擇 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">性別</span>
                  </label>
                  <select className="select select-bordered w-full mt-4">
                    <option disabled selected>
                      請選擇
                    </option>
                    <option>男</option>
                    <option>女</option>
                    <option>其他</option>
                  </select>
                </div>

                {/* 喜歡的遊戲類型 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">喜歡的遊戲類型</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>
                      請選擇
                    </option>
                    <option>派對遊戲</option>
                    <option>策略遊戲</option>
                  </select>
                </div>

                {/* 常玩時段 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">常玩時段</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option disabled selected>
                      請選擇
                    </option>
                    <option>上午10:00-12:00</option>
                    <option>下午8:00-10:00</option>
                  </select>
                </div>
              </div>

              {/* 保存修改按鈕 */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">保存修改</button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
