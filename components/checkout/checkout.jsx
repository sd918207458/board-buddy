import React from "react";
import { useState } from "react";
import styles from "./Checkout.module.css"; // 引入結帳區的 CSS 模組

const Checkout = () => {
  // state to manage which radio is selected
  const [selectedOption, setSelectedOption] = useState("default");

  // handle radio button change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <section className={styles.cartContent}>
        <h2>購物車內容</h2>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>商品明細</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.productInfo}>
                <img
                  src="https://i.postimg.cc/XYdbSzx8/image.png"
                  alt="商品"
                  className={styles.productImage}
                />
                <span>大鍋炒 Wok on Fire</span>
              </td>
              <td>NT$490</td>
              <td>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </td>
              <td>NT$490</td>
              <td>
                <button className={styles.removeItem}>×</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Checkout;
