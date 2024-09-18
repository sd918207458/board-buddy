import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { motion } from "framer-motion"; // 加入動畫

export default function FAQ() {
  const [FAQData, setFAQData] = useState([]);
  const [loading, setLoading] = useState(true); // 加入加載狀態
  const [error, setError] = useState(null); // 用來處理錯誤

  useEffect(() => {
    fetch("/FAQData.json")
      .then((res) => res.json())
      .then((data) => {
        setFAQData(data); // 更新 FAQData 狀態
        setLoading(false); // 加載完畢
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
        setError("無法載入常見問題，請稍後再試。");
        setLoading(false); // 加載失敗
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl p-6">
          <div className="w-full max-w-sm mx-auto lg:max-w-4xl mb-4">
            <Breadcrumbs />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            常見問題
          </h2>

          {/* 加載中或錯誤提示 */}
          {loading ? (
            <div className="flex justify-center">
              <motion.div
                className="loader"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </motion.div>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                重新加載
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {FAQData.map((v, i) => (
                <motion.div
                  key={i}
                  className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    {v.title}
                  </div>
                  <div className="collapse-content">
                    <p>{v.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
