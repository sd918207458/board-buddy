import React from "react";
import Image from "next/image";

const Carttoggle = () => {
  return (
    <>
      <div>
        <section className="h-auto bg-transparent py-4 sm:py-6 lg:py-8">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <h1 className="text-lg font-semibold text-white">Cart Summary</h1>
            </div>
            <div className="mx-auto mt-4 max-w-sm">
              <div className="bg-transparent shadow">
                <div className="px-4 py-4 sm:px-6 sm:py-6">
                  <div className="flow-root">
                    <ul className="-my-4">
                      <li className="flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-4 sm:space-y-0">
                        <div className="shrink-0"></div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="pr-2">
                            <p className="text-sm font-semibold text-white">
                              Nike Air Max 2019
                            </p>
                            <p className="text-xs text-gray-400">36EU - 4US</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 border-t py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-lg font-semibold text-white">
                        $259.00
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Checkout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-4 ml-2 h-4 w-4 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* 破版版本 END */}

      {/* 購物車 */}
      <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 overflow-y-auto shadow-lg ">
        <section className="h-auto bg-transparent py-4 sm:py-6 lg:py-8">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <h1 className="text-lg font-semibold text-white">我的購物車</h1>
            </div>
            {/* 商品 */}
            <div className="mx-auto mt-4 max-w-sm">
              <div className="bg-transparent shadow">
                <div className="px-4 py-4 sm:px-6 sm:py-6">
                  {/* 商品名稱，價錢，數量 */}
                  <div className="flow-root">
                    <ul className="-my-4">
                      <li className="flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-4 sm:space-y-0">
                        <div className="shrink-0">
                          <Image
                            className="h-12 w-12 max-w-full rounded-lg object-cover"
                            src="https://i.postimg.cc/MGFg5m5k/4.png"
                            width={500}
                            height={500}
                            alt="暗影迷途"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="pr-2">
                            <p className="text-sm font-semibold text-white">
                              暗影迷途
                            </p>
                            {/* <p className="text-xs text-gray-400">36EU - 4US</p> */}
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-base font-semibold text-white">
                              $259.00
                            </p>
                            <div className="flex h-6 items-stretch text-gray-600">
                              {/* <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-2 transition hover:bg-black hover:text-white">
                                -
                              </button> */}
                              <div className="flex w-full items-center justify-center text-gray-100 px-2 text-xs uppercase transition">
                                1
                              </div>
                              {/* <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-2 transition hover:bg-black hover:text-white">
                                +
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 border-t py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="text-lg font-semibold text-white">
                        $259.00
                      </p>
                    </div>
                  </div>

                  {/* 結帳按鈕 */}
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      結帳
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-4 ml-2 h-4 w-4 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Carttoggle;
