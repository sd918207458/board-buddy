import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PaymentMethods() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className=" w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="w-full max-w-sm mx-auto lg:max-w-4xl mb-4">
            <Breadcrumbs />
          </div>
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800 ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white ">
              我的錢包
            </h2>
          </section>
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800 ">
            <h3 className="text-l font-semibold text-gray-700 capitalize dark:text-white ">
              常用錢包
            </h3>
          </section>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">付款方式</h2>
              <p> 卡號:0000 0000 0000 0000</p>
              <div className="flex items-center justify-center">
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    編輯
                  </button>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">刪除</button>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">新增錢包</h2>
            </div>
          </div>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}

          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">編輯錢包</h3>

              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {/* 付款人姓名 */}
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    <span className="label-text">付款人姓名</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="請輸入姓名"
                    className="input input-bordered w-full"
                  />
                </div>
                {/* 佔位 */}
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    <span className="label-text"></span>
                  </label>
                </div>

                {/* 信用卡卡號 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">信用卡卡號</span>
                  </label>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-4">
                    <input
                      id="username"
                      type="text"
                      placeholder="0000"
                      className="input input-bordered w-full"
                    />
                    <input
                      id="username"
                      type="text"
                      placeholder="0000"
                      className="input input-bordered w-full"
                    />
                    <input
                      id="username"
                      type="text"
                      placeholder="0000"
                      className="input input-bordered w-full"
                    />
                    <input
                      id="username"
                      type="text"
                      placeholder="0000"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* 到期日及驗證碼 */}
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <label className="label">
                      <span className="label-text">到期日</span>
                    </label>
                    <input
                      type="text"
                      placeholder="MM/DD"
                      className="input input-bordered w-full mt-2"
                    />
                    <label className="label">
                      <span className="label-text">驗證碼</span>
                    </label>
                    <input
                      type="text"
                      placeholder="000"
                      className="input input-bordered w-full mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* 預設地址選擇 */}
              <div className="flex  mt-4">
                <label className="label cursor-pointer">
                  <input type="checkbox" className="checkbox" />
                  <span className="label-text ml-2">將此設為我的預設地址</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">新增錢包</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <Footer />
    </>
  );
}
