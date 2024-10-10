import { useState, useEffect } from "react";
import GameAccordion from "@/components/GameAccordion/GameAccordion";
import Card from "@/components/card/Card";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSearch from "@/components/ProductSearch/ProductSearch"; // 引入 ProductSearch 組件

const ProductList = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({}); // 保存每個產品的收藏狀態
  const [filteredProducts, setFilteredProducts] = useState([]); // 存儲篩選後的產品
  const [filterTitle, setFilterTitle] = useState("全部商品"); // 預設為全部商品

  const [showFilter, setShowFilter] = useState(false); // 控制篩選器顯示狀態
  const [showSearch, setShowSearch] = useState(false); // 控制搜尋欄顯示狀態

  // 分頁相關狀態
  const [currentPage, setCurrentPage] = useState(1); // 當前頁面
  const [productsPerPage] = useState(12); // 每頁顯示的產品數量

  // Fetch 商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/productsGame");
        const data = await response.json();
        setProducts(data.data || []); // 初始化 products
        setFilteredProducts(data.data || []); // 初始化 filteredProducts，與 products 保持一致
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []); // 這裡的空陣列表示只在組件首次加載時執行

  // 添加商品到購物車的函數
  const addToCart = (product) => {
    console.log("Adding product to cart:", product); // 檢查商品數據
    const existingProduct = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    let updatedCart;
    if (existingProduct) {
      // 如果商品已經在購物車中，更新數量
      updatedCart = cartItems.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // 如果商品不在購物車中，添加新商品
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart); // 更新購物車
    localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // 保存到 localStorage
    console.log("Cart updated:", updatedCart); // 檢查更新後的購物車數據
  };

  // 切換收藏狀態
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId], // 切換收藏狀態
    }));
  };

  // 篩選產品 排序
  const filterProducts = (filterType) => {
    let sortedProducts = [...products]; // 使用產品的原始順序
    const cleanPrice = (price) => parseFloat(price.replace(/,/g, ""));

    if (filterType === "default") {
      sortedProducts = products; // 將排序重置為原始順序
    } else if (filterType === "popular") {
      sortedProducts.sort((a, b) => b.stock - a.stock);
    } else if (filterType === "priceHigh") {
      sortedProducts.sort((a, b) => cleanPrice(b.price) - cleanPrice(a.price));
    } else if (filterType === "priceLow") {
      sortedProducts.sort((a, b) => cleanPrice(a.price) - cleanPrice(b.price));
    }

    console.log("已篩選產品：", sortedProducts); // 檢查篩選結果
    setFilteredProducts([...sortedProducts]); // 更新篩選後的產品
  };

  // 點擊篩選器時，同時應用篩選並更新標題
  const handleFilterChange = (filterType) => {
    filterProducts(filterType); // 應用篩選邏輯

    const titleMap = {
      default: "全部商品",
      popular: "依照熱門程度",
      priceHigh: "依照價錢由高到低",
      priceLow: "依照價錢由低到高",
    };
    setFilterTitle(titleMap[filterType] || "全部商品");
    console.log(`篩選條件：${filterType}`); // 用於檢查篩選器是否正常觸發
  };

  // 計算總頁數
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // 獲取當前頁的產品數據
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // 切換頁面
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex overflow-visible relative overflow-x-hidden">
        {/* Sidebar on the left */}
        <aside className="w-70">
          <Breadcrumbs />
          <GameAccordion />
        </aside>
        {/* Main content on the right */}
        <main className="relative flex flex-col">
          {/* 引入 ProductSearch 組件 */}
          <ProductSearch
            filterTitle={filterTitle}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            handleFilterChange={handleFilterChange}
          />
          {console.log("ProductSearch rendered")}
          {/* Product Card and other components */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {currentProducts.map((product) => (
              <Card
                key={product.product_id}
                product={product}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites[product.product_id]}
                addToCart={addToCart} // 傳遞 addToCart 函數
              />
            ))}
          </div>
          {/* 分頁控制 */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
