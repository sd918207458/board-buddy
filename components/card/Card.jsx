import { useState, useEffect } from "react";
import Image from "next/image";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState({}); // 保存每個產品的收藏狀態

  // Fetch 商品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/productsGame");
        const data = await response.json();
        console.log("API Data:", data); // 打印 API 返回的數據
        setProducts(data.data || []); // 如果數據在 data 屬性中
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

  return (
    <div>
      <div className="w-full md:w-3/4 mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.isArray(products) &&
            products.map((product) => (
              <a
                key={product.product_id}
                href="#"
                className="relative flex flex-col group"
              >
                {/* 商品圖片容器，確保圖片和圓角一致 */}
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="transition-all duration-300 group-hover:blur-md rounded-lg" // 確保圖片模糊時保持圓角
                    src={product.image}
                    width={400}
                    height={400}
                    alt={product.product_name}
                  />
                </div>

                {/* Hover 出現的 Overlay 效果，保持一致的圓角 */}
                <div className="absolute inset-0 bg-[#003E52] bg-opacity-80 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                  <h1 className="text-xl font-bold mb-4 text-white">
                    {product.product_name}
                  </h1>
                  {/* 加入購物車 和 加入收藏 按鈕 */}
                  <div className="flex space-x-2">
                    <a
                      href="#"
                      className="py-1.5 px-4 text-white border border-white rounded-lg hover:bg-white hover:text-[#003E52] transition-all" // 縮小按鈕的 padding
                    >
                      加入購物車
                    </a>
                    <button
                      onClick={() => toggleFavorite(product.product_id)} // 切換收藏狀態
                      className="py-1.5 px-4 text-white border border-white rounded-lg hover:bg-white hover:text-[#003E52] transition-all"
                    >
                      加入收藏
                    </button>
                  </div>
                </div>

                {/* 商品名稱和價格部分 */}
                <div className="pt-3 flex items-center justify-between transition-all duration-300 group-hover:blur-md">
                  <p>{product.product_name}</p>
                  {/* 愛心圖標，根據收藏狀態變化 */}
                  <svg
                    className={`h-6 w-6 fill-current ${
                      favorites[product.product_id]
                        ? "text-red-500"
                        : "text-gray-500"
                    } hover:text-red-500`} // 收藏狀態變紅色，未收藏狀態為灰色
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d={
                        favorites[product.product_id]
                          ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" // 實心紅色愛心
                          : "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM7.5 5C5.57 5 4 6.57 4 8.5c0 2.54 2.5 5.1 7.55 9.44 5.05-4.34 7.55-6.9 7.55-9.44C20 6.57 18.43 5 16.5 5c-1.54 0-3.04.99-3.57 2.36h-1.87C10.04 5.99 8.54 5 7.5 5z" // 空心灰色愛心
                      }
                    />
                  </svg>
                </div>
                <p className="pt-1 text-white-900 font-bold transition-all duration-300 group-hover:blur-md">
                  ${product.price}
                </p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
