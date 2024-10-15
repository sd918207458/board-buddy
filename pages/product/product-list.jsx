import { useState, useEffect } from "react";
import GameAccordion from "@/components/GameAccordion/GameAccordion";
import Card from "@/components/card/Card";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSearch from "@/components/ProductSearch/ProductSearch";
import { useCart } from "@/hooks/useCart"; // 引入購物車 Context

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({}); // 保存每個產品的收藏狀態
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterTitle, setFilterTitle] = useState("全部商品");

  const [showFilter, setShowFilter] = useState(false); // 控制篩選器顯示狀態
  const [showSearch, setShowSearch] = useState(false); // 控制搜尋欄顯示狀態

  // 分頁相關狀態
  const [currentPage, setCurrentPage] = useState(1); // 當前頁面
  const [productsPerPage] = useState(12); // 每頁顯示的產品數量

  // 引入購物車 Context
  const { addToCart } = useCart(); // 從 useCart 中獲取 addToCart 函數
  // 在商品列表中使用 addToCart 函數
  const handleAddToCart = (product) => {
    addToCart(product); // 添加商品到購物車
  };

  // Fetch 商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/productsGame");
        const data = await response.json();
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 切換收藏狀態
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId], // 切換收藏狀態
    }));
  };

  // 篩選產品
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
    setFilteredProducts([...sortedProducts]);
  };

  const handleFilterChange = (filterType) => {
    filterProducts(filterType); // 應用篩選邏輯
    const titleMap = {
      default: "全部商品",
      popular: "依照熱門程度",
      priceHigh: "依照價錢由高到低",
      priceLow: "依照價錢由低到高",
    };
    setFilterTitle(titleMap[filterType] || "依照熱門程度");
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
        <aside className="w-70">
          {/* <Breadcrumbs /> */}
          <GameAccordion />
        </aside>
        <main className="relative flex flex-col">
          <ProductSearch
            filterTitle={filterTitle}
            setShowFilter={setShowFilter}
            showFilter={showFilter}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            handleFilterChange={handleFilterChange}
            products={filteredProducts}
            onSearch={(query) => {
              const filtered = products.filter((product) =>
                product.product_name.toLowerCase().includes(query.toLowerCase())
              );
              setFilteredProducts(filtered); // 更新顯示的產品列表
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {currentProducts.map((product) => (
              <Card
                key={product.product_id}
                product={product}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites[product.product_id]}
                addToCart={() => addToCart(product)} // 使用 useCart 中的 addToCart
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
