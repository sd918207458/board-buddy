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
  const [favoriteProducts, setFavoriteProducts] = useState([]); // 收藏的商品
  const [favoriteStores, setFavoriteStores] = useState([]); // 收藏的店家

  useEffect(() => {
    try {
      setIsMounted(true);
      fetchFavorites(activeTab); // 加載收藏
    } catch (error) {
      console.error("Error mounting component: ", error);
      setHasError(true);
    }
  }, [activeTab]);

  const fetchFavorites = async (tab) => {
    setLoading(true);
    try {
      let endpoint;
      if (tab === "all") {
        endpoint = "/api/favorites/products";
      } else if (tab === "pending") {
        endpoint = "/api/favorites/stores";
      }

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.status === "success") {
        if (tab === "all") {
          setFavoriteProducts(data.favorites || []);
        } else if (tab === "pending") {
          setFavoriteStores(data.favorites || []);
        }
      } else {
        setHasError(true);
      }
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      );
    }

    if (activeTab === "all" && favoriteProducts.length === 0) {
      return <div className="text-center">尚無收藏的商品。</div>;
    }

    if (activeTab === "pending" && favoriteStores.length === 0) {
      return <div className="text-center">尚無收藏的店家。</div>;
    }

    try {
      if (activeTab === "all") {
        return (
          <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105"
              >
                <figure>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-t-lg h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      立即購買
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        );
      } else if (activeTab === "pending") {
        return (
          <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
            {favoriteStores.map((store) => (
              <div
                key={store.id}
                className="card bg-white w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg"
              >
                <figure className="relative">
                  <img
                    src={store.image}
                    alt={store.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg font-bold text-gray-800 dark:text-white">
                    {store.name}
                    <span className="badge badge-secondary ml-2">熱門</span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {store.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                      瀏覽店家
                    </button>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {store.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        );
      }
    } catch (error) {
      console.error("Error rendering table: ", error);
      setHasError(true);
      return null;
    }
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
        </div>
      </div>
      <Footer />
    </>
  );
}
