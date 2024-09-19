import React from "react";
import {
  GiHouse,
  GiThreeFriends,
  GiShoppingBag,
  GiTalk,
  GiCat,
  GiPerson,
} from "react-icons/gi";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-[#003E52] text-white">
      {/* 左側 LOGO 與導航按鈕 */}
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl text-white">
          <img
            src="https://your-logo-url-here.com"
            className="w-10 h-10 mr-2"
          />
        </Link>
        <nav className="flex space-x-6">
          <Link
            href="/"
            className="btn btn-ghost text-white flex flex-col items-center"
          >
            <GiHouse className="w-6 h-6" />
            <span>首頁</span>
          </Link>
          <Link
            href="/group"
            className="btn btn-ghost text-white flex flex-col items-center"
          >
            <GiThreeFriends className="w-6 h-6" />
            <span>揪團</span>
          </Link>
          <Link
            href="/shop"
            className="btn btn-ghost text-white flex flex-col items-center"
          >
            <GiShoppingBag className="w-6 h-6" />
            <span>商城</span>
          </Link>
          <Link
            href="/forum"
            className="btn btn-ghost text-white flex flex-col items-center"
          >
            <GiTalk className="w-6 h-6" />
            <span>討論區</span>
          </Link>
          {/* <Link
            href="/quiz"
            className="btn btn-ghost text-white flex flex-col items-center"
          >
            <GiCat className="w-6 h-6" />
            <span>測驗</span>
          </Link> */}
        </nav>
      </div>

      {/* 右側登入與購物車按鈕 */}
      <div className="flex items-center space-x-4">
        <Link
          href="/member/login"
          className="btn btn-ghost text-white flex items-center"
        >
          <GiPerson className="w-6 h-6" />

          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Login
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link
                  href="/profile-settings"
                  className="btn btn-ghost text-black flex items-center"
                >
                  會員中心
                </Link>
              </li>
              <li>
                <Link
                  href="/member/login"
                  className="btn btn-ghost text-black flex items-center"
                >
                  管理訂單
                </Link>
              </li>
            </ul>
          </div>
        </Link>
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
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
