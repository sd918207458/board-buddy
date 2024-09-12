import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatePicker1 from "@/components/datepicker";

export default function PersonalInfo() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className=" w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="w-full max-w-sm mx-auto lg:max-w-4xl mb-4">
            <Breadcrumbs />
          </div>
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white ">
              個人資料設定
            </h2>
            <form>
              <>
                <label classname="mb-[10px] block text-base font-medium text-dark dark:text-white">
                  上傳頭像
                </label>
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div classname="relative">
                  <label
                    htmlfor="file"
                    classname="flex min-h-[175px] w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-primary p-6"
                  >
                    <div>
                      <input
                        type="file"
                        name="file"
                        id="file"
                        classname="sr-only"
                      />
                      <span classname="mx-auto mb-3 flex h-[50px] w-[50px] items-center justify-center rounded-full border border-stroke dark:border-dark-3 bg-white dark:bg-dark-2">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillrule="evenodd"
                            cliprule="evenodd"
                            d="M2.5013 11.666C2.96154 11.666 3.33464 12.0391 3.33464 12.4993V15.8327C3.33464 16.0537 3.42243 16.2657 3.57871 16.4219C3.73499 16.5782 3.94695 16.666 4.16797 16.666H15.8346C16.0556 16.666 16.2676 16.5782 16.4239 16.4219C16.5802 16.2657 16.668 16.0537 16.668 15.8327V12.4993C16.668 12.0391 17.0411 11.666 17.5013 11.666C17.9615 11.666 18.3346 12.0391 18.3346 12.4993V15.8327C18.3346 16.4957 18.0712 17.1316 17.6024 17.6004C17.1336 18.0693 16.4977 18.3327 15.8346 18.3327H4.16797C3.50493 18.3327 2.86904 18.0693 2.4002 17.6004C1.93136 17.1316 1.66797 16.4957 1.66797 15.8327V12.4993C1.66797 12.0391 2.04106 11.666 2.5013 11.666Z"
                            fill="#3056D3"
                          />
                          <path
                            fillrule="evenodd"
                            cliprule="evenodd"
                            d="M9.41074 1.91009C9.73618 1.58466 10.2638 1.58466 10.5893 1.91009L14.7559 6.07676C15.0814 6.4022 15.0814 6.92984 14.7559 7.25527C14.4305 7.58071 13.9028 7.58071 13.5774 7.25527L10 3.67786L6.42259 7.25527C6.09715 7.58071 5.56951 7.58071 5.24408 7.25527C4.91864 6.92984 4.91864 6.4022 5.24408 6.07676L9.41074 1.91009Z"
                            fill="#3056D3"
                          />
                          <path
                            fillrule="evenodd"
                            cliprule="evenodd"
                            d="M10.0013 1.66602C10.4615 1.66602 10.8346 2.03911 10.8346 2.49935V12.4994C10.8346 12.9596 10.4615 13.3327 10.0013 13.3327C9.54106 13.3327 9.16797 12.9596 9.16797 12.4994V2.49935C9.16797 2.03911 9.54106 1.66602 10.0013 1.66602Z"
                            fill="#3056D3"
                          />
                        </svg>
                      </span>
                      <span classname="text-base text-body-color dark:text-dark-6">
                        上傳 &amp; 移除
                        <span classname="text-primary underline"> 頭像 </span>
                      </span>
                    </div>
                  </label>
                </div>
              </>

              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="username"
                  >
                    使用者名稱
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="phone"
                  >
                    手機號碼
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="emailAddress"
                  >
                    電子信箱
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="password"
                  >
                    密碼
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="first_name"
                  >
                    姓氏
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>{" "}
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="last_name"
                  >
                    名字
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="last_name"
                  >
                    生日
                  </label>
                  <DatePicker1 />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="last_name"
                  >
                    性別
                  </label>
                  <div className="block py-2 mt-2">
                    <div className="dropdown ">
                      <div tabIndex={0} role="button" className="btn m-1">
                        請選擇
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <a>男</a>
                        </li>
                        <li>
                          <a>女</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="last_name"
                  >
                    喜歡的遊戲類型
                  </label>
                  <div className="block py-2 mt-2">
                    <div className="dropdown ">
                      <div tabIndex={0} role="button" className="btn m-1">
                        請選擇
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <a>派對遊戲</a>
                        </li>
                        <li>
                          <a>策略遊戲</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="last_name"
                  >
                    常玩時段
                  </label>
                  <div className="block py-2 mt-2">
                    <div className="dropdown ">
                      <div tabIndex={0} role="button" className="btn m-1">
                        請選擇
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                      >
                        <li>
                          <a>上午10:00-12:00</a>
                        </li>
                        <li>
                          <a>下午8:00-10:00</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
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
