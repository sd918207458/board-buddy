import React from "react";

const HeroSection = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/home_assets/首頁大圖.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="mb-5 text-5xl font-bold text-white drop-shadow-lg">
            歡迎加入 Board Buddy
          </h1>
          <p className="mb-5 text-white">
            探索最新的桌遊，參加揪團活動，並與朋友一起享受遊戲的樂趣！
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
