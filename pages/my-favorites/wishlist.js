import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState(null); // 初始為 null，以確保在有數據時設置合適的值
  const [loading, setLoading] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteStores, setFavoriteStores] = useState([]);
  const [sortOption, setSortOption] = useState("date");

  const [originalFavoriteProducts, setOriginalFavoriteProducts] = useState([]);
  const [originalFavoriteStores, setOriginalFavoriteStores] = useState([]);

  useEffect(() => {
    fetchFavoriteProducts();
    fetchFavoriteStores();
  }, []);

  const fetchFavoriteProducts = () => {
    const storedFavoriteProducts =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];
    const validProducts = storedFavoriteProducts.filter(
      (product) =>
        product && product.image && product.product_name && product.description
    );
    console.log("Fetched favorite products from localStorage:", validProducts);
    setFavoriteProducts(validProducts);
    setOriginalFavoriteProducts(validProducts);

    // 根據商品收藏設置 activeTab
    if (validProducts.length > 0) {
      setActiveTab("all");
    }
  };

  const fetchFavoriteStores = async () => {
    setLoading(true);
    try {
      console.log("Sending request to fetch favorite stores...");
      const response = await fetch("http://localhost:3005/api/roomheart"); // GET 请求不需要 body
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`無法獲取收藏的房間數據，狀態碼: ${response.status}`);
      }

      const stores = await response.json();
      console.log("Fetched favorite stores from API:", stores);

      setFavoriteStores(stores);
      setOriginalFavoriteStores(stores);

      // 如果沒有收藏的商品但有收藏的店家，設置 activeTab 為 "pending"
      if (stores.length > 0 && favoriteProducts.length === 0) {
        setActiveTab("pending");
      }
    } catch (error) {
      console.error("獲取收藏房間失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "all" && sortOption !== "date") {
      const sortedProducts = sortFavorites(
        [...originalFavoriteProducts],
        sortOption
      );
      setFavoriteProducts(sortedProducts);
    } else if (activeTab === "pending" && sortOption !== "date") {
      const sortedStores = sortFavorites(
        [...originalFavoriteStores],
        sortOption
      );
      setFavoriteStores(sortedStores);
    } else {
      setFavoriteProducts([...originalFavoriteProducts]);
      setFavoriteStores([...originalFavoriteStores]);
    }
  }, [sortOption, activeTab]);

  const sortFavorites = (items, option) => {
    if (option === "price") {
      return items.sort((a, b) => a.price - b.price);
    } else if (option === "name") {
      return items.sort((a, b) => a.product_name.localeCompare(b.product_name));
    }
    return items;
  };

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

  const renderProductCard = (product) => (
    <div
      key={product.product_id}
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
        <p>價格: NT${product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
            立即購買
          </button>
        </div>
      </div>
    </div>
  );

  const renderStoreCard = (store) => (
    <div
      key={store.room_id}
      className="card bg-base-100 w-96 shadow-xl transition-transform hover:scale-105 hover:shadow-lg"
    >
      <figure>
        {store.img ? (
          <img
            src={store.img}
            alt={store.room_name}
            className="rounded-t-lg h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{store.room_name}</h2>
        <p>{store.room_intro}</p>
        <p>地點: {store.location}</p>
        <p>活動日期: {new Date(store.event_date).toLocaleDateString()}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary bg-[#036672] hover:bg-[#024c52]">
            瀏覽詳情
          </button>
        </div>
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
      return <div className="text-center">尚無收藏的房間。</div>;
    }

    if (activeTab === "all") {
      return (
        <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
          {favoriteProducts.map(renderProductCard)}
        </section>
      );
    } else if (activeTab === "pending") {
      return (
        <section className="max-w-4xl mx-auto grid grid-cols-2 gap-6 mt-4 sm:grid-cols-2">
          {favoriteStores.map(renderStoreCard)}
        </section>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="w-full p-4">
         
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
              收藏房間
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
