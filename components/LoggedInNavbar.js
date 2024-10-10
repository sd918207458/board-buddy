import React, { useState, useEffect } from "react";
import { GiHouse, GiThreeFriends, GiShoppingBag, GiTalk } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";
import UploadAvatar from "./personal-info/upload_avatar";
import Image from "next/image"; // 確保引入了 Image 組件

export default function Navbar({
  avatarUrl,
  username,
  onAvatarUpdate,
  cartItems = [], // 購物車項目從父層傳入
  totalItems, // 總商品數量從父層傳入
  // totalPrice, // 小計金額從父層傳入
}) {
  const [cartVisible, setCartVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    avatar: avatarUrl,
    username: username,
  });

  // 購物車START
  const router = useRouter();
  const toggleCart = () => {
    console.log("購物車按鈕被點擊"); // 測試是否觸發了此函數
    console.log(cartItems); // 檢查 cartItems 是否正確傳遞
    setCartVisible((prevState) => !prevState);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/,/g, "")); // 移除價格中的逗號，然後轉換為數字
    if (isNaN(itemPrice)) {
      return total; // 如果價格不是數字，跳過該項
    }
    return total + itemPrice * item.quantity;
  }, 0);

  // 不再從 localStorage 獲取 cartItems，直接使用父層傳遞的值

  // 購物車END

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // 當 `avatarUrl` 或 `username` 變化時，更新頭像和使用者名稱
  useEffect(() => {
    setUserData((prevData) => ({ ...prevData, avatar: avatarUrl, username }));
  }, [avatarUrl, username]);

  // 登出邏輯，清除token，並保留在原本的頁面
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3005/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 確保請求附帶cookie
      });

      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("登出失敗", error);
    }
  };

  // 當上傳頭像時，更新 Navbar 中的頭像
  const handleUploadAvatar = (newAvatarUrl) => {
    setUserData((prevData) => ({ ...prevData, avatar: newAvatarUrl }));
    onAvatarUpdate(newAvatarUrl); // 傳遞新頭像 URL 給父組件 (NavbarSwitcher)
  };

  return (
    <div className="navbar bg-[#003E52] text-white sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" legacyBehavior>
          <a className="btn btn-ghost normal-case text-xl text-white">
            <img src="/logo.jfif" className="w-10 h-10 mr-2" alt="Logo" />
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
          <Link href="/product/product-list" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiShoppingBag className="w-6 h-6" />
              <span>商城</span>
            </a>
          </Link>
          <Link href="/profile-settings/FAQ" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiTalk className="w-6 h-6" />
              <span>常見問題</span>
            </a>
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="avatar"
              className=" w-12 rounded-full avatar flex flex-col items-center"
            >
              {/* 顯示使用者 avatar 和 username */}
              <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2 ">
                <img
                  src={
                    userData.avatar
                      ? `http://localhost:3005/avatar/${userData.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="User Avatar"
                  className="avatar"
                />
                {/* 頭像上傳組件 */}
                <UploadAvatar onUpload={handleUploadAvatar} />
              </div>

              <span>{userData.username || "User"}</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {/* <li>
                <Link href="/profile-settings" legacyBehavior>
                  <a className="btn btn-ghost text-black flex items-center">
                    會員中心
                  </a>
                </Link>
              </li> */}
              <li>
                <Link href="/profile-settings/personal-info" legacyBehavior>
                  <a className="btn btn-ghost text-black flex items-center">
                    個人資料
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/my-orders/order-tracking" legacyBehavior>
                  <a className="btn btn-ghost text-black flex items-center">
                    管理訂單
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-settings/payment-methods" legacyBehavior>
                  <a className="btn btn-ghost text-black flex items-center">
                    我的錢包
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/profile-settings/shipping-address" legacyBehavior>
                  <a className="btn btn-ghost text-black flex items-center">
                    運送地址
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/my-favorites/wishlist" legacyBehavior>
                  <a className="btn btn-ghost text-black flex items-center">
                    我的收藏
                  </a>
                </Link>
              </li>

              <li>
                <a
                  className="btn btn-ghost text-black flex items-center"
                  onClick={handleLogout}
                >
                  登出
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <Link href="/member/login" legacyBehavior>
              <a className="btn m-1">登入</a>
            </Link>
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
                      query: {
                        cart: JSON.stringify(cartItems),
                        total: totalPrice,
                      }, // 傳遞購物車資訊
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
    </div>
  );
}
