
import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

// 模擬分類夾
const categories = ["全部收藏", "我的最愛", "希望購買", "待選擇"];

export default function Favorites() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteStores, setFavoriteStores] = useState([]);
  const [sortOption, setSortOption] = useState(""); // 排序選項
  const [filterCategory, setFilterCategory] = useState("all"); // 篩選選項
  const [page, setPage] = useState(1); // 無限滾動的當前頁面
  const [hasMore, setHasMore] = useState(true); // 是否有更多資料加載

  // 頁面掛載後模擬數據加載
  useEffect(() => {
    setIsMounted(true);
    fetchFavorites(activeTab, page, sortOption, filterCategory);
  }, [activeTab, page, sortOption, filterCategory]);

  // 模擬收藏商品和店家數據
  const fetchFavorites = async (tab, page, sort, filter) => {
    setLoading(true);
    try {
      if (tab === "all") {
        const mockProducts = await getMockProducts(page, sort, filter);

        // 過濾重複的商品
        const uniqueProducts = mockProducts.filter(
          (product) => !favoriteProducts.some((p) => p.id === product.id)
        );

        setFavoriteProducts((prev) => [...prev, ...uniqueProducts]);
        setHasMore(uniqueProducts.length > 0); // 如果沒有更多資料，則停滯
      } else if (tab === "pending") {
        const mockStores = await getMockStores(page, sort, filter);

        // 過濾重複的店家
        const uniqueStores = mockStores.filter(
          (store) => !favoriteStores.some((s) => s.id === store.id)
        );

        setFavoriteStores((prev) => [...prev, ...uniqueStores]);
        setHasMore(uniqueStores.length > 0);
      }
    } catch (error) {
      console.error("Error fetching favorites: ", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  };

  // 模擬從後端獲取更多商品資料（假資料）
  const getMockProducts = async (page, sort, filter) => {
    let mockProducts = [
      {
        id: 1,
        name: "桌遊1",
        description: "經典策略遊戲，適合全家一起玩。",
        image: "/home_assets/商品01.jpg",
      },
      {
        id: 2,
        name: "桌遊2",
        description: "快速節奏遊戲，挑戰你的反應速度。",
        image: "/home_assets/商品03.jpg",
      },
      {
        id: 3,
        name: "桌遊3",
        description: "創意策略遊戲，適合高挑戰玩家。",
        image: "/home_assets/商品02.jpg",
      },
    ];

    // 排序邏輯
    if (sort === "price") {
      mockProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "date") {
      mockProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // 篩選邏輯
    if (filter !== "all") {
      mockProducts = mockProducts.filter(
        (product) => product.category === filter
      );
    }

    return mockProducts;
  };

  // 模擬獲取更多店家資料（假資料）
  const getMockStores = async (page, sort, filter) => {
    let mockStores = [
      {
        id: 1,
        name: "桌遊店A",
        description: "這是一家專門出售桌遊的店鋪。",
        image: "/home_assets/桌遊店01.jpg",
        location: "台北市",
      },
      {
        id: 2,
        name: "桌遊店B",
        description: "桌遊玩家的天堂，各種策略遊戲應有盡有。",
        image: "/home_assets/桌遊店02.jpg",
        location: "台中市",
      },
      {
        id: 3,
        name: "桌遊店C",
        description: "經典桌遊及最新潮流桌遊，一應俱全。",
        image: "/home_assets/桌遊店03.jpg",
        location: "高雄市",
      },
    ];

    // 排序邏輯
    if (sort === "location") {
      mockStores.sort((a, b) => a.location.localeCompare(b.location));
    }

    // 篩選邏輯
    if (filter !== "all") {
      mockStores = mockStores.filter((store) => store.category === filter);
    }

    return mockStores;
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1); // 加載更多頁數
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const renderSortAndFilter = () => (
    <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
      <div className="form-control">
        <label
          htmlFor="sort"
          className="label font-semibold text-gray-700 dark:text-white"
        >
          排序方式
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered"
        >
          <option value="date">依收藏日期</option>
          <option value="price">依價格</option>
          <option value="name">依名稱排序</option>
          <option value="popularity">依人氣排序</option>
        </select>
      </div>
      <div className="form-control">
        <label
          htmlFor="filter"
          className="label font-semibold text-gray-700 dark:text-white"
        >
          篩選分類
        </label>
        <select
          id="filter"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="select select-bordered"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
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
              key={product.id ? `product-${product.id}` : `product-${index}`}
              className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105 hover:shadow-lg"
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
          {favoriteStores.map((store, index) => (
            <div
              key={store.id ? `store-${store.id}` : `store-${index}`}
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

          {/* 排序與篩選 */}
          {renderSortAndFilter()}

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
          {isMounted && <div className="p-6">{renderTable()}</div>}
        </div>
      </div>
      <Footer />
    </>
  );
}
