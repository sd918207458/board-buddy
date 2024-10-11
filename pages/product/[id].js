import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // 用來捕獲動態路由參數
import { useCart } from "@/hooks/useCart"; // 引入購物車上下文
import styles from "../../components/ProductDetail/ProductDetail.module.css";

import Image from "next/image";
import { CiHeart } from "react-icons/ci"; // 空心愛心
import { FaHeart } from "react-icons/fa"; // 實心愛心
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { addToCart } = useCart(); // 從購物車上下文中取得 addToCart 函數
  const router = useRouter();
  const { id } = router.query; // 使用 useRouter 獲取 URL 中的 id

  const [product, setProduct] = useState(null); // 存儲 API 返回的產品數據
  const [liked, setLiked] = useState(false); // 收藏狀態
  const [quantity, setQuantity] = useState(1); // 數量狀態
  const [loading, setLoading] = useState(true); // 加載狀態
  const [error, setError] = useState(null); // 錯誤狀態

  // 根據產品 ID 獲取產品資料
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `http://localhost:3005/api/productsGame/${id}`
          );
          const result = await response.json();
          if (result.status === "success") {
            setProduct(result.data); // 設置產品數據到正確的資料結構
          } else {
            setError("Failed to fetch product data");
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch product data");
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  // 在頁面加載時檢查是否收藏
  useEffect(() => {
    if (product) {
      const favoriteItems =
        JSON.parse(localStorage.getItem("favoriteItems")) || [];

      const isAlreadyFavorite = favoriteItems.some(
        (item) => item.product_id === product.product_id
      );

      setLiked(isAlreadyFavorite);
    }
  }, [product]);

  // 切換收藏狀態並存儲到 localStorage
  const toggleLike = () => {
    const favoriteItems =
      JSON.parse(localStorage.getItem("favoriteItems")) || [];

    const isAlreadyFavorite = favoriteItems.some(
      (item) => item.product_id === product.product_id
    );

    let updatedFavorites;

    if (isAlreadyFavorite) {
      updatedFavorites = favoriteItems.filter(
        (item) => item.product_id !== product.product_id
      );
      toast.info("商品已移出收藏");
    } else {
      updatedFavorites = [...favoriteItems, product];
      toast.success("商品已加入收藏！");
    }

    localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites));
    setLiked(!liked);
  };

  // 增加數量，最多為9
  const increaseQuantity = () => {
    if (quantity < 9) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      toast.error("數量最多不能超過9");
    }
  };

  // 減少數量，最少為1
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    } else {
      toast.error("數量不能小於1");
    }
  };

  const handleAddToCart = () => {
    // 使用 useCart 的 addToCart 函數來將商品加入購物車
    addToCart({ ...product, quantity });
    toast.success("商品已加入購物車！");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    product && (
      <div className={styles.blueBackground}>
        <div className={styles["product-container"]}>
          <div className={styles["product-image"]}>
            <Image
              src={
                product.image
                  ? product.image
                  : "https://i.postimg.cc/5tTJJ4ST/33.png"
              }
              width={800}
              height={800}
              alt={product.product_name}
              onError={(e) =>
                (e.target.src = "https://i.postimg.cc/5tTJJ4ST/33.png")
              }
            />
          </div>
          <div className={styles["product-details"]}>
            <div className={styles["product-title"]}>
              {product.product_name}
            </div>
            <div className={styles["product-price"]}>${product.price}</div>
            <div className={styles["product-description"]}>
              <span>
                {product.min_player} - {product.max_player} 人
              </span>
              <span> | {product.author}</span>
              <span> | {product.publisher}</span>
              <br />
              <br />
              {product.description}
            </div>
            <div className={styles["product-quantity"]}>
              數量:
              <div className={styles["quantity-selector"]}>
                <div className="sm:order-1">
                  <div className="mx-auto flex h-8 items-stretch text-gray-600">
                    <button
                      className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-[#003E52] hover:text-white"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                      {quantity}
                    </div>
                    <button
                      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-[#003E52] hover:text-white"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                    <ToastContainer
                      position="top-right"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["button-container"]}>
              <button
                onClick={handleAddToCart} // 使用 addToCart 加入購物車
                className={`${styles["add-to-cart"]} transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800`}
              >
                加入購物車
              </button>
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

        {/* 下面的遊戲詳細介紹區塊 */}
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
            <p className={styles.paragraph}>{product.playrule}</p>
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
                <strong>人數：</strong> {product.min_player} -{" "}
                {product.max_player} 人
              </p>
              <p className={styles.paragraph}>
                <strong>時間：</strong> {product.mintime} - {product.maxtime}{" "}
                分鐘
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

export default ProductDetail;
