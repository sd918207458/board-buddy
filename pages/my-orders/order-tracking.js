import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import UserTable from "@/components/table"; // 表格組件
import users from "./../../public/user_table";
import users_1 from "./../../public/users_1";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 引入 React Transition Group

export default function OrderTracking() {
  const [isMounted, setIsMounted] = useState(false); // 判斷是否在客戶端
  const [activeTab, setActiveTab] = useState("all"); // 管理當前選擇的 Tab
  const [hasError, setHasError] = useState(false); // 用來追踪錯誤

  useEffect(() => {
    try {
      setIsMounted(true);
    } catch (error) {
      console.error("Error mounting component: ", error);
      setHasError(true);
    }
  }, []);

  // 渲染對應的表格
  const renderTable = () => {
    try {
      switch (activeTab) {
        case "all":
          return <UserTable users={users} />;
        case "pending":
          return <UserTable users={users_1} />;
        case "history":
          return <UserTable users={users} />;
        case "canceled":
          return <UserTable users={users_1} />;
        default:
          return null;
      }
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
                onClick={() => setActiveTab("all")}
              >
                全部訂單
              </button>
              <button
                className={`tab ${activeTab === "pending" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("pending")}
              >
                尚未出貨
              </button>
              <button
                className={`tab ${activeTab === "history" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("history")}
              >
                歷史訂單
              </button>
              <button
                className={`tab ${
                  activeTab === "canceled" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("canceled")}
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
            <button className="join-item btn" disabled={currentPage === 1}>
              «
            </button>
            <button className="join-item btn btn-active">Page 1</button>
            <button className="join-item btn">Page 2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">Page 99</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
