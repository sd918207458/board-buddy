import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/router";

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  const { id } = router.query; // 使用 id 代替 order_id

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
        } else {
          setError(result.message || "無法獲取訂單資料");
        }
      } catch (error) {
        setError("伺服器錯誤，無法獲取訂單資料");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(id);
  }, [router.isReady, id]);

  if (loading) return <div className="text-center">載入中...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

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
              <li className="step step-primary">訂單建立</li>
              <li className="step step-primary">處理中</li>
              <li
                className={`step ${orderDetails.shipped ? "step-primary" : ""}`}
              >
                已出貨
              </li>
              <li
                className={`step ${
                  orderDetails.completed ? "step-primary" : ""
                }`}
              >
                完成訂單
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
                {orderDetails.map((item) => (
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
                        className="h-12 w-12"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
