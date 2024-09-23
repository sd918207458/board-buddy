import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer
      className="footer p-10 bg-neutral text-neutral-content justify-center"
      style={{ backgroundColor: "#003E52" }}
    >
      <div className="flex flex-col items-center  space-y-4">
        <div className="flex space-x-4">
          {/* 社交圖標 */}
          <a href="#" aria-label="Instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-pink-500"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.31.975.975 1.248 2.243 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.31 3.608-.975.975-2.243 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.31-.975-.975-1.248-2.243-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.336-2.633 1.31-3.608.975-.975 2.243-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.013-4.947.072-1.514.07-2.964.412-4.053 1.502-1.089 1.089-1.431 2.539-1.502 4.053-.059 1.28-.072 1.688-.072 4.947s.013 3.667.072 4.947c.07 1.514.412 2.964 1.502 4.053 1.089 1.089 2.539 1.431 4.053 1.502 1.28.059 1.688.072 4.947.072s3.667-.013 4.947-.072c1.514-.07 2.964-.412 4.053-1.502 1.089-1.089 1.431-2.539 1.502-4.053.059-1.28.072-1.688.072-4.947s-.013-3.667-.072-4.947c-.07-1.514-.412-2.964-1.502-4.053-1.089-1.089-2.539-1.431-4.053-1.502-1.28-.059-1.688-.072-4.947-.072z" />
              <path d="M12 5.838c-3.403 0-6.162 2.76-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.76 6.162-6.162-2.76-6.162-6.162-6.162zm0 10.325c-2.298 0-4.162-1.864-4.162-4.162s1.864-4.162 4.162-4.162 4.162 1.864 4.162 4.162-1.864 4.162-4.162 4.162z" />
              <path d="M18.406 4.594c-.796 0-1.44.645-1.44 1.44s.645 1.44 1.44 1.44 1.44-.645 1.44-1.44-.645-1.44-1.44-1.44z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-blue-600"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current text-red-600"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>
        </div>
        {/* 導航菜單 */}
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="/" className="link link-hover">
            首頁
          </Link>
          <Link href="/game" className="link link-hover">
            揪團
          </Link>
          <Link href="/store" className="link link-hover">
            商城
          </Link>
          <Link href="/FAQ" className="link link-hover">
            常見問題
          </Link>
        </div>
        {/* 版權信息 */}
        <div className="text-center mt-4">
          <p>Copyright © 2024 - All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
