import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function FAQ() {
  const [FAQData, setFAQData] = useState([]);

  useEffect(() => {
    fetch("/FAQData.json")
      .then((res) => res.json())
      .then((data) => {
        setFAQData(data); // 更新 FAQData 狀態
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className=" w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="w-full max-w-sm mx-auto lg:max-w-4xl mb-4">
            <Breadcrumbs />
          </div>
          {/* map常見問題 */}
          <div>
            {FAQData.map((v, i) => (
              <div
                key={i}
                tabIndex={0}
                className="collapse collapse-arrow border-base-300 bg-base-200 border"
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
        </div>
      </div>
      <Footer />
    </>
  );
}
