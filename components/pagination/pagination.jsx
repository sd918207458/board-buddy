import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  // 生成頁碼
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {/* 上一頁按鈕 */}
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // 禁用上一頁按鈕當前頁為1時
      >
        «
      </button>

      {/* 動態生成頁碼 */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => {
            console.log(number); // 檢查輸出是否為純數字
            onPageChange(number);
          }}
          className={`join-item btn ${
            number === currentPage ? "btn-active" : ""
          }`}
        >
          {number}
        </button>
      ))}
      {/* 下一頁按鈕 */}
      <button
        className="join-item btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // 禁用下一頁按鈕當前頁為最後一頁時
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
