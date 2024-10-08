import React from "react";

const productSearchTest = (showSearch) => {
  return (
    <div>
      productSearchTest
      {/* 搜尋圖標和搜尋欄 */}
      <div className="relative flex items-center">
        <button
          className="pl-3 inline-block no-underline hover:text-black"
          onClick={() => setShowSearch(!showSearch)} // 切換搜尋欄顯示狀態
        >
          <svg
            className="fill-current hover:text-black"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
          </svg>
        </button>
        {/* 搜尋欄 */}
        {showSearch && (
          <div className="ml-2">
            <input
              type="text"
              className="border rounded-full py-1 px-4 text-sm"
              placeholder="搜尋"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default productSearchTest;
