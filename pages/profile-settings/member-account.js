import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function MemberAccount() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className=" w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="relative flex flex-col items-center justify-center min-h-screen bg-white-100 dark:bg-gray-900">
            {/* Breadcrumbs 放置在卡片上方 */}
            <div className="w-full max-w-sm mx-auto lg:max-w-4xl mb-4 absolute left-0 top-0">
              <Breadcrumbs />
            </div>

            {/* 卡片開始，使用 grid 佈局來排列兩個卡片 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">個人資料</h2>
                  <p>編輯登入、姓名和行動電話等資料。</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">個人資料</h2>
                  <p>編輯登入、姓名和行動電話等資料。</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
