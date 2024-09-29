import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function OrderTracking() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteStores, setFavoriteStores] = useState([]);
  const productRefs = useRef([]); // 儲存所有商品的 refs
  const storeRefs = useRef([]); // 儲存所有店家的 refs

  // 獲取存取令牌
  const getToken = () => localStorage.getItem("token");

  // 封裝帶有 token 的 fetch 請求
  const fetchWithToken = async (url, options = {}) => {
    const token = getToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`, // 附加 token 到 Authorization header
    };
    return fetch(url, { ...options, headers, credentials: "include" });
  };

  // 頁面掛載後加載數據
  useEffect(() => {
    setIsMounted(true);
    fetchFavorites(activeTab);
  }, [activeTab]);

  // 加載收藏的商品和店家
  const fetchFavorites = async (tab) => {
    setLoading(true);
    try {
      let endpoint;
      if (tab === "all") {
        endpoint = "http://localhost:3005/api/favorites/products";
      } else if (tab === "pending") {
        endpoint = "http://localhost:3005/api/favorites/stores";
      }

      const response = await fetchWithToken(endpoint);

      const data = await response.json();
      if (data.status === "success") {
        if (tab === "all") {
          setFavoriteProducts(data.favorites || []);
          productRefs.current = data.favorites.map(() => React.createRef());
        } else if (tab === "pending") {
          setFavoriteStores(data.favorites || []);
          storeRefs.current = data.favorites.map(() => React.createRef());
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

  // 渲染商品和店家列表
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
            {favoriteProducts.map((product, index) => (
              <CSSTransition
                key={product.id}
                nodeRef={productRefs.current[index]}
                timeout={300}
                classNames="fade"
              >
                <div
                  ref={productRefs.current[index]}
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
              </CSSTransition>
            ))}
          </section>
        );
      } else if (activeTab === "pending") {
        return (
          <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
            {favoriteStores.map((store, index) => (
              <CSSTransition
                key={store.id}
                nodeRef={storeRefs.current[index]}
                timeout={300}
                classNames="fade"
              >
                <div
                  ref={storeRefs.current[index]}
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
              </CSSTransition>
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
