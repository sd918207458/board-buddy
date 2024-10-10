import { useState, useEffect } from "react";
import GameAccordion from "@/components/GameAccordion/GameAccordion";
import Card from "@/components/card/Card";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductSearch from "@/components/ProductSearch/ProductSearch";

const ProductList = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({}); // 保存每個產品的收藏狀態
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterTitle, setFilterTitle] = useState("全部商品");

  const [showFilter, setShowFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  // 添加商品到購物車的函數
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    let updatedCart;
    if (existingProduct) {
      updatedCart = cartItems.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // 切換收藏狀態
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = {
        ...prevFavorites,
        [product.product_id]: !prevFavorites[product.product_id],
      };

      const newFavoriteProducts = Object.keys(updatedFavorites)
        .filter((id) => updatedFavorites[id])
        .map((id) => {
          return products.find((p) => p.product_id === parseInt(id, 10));
        })
        .filter(Boolean);

      localStorage.setItem("favoriteItems", JSON.stringify(newFavoriteProducts));
      return updatedFavorites;
    });
  };

  const filterProducts = (filterType) => {
    let sortedProducts = [...products];
    const cleanPrice = (price) => parseFloat(price.replace(/,/g, ""));

    if (filterType === "popular") {
      sortedProducts.sort((a, b) => b.stock - a.stock);
    } else if (filterType === "priceHigh") {
      sortedProducts.sort((a, b) => cleanPrice(b.price) - cleanPrice(a.price));
    } else if (filterType === "priceLow") {
      sortedProducts.sort((a, b) => cleanPrice(a.price) - cleanPrice(b.price));
    }

    setFilteredProducts(sortedProducts);
  };

  const handleFilterChange = (filterType) => {
    filterProducts(filterType);
    const titleMap = {
      popular: "依照熱門程度",
      priceHigh: "依照價錢由高到低",
      priceLow: "依照價錢由低到高",
    };
    setFilterTitle(titleMap[filterType] || "依照熱門程度");
  };

  return (
    <>
      <div className="flex overflow-visible relative overflow-x-hidden">
        <aside className="w-70">
          <Breadcrumbs />
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
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.product_id}
                product={product}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites[product.product_id]}
                addToCart={addToCart}
              />
            ))}
          </div>
          <Pagination />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
