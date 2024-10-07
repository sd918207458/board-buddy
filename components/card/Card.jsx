import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // 引入 Next.js 的 Link 組件

const Card = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({}); // 保存每個產品的收藏狀態
  const [showFilter, setShowFilter] = useState(false); // 控制篩選器的狀態
  const [showSearch, setShowSearch] = useState(false); // 控制搜尋欄的狀態
  const [filteredProducts, setFilteredProducts] = useState([]); // 存儲篩選後的產品
  // 定義篩選條件狀態
  const [filterTitle, setFilterTitle] = useState("全部商品"); // 預設為全部商品

  // 監聽 filteredProducts 狀態的變化
  useEffect(() => {
    console.log("目前的篩選後產品:", filteredProducts);
  }, [filteredProducts]);

  // Fetch 商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/productsGame");
        const data = await response.json();
        console.log("API Data:", data); // 打印 API 返回的數據
        setProducts(data.data || []); // 初始化 products
        setFilteredProducts(data.data || []); // 初始化 filteredProducts，與 products 保持一致
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []); // 這裡的空陣列表示只在組件首次加載時執行

  // 切換收藏狀態
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId], // 切換收藏狀態
    }));
  };

  // 篩選產品
  const filterProducts = (filterType) => {
    let sortedProducts = [...products];

    const cleanPrice = (price) => {
      // 去掉價格中的逗號，然後轉換為數字
      return parseFloat(price.replace(/,/g, ""));
    };

    if (filterType === "popular") {
      // 根據庫存（stock）高低排序，庫存多的在前面
      sortedProducts.sort((a, b) => b.stock - a.stock);
    } else if (filterType === "priceHigh") {
      // 根據價錢由高到低排序，將字串轉為數字
      sortedProducts.sort((a, b) => {
        const priceA = cleanPrice(a.price);
        const priceB = cleanPrice(b.price);

        if (isNaN(priceA) || isNaN(priceB)) {
          return 0; // 如果價格無效，不進行排序
        }

        return priceB - priceA;
      });
    } else if (filterType === "priceLow") {
      // 根據價錢由低到高排序，將字串轉為數字
      sortedProducts.sort((a, b) => {
        const priceA = cleanPrice(a.price);
        const priceB = cleanPrice(b.price);

        if (isNaN(priceA) || isNaN(priceB)) {
          return 0; // 如果價格無效，不進行排序
        }

        return priceA - priceB;
      });
    }
    console.log("篩選條件已應用，更新 filteredProducts：", sortedProducts);
    setFilteredProducts([...sortedProducts]); // 使用擴展運算符來確保生成新的物件引用
  };
  // 篩選產品的功能
  const filterProductsTitle = (filterType) => {
    switch (filterType) {
      case "popular":
        setFilterTitle("依照熱門程度");
        break;
      case "priceHigh":
        setFilterTitle("依照價錢由高到低");
        break;
      case "priceLow":
        setFilterTitle("依照價錢由低到高");
        break;
      default:
        setFilterTitle("依照熱門程度");
    }
    // 這裡可以加上你篩選邏輯的實現，如向後端請求數據等
    console.log(`篩選條件：${filterType}`);
  };
  // 點擊篩選器時，同時應用篩選並更新標題
  const handleFilterChange = (filterType) => {
    filterProducts(filterType); // 應用篩選邏輯
    filterProductsTitle(filterType); // 更新標題
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3 relative">
            <div className="uppercase tracking-wide no-underline hover:no-underline font-bold text-white-800 text-xl">
              {filterTitle}
            </div>

            <div className="flex items-center" id="store-nav-content">
              {/* 篩選器圖標 */}
              <div className="relative">
                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                  onClick={() => setShowFilter(!showFilter)} // 切換篩選器的顯示狀態
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </a>

                {/* 篩選器下拉選單 */}
                {showFilter && (
                  <div className="absolute left-[-80px] mt-2 bg-white shadow-lg rounded-lg p-4 w-48">
                    <ul className="space-y-2">
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          console.log("篩選條件：熱門程度");
                          handleFilterChange("popular");
                        }}
                      >
                        依照熱門程度
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleFilterChange("priceHigh")}
                      >
                        依照價錢由高到低
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleFilterChange("priceLow")}
                      >
                        依照價錢由低到高
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 搜尋圖標 */}
              <div className="relative flex items-center">
                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                  onClick={() => setShowSearch(!showSearch)} // 切換搜尋欄的顯示狀態
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                  </svg>
                </a>

                {/* 搜尋欄 */}
                {showSearch && (
                  <div className="ml-2">
                    <input
                      type="text"
                      className="border rounded-full py-1 px-4 text-sm"
                      placeholder="搜尋"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <div className="w-full md:w-3/4 mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product.product_id}
                  href={`/product/${product.product_id}`} // 使用動態路由
                  className="relative flex flex-col group"
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <Image
                      className="transition-all duration-300 group-hover:blur-md rounded-lg"
                      src={product.image}
                      width={400}
                      height={400}
                      alt={product.product_name}
                    />
                  </div>

                  <div className="absolute inset-0 bg-[#003E52] bg-opacity-80 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <h1 className="text-xl font-bold mb-4 text-white">
                      {product.product_name}
                    </h1>
                    {/* 新增的價格部分 */}
                    <p className="text-lg font-semibold mb-4 text-white">
                      ${product.price}
                    </p>
                    <div className="flex space-x-2">
                      <a
                        href="#"
                        className="py-1.5 px-4 text-white border border-white rounded-lg hover:bg-white hover:text-[#003E52] transition-all"
                      >
                        加入購物車
                      </a>
                      <button
                        onClick={() => toggleFavorite(product.product_id)}
                        className="py-1.5 px-4 text-white border border-white rounded-lg hover:bg-white hover:text-[#003E52] transition-all"
                      >
                        加入收藏
                      </button>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between transition-all duration-300 group-hover:blur-md">
                    <p>{product.product_name}</p>
                    <svg
                      className={`h-6 w-6 fill-current ${
                        favorites[product.product_id]
                          ? "text-red-500"
                          : "text-gray-500"
                      } hover:text-red-500`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d={
                          favorites[product.product_id]
                            ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            : "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM7.5 5C5.57 5 4 6.57 4 8.5c0 2.54 2.5 5.1 7.55 9.44 5.05-4.34 7.55-6.9 7.55-9.44C20 6.57 18.43 5 16.5 5c-1.54 0-3.04.99-3.57 2.36h-1.87C10.04 5.99 8.54 5 7.5 5z"
                        }
                      />
                    </svg>
                  </div>
                  <p className="pt-1 text-white-900 font-bold transition-all duration-300 group-hover:blur-md">
                    ${product.price}
                  </p>
                </Link>
              ))
            ) : (
              <p>沒有可顯示的產品</p> // 如果沒有產品，顯示一個提示
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
