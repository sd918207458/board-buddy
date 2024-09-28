import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import UserTable from "@/components/table"; // 表格組件
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 引入 React Transition Group

export default function OrderTracking() {
  const [isMounted, setIsMounted] = useState(false); // 判斷是否在客戶端
  const [activeTab, setActiveTab] = useState("all"); // 管理當前選擇的 Tab
  const [hasError, setHasError] = useState(false); // 用來追踪錯誤
  const [currentPage, setCurrentPage] = useState(1); // 用於處理分頁的狀態
  const [totalPages, setTotalPages] = useState(1); // 儲存 API 返回的總頁數
  const itemsPerPage = 10; // 每頁顯示 10 筆訂單
  const [currentData, setCurrentData] = useState([]); // 用來存儲當前顯示的訂單數據

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // 根據當前 activeTab 來生成 API 的端點
      const endpoint = `http://localhost:3005/api/orders/${activeTab}?page=${currentPage}&limit=${itemsPerPage}`;
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.status === "success") {
          setCurrentData(data.data.orders || []); // 確保返回數據為陣列
          setTotalPages(data.data.pageCount); // 儲存 API 返回的總頁數
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error loading orders: ", error);
        setHasError(true);
      }
    };

    fetchData();
  }, [activeTab, currentPage]); // activeTab 和 currentPage 發生變化時，重新獲取數據

  const renderTable = () => {
    return <UserTable users={currentData || []} />; // 保證傳入的是陣列
  };

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-red-600">
            發生錯誤，請稍後再試。
          </h2>
        </div>
      </div>
    );
  }

  // 渲染分頁邏輯，當頁碼超過 5 頁時，用 ... 省略中間頁碼
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          className={`join-item btn ${currentPage === 1 ? "btn-active" : ""}`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(
          <span key="left-dots" className="join-item btn btn-disabled">
            ...
          </span>
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pages.push(
          <button
            key={i}
            className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="right-dots" className="join-item btn btn-disabled">
            ...
          </span>
        );
      }

      pages.push(
        <button
          key={totalPages}
          className={`join-item btn ${
            currentPage === totalPages ? "btn-active" : ""
          }`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>

          <section className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              我的訂單
            </h2>
          </section>

          {/* Tabs 選項卡 */}
          {isMounted && (
            <div className="tabs tabs-boxed justify-center mb-6">
              <button
                className={`tab ${activeTab === "all" ? "tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("all");
                  setCurrentPage(1);
                }}
              >
                全部訂單
              </button>
              <button
                className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("pending");
                  setCurrentPage(1);
                }}
              >
                尚未出貨
              </button>
              <button
                className={`tab ${activeTab === "history" ? "tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("history");
                  setCurrentPage(1);
                }}
              >
                歷史訂單
              </button>
              <button
                className={`tab ${
                  activeTab === "canceled" ? "tab-active" : ""
                }`}
                onClick={() => {
                  setActiveTab("canceled");
                  setCurrentPage(1);
                }}
              >
                取消訂單
              </button>
            </div>
          )}

          {/* 表格 */}
          {isMounted && (
            <TransitionGroup className="p-6">
              <CSSTransition key={activeTab} timeout={300} classNames="fade">
                <div>{renderTable()}</div>
              </CSSTransition>
            </TransitionGroup>
          )}

          {/* 分頁按鈕 */}
          <div className="join items-center justify-center mt-4 mb-6 w-full">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
            >
              «
            </button>
            {renderPagination()}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
            >
              »
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
