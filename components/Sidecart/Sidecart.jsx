import React, { useEffect, useState } from "react";
import styles from "./Sidecart.module.css";

const Sidecart = () => {
  // 狀態管理購物車內容和總價
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingCost = 130; // 固定運費

  // 在頁面加載時從 localStorage 取得購物車內容
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    // 計算總價
    const storedTotalPrice = storedCartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace(/,/g, "")); // 移除逗號並轉換為數字
      return total + itemPrice * item.quantity;
    }, 0);
    setTotalPrice(storedTotalPrice);
  }, []);

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
        <button className={styles.checkoutButton}>結帳</button>
      </aside>
    </div>
  );
};

export default Sidecart;
