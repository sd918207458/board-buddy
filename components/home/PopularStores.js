import React from "react";
import Image from "next/image";

const PopularStores = () => {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        熱門店家
      </h2>
      <div className="carousel w-full">
        {/* 店家1 */}
        <div id="store1" className="carousel-item relative w-full">
          <Image
            src="/home_assets/桌遊店01.jpg"
            alt="店家1"
            width={800} // 縮小寬度
            height={400} // 縮小高度
            className="w-full object-contain  max-w-[800px] max-h-[400px] mx-auto" // 設定最大寬高並使其居中
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#store3" className="btn btn-circle">
              ❮
            </a>
            <a href="#store2" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">桌遊專賣店 - 快樂桌遊</h2>
            <button className="btn btn-secondary mt-3">查看詳情</button>
          </div>
        </div>

        {/* 店家2 */}
        <div id="store2" className="carousel-item relative w-full">
          <Image
            src="/home_assets/桌遊店02.jfif"
            alt="店家2"
            width={800}
            height={400}
            className="w-full object-contain  max-w-[800px] max-h-[400px] mx-auto"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#store1" className="btn btn-circle">
              ❮
            </a>
            <a href="#store3" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">桌遊愛好者 - 樂趣無限</h2>
            <button className="btn btn-secondary mt-3">查看詳情</button>
          </div>
        </div>

        {/* 店家3 */}
        <div id="store3" className="carousel-item relative w-full">
          <Image
            src="/home_assets/桌遊店03.jfif"
            alt="店家3"
            width={800}
            height={400}
            className="w-full object-contain  max-w-[800px] max-h-[400px] mx-auto"
          />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#store2" className="btn btn-circle">
              ❮
            </a>
            <a href="#store1" className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">桌遊天堂 - 大家來玩</h2>
            <button className="btn btn-secondary mt-3">查看詳情</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularStores;
