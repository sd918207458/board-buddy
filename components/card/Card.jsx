import Image from "next/image";
import Link from "next/link"; // 引入 Next.js 的 Link 組件

const Card = ({ product, addToCart, toggleFavorite, isFavorite }) => {
  return (
    <Link
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
        <p className="text-lg font-semibold mb-4 text-white">
          ${product.price}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              // e.stopPropagation(); // 阻止事件冒泡，避免觸發鏈接
              e.preventDefault(); // 防止跳轉到商品詳細頁面
              addToCart({ ...product, quantity: 1 }); // 確保傳入 quantity// 將商品加入購物車
            }}
            className="py-1.5 px-4 text-white border border-white rounded-lg
            hover:bg-white hover:text-[#003E52] transition-all"
          >
            加入購物車
          </button>
          <button
            onClick={(e) => {
              e.preventDefault(); // 防止跳轉到商品詳細頁面
              toggleFavorite(product.product_id); // 切換收藏狀態
            }}
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
            isFavorite ? "text-red-500" : "text-gray-500"
          } hover:text-red-500`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d={
              isFavorite
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
  );
};

export default Card;
