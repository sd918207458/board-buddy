import React, { useEffect, useState, useMemo } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 用來存儲點擊的圖片

  const router = useRouter();
  const { id } = router.query;

  // 獲取存取令牌
  const getToken = () => localStorage.getItem("token");

  // 封裝帶有 token 的 fetch 請求函數
  const fetchWithToken = async (url, options = {}) => {
    const token = getToken();
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
    return fetch(url, { ...options, headers, credentials: "include" });
  };

  // 請求訂單詳情
  useEffect(() => {
    if (!router.isReady || !id) return;

    const fetchOrderDetails = async (orderId) => {
      try {
        const response = await fetchWithToken(
          `http://localhost:3005/api/order-details/${orderId}`,
          { method: "GET" }
        );
        const result = await response.json();
        if (response.ok) {
          setOrderDetails(result.orderDetails);
          toast.success("訂單資料獲取成功！");
        } else {
          toast.error(result.message || "無法獲取訂單資料");
        }
      } catch (error) {
        toast.error("伺服器錯誤，無法獲取訂單資料");
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(id);
  }, [router.isReady, id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.getElementById("image-modal").showModal();
  };

  const memoizedOrderDetails = useMemo(() => orderDetails, [orderDetails]);

  if (loading) {
    return <div className="text-center">載入中...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}，請稍後重試或聯絡客服。
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
          {/* Breadcrumbs */}
          <div className="p-4">
            <Breadcrumbs />
          </div>

          {/* 訂單進度追蹤 */}
          <section className="p-6 bg-white dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              訂單明細
            </h2>

            <ul className="steps steps-vertical lg:steps-horizontal justify-center w-full">
              <li className="step step-primary" data-content="✓">
                訂單建立
              </li>
              <li className="step step-primary" data-content="✓">
                處理中
              </li>
              <li
                className={`step ${
                  memoizedOrderDetails.shipped ? "step-primary" : ""
                }`}
              >
                {memoizedOrderDetails.shipped ? "已出貨" : "等待出貨"}
              </li>
              <li
                className={`step ${
                  memoizedOrderDetails.completed ? "step-primary" : ""
                }`}
              >
                {memoizedOrderDetails.completed ? "完成訂單" : "等待完成"}
              </li>
            </ul>
          </section>

          {/* 訂單商品列表 */}
          <div className="overflow-x-auto px-4 py-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              商品列表
            </h3>
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th>商品名稱</th>
                  <th>商品編號</th>
                  <th>商品價格</th>
                  <th>商品數量</th>
                  <th>小計</th>
                  <th>圖片</th>
                </tr>
              </thead>
              <tbody>
                {memoizedOrderDetails.map((item) => (
                  <tr key={item.orderdetail_id}>
                    <td>{item.product_name}</td>
                    <td>{item.product_id}</td>
                    <td>NT${item.price}</td>
                    <td>{item.number}</td>
                    <td>NT${item.subtotal}</td>
                    <td>
                      <img
                        src={item.image_url}
                        alt={item.product_name}
                        className="h-12 w-12 cursor-pointer"
                        onClick={() => handleImageClick(item.image_url)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 評價區 */}
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              您的評價
            </h3>
            <div className="rating">
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-orange-400"
                checked
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-orange-400"
              />
              <input
                type="radio"
                name="rating-1"
                className="mask mask-star-2 bg-orange-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 圖片模態框 */}
      <dialog id="image-modal" className="modal">
        <div className="modal-box">
          <img src={selectedImage} alt="商品大圖" className="w-full" />
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("image-modal").close()}
            >
              關閉
            </button>
          </div>
        </div>
      </dialog>

      {/* ToastContainer for toast notifications */}
      <ToastContainer />
      <Footer />
    </>
  );
}
