import React from "react";
import styles from "./Sidecart.module.css";
const Sidecart = () => {
  // 這裡是購物車側邊欄
  return (
    <div className={styles.parentContainer}>
      <aside className={styles.checkoutSummary}>
        <h2 className={styles.sectionTitle}>購物車內容</h2>{" "}
        {/* 主題加上 sectionTitle */}
        <div className={styles.summaryItem}>
          <span>阿瓦隆</span>
          <span>數量:1</span>
        </div>
        <h2 className={styles.sectionTitle}>結帳金額</h2>{" "}
        {/* 主題加上 sectionTitle */}
        <div className={styles.summaryItem}>
          <span>商品小計</span>
          <span>NT$490</span>
        </div>
        <div className={styles.summaryItem}>
          <span>運費</span>
          <span>+NT$130</span>
        </div>
        <div className={`${styles.summaryItem} ${styles.total}`}>
          <span>應付總額</span>
          <span>NT$620</span>
        </div>
        <button className={styles.checkoutButton}>結帳</button>
      </aside>
    </div>
  );
};

export default Sidecart;
