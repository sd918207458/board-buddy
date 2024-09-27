import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function OrderTracking() {
  const [isMounted, setIsMounted] = useState(false); // 判斷是否在客戶端
  const [activeTab, setActiveTab] = useState("all"); // 管理當前選擇的 Tab
  const [loading, setLoading] = useState(true); // 加入 loading 狀態
  const [hasError, setHasError] = useState(false); // 用來追踪錯誤
  const [currentPage, setCurrentPage] = useState(1); // 用於處理分頁的狀態
  const totalPages = 10; // 模擬總頁數

  useEffect(() => {
    try {
      setIsMounted(true);
      setTimeout(() => setLoading(false), 1500); // 模擬資料加載
    } catch (error) {
      console.error("Error mounting component: ", error);
      setHasError(true);
    }
  }, []);

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      );
    }

    try {
      switch (activeTab) {
        case "all":
          return (
            <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
              {/* 商品卡片 */}
              <div className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              {/* 商品卡片 */}
              <div className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              {/* 商品卡片 */}
              <div className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              {/* 重複的商品卡片可以在這裡展開 */}
            </section>
          );
        case "pending":
          return (
            <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
              {/* 店家卡片 */}
              <div className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Shoes! <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              {/* 店家卡片 */}
              <div className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Shoes! <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              {/* 店家卡片 */}
              <div className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Shoes! <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
              {/* 重複的店家卡片可以在這裡展開 */}
            </section>
          );

        default:
          return null;
      }
    } catch (error) {
      console.error("Error rendering table: ", error);
      setHasError(true);
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
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.reload()}
          >
            重新加載
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>

          <section className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              我的收藏
            </h2>
          </section>

          {/* Tabs 選項卡 */}
          {isMounted && (
            <div className="tabs tabs-boxed justify-center mb-6">
              <button
                className={`tab ${
                  activeTab === "all" ? "tab-active tab-primary" : ""
                }`}
                onClick={() => setActiveTab("all")}
              >
                收藏商品
              </button>
              <button
                className={`tab ${
                  activeTab === "pending" ? "tab-active tab-primary" : ""
                }`}
                onClick={() => setActiveTab("pending")}
              >
                收藏店家
              </button>
            </div>
          )}

          {/* 渲染表格 */}
          {isMounted && (
            <TransitionGroup component={null}>
              <CSSTransition
                key={activeTab}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <div className="p-6">{renderTable()}</div>
              </CSSTransition>
            </TransitionGroup>
          )}

          {/* 分頁按鈕 */}
          <div className="join items-center justify-center mt-4 mb-6 w-full">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`join-item btn ${
                  currentPage === i + 1 ? "btn-active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                Page {i + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
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
