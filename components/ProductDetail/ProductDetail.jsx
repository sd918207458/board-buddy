import React from 'react'
import styles from './ProductDetail.module.css'
import Image from 'next/image'
import { useState } from 'react';
import { CiHeart } from "react-icons/ci"; // 空心愛心
import { FaHeart } from 'react-icons/fa'; // 實心愛心

const ProductDetail = () => {

 // 你的現有邏輯
 const [liked, setLiked] = useState(false);

 const toggleLike = () => {
   setLiked(!liked); // 切換喜歡的狀態
 };



  return (
    <>
    <div className={styles["product-container"]}>
     <div className={styles["product-image"]}>
    <Image
      src="https://i.postimg.cc/XYdbSzx8/image.png"
      width={500}
      height={500}
      alt="I'M FABULOUS Body Oil"
    />
    </div>
     <div className={styles["product-details"]}>
    <div className={styles["product-title"]}>I&apos;M Fabulous</div>
    <div className={styles["product-price"]}>$50</div>
    {/* <div className={styles["product-rating"]}><span>★★★★☆</span> 4.0/5</div> */}
    <div className={styles["product-description"]}>
      <span>| 作者</span>
      <span> | </span>
      <span> 出版社</span>
      <br />
      <br />
      The French aromatherapy brand combines fatty hazelnut, sesame and grape
      seed oils, along with helichrise oil for its regenerating properties.
      Rosemary and sage impart a firming effect, while petitgrain and lavender
      give the moisturizer its balanced scent. As with all oils, pat it onto
      slightly damp skin for maximum hydration.
    </div>
    <div className={styles["product-quantity"]}>
      數量:
      <div className={styles["quantity-selector"]}>
  <button
    type="button"
    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
  >
    -
  </button>
  <input
    type="text"
    defaultValue={2}
    className="flex w-full items-center justify-center  px-4 text-xs uppercase transition text-center"
  />
  <button
    type="button"
    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
  >
    +
  </button>
</div>

    </div>
    <div className={styles["button-container"]}>
  <a href="#" className={`${styles["add-to-cart"]} transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800`}>
    加入購物車
  </a>
  <a href="#" onClick={toggleLike}  className={`${styles["wishlist"]} flex items-center`}>
    {/* <CiHeart className={styles["wishlist-icon"]} />  */}
    {liked ? (
          <FaHeart color="red" size={24}  className={styles["wishlist-icon"]}  /> // 實心愛心（已收藏）
        ) : (
          <CiHeart size={24}  className={styles["wishlist-icon"]} /> // 空心愛心（未收藏）
        )}加入收藏
  </a>
</div>
  </div>
</div>

{/* orderDetailDes */}

<div className={styles.container}>
  <div className={styles["flex-nav"]}>
  <div className={styles.hoverable}>
  <a href="#introduction">遊戲介紹</a></div>
  <div className={styles.hoverable}>
  <a href="#rules">遊戲規則</a></div>
  <div className={styles.hoverable}>
  <a href="#info">出版資訊</a></div>
  </div>
  {/* <h1 className={styles.title}>遊戲介紹</h1> */}
  <div id="introduction" className={styles.section}>
    <h2   className={styles.subtitle}>遊戲介紹</h2>
    <p className={styles.paragraph}>
      《妙語說書人》是一款文字冒險遊戲，玩家扮演巧舌如簧的說書人，通過選擇詞語和故事情節來打動聽眾，影響他們的情感與選擇，探索人際互動和故事敘述的藝術。
    </p>
  </div>

  <div id="rules" className={styles.section}>
    <h2  className={styles.subtitle}>遊戲規則</h2>
    <p className={styles.paragraph}>在《妙語說書人》中，玩家需要遵循以下遊戲規則：</p>
    <ul className={styles.list}>
      <li className={styles["list-item"]}>
        1. 遊戲開始時，玩家會根據故事情境卡提出想法，決定要影響的角色情緒和方向。
      </li>
      <li className={styles["list-item"]}>
        2. 根據情境中的選項進行互動，玩家需要選擇能引發角色共鳴的詞語，影響事件中的選擇。
      </li>
      <li className={styles["list-item"]}>
        3. 故事會根據玩家的選擇影響整個劇情的情緒、反應和未來的選擇，需根據情境進行決策。
      </li>
      <li className={styles["list-item"]}>
        4. 目的是通過影響其他角色的反應，創造出最佳的劇情，成功打動聽眾獲得更多分數。
      </li>
      <li className={styles["list-item"]}>
        5. 為使情節生動有趣，玩家的選擇需帶來不可預測的結果，反映說書人的影響力。
      </li>
    </ul>
    <p className={styles.paragraph}>玩家會透過語言去說故事，需靈活應變，達成最佳結果。</p>
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


</>
  )
}

export default ProductDetail