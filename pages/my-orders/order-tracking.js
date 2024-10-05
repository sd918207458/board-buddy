import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrderTable from "@/components/table"; // 訂單表格組件
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 引入 React Transition Group

export default function OrderTracking() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [hasError, setHasError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setFilteredData] = useState([]); // 篩選後的數據
  const itemsPerPage = 10; // 每頁顯示 10 筆訂單

  // 假資料
  const sampleOrders = [
    {
      id: 1,
      orderNumber: "ORD001",
      date: "2024-10-01",
      status: "Pending",
      totalAmount: 1500,
      totalItems: 3,
      shippingAddress: "台北市中山區南京東路100號",
    },
    {
      id: 2,
      orderNumber: "ORD002",
      date: "2024-10-02",
      status: "Shipped",
      totalAmount: 2500,
      totalItems: 5,
      shippingAddress: "台北市大安區忠孝東路50號",
    },
    {
      id: 3,
      orderNumber: "ORD003",
      date: "2024-10-03",
      status: "Delivered",
      totalAmount: 3500,
      totalItems: 2,
      shippingAddress: "台北市信義區松高路120號",
    },
    {
      id: 4,
      orderNumber: "ORD004",
      date: "2024-10-04",
      status: "Canceled",
      totalAmount: 500,
      totalItems: 1,
      shippingAddress: "台北市中正區青島東路15號",
    },
    {
      id: 5,
      orderNumber: "ORD005",
      date: "2024-10-05",
      status: "Pending",
      totalAmount: 1200,
      totalItems: 4,
      shippingAddress: "台北市大同區延平北路300號",
    },
  ];

  // 根據選中的 tab 篩選數據
  const filterOrders = (tab) => {
    switch (tab) {
      case "pending":
        return sampleOrders.filter((order) => order.status === "Pending");
      case "history":
        return sampleOrders.filter((order) => order.status === "Delivered");
      case "canceled":
        return sampleOrders.filter((order) => order.status === "Canceled");
      default:
        return sampleOrders;
    }
  };

  // 初始化模擬數據
  useEffect(() => {
    setIsMounted(true);
    const filtered = filterOrders(activeTab); // 根據 activeTab 篩選數據
    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage)); // 計算總頁數
  }, [activeTab]); // 當 activeTab 改變時重新篩選數據

  // 渲染訂單表格
  const renderTable = () =>
    filteredData.length > 0 ? (
      <OrderTable orders={filteredData} />
    ) : (
      <div className="text-center p-4">目前沒有訂單。</div>
    );

  // 錯誤處理
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

  // 渲染分頁邏輯
  const renderPagination = () => {
    if (totalPages <= 1) return null; // 只有一頁不顯示分頁
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
      if (currentPage > 3)
        pages.push(
          <span key="left-dots" className="join-item btn btn-disabled">
            ...
          </span>
        );
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
      if (currentPage < totalPages - 2)
        pages.push(
          <span key="right-dots" className="join-item btn btn-disabled">
            ...
          </span>
        );
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
              {["all", "pending", "history", "canceled"].map((tab) => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? "tab-active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1); // 切換 tab 時重設當前頁碼
                  }}
                >
                  {tab === "all"
                    ? "全部訂單"
                    : tab === "pending"
                    ? "尚未出貨"
                    : tab === "history"
                    ? "歷史訂單"
                    : "取消訂單"}
                </button>
              ))}
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
