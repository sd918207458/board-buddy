import React, { useState, useEffect } from "react";
import { GiHouse, GiThreeFriends, GiShoppingBag, GiTalk } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [product, setProduct] = useState(null); // 存儲產品資料

  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  // 模擬 API 請求獲取產品資料
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/productsGame/1"
        ); // 替換為實際API
        const data = await response.json();
        setProduct(data); // 將數據存儲到狀態中
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, []);

  if (!product) {
    return <p>Loading...</p>; // 加載中顯示
  }

  return (
    <div className="navbar bg-[#003E52] text-white sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" legacyBehavior>
          <a className="btn btn-ghost normal-case text-xl text-white">
            <img
              src="https://your-logo-url-here.com"
              className="w-10 h-10 mr-2"
              alt="Logo"
            />
          </a>
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiHouse className="w-6 h-6" />
              <span>首頁</span>
            </a>
          </Link>
          <Link href="/group" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiThreeFriends className="w-6 h-6" />
              <span>揪團</span>
            </a>
          </Link>
          <Link href="/shop" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiShoppingBag className="w-6 h-6" />
              <span>商城</span>
            </a>
          </Link>
          <Link href="/forum" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiTalk className="w-6 h-6" />
              <span>討論區</span>
            </a>
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Login
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <Link href="/profile-settings" legacyBehavior>
                <a className="btn btn-ghost text-black flex items-center">
                  會員中心
                </a>
              </Link>
            </li>
            <li>
              <Link href="/member/login" legacyBehavior>
                <a className="btn btn-ghost text-black flex items-center">
                  管理訂單
                </a>
              </Link>
            </li>
            <li>
              <Link href="/member/login" legacyBehavior>
                <a className="btn btn-ghost text-black flex items-center">
                  登出
                </a>
              </Link>
            </li>
          </ul>
        </div>

        {/* 購物車 icon*/}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleCart} // 加上事件處理器
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {product.quantity} {/* 顯示從資料庫中獲取的數量 */}
              </span>
            </div>
          </div>

          {isCartVisible && (
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <div className="flex items-center space-x-4">
                  {/* 圖片 */}
                  <Image
                    src={product.image} // 從API獲取的圖片
                    width={50}
                    height={50}
                    alt={product.product_name} // 顯示產品名稱
                    className="rounded-lg"
                  />
                  {/* 商品名稱和數量 */}
                  <div>
                    <span className="block text-lg text-black font-bold">
                      {product.product_name} {/* 從資料庫中獲取產品名稱 */}
                    </span>
                    <span className="block text-lg text-black">
                      數量: {product.quantity} {/* 顯示產品數量 */}
                    </span>
                  </div>
                </div>

                {/* 小計 */}
                <span className="block mt-4 text-violet-600">
                  小計: ${product.price * product.quantity} {/* 顯示小計 */}
                </span>

                {/* 按鈕 */}
                <div className="card-actions mt-4">
                  <button className="btn btn-primary bg-[#003E52] btn-block hover:bg-violet-600">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
