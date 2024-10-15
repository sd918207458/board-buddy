import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // 引入 Framer Motion

const RecommendedGames = () => {
  const [products, setProducts] = useState([]); // 存放從 API 獲取的數據

  // 從後端 API 獲取產品數據
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/productsGame");
        const data = await response.json();
        setProducts(data.data || []); // 保存數據到狀態
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="mt-10 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">為您推薦的桌遊</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {/* 動態渲染推薦桌遊卡片（限制顯示3筆資料） */}
        {products.slice(0, 3).map((product, index) => (
          <motion.div
            key={product.product_id}
            className="card w-96 bg-gray-100 shadow-lg"
            initial={{ opacity: 0, y: 50 }} // 初始位置（不透明度0，Y軸下方50px）
            whileInView={{ opacity: 1, y: 0 }} // 當卡片進入視口時動畫啟動
            viewport={{ once: true }} // 只在第一次進入視口時觸發
            transition={{
              delay: index * 0.1, // 每張卡片動畫延遲0.2秒
              duration: 0.5, // 動畫持續時間
              type: "spring", // 彈簧效果
              stiffness: 100, // 彈性強度
            }}
            whileHover={{
              scale: 1.05, // 懸停時放大卡片
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)", // 增加陰影
            }}
          >
            <figure className="h-64 overflow-hidden">
              <img
                src={product.image || "/home_assets/default.jpg"}
                alt={product.product_name}
                className="object-cover h-full w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.product_name}</h2>
              <p>{product.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">立即購買</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedGames;
