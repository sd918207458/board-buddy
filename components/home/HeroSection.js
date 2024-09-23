import React from "react";

const HeroSection = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/home_assets/首頁大圖.png)", // 正確引用 public 資料夾中的圖片
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold drop-shadow-lg">
            歡迎加入桌遊世界
          </h1>
          <p className="mb-5">
            探索最新的桌遊，參加揪團活動，並與朋友一起享受遊戲的樂趣！
          </p>
          <button className="btn btn-primary">立即探索</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
