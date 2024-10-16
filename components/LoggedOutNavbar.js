import React, { useState, useEffect } from "react";
import {
  GiHouse,
  GiThreeFriends,
  GiShoppingBag,
  GiTalk,
  GiPerson,
} from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

export default function LoggedOutNavbar() {
  const {
    cartItems,
    totalItems,
    isCartVisible,
    setIsCartVisible,
    updateCartItems,
  } = useCart();
  // 購物車START

  // 切換購物車顯示狀態
  const [cartVisible, setCartVisible] = useState(false); // 初始為 false，表示購物車隱藏

  const toggleCart = () => {
    console.log("購物車按鈕被點擊"); // 測試是否觸發了此函數
    console.log(cartItems); // 檢查 cartItems 是否正確傳遞
    setCartVisible((prevState) => !prevState);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      typeof item.price === "string"
        ? parseFloat(item.price.replace(/,/g, ""))
        : parseFloat(item.price); // 如果是數字，直接轉換為數字

    if (isNaN(itemPrice)) {
      return total; // 如果價格不是數字，跳過該項
    }

    return total + itemPrice * item.quantity;
  }, 0);

  // 不再從 localStorage 獲取 cartItems，直接使用父層傳遞的值

  // 購物車END

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 檢查是否已登入，透過localStorage中的 token 判斷
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    router.push("/member/login"); // 登入頁面跳轉
  };

  return (
    <div className="navbar bg-[#003E52] text-white sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" legacyBehavior>
          <a className="btn btn-ghost normal-case text-xl text-white">
            <img
              src="/Board-Buddy-logo.png"
              className="w-10 h-10 mr-2"
              alt="Logo"
            />
          </a>
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" legacyBehavior>
          <a className="btn btn-ghost flex flex-col items-center text-white hover:text-[#EFB880] transition-colors">
  <GiHouse className="w-6 h-6 hover:text-[#EFB880]" />
  <span className="hover:text-[#EFB880]">首頁</span>
</a>

          </Link>
          <Link href="/game-index" legacyBehavior>
          <a className="btn btn-ghost flex flex-col items-center text-white hover:text-[#EFB880] transition-colors">
  <GiThreeFriends className="w-6 h-6 hover:text-[#EFB880]" />
  <span className="hover:text-[#EFB880]">揪團</span>
</a>

          </Link>
          <Link href="/product/product-list" legacyBehavior>
          <a className="btn btn-ghost flex flex-col items-center text-white hover:text-[#EFB880] transition-colors">
  <GiShoppingBag className="w-6 h-6 hover:text-[#EFB880]" />
  <span className="hover:text-[#EFB880]">商城</span>
</a>

          </Link>
          <Link href="/profile-settings/FAQ" legacyBehavior>
          <a className="btn btn-ghost flex flex-col items-center text-white hover:text-[#EFB880] transition-colors">
  <GiTalk className="w-6 h-6 hover:text-[#EFB880]" />
  <span className="hover:text-[#EFB880]">常見問題</span>
</a>

          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <button className="btn m-1" onClick={handleLogin}>
              登入
            </button>
          </>
        ) : (
          // 這裡可以放已登入的導航項目或其他元素
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <GiPerson className="w-6 h-6" />
              <span className="ml-2">User</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile-settings" legacyBehavior>
                  <a className="btn btn-ghost text-black">會員中心</a>
                </Link>
              </li>
              <li>
                <Link href="/my-orders/order-tracking" legacyBehavior>
                  <a className="btn btn-ghost text-black">管理訂單</a>
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* /////////////購物車//////////// */}
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
                {totalItems}
                {/* 直接使用父層傳下來的 totalItems */}
                {/* {product.quantity} 顯示從資料庫中獲取的數量 */}
              </span>
            </div>
          </div>

          {/* 購物車內容顯示 */}
          {cartVisible && (
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                {/* 顯示每個購物車商品 */}
                {cartItems && cartItems.length > 0 ? (
                  cartItems.map((product) => (
                    <div
                      key={product.product_id}
                      className="flex items-center space-x-4"
                    >
                      {/* 圖片 */}
                      <Image
                        src={product.image}
                        width={50}
                        height={50}
                        alt={product.product_name}
                        className="rounded-lg"
                      />
                      {/* 商品名稱和數量 */}
                      <div>
                        <span className="block text-lg text-black font-bold">
                          {product.product_name}
                        </span>
                        <span className="block text-lg text-black">
                          數量: {product.quantity}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-black">購物車是空的</p>
                )}

                {/* 小計 */}
                {cartItems && cartItems.length > 0 && (
                  <span className="block mt-4 text-black">
                    小計: ${totalPrice}
                  </span>
                )}

                {/* 查看購物車按鈕 */}
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary bg-[#003E52] btn-block hover:bg-black"
                    onClick={() => {
                      router.push({
                        pathname: "/checkout",
                      });
                    }}
                  >
                    查看購物車
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
              <span className="badge badge-sm indicator-item">5</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary bg-[#003E52] btn-block">
                  查看購物車
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
