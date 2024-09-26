import React, { useState, useEffect } from "react";
import Navbar from "@/components/NavbarSwitcher";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import UserTable from "@/components/table"; // 表格組件
import users from "./../../public/user_table"; // 用於全訂單數據
import users_1 from "./../../public/users_1"; // 用於其他狀態訂單數據
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 引入 React Transition Group

export default function OrderTracking() {
  const [isMounted, setIsMounted] = useState(false); // 判斷是否在客戶端
  const [activeTab, setActiveTab] = useState("all"); // 管理當前選擇的 Tab
  const [hasError, setHasError] = useState(false); // 用來追踪錯誤
  const [currentPage, setCurrentPage] = useState(1); // 用於處理分頁的狀態
  const itemsPerPage = 10; // 每頁顯示 5 筆訂單
  const [currentData, setCurrentData] = useState([]); // 用來存儲當前顯示的訂單數據

  useEffect(() => {
    try {
      setIsMounted(true);
      loadDataForCurrentPage(); // 初始化加載數據
    } catch (error) {
      console.error("Error mounting component: ", error);
      setHasError(true);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `/api/orders/${activeTab}?page=${currentPage}&limit=${itemsPerPage}`;
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.status === "success") {
          setCurrentData(data.orders);
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error loading orders: ", error);
        setHasError(true);
      }
    };

    fetchData();
  }, [activeTab, currentPage]);

  // 根據選擇的 Tab 加載對應的數據
  const loadDataForCurrentPage = () => {
    let selectedUsers = [];
    switch (activeTab) {
      case "all":
        selectedUsers = users;
        break;
      case "pending":
        selectedUsers = users_1;
        break;
      case "history":
        selectedUsers = users;
        break;
      case "canceled":
        selectedUsers = users_1;
        break;
      default:
        selectedUsers = users;
        break;
    }

    // 計算當前頁面的訂單數據
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = selectedUsers.slice(startIndex, endIndex);

    setCurrentData(paginatedData); // 更新當前頁的訂單數據
  };

  // 渲染對應的表格
  const renderTable = () => {
    try {
      return <UserTable users={currentData} />; // 顯示當前頁的訂單數據
    } catch (error) {
      console.error("Error rendering table: ", error);
      setHasError(true); // 捕獲渲染表格過程中的錯誤
      return null;
    }
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

  // 計算總頁數
  const totalItems = activeTab === "all" ? users.length : users_1.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 渲染分頁邏輯，當頁碼超過 5 頁時，用 ... 省略中間頁碼
  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      // 小於等於 5 頁時，顯示所有頁碼
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
      // 超過 5 頁時顯示前兩頁、當前頁附近以及最後兩頁
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

      // 顯示當前頁及其前後頁
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
      <Navbar />
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
                  setCurrentPage(1); // 切換 Tab 時重置到第 1 頁
                }}
              >
                全部訂單
              </button>
              <button
                className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("pending");
                  setCurrentPage(1); // 切換 Tab 時重置到第 1 頁
                }}
              >
                尚未出貨
              </button>
              <button
                className={`tab ${activeTab === "history" ? "tab-active" : ""}`}
                onClick={() => {
                  setActiveTab("history");
                  setCurrentPage(1); // 切換 Tab 時重置到第 1 頁
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
                  setCurrentPage(1); // 切換 Tab 時重置到第 1 頁
                }}
              >
                取消訂單
              </button>
            </div>
          )}

          {/* 使用 React Transition Group 來處理表格切換的動畫效果 */}
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
