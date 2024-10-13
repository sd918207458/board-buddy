import React, { useState } from "react";
import Link from "next/link";

const OrderRow = ({ order }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCancellable = order.status !== "Canceled";

  // 訂單狀態高亮顯示顏色
  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-800",
    Shipped: "bg-blue-200 text-blue-800",
    Delivered: "bg-green-200 text-green-800",
    Canceled: "bg-red-200 text-red-800",
  };

  // 提取第一筆商品的圖片
  const firstItemImage = order.items[0]?.image;
  // 在這裡使用 console.log 來檢查 order.address 的結構
  console.log(order.address);
  return (
    <tr
      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="text-left py-4">
        <div className="text-gray-800 dark:text-gray-200 font-bold">
          {order.orderId}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {new Date(order.date).toLocaleString()} {/* 格式化日期 */}
        </div>
      </td>
      <td className="text-center">
        {/* 只顯示第一筆商品圖片 */}
        {firstItemImage ? (
          <img
            src={firstItemImage}
            alt={`商品圖片`}
            className="w-12 h-12 object-cover rounded-md"
          />
        ) : (
          <div className="text-sm text-gray-500">無圖片</div>
        )}
      </td>
      {/* 多一個address因為這裡是物件 */}
      <td className="text-left">{order.address.address}</td>
      {/* <td className="text-left">
        {order.address
          ? `${order.address}, ${order.address.city}, ${order.address.district}`
          : "無地址"}
      </td> */}
      {/* <td className="text-left">{order.address ? order.address : "無地址"}</td> */}
      {/* <div>{JSON.stringify(order.address)}</div>; */}
      <td className="text-right">{`NT$${order.total}`}</td>
      <th className="flex gap-2 justify-center m-3">
        <Link href={`/my-orders/${order.orderId}`} legacyBehavior>
          <a className="btn btn-primary btn-xs bg-[#003E52] transition-transform hover:scale-105">
            訂單詳情
          </a>
        </Link>
        {isCancellable && (
          <Link href={`/my-orders/${order.orderId}/request`} legacyBehavior>
            <a
              className="btn btn-secondary btn-xs transition-transform hover:scale-105"
              onClick={() =>
                localStorage.setItem(
                  "selectedOrderForReturn",
                  JSON.stringify(order)
                )
              }
            >
              退貨處理
            </a>
          </Link>
        )}
        {isHovered && (
          <div className="absolute p-4 left-56 bg-white dark:bg-gray-700 shadow-md rounded-lg">
            <p>訂單編號: {order.orderId}</p>
            <p>總金額: NT${order.total}</p>
          </div>
        )}
      </th>
    </tr>
  );
};

const OrderTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table w-full border-separate border-spacing-y-2">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            <th className="text-left py-4">訂單編號</th>
            <th className="text-center">商品圖片</th>
            <th className="text-left">運送地址</th>
            <th className="text-right">合計</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.orderId} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
