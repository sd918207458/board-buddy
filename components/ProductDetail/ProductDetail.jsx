import React from "react";
import styles from "./ProductDetail.module.css";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci"; // 空心愛心
import { FaHeart } from "react-icons/fa"; // 實心愛心

const ProductDetail = () => {
  // 你的現有邏輯
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked); // 切換喜歡的狀態
  };

  return (
    <div className={styles.blueBackground}>
      <div className={styles["product-container"]}>
        <div className={styles["product-image"]}>
          <Image
            src="https://i.postimg.cc/MGFg5m5k/4.png"
            width={800}
            height={800}
            alt="暗影迷途"
          />
        </div>
        <div className={styles["product-details"]}>
          <div className={styles["product-title"]}>暗影迷途</div>
          <div className={styles["product-price"]}>$850</div>
          {/* <div className={styles["product-rating"]}><span>★★★★☆</span> 4.0/5</div> */}
          <div className={styles["product-description"]}>
            <span>| 王梓涵</span>
            <span> | </span>
            <span> 謎夜遊戲出版</span>
            <br />
            <br />
            《暗影迷途》是一款合作推理遊戲，玩家們是陷入一座神秘古堡中的探險隊，必須在重重迷霧與陰謀中找出逃脫的線索。每位玩家擁有不同的技能與背景，透過分享資訊和解讀謎題，一步步揭開古堡背後的秘密。但時間有限，暗影中的威脅逐漸逼近，玩家必須快速做出決策。
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
              {/* <button
                type="button"
                className="flex items-center justify-center rounded-md bg-black text-white hover:bg-gray-200 px-4 transition hover:bg-black hover:text-white"
              >
                -
              </button>
              <input
                type="text"
                defaultValue={2}
                className="flex w-full items-center justify-center  px-4 text-xs uppercase transition text-center bg-transparent"
              />
              <button
                type="button"
                className="flex items-center justify-center rounded-md bg-black text-white hover:bg-gray-200 px-4 transition hover:bg-black hover:text-white"
              >
                +
              </button> */}
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
              {/* <CiHeart className={styles["wishlist-icon"]} />  */}
              {liked ? (
                <FaHeart
                  color="red"
                  size={24}
                  className={styles["wishlist-icon"]}
                /> // 實心愛心（已收藏）
              ) : (
                <CiHeart size={24} className={styles["wishlist-icon"]} /> // 空心愛心（未收藏）
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
        {/* <h1 className={styles.title}>遊戲介紹</h1> */}
        <div id="introduction" className={styles.section}>
          <h2 className={styles.subtitle}>遊戲介紹</h2>
          <p className={styles.paragraph}>
            《暗影迷途》是一款合作推理遊戲，玩家們是陷入一座神秘古堡中的探險隊，必須在重重迷霧與陰謀中找出逃脫的線索。每位玩家擁有不同的技能與背景，透過分享資訊和解讀謎題，一步步揭開古堡背後的秘密。但時間有限，暗影中的威脅逐漸逼近，玩家必須快速做出決策。
          </p>
        </div>

        <div id="rules" className={styles.section}>
          <h2 className={styles.subtitle}>遊戲規則</h2>
          <p className={styles.paragraph}>
            玩家需要合作探索古堡，翻開隱藏的卡片解鎖房間，並運用各自的能力來破解謎題。每回合暗影會逐漸吞噬地圖的一部分，逼迫玩家加速解謎。只要有一位玩家找到古堡出口，所有人即勝利；若所有玩家被困，遊戲失敗。
          </p>
        </div>

        <div id="info" className={styles.section}>
          <h2 className={styles.subtitle}>出版資訊</h2>
          <div className={styles.info}>
            <p className={styles.paragraph}>
              <strong>遊戲出版：</strong>新天鵝堡
            </p>
            <p className={styles.paragraph}>
              <strong>遊戲設計：</strong>Jean-Louis Roubira
            </p>
            <p className={styles.paragraph}>
              <strong>人數：</strong>3-6人
            </p>
            <p className={styles.paragraph}>
              <strong>時間：</strong>30分鐘
            </p>
            <p className={styles.paragraph}>
              <strong>年齡：</strong>8歲以上
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
