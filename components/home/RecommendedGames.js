import React from "react";

const RecommendedGames = () => {
  return (
    <section className="mt-10 py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">為您推薦的桌遊</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="card w-96 bg-gray-100 shadow-lg">
          <figure>
            <img src="/home_assets/桌遊推薦.jpg" alt="推薦桌遊1" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">瘋狂猜謎 - 聚會必備</h2>
            <p>適合家庭聚會與朋友同樂，享受猜謎的樂趣。</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">立即購買</button>
            </div>
          </div>
        </div>
        {/* 其他推薦桌遊卡片 */}
      </div>
    </section>
  );
};

export default RecommendedGames;
