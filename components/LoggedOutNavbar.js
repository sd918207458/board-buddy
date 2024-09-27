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

export default function LoggedOutNavbar() {
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
          <Link href="/shop" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiShoppingBag className="w-6 h-6" />
              <span>商城</span>
            </a>
          </Link>
          {/* <Link href="/forum" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiTalk className="w-6 h-6" />
              <span>討論區</span>
            </a>
          </Link> */}
          <Link href="/profile-settings/FAQ" legacyBehavior>
            <a className="btn btn-ghost text-white flex flex-col items-center">
              <GiTalk className="w-6 h-6" />
              <span>常見問題</span>
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
