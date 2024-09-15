import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

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
            <p className="text-center text-gray-500 dark:text-gray-400">加載中...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="space-y-4">
              {FAQData.map((v, i) => (
                <div
                  key={i}
                  className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    {v.title}
                  </div>
                  <div className="collapse-content">
                    <p>{v.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
