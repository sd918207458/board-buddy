import React from "react";
import styles from "./Sidecart.module.css";
const Sidecart = () => {
  return (
    <div className={styles.parentContainer}>
      <aside className={styles.checkoutSummary}>
        <h3>結帳金額</h3>
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
