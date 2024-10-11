import React from "react";
import { useCart } from "@/hooks/useCart"; // 引入共享的購物車邏輯
import styles from "./Checkout.module.css"; // 引入結帳區的 CSS 模組
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Checkout = () => {
  // 使用 useCart hook 來管理購物車狀態和邏輯
  const {
    cartItems, // 購物車商品數據
    totalPrice, // 總價
    handleQuantityChange, // 更新商品數量的函數
    handleRemoveItem, // 移除商品的函數
    isMounted, // 判斷組件是否加載完成
  } = useCart();
  const MySwal = withReactContent(Swal);

  return (
    <>
      <section className={`${styles.cartContent} max-w-4xl`}>
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          購物車內容
        </h2>
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
                    {(typeof item.price === "string"
                      ? parseFloat(item.price.replace(/,/g, ""))
                      : parseFloat(item.price)) * // 如果是數字，直接轉換為數字
                      item.quantity}
                  </td>

                  <td>
                    <button
                      className={styles.removeItem}
                      onClick={() => {
                        MySwal.fire({
                          title: "確定要刪除該商品?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "確認",
                          cancelButtonText: "取消",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleRemoveItem(index); // 如果確認，則執行刪除操作
                            MySwal.fire(
                              "已刪除!",
                              "商品已從購物車中移除。",
                              "success"
                            );
                          }
                        });
                      }}
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
