import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function FAQ() {
  const [FAQData, setFAQData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/FAQData.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setFAQData(data);
        setLoading(false);

      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
        setError("無法載入常見問題，請稍後再試。");

        setLoading(false);

      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">

        <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Breadcrumbs />
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            常見問題
          </h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <p className="text-red-500">{error}</p>
              <button
                className="btn btn-error"
                onClick={() => window.location.reload()}

              >
                重新加載
              </button>
            </div>
          ) : (

            <TransitionGroup className="space-y-4">
              {FAQData.map((faq, index) => (
                <CSSTransition key={index} timeout={300} classNames="fade">
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                      {faq.title}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.content}</p>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>

          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
