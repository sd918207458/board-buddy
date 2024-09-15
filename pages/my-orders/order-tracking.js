import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import UserTable from "@/components/table";
import users from "./../../public/user_table";
import users_1 from "./../../public/users_1";

export default function OrderTracking() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className=" w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl ">
          <div className="w-full max-w-sm mx-auto lg:max-w-4xl mb-4 ">
            <Breadcrumbs />
          </div>
          <section className="max-w-4xl p-6 mx-auto bg-white rounded-md dark:bg-gray-800 ">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              我的訂單
            </h2>
          </section>
          <div role="tablist" className="tabs tabs-bordered ">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="全部訂單"
            />
            <div role="tabpanel" className="tab-content p-10  ">
              <UserTable users={users} />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="尚未出貨"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content p-10">
              <UserTable users={users_1} />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="歷史訂單"
            />
            <div role="tabpanel" className="tab-content p-10">
              <UserTable users={users} />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="取消訂單"
            />
          </div>

          <div role="tabpanel" className="tab-content p-10 detail">
            <UserTable users={users_1} />
          </div>

          <div className="join items-center w-full justify-center">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 1</button>
            <button className="join-item btn">Page 2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">Page 99</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
