import React from "react";
import { createPortal } from "react-dom";

const ProductSearch = ({
  filterTitle,
  setShowFilter,
  showFilter,
  setShowSearch,
  showSearch,
  handleFilterChange,
}) => {
  return (
    <nav className="w-full z-30 px-6 py-1 relative overflow-x-hidden">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
        <div className="font-bold text-xl">{filterTitle}</div>
        <div className="flex items-center">
          <a href="#" onClick={() => setShowFilter(!showFilter)}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
              <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
            </svg>
          </a>

          {showFilter &&
            createPortal(
              <div
                className="absolute  right-0 top-full top-full mt-2 bg-white shadow-lg rounded-lg p-4 w-48 z-[9999]   max-w-screen-md"
                style={{ zIndex: 99999, maxWidth: "calc(100vw - 20px)" }} // 限制篩選欄寬度
              >
                <ul className="space-y-2">
                  <li
                    className="hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleFilterChange("popular")}
                  >
                    依照熱門程度
                  </li>
                  <li
                    className="hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleFilterChange("priceHigh")}
                  >
                    依照價錢由高到低
                  </li>
                  <li
                    className="hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleFilterChange("priceLow")}
                  >
                    依照價錢由低到高
                  </li>
                </ul>
              </div>,
              document.body // 這裡將篩選欄渲染到 body
            )}
        </div>
      </div>
    </nav>
  );
};

export default ProductSearch;
