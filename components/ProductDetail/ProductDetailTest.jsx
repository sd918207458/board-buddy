import React, { useState, useEffect } from "react";
import styles from "./ProductDetail.module.css";
import Image from "next/image";
import { CiHeart } from "react-icons/ci"; // 空心愛心
import { FaHeart } from "react-icons/fa"; // 實心愛心

const ProductDetailTest = () => {
  const [product, setProduct] = useState(null); // 存儲 API 返回的產品數據
  const [liked, setLiked] = useState(false); // 收藏狀態
  const [loading, setLoading] = useState(true); // 加載狀態
  const [error, setError] = useState(null); // 錯誤狀態

  // 模擬 API 請求，根據產品 ID 獲取產品詳情
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/productsGame/1"
        ); // 替換為實際 API 地址和產品 ID
        const data = await response.json();
        setProduct(data); // 設置產品數據
        setLoading(false); // 加載完成
      } catch (err) {
        setError("Failed to fetch product data");
        setLoading(false); // 加載完成但出現錯誤
      }
    };

    fetchProduct();
  }, []);

  // 切換收藏狀態
  const toggleLike = () => {
    setLiked(!liked);
  };

  if (loading) {
    return <p>Loading...</p>; // 加載中顯示的內容
  }

  if (error) {
    return <p>{error}</p>; // 錯誤信息顯示
  }

  return (
    product && (
      <div className={styles.blueBackground}>
        <div className={styles["product-container"]}>
          <div className={styles["product-image"]}>
            <Image
              src="https://i.postimg.cc/MGFg5m5k/4.png" // 這裡可以使用 product.image
              width={800}
              height={800}
              alt={product.product_name}
            />
          </div>
          <div className={styles["product-details"]}>
            <div className={styles["product-title"]}>
              {product.product_name}
            </div>
            <div className={styles["product-price"]}>${product.price}</div>
            <div className={styles["product-description"]}>
              <span>| {product.author}</span>
              <span> | </span>
              <span> {product.publisher}</span>
              <br />
              <br />
              {product.description}
            </div>
            <div className={styles["product-quantity"]}>
              數量:
              <div className={styles["quantity-selector"]}>
                <div className="sm:order-1">
                  <div className="mx-auto flex h-8 items-stretch text-gray-600">
                    <button className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                      -
                    </button>
                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                      1
                    </div>
                    <button className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["button-container"]}>
              <a
                href="#"
                className={`${styles["add-to-cart"]} transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800`}
              >
                加入購物車
              </a>
              <a
                href="#"
                onClick={toggleLike}
                className={`${styles["wishlist"]} transition-all duration-200 ease-in-out focus:shadow hover:bg-red-800 flex items-center`}
              >
                {liked ? (
                  <FaHeart
                    color="red"
                    size={24}
                    className={styles["wishlist-icon"]}
                  />
                ) : (
                  <CiHeart size={24} className={styles["wishlist-icon"]} />
                )}
                加入收藏
              </a>
            </div>
          </div>
        </div>

        {/* orderDetailDes */}
        <div className={styles.container}>
          <div className={styles["flex-nav"]}>
            <div className={styles.hoverable}>
              <a href="#introduction">遊戲介紹</a>
            </div>
            <div className={styles.hoverable}>
              <a href="#rules">遊戲規則</a>
            </div>
            <div className={styles.hoverable}>
              <a href="#info">出版資訊</a>
            </div>
          </div>

          <div id="introduction" className={styles.section}>
            <h2 className={styles.subtitle}>遊戲介紹</h2>
            <p className={styles.paragraph}>{product.description}</p>
          </div>

          <div id="rules" className={styles.section}>
            <h2 className={styles.subtitle}>遊戲規則</h2>
            <p className={styles.paragraph}>遊戲規則變數</p>
          </div>

          <div id="info" className={styles.section}>
            <h2 className={styles.subtitle}>出版資訊</h2>
            <div className={styles.info}>
              <p className={styles.paragraph}>
                <strong>遊戲出版：</strong> {product.publisher}
              </p>
              <p className={styles.paragraph}>
                <strong>遊戲設計：</strong> {product.author}
              </p>
              <p className={styles.paragraph}>
                <strong>人數：</strong> {product.min_players} -{" "}
                {product.max_players} 人
              </p>
              <p className={styles.paragraph}>
                <strong>時間：</strong> {product.min_playtime} -{" "}
                {product.max_playtime} 分鐘
              </p>
              <p className={styles.paragraph}>
                <strong>年齡：</strong> {product.age} 歲以上
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetailTest;
