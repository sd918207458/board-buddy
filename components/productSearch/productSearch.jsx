import React from "react";

const productSearch = () => {
  return (
    <div>
      productSearch
      <nav id="store" className="w-full z-30 top-0 px-6 py-1">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3 relative">
          <div className="uppercase tracking-wide no-underline hover:no-underline font-bold text-white-800 text-xl">
            {filterTitle}
          </div>

          <div className="flex items-center" id="store-nav-content">
            {/* 篩選器圖標 */}
            <div className="relative">
              <a
                className="pl-3 inline-block no-underline hover:text-black"
                href="#"
                onClick={() => setShowFilter(!showFilter)} // 切換篩選器的顯示狀態
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                </svg>
              </a>

              {/* 篩選器下拉選單 */}
              {showFilter && (
                <div className="absolute left-[-80px] mt-2 bg-white shadow-lg rounded-lg p-4 w-48">
                  <ul className="space-y-2">
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        console.log("篩選條件：熱門程度");
                        handleFilterChange("popular");
                      }}
                    >
                      依照熱門程度
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleFilterChange("priceHigh")}
                    >
                      依照價錢由高到低
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleFilterChange("priceLow")}
                    >
                      依照價錢由低到高
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* 搜尋圖標 */}
            <div className="relative flex items-center">
              <a
                className="pl-3 inline-block no-underline hover:text-black"
                href="#"
                onClick={() => setShowSearch(!showSearch)} // 切換搜尋欄的顯示狀態
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
              </a>

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
        </div>
      </nav>
    </div>
  );
};

export default productSearch;
