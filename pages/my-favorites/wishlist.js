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
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋關鍵字
  const [page, setPage] = useState(1); // 無限滾動的當前頁面
  const [hasMore, setHasMore] = useState(true); // 是否有更多資料加載
  const [recommendedItems, setRecommendedItems] = useState([]); // 個性化推薦

  // 頁面掛載後模擬數據加載
  useEffect(() => {
    setIsMounted(true);
    fetchFavorites(activeTab, page, sortOption, filterCategory, searchQuery);
    fetchRecommendedItems(); // 加載個性化推薦內容
  }, [activeTab, page, sortOption, filterCategory, searchQuery]);

  // 模擬收藏商品和店家數據
  const fetchFavorites = async (tab, page, sort, filter, searchQuery) => {
    setLoading(true);
    try {
      if (tab === "all") {
        const mockProducts = await getMockProducts(
          page,
          sort,
          filter,
          searchQuery
        );

        // 過濾重複的商品
        const uniqueProducts = mockProducts.filter(
          (product) => !favoriteProducts.some((p) => p.id === product.id)
        );

        setFavoriteProducts((prev) => [...prev, ...uniqueProducts]);
        setHasMore(uniqueProducts.length > 0); // 如果沒有更多資料，則停滯
      } else if (tab === "pending") {
        const mockStores = await getMockStores(page, sort, filter, searchQuery);

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

  // 模擬個性化推薦內容加載
  const fetchRecommendedItems = async () => {
    const recommendedMock = [
      {
        id: 1,
        name: "推薦桌遊1",
        description: "推薦的經典策略遊戲。",
        image: "/home_assets/推薦商品1.jpg",
      },
      {
        id: 2,
        name: "推薦桌遊2",
        description: "推薦的快速節奏遊戲。",
        image: "/home_assets/推薦商品2.jpg",
      },
    ];
    setRecommendedItems(recommendedMock);
  };

  // 模擬從後端獲取更多商品資料（假資料）
  const getMockProducts = async (page, sort, filter, searchQuery) => {
    let mockProducts = [
      {
        id: 1,
        name: "桌遊1",
        description: "經典策略遊戲，適合全家一起玩。",
        image: "/home_assets/商品01.jpg",
        price: 1500,
        rating: 4.5,
        stockStatus: "現貨",
        date: "2024-01-01",
        deliveryTime: "3-5天",
      },
      {
        id: 2,
        name: "桌遊2",
        description: "快速節奏遊戲，挑戰你的反應速度。",
        image: "/home_assets/商品02.jpg",
        price: 1200,
        rating: 4.0,
        stockStatus: "現貨",
        date: "2024-02-01",
        deliveryTime: "2-4天",
      },
      {
        id: 3,
        name: "桌遊3",
        description: "創意策略遊戲，適合高挑戰玩家。",
        image: "/home_assets/商品03.jpg",
        price: 1800,
        rating: 4.8,
        stockStatus: "缺貨",
        date: "2024-03-01",
        deliveryTime: "7天以上",
      },
    ];

    // 搜尋邏輯
    if (searchQuery) {
      mockProducts = mockProducts.filter((product) =>
        product.name.includes(searchQuery)
      );
    }

    // 排序邏輯
    if (sort === "price") {
      mockProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "date") {
      mockProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return mockProducts;
  };

  // 模擬從後端獲取更多店家資料（假資料）
  const getMockStores = async (page, sort, filter, searchQuery) => {
    let mockStores = [
      {
        id: 1,
        name: "桌遊店A",
        description: "專營策略桌遊的店鋪，提供最新和經典的桌遊選擇。",
        image: "/home_assets/桌遊店A.jpg",
        location: "台北市",
        hours: "10:00 AM - 8:00 PM",
        contact: "02-12345678",
        recommendedProducts: ["桌遊1", "桌遊2"],
      },
      {
        id: 2,
        name: "桌遊店B",
        description: "桌遊玩家的樂園，擁有全台最齊全的合作遊戲。",
        image: "/home_assets/桌遊店B.jpg",
        location: "台中市",
        hours: "9:00 AM - 9:00 PM",
        contact: "04-87654321",
        recommendedProducts: ["桌遊2", "桌遊3"],
      },
      {
        id: 3,
        name: "桌遊店C",
        description: "這家店專賣卡牌和派對遊戲，適合家庭聚會。",
        image: "/home_assets/桌遊店C.jpg",
        location: "高雄市",
        hours: "10:30 AM - 7:30 PM",
        contact: "07-45678901",
        recommendedProducts: ["桌遊1", "桌遊3"],
      },
    ];

    // 搜尋邏輯
    if (searchQuery) {
      mockStores = mockStores.filter((store) =>
        store.name.includes(searchQuery)
      );
    }

    // 排序邏輯
    if (sort === "location") {
      mockStores.sort((a, b) => a.location.localeCompare(b.location));
    }

    return mockStores;
  };

  // 增加搜尋框邏輯
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderSortAndFilter = () => (
    <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
      <div className="form-control">
        <label
          htmlFor="search"
          className="label font-semibold text-gray-700 dark:text-white"
        >
          搜尋收藏
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered w-full"
          placeholder="輸入關鍵字..."
        />
      </div>
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

  const renderRecommendedItems = () => (
    <section className="p-4">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
        個性化推薦
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {recommendedItems.map((item) => (
          <div
            key={item.id}
            className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover rounded-lg"
            />
            <div className="p-4">
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
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
      return (
        <div className="text-center">
          尚無收藏的商品。
          <br />
          <button className="btn btn-primary mt-4">查看推薦商品</button>
        </div>
      );
    }

    if (activeTab === "pending" && favoriteStores.length === 0) {
      return (
        <div className="text-center">
          尚無收藏的店家。
          <br />
          <button className="btn btn-primary mt-4">查看推薦店家</button>
        </div>
      );
    }

    if (activeTab === "all") {
      return (
        <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="card bg-white shadow-xl hover:scale-105 transition-transform"
            >
              <div className="card-header bg-gray-200 p-2">
                <span className="badge badge-primary">商品</span>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="font-bold">{product.name}</h2>
                <p>{product.description}</p>
                <p className="text-gray-600">價格：${product.price}</p>
                <p className="text-gray-600">評價：{product.rating}/5</p>
                <p className="text-gray-600">庫存狀態：{product.stockStatus}</p>
                <p className="text-gray-600">
                  配送時間：{product.deliveryTime}
                </p>
                <div className="flex justify-end space-x-2">
                  <button className="btn btn-primary">立即購買</button>
                  <button className="btn btn-secondary">加入購物車</button>
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
              className="card bg-white shadow-xl hover:scale-105 transition-transform"
            >
              <div className="card-header bg-gray-200 p-2">
                <span className="badge badge-secondary">店家</span>
              </div>
              <img
                src={store.image}
                alt={store.name}
                className="h-48 w-full object-cover rounded-lg"
              />
              <div className="p-4">
                <h2 className="font-bold">{store.name}</h2>
                <p>{store.description}</p>
                <p className="text-gray-600">所在地：{store.location}</p>
                <p className="text-gray-600">營業時間：{store.hours}</p>
                <p className="text-gray-600">聯絡方式：{store.contact}</p>
                <p className="text-gray-600">
                  推薦產品：
                  {Array.isArray(store.recommendedProducts)
                    ? store.recommendedProducts.join(", ")
                    : "無推薦產品"}
                </p>

                <div className="flex justify-between">
                  <button className="btn btn-primary">瀏覽店家</button>
                  <button className="btn btn-secondary">查看地圖</button>
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

          {/* 個性化推薦 */}
          {renderRecommendedItems()}

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
