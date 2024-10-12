import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart"; // 引入共享的購物車邏輯
import styles from "./Sidecart.module.css";

const Sidecart = () => {
  // 使用 useCart hook 來管理購物車狀態和邏輯
  const { cartItems, totalPrice, isMounted, shippingCost } = useCart(); // 共享購物車數據

  // 檢查組件是否掛載並渲染購物車內容
  if (!isMounted) return <p>Loading...</p>;

  console.log("Sidecart Items:", cartItems); // 打印購物車內容，檢查是否同步更新
  console.log("Total Price:", totalPrice); // 打印總價，檢查是否正確更新

  return (
    <div className={styles.parentContainer}>
      <aside className={styles.checkoutSummary}>
        <h2 className={styles.sectionTitle}>購物車內容</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className={styles.summaryItem}>
              <span>{item.product_name}</span>
              <span>數量: {item.quantity}</span>
            </div>
          ))
        ) : (
          <p>購物車是空的</p>
        )}

        <h2 className={styles.sectionTitle}>結帳金額</h2>
        <div className={styles.summaryItem}>
          <span>商品小計</span>
          <span>NT${totalPrice.toLocaleString()}</span>
        </div>
        <div className={styles.summaryItem}>
          <span>運費</span>
          <span>+NT${shippingCost.toLocaleString()}</span>
        </div>
        <div className={`${styles.summaryItem} ${styles.total}`}>
          <span>應付總額</span>
          <span>NT${(totalPrice + shippingCost).toLocaleString()}</span>
        </div>
      </aside>
    </div>
  );
};

export default Sidecart;
