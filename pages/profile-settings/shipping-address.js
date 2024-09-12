import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ShippingAddress() {
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
              我的地址
            </h2>
          </section>
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800 ">
            <h3 className="text-l font-semibold text-gray-700 capitalize dark:text-white ">
              常用地址
            </h3>
          </section>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">收貨人姓名</h2>
              <p> 801高雄市前金區中正四路211號</p>
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
              <h2 className="card-title">新增地址</h2>
            </div>
          </div>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}

          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">編輯地址</h3>

              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {/* 收貨人姓名 */}
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    <span className="label-text">收貨人姓名</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="請輸入姓名"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* 收貨人手機 */}
                <div className="form-control">
                  <label className="label" htmlFor="phone">
                    <span className="label-text">收貨人手機</span>
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="請輸入手機號碼"
                    className="input input-bordered w-full"
                  />
                </div>

                {/* 收貨地址 */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">收貨地址</span>
                  </label>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    {/* 城市選擇 */}
                    <div className="dropdown">
                      <label tabIndex={0} className="btn m-1">
                        請選擇城市
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a>台北市</a>
                        </li>
                        <li>
                          <a>新北市</a>
                        </li>
                      </ul>
                    </div>

                    {/* 區域選擇 */}
                    <div className="dropdown mt-2">
                      <label tabIndex={0} className="btn m-1">
                        請選擇區域
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a>士林區</a>
                        </li>
                        <li>
                          <a>大安區</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 街道輸入 */}
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <input
                      type="text"
                      placeholder="請輸入街道"
                      className="input input-bordered w-full mt-2"
                    />
                    <input
                      type="text"
                      placeholder="請輸入詳細地址"
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
                  <button className="btn">Close</button>
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
