import React, { useState, useEffect } from "react";
import { GiHouse, GiThreeFriends, GiShoppingBag, GiTalk } from "react-icons/gi";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ avatar: "", username: "" }); // 用來儲存使用者資料
  const router = useRouter();

  useEffect(() => {
    // 檢查是否已登入，透過localStorage中的 token 判斷
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      // 發送請求到後端以獲取當前使用者資料
      fetch("http://localhost:3005/api/auth/check", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success" && data.data.user) {
            setUserData({
              avatar: data.data.user.avatar,
              username: data.data.user.username,
            });
          }
        })
        .catch((error) => {
          console.error("獲取使用者資料失敗", error);
        });
    }
  }, []);

  // 登出邏輯，清除token，並保留在原本的頁面
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
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
  const handleUploadAvatar = (avatarUrl) => {
    setUserData((prevData) => ({ ...prevData, avatar: avatarUrl }));
  };

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
                    `${userData.avatar}?t=${new Date().getTime()}` ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>

              <span>{userData.username || "User"}</span>
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

        <div className="dropdown dropdown-end">
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
              <span className="badge badge-sm indicator-item">8</span>
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
        </div>
      </div>
    </div>
  );
}
