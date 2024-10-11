import { useRouter } from "next/router";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    // 這裡可以加入任何必要的處理邏輯，比如清空購物車
    localStorage.removeItem("cartItems"); // 清空 localStorage
  }, []);

  const handleGoHome = () => {
    router.push("/"); // 導回首頁
  };

  const handleContinueShopping = () => {
    router.push("/product/product-list"); // 導到產品列表頁
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-500 mb-4">付款成功！</h1>
        <p className="text-lg mb-6">感謝您的購買，您的訂單已成功提交。</p>
        <div className="flex space-x-4 w-full">
          <button
            onClick={handleGoHome}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1"
          >
            返回首頁
          </button>
          <button
            onClick={handleContinueShopping}
            className="bg-[#003E52]  text-white px-4 py-2 rounded hover:bg-black flex-1"
          >
            繼續購物
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
