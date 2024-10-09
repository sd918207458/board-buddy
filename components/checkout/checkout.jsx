import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Checkout.module.css"; // 引入結帳區的 CSS 模組

const Checkout = () => {
  // state to manage which radio is selected
  const [selectedOption, setSelectedOption] = useState("default");

  // handle radio button change
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // v1 購物車
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // 判斷是否加載完畢

  useEffect(() => {
    // 確保只在客戶端加載購物車數據
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(storedCartItems);

      // 計算總價
      const storedTotalPrice = storedCartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/,/g, "")); // 移除逗號並轉換為數字
        return total + itemPrice * item.quantity;
      }, 0);
      setTotalPrice(storedTotalPrice);
    }
  }, []);

  if (!isMounted) {
    return null; // 防止伺服器渲染不一致
  }

  // 更新商品數量
  const handleQuantityChange = (index, amount) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity + amount > 0) {
      newCartItems[index].quantity += amount;
      setCartItems(newCartItems);

      // 更新 localStorage 中的購物車
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      updateTotalPrice(newCartItems);
    }
  };

  // 移除商品
  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);

    // 更新 localStorage 中的購物車
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    updateTotalPrice(newCartItems);
  };

  // 更新總價
  const updateTotalPrice = (items = []) => {
    // 確保 items 是一個有效的陣列
    if (!Array.isArray(items)) {
      return;
    }

    const total = items.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price.replace(/,/g, "")); // 移除價格中的逗號並轉為數字
      return sum + itemPrice * item.quantity;
    }, 0);

    setTotalPrice(total);
  };
  // 這裡是結帳購物車內容
  return (
    <>
      <section className={`${styles.cartContent} max-w-4xl`}>
        <h2>購物車內容</h2>
        <table className={styles.cartTable}>
          <thead>
            <tr>
              <th>商品明細</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
              {/* <th>操作</th> */}
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td className={styles.productInfo}>
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className={styles.productImage}
                    />
                    <span>{item.product_name}</span>
                  </td>
                  <td>NT${item.price}</td>
                  <td>
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className={styles.button} // 使用局部 class
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className={styles.button} // 使用局部 class
                    >
                      +
                    </button>
                  </td>

                  {/* 移除逗號並計算小計，並加上千位逗號 */}
                  <td>
                    NT$
                    {(
                      parseFloat(item.price.replace(/,/g, "")) * item.quantity
                    ).toLocaleString()}
                  </td>

                  <td>
                    <button
                      className={styles.removeItem}
                      onClick={() => handleRemoveItem(index)}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">購物車是空的</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={styles.totalSection}>
          {/* 總價加上千位逗號 */}
          <h2>應付總額: NT${totalPrice.toLocaleString()}</h2>
        </div>
      </section>
    </>
  );
};

export default Checkout;
