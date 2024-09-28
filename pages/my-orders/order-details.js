import React, { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 引入 React Transition Group
import { useRouter } from "next/router"; // 使用 useRouter 來獲取 URL 中的訂單 ID

export default function OrderDetails() {
  const [isMounted, setIsMounted] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();
  const { order_id } = router.query; // 獲取 URL 中的訂單 ID

  // 使用 useEffect 確保動畫只在客戶端掛載後觸發
  useEffect(() => {
    setIsMounted(true); // 客戶端掛載後將 isMounted 設為 true

    if (order_id) {
      fetchOrderDetails(order_id);
    }
  }, [order_id]);

  // 從後端抓取訂單詳細資料
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/order-details/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 假設使用 JWT token 驗證
        },
      });
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

  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <TransitionGroup>
          {/* 確保動畫僅在客戶端渲染後運行 */}
          <CSSTransition
            in={isMounted}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              {/* BreadCrumbs */}
              <div className="p-4">
                <Breadcrumbs />
              </div>

              {/* 訂單明細標題 */}
              <section className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  訂單明細
                </h2>

                {/* 訂單進度追蹤 */}
                <ul className="steps steps-vertical lg:steps-horizontal justify-center w-full">
                  <li className="step step-primary">訂單建立</li>
                  <li className="step step-primary">處理中</li>
                  <li className="step">已出貨</li>
                  <li className="step">完成訂單</li>
                </ul>
              </section>

              {/* 訂單商品表單 */}
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
                        <td>${item.price}</td>
                        <td>{item.number}</td>
                        <td>${item.subtotal}</td>
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
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Footer />
    </>
  );
}
