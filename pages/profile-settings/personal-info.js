import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";

// 動態加載 DatePicker1 來避免 SSR 問題
const DatePicker1 = dynamic(() => import("@/components/datepicker"), {
  ssr: false,
});

export default function PersonalInfo() {
  const [gender, setGender] = useState("");
  const [gameType, setGameType] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // 使用 useEffect 確保只在客戶端渲染
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 在服務端渲染階段不渲染任何內容
  }

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
              個人資料設定
            </h2>

            <form>
              {/* Upload avatar */}
              <div className="form-control my-4 items-center">
                <label className="label text-gray-700 dark:text-gray-300">
                  上傳頭像
                </label>
                <div className="flex items-center space-x-4">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-[#036672] ring-offset-base-100 ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <label htmlFor="file" className="flex items-center">
                    <input type="file" id="file" className="hidden" />
                    <button className="btn btn-outline btn-neutral bg-[#036672] border-none text-white hover:bg-[#024c52]">
                      上傳 & 移除
                    </button>
                  </label>
                </div>
              </div>

              {/* User information input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="form-control">
                  <label
                    htmlFor="username"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">使用者名稱</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                  />
                </div>

                <div className="form-control">
                  <label
                    htmlFor="phone"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">手機號碼</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                  />
                </div>

                <div className="form-control">
                  <label
                    htmlFor="emailAddress"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">電子信箱</span>
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                  />
                </div>

                <div className="form-control">
                  <label
                    htmlFor="password"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">密碼</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                  />
                </div>

                <div className="form-control">
                  <label
                    htmlFor="first_name"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">姓氏</span>
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                  />
                </div>

                <div className="form-control">
                  <label
                    htmlFor="last_name"
                    className="label text-gray-700 dark:text-gray-300"
                  >
                    <span className="label-text">名字</span>
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                  />
                </div>

                {/* Date Picker */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">生日</span>
                  </label>
                  <DatePicker1 />
                </div>

                {/* Gender selection */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">性別</span>
                  </label>
                  <select
                    className="select select-bordered border-[#036672] focus:border-[#024c52] w-full mt-4"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option disabled value="">
                      請選擇
                    </option>
                    <option>男</option>
                    <option>女</option>
                    <option>其他</option>
                  </select>
                </div>
                {/* Game Type Selection */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">喜歡的遊戲類型</span>
                  </label>
                  <select
                    className="select select-bordered border-[#036672] focus:border-[#024c52] w-full"
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                  >
                    <option disabled value="">
                      請選擇
                    </option>
                    <option value="party">派對遊戲</option>
                    <option value="strategy">策略遊戲</option>
                    <option value="role_playing">角色扮演遊戲</option>
                  </select>
                </div>

                {/* Play Time Selection */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">常玩時段</span>
                  </label>
                  <select
                    className="select select-bordered border-[#036672] focus:border-[#024c52] w-full"
                    value={playTime}
                    onChange={(e) => setPlayTime(e.target.value)}
                  >
                    <option disabled value="">
                      請選擇
                    </option>
                    <option value="morning">上午10:00-12:00</option>
                    <option value="evening">晚上8:00-10:00</option>
                  </select>
                </div>
              </div>

              {/* Save Changes Button */}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full bg-[#036672] hover:bg-[#024c52] border-none">
                  保存修改
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
