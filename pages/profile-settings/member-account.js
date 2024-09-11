import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

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

            <div className="flex justify-center mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 個人資料卡片 */}
        <Link href="./personal-info" passHref> {/* 使用 Link 組件包裹卡片 */}
          <div className="card bg-blue-500 text-white shadow-xl w-full md:w-80 lg:w-96 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img src="https://placekitten.com/200/200" alt="Avatar" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title text-lg">個人資料</h2>
                <p className="text-sm">編輯登入、姓名和行動電話等資料</p>
              </div>
            </div>
          </div>
        </Link>

        {/* 我的訂單卡片 */}
        <Link href="./../my-orders/order-tracking" passHref> {/* 使用 Link 組件包裹卡片 */}
          <div className="card bg-blue-500 text-white shadow-xl w-full md:w-80 lg:w-96 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img src="https://placekitten.com/200/200" alt="Avatar" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title text-lg">我的訂單</h2>
                <p className="text-sm">追蹤、退換貨、取消訂單和再次購買</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 我的付款卡片 */}
        <Link href="./payment-methods" passHref> {/* 使用 Link 組件包裹卡片 */}
          <div className="card bg-blue-500 text-white shadow-xl w-full md:w-80 lg:w-96 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img src="https://placekitten.com/200/200" alt="Avatar" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title text-lg">我的付款</h2>
                <p className="text-sm">查看所有交易、管理付款方式和設定</p>
              </div>
            </div>
          </div>
        </Link>

        {/* 我的地址卡片 */}
        <Link href="./shipping-address" passHref> {/* 使用 Link 組件包裹卡片 */}
          <div className="card bg-blue-500 text-white shadow-xl w-full md:w-80 lg:w-96 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img src="https://placekitten.com/200/200" alt="Avatar" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title text-lg">我的地址</h2>
                <p className="text-sm">編輯、移除或設定預設地址</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
    <div className="flex justify-center mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 我的收藏卡片 */}
        <Link href="./../my-favorites/wishlist" passHref> {/* 使用 Link 組件包裹卡片 */}
          <div className="card bg-blue-500 text-white shadow-xl w-full md:w-80 lg:w-96 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img src="https://placekitten.com/200/200" alt="Avatar" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title text-lg">我的收藏</h2>
                <p className="text-sm">檢視及管理已收藏的商品或店家</p>
              </div>
            </div>
          </div>
        </Link>

                {/* 常見問題卡片 */}
                <Link href="./FAQ" passHref> {/* 使用 Link 組件包裹卡片 */}
          <div className="card bg-blue-500 text-white shadow-xl w-full md:w-80 lg:w-96 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-white ring-offset-base-100 ring-offset-2">
                  <img src="https://placekitten.com/200/200" alt="Avatar" />
                </div>
              </div>
              <div className="ml-4">
                <h2 className="card-title text-lg">常見問題</h2>
                <p className="text-sm">幫助用戶快速解決常見問題</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
