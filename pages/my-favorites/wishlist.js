import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteStores, setFavoriteStores] = useState([]);
  const [sortOption, setSortOption] = useState("date"); // 預設排序方式

  // 保存原始數據的副本，用於恢復排序
  const [originalFavoriteProducts, setOriginalFavoriteProducts] = useState([]);

  // 頁面掛載後讀取收藏的商品和店家數據
  useEffect(() => {
    // 重新從 localStorage 讀取收藏商品
    const storedFavoriteProducts =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];
    const validProducts = storedFavoriteProducts.filter(
      (product) =>
        product && product.image && product.product_name && product.description
    );
    setFavoriteProducts(validProducts);
    setOriginalFavoriteProducts(validProducts); // 儲存原始商品列表

    // 重新從 localStorage 讀取收藏店家
    const storedFavoriteStores =
      JSON.parse(localStorage.getItem("favoriteStores")) || [];
    const validStores = storedFavoriteStores.filter(
      (store) => store && store.image && store.name && store.description
    );
    setFavoriteStores(validStores);
  }, []); // 空依賴陣列，確保只在組件掛載時執行一次

  // 根據排序選項對收藏商品進行排序
  const sortFavorites = (items, option) => {
    if (option === "price") {
      return items.sort((a, b) => a.price - b.price); // 依價格排序
    } else if (option === "name") {
      return items.sort((a, b) => a.product_name.localeCompare(b.product_name)); // 依名稱排序
    }
    return items; // 預設不排序
  };

  // 監聽排序選項變更，並對收藏商品進行排序
  useEffect(() => {
    if (activeTab === "all" && sortOption !== "date") {
      const sortedProducts = sortFavorites(
        [...originalFavoriteProducts],
        sortOption
      );
      setFavoriteProducts(sortedProducts);
    } else {
      // 若選擇的是 "date" 或初次加載，則恢復原始列表順序
      setFavoriteProducts([...originalFavoriteProducts]);
    }
  }, [sortOption, activeTab]); // 僅在排序選項或選中的 Tab 改變時重新排序

  const renderSortOptions = () => (
    <div className="flex justify-end p-4">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="select select-bordered"
      >
        <option value="date">依收藏日期</option>
        <option value="price">依價格排序</option>
        <option value="name">依名稱排序</option>
      </select>
    </div>
  );

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

    if (activeTab === "all") {
      return (
        <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
          {favoriteProducts.map((product, index) => (
            <div
              key={product.product_id || index}
              className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105 hover:shadow-lg"
            >
              <figure>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className="rounded-t-lg h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.product_name}</h2>
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
          {favoriteStores.map((store, index) => (
            <div
              key={store.id || index}
              className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105 hover:shadow-lg"
            >
              <figure>
                {store.image ? (
                  <img
                    src={store.image}
                    alt={store.name}
                    className="rounded-t-lg h-48 w-full object-cover"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </figure>
              <div className="card-body">
                <h2 className="card-title">{store.name}</h2>
                <p>{store.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
                    瀏覽店家
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      );
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

          {/* 排序選項 */}
          {renderSortOptions()}

          {/* Tabs 選項卡 */}
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

          {/* 渲染表格 */}
          <div className="p-6">{renderTable()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
