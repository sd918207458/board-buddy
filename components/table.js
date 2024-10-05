import React from "react";
import Link from "next/link";

// 定義表格行組件
const OrderRow = ({ order }) => {
  const isCancellable = order.status !== "Canceled";

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out">
      <th className="text-center">{/* 可選的 checkbox 可保留或移除 */}</th>
      <td className="text-left">
        <div className="text-gray-800 dark:text-gray-200 font-bold">
          {order.orderNumber}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {order.date}
        </div>
      </td>
      <td className="text-center">
        <span className="text-gray-700 dark:text-gray-300">{order.status}</span>
      </td>
      <td className="text-center">{order.totalItems}</td>{" "}
      {/* 顯示訂單內商品總數 */}
      <td className="text-left">{order.shippingAddress}</td>{" "}
      {/* 顯示運送地址 */}
      <td className="text-right">{`NT$${order.totalAmount}`}</td>
      <th className="flex gap-2 justify-center m-3">
        <Link href={`/my-orders/${order.id}`} legacyBehavior>
          <a className="btn btn-neutral bg-[#003E52] btn-xs transition-transform hover:scale-105">
            訂單詳情
          </a>
        </Link>
        {isCancellable && (
          <Link href={`/my-orders/${order.id}/request`} legacyBehavior>
            <a className="btn btn-neutral bg-[#003E52] btn-xs transition-transform hover:scale-105">
              退貨處理
            </a>
          </Link>
        )}
      </th>
    </tr>
  );
};

// 主表格組件
const OrderTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table w-full">
        {/* 表頭 */}
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            <th className="text-center">{/* 可以選擇是否保留 checkbox */}</th>
            <th className="text-left">訂單編號</th>
            <th className="text-center">訂單狀態</th>
            <th className="text-center">商品總數</th>{" "}
            {/* 新增「商品總數」欄位 */}
            <th className="text-left">運送地址</th> {/* 新增「運送地址」欄位 */}
            <th className="text-right">合計</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {/* 動態生成表格行 */}
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
