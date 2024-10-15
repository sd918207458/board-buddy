import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // 引入 Framer Motion

const GroupEvents = () => {
  const [events, setEvents] = useState([]); // 活動數據狀態

  // 模擬從 API 獲取活動數據
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // 模擬 API 返回的活動數據
        const data = [
          {
            id: 1,
            title: "週五桌遊夜 - 經典聚會",
            date: "2024年9月29日 19:00",
            location: "台北桌遊店",
            image: "/home_assets/揪團活動.jpg",
          },
          {
            id: 2,
            title: "策略桌遊比賽 - 激烈對決",
            date: "2024年10月5日 14:00",
            location: "高雄桌遊俱樂部",
            image: "/home_assets/桌遊活動2.jpg",
          },
          {
            id: 3,
            title: "派對桌遊之夜 - 一起狂歡",
            date: "2024年10月10日 18:00",
            location: "台中派對中心",
            image: "/home_assets/桌遊活動3.jpg",
          },
        ];
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* Tailwind CSS Section for Board Game Group Events */}
      <section className="mt-10 bg-[#F5F5F5] py-10">
        <h2 className="text-3xl font-bold text-center text-[#003E52] mb-8">
          桌遊揪團活動
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* 動態渲染活動卡片，限制顯示最多三筆資料 */}
          {events.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              className="card w-96 bg-white shadow-lg"
              initial={{ opacity: 0, y: 50 }} // 初始位置（不透明度0，Y軸下方50px）
              whileInView={{ opacity: 1, y: 0 }} // 當卡片進入視口時動畫啟動
              viewport={{ once: false }} // 僅在第一次進入視口時觸發動畫
              transition={{
                delay: index * 0.1, // 每張卡片動畫延遲0.2秒
                duration: 0.5, // 動畫持續時間
                type: "spring", // 彈簧效果，讓動畫更自然
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05, // 懸停時放大卡片
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)", // 懸停時添加陰影效果
              }}
            >
              <figure className="h-64 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="object-cover h-full w-full" // 固定圖片尺寸並確保比例顯示
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-[#003E52]">{event.title}</h2>
                <p className="text-gray-700">時間：{event.date}</p>
                <p className="text-gray-700">地點：{event.location}</p>
                <div className="card-actions justify-end">
                  <button className="btn bg-[#003E52] text-white hover:bg-[#004d63] focus:bg-[#002f42]">
                    參加活動
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default GroupEvents;
