import React, { useState } from "react";
import Link from "next/link";
<<<<<<< HEAD

import { CSSTransition, TransitionGroup } from "react-transition-group";


// 定義表格行組件
const TableRow = ({ user }) => {
  return (

    <CSSTransition key={user.id} timeout={300} classNames="fade">
      <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out">
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={user.avatar} alt={`Avatar of ${user.name}`} />
              </div>
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-gray-200">
                {user.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-300">
                {user.location}
              </div>
            </div>
          </div>
        </td>
        <td>
          <span className="text-gray-700 dark:text-gray-300">
            {user.company}
          </span>
          <br />
          <span className="badge badge-ghost badge-sm">{user.jobTitle}</span>
        </td>
        <td>{user.favoriteColor}</td>
        <th>
          <Link href="/my-orders/order-details" legacyBehavior>
            <a className="btn btn-neutral bg-[#003E52] btn-xs transition-transform hover:scale-105">
              訂單詳情
            </a>
          </Link>
          <Link href="/my-orders/request" legacyBehavior>
            <a className="btn btn-neutral bg-[#003E52] btn-xs transition-transform hover:scale-105">
              退貨處理
            </a>
          </Link>
        </th>
      </tr>
    </CSSTransition>

=======

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

  return (
    <tr
      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="text-left py-4">
        <div className="text-gray-800 dark:text-gray-200 font-bold">
          {order.orderNumber}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {order.date}
        </div>
      </td>
      <td className="text-center">
        <span className={`px-2 py-1 rounded ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </td>
      <td className="text-center">{order.totalItems}</td>
      <td className="text-left">{order.shippingAddress}</td>
      <td className="text-right">{`NT$${order.totalAmount}`}</td>
      <th className="flex gap-2 justify-center m-3">
        <Link href={`/my-orders/${order.id}`} legacyBehavior>
          <a className="btn btn-primary btn-xs  bg-[#003E52] transition-transform hover:scale-105">
            訂單詳情
          </a>
        </Link>
        {isCancellable && (
          <Link href={`/my-orders/${order.id}/request`} legacyBehavior>
            <a className="btn btn-secondary btn-xs transition-transform hover:scale-105">
              退貨處理
            </a>
          </Link>
        )}
        {isHovered && (
          <div className="absolute p-4 left-56 bg-white dark:bg-gray-700 shadow-md rounded-lg">
            <p>訂單編號: {order.orderNumber}</p>
            <p>狀態: {order.status}</p>
            <p>總金額: NT${order.totalAmount}</p>
          </div>
        )}
      </th>
    </tr>
>>>>>>> Login
  );
};

const OrderTable = ({ orders }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table w-full border-separate border-spacing-y-2">
        {/* 表頭 */}
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <tr>
            <th className="text-left py-4">訂單編號</th>
            <th className="text-center">訂單狀態</th>
            <th className="text-center">商品總數</th>
            <th className="text-left">運送地址</th>
            <th className="text-right">合計</th>
            <th className="text-center"></th>
          </tr>
        </thead>
<<<<<<< HEAD

        <TransitionGroup component="tbody">
=======
        <tbody>
>>>>>>> Login
          {/* 動態生成表格行 */}
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
<<<<<<< HEAD
        </TransitionGroup>

=======
        </tbody>
>>>>>>> Login
      </table>
    </div>
  );
};

export default OrderTable;
