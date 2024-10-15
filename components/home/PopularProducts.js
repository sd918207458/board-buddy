import React from "react";
import Image from "next/image";
import Link from "next/link";

const PopularProducts = () => {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#003E52]">
        熱門桌遊商品
      </h2>
      <div className="carousel w-full">
        {/* 第1個商品 */}
        <div id="product1" className="carousel-item relative w-full">
          <Image
            src="/home_assets/商品01.jpg"
            alt="熱門桌遊1"
            width={800} // 縮小寬度
            height={400} // 縮小高度
            className="w-full object-contain  max-w-[800px] max-h-[400px] mx-auto" // 設定最大寬高並使其居中
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#product3" className="btn btn-circle">
              ❮
            </a>
            <a href="#product2" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">策略桌遊 - 最佳選擇</h2>
            <Link href="/profile-settings/personal-info" legacyBehavior>
              <button className="btn btn-secondary mt-3">立即購買</button>
            </Link>
          </div>
        </div>

        {/* 第2個商品 */}
        <div id="product2" className="carousel-item relative w-full">
          <Image
            src="/home_assets/商品02.jpg"
            alt="熱門桌遊2"
            width={800}
            height={400}
            className="w-full object-contain  max-w-[800px] max-h-[400px] mx-auto"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#product1" className="btn btn-circle">
              ❮
            </a>
            <a href="#product3" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">經典桌遊 - 經典不敗</h2>
            <button className="btn btn-secondary mt-3">立即購買</button>
          </div>
        </div>

        {/* 第3個商品 */}
        <div id="product3" className="carousel-item relative w-full">
          <Image
            src="/home_assets/商品03.jpg"
            alt="熱門桌遊3"
            width={800}
            height={400}
            className="w-full object-contain  max-w-[800px] max-h-[400px] mx-auto"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#product2" className="btn btn-circle">
              ❮
            </a>
            <a href="#product1" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">聚會桌遊 - 朋友聚會必備</h2>
            <button className="btn btn-secondary mt-3">立即購買</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
