import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

// 模擬分類夾
const categories = ["全部收藏", "我的最愛", "希望購買", "待選擇"];

// 假資料：收藏的商品
const mockProducts = [
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

// 假資料：收藏的店家
const mockStores = [
  {
    id: 1,
    name: "桌遊店A",
    description: "專營策略桌遊的店鋪，提供最新和經典的桌遊選擇。",
    image: "/home_assets/桌遊店01.jpg",
    location: "台北市",
    hours: "10:00 AM - 8:00 PM",
    contact: "02-12345678",
  },
  {
    id: 2,
    name: "桌遊店B",
    description: "桌遊玩家的樂園，擁有全台最齊全的合作遊戲。",
    image: "/home_assets/桌遊店02.jfif",
    location: "台中市",
    hours: "9:00 AM - 9:00 PM",
    contact: "04-87654321",
  },
  {
    id: 3,
    name: "桌遊店C",
    description: "專賣卡牌和派對遊戲的店家，適合家庭聚會。",
    image: "/home_assets/桌遊店03.jfif",
    location: "高雄市",
    hours: "10:30 AM - 7:30 PM",
    contact: "07-45678901",
  },
];

// 抽取通用的卡片渲染邏輯
const Card = ({ item, isProduct = true }) => (
  <div className="card bg-white shadow-xl hover:scale-105 transition-transform">
    <div className="card-header bg-gray-200 p-2">
      <span
        className={`badge ${isProduct ? "badge-primary" : "badge-secondary"}`}
      >
        {isProduct ? "商品" : "店家"}
      </span>
    </div>
    <img
      src={item.image}
      alt={item.name}
      className="h-48 w-full object-cover rounded-lg"
    />
    <div className="p-4">
      <h2 className="font-bold">{item.name}</h2>
      <p>{item.description}</p>
      {isProduct ? (
        <>
          <p className="text-gray-600">價格：${item.price}</p>
          <p className="text-gray-600">評價：{item.rating}/5</p>
          <p className="text-gray-600">庫存狀態：{item.stockStatus}</p>
          <p className="text-gray-600">配送時間：{item.deliveryTime}</p>
          <div className="flex justify-end space-x-2">
            <button className="btn btn-primary">立即購買</button>
            <button className="btn btn-secondary">加入購物車</button>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-600">所在地：{item.location}</p>
          <p className="text-gray-600">營業時間：{item.hours}</p>
          <p className="text-gray-600">聯絡方式：{item.contact}</p>
          <div className="flex justify-between">
            <button className="btn btn-primary">瀏覽店家</button>
            <button className="btn btn-secondary">查看地圖</button>
          </div>
        </>
      )}
    </div>
  </div>
);

export default function Favorites() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sortOption, setSortOption] = useState(""); // 排序選項
  const [filterCategory, setFilterCategory] = useState("all"); // 篩選選項
  const [searchQuery, setSearchQuery] = useState(""); // 搜尋關鍵字
  const [favoriteProducts, setFavoriteProducts] = useState(mockProducts); // 商品假資料
  const [favoriteStores, setFavoriteStores] = useState(mockStores); // 店家假資料

  // 使用 useEffect 模擬頁面加載效果
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 搜尋邏輯
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredProducts = mockProducts.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const filteredStores = mockStores.filter((store) =>
      store.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFavoriteProducts(filteredProducts);
    setFavoriteStores(filteredStores);
  };

  // 排序邏輯
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    let sortedProducts = [...favoriteProducts];
    let sortedStores = [...favoriteStores];

    if (option === "price") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "date") {
      sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "name") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      sortedStores.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFavoriteProducts(sortedProducts);
    setFavoriteStores(sortedStores);
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
          onChange={handleSort}
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

  const renderTable = () => {
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

    const data = activeTab === "all" ? favoriteProducts : favoriteStores;

    return (
      <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
        {data.map((item) => (
          <Card key={item.id} item={item} isProduct={activeTab === "all"} />
        ))}
      </section>
    );
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
