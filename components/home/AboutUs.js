import React from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // 引入 Framer Motion

const AboutUs = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        {/* 標題與描述部分 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-[#003E52] mb-6">關於我們</h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            我們的平台旨在為桌遊愛好者提供一個完整的體驗。不論你是資深桌遊玩家還是剛開始接觸桌遊的新手，我們都為你提供豐富的桌遊產品、揪團活動以及購物體驗。與我們一起，進入精彩的桌遊世界吧！
          </p>
        </motion.div>

        {/* 主要功能區塊 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 桌遊揪團卡片 */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-left">
              <h3 className="text-3xl font-semibold text-[#003E52] mb-4">
                桌遊揪團
              </h3>
              <p className="text-gray-700 mb-6">
                想參加桌遊揪團活動嗎？我們提供線上與線下的桌遊活動，讓你輕鬆找到志同道合的玩家。無論是家庭聚會還是策略對決，我們的揪團系統將幫助你快速加入最適合的活動！
              </p>
              <Link href="/profile-settings" legacyBehavior>
                <button className="btn bg-[#003E52] text-white hover:bg-[#004d63] focus:bg-[#002f42]">
                  立即揪團
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/home_assets/桌遊揪團.png"
              className="rounded-lg shadow-lg max-h-auto"
              alt="桌遊揪團"
            />
          </motion.div>

          {/* 桌遊購物卡片 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/home_assets/桌遊購物.jpg"
              className="rounded-lg shadow-lg"
              alt="桌遊購物"
            />
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-left">
              <h3 className="text-3xl font-semibold text-[#003E52] mb-4">
                桌遊購物
              </h3>
              <p className="text-gray-700 mb-6">
                我們為你精選了最受歡迎的桌遊產品。從經典的策略遊戲到輕鬆的派對桌遊，你都可以在我們的平台上輕鬆購買，並享受快速配送服務。
              </p>
              <Link href="/profile-settings" legacyBehavior>
                <button className="btn bg-[#003E52] text-white hover:bg-[#004d63] focus:bg-[#002f42]">
                  開始購物
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 特色介紹區塊 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/home_assets/策略桌遊.jpg"
              alt="策略遊戲"
              className="mx-auto mb-4"
            />
            <h4 className="text-2xl font-semibold text-[#003E52]">策略桌遊</h4>
            <p className="text-gray-700 mt-2">
              提供最具挑戰性的策略桌遊，讓你的每一步決策都影響勝負。
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/home_assets/家庭桌遊.jpg"
              alt="家庭桌遊"
              className="mx-auto mb-4"
            />
            <h4 className="text-2xl font-semibold text-[#003E52]">家庭桌遊</h4>
            <p className="text-gray-700 mt-2">
              家庭聚會的最佳選擇，讓全家人享受桌遊時光。
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/home_assets/派對桌遊.jpg"
              alt="派對桌遊"
              className="mx-auto mb-4"
            />
            <h4 className="text-2xl font-semibold text-[#003E52]">派對桌遊</h4>
            <p className="text-gray-700 mt-2">
              提供最有趣的派對桌遊，讓你的派對充滿笑聲和競賽。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
