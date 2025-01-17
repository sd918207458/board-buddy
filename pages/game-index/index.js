import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Carousel1 from "@/components/carousel-game1";
import Sidebar from "@/components/sidebar2";
import SearchBar from '@/components/searchbar';
import Carousel2 from "@/components/carousel-game2";
import Gamecard from "@/components/gamecard";
import CreateRoomButton from "@/components/createroombutton";
// import Test from "@/components/test";
export default function Gameindex() {
  const [searchResults, setSearchResults] = useState([]); // 用于存储搜索结果
  const [allGames, setAllGames] = useState([]); // 用于存储所有游戏数据
  const [page, setPage] = useState(1); // 当前页面，用于无限滚动
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据
  const [currentCity, setCurrentCity] = useState("台北市"); // 当前显示的城市，默认是台北市

  const handleSearchResults = (results) => {
    setSearchResults(results); // 更新搜索结果
  };

  // 模拟获取数据的函数，真实情况应该是从后端获取数据
  const fetchGames = async () => {
    try {
      const response = await fetch(`http://localhost:3005/api/search`);
      const data = await response.json();
      setAllGames(data); // 存储所有游戏数据
      setSearchResults(data); // 默认显示所有游戏数据
    } catch (error) {
      console.error("获取游戏数据失败:", error);
    }
  };

  useEffect(() => {
    fetchGames(); // 获取初始数据
  }, []);

  useEffect(() => {
    if (searchResults.length === 0) {
      setHasMore(false); // 没有更多数据
    }
  }, [searchResults]);

  // 处理滚动事件
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (bottom && hasMore) {
      setPage((prevPage) => prevPage + 1); // 加载更多数据
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // 监听滚动事件
    return () => {
      window.removeEventListener("scroll", handleScroll); // 清理事件监听
    };
  }, [hasMore]);

  // 模拟店家数据，可以替换为真实的 API 数据
  const cityStores = {
    "台北市": [
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", name: "Grow Life 靠過來桌遊咖啡廳", address: "台北市中正區新生南路一段160巷18-1號", time: "週一、週三～週日：13:00~22:00", phone: "0905-428-741"},
      { image: "https://live.staticflickr.com/3795/9713327337_a057bc96e0_m.jpg", name: "桌遊天空城", address: "台北市中山區長安東路一段24-2號2F", time: "週一～週日：14:00~22:00", phone: "02-2593-1307"},
      { image: "https://live.staticflickr.com/2819/34202307922_a229424d0d_n.jpg", name: "風和桌遊空間", address: "台北市中山區八德路二段59-1號", time: "週一～週日：14:00~22:00", phone: "0983-309-133"},
      { image: "https://live.staticflickr.com/455/31803471695_a3681235d9_n.jpg", name: "木木日子桌遊", address: "台北市信義區松德路12-3號", time: "週二～週日：14:00~22:00", phone: "0972-065-720"},
      { image: "https://live.staticflickr.com/853/42075104460_3c6f3a9a0b_n.jpg", name: "Swan Cafe 天鵝桌遊店", address: "台北市文山區羅斯福路五段170巷37號", time: "週五～週日：13:00~21:00", phone: "02-2930-8983"},
      { image: "https://live.staticflickr.com/7029/6579061379_d8615e3ef3_n.jpg", name: "Magic Star桌遊", address: "台北市大安區和平東路二段231號", time: "週一～週日：15:00~21:30", phone: "02-2701-8400"},
    ],
    "桃園市": [
      { image: "https://live.staticflickr.com/3043/2791817603_7e6d838c30_n.jpg", name: "悠遊桌遊屋", address: "桃園市桃園區建國路162號", time: "週一～週日：12:00~22:00", phone: "03-345-6789" },
      { image: "https://live.staticflickr.com/4010/35441885492_d9e5a1fbd6_n.jpg", name: "桌遊小宇宙", address: "桃園市中壢區中原大學附近", time: "週一～週日：14:00~23:00", phone: "03-456-7890" },
      { image: "https://live.staticflickr.com/7771/29855733900_693c89e90c_m.jpg", name: "綠野桌遊咖啡", address: "桃園市龜山區建國北路88號", time: "週一～週日：13:00~21:00", phone: "03-234-5678" },
      { image: "https://live.staticflickr.com/7335/16464157696_5ef0e35a77_n.jpg", name: "桌遊共和國", address: "桃園市平鎮區環北路236號", time: "週二～週日：14:00~22:00", phone: "03-987-6543" },
      { image: "https://live.staticflickr.com/65535/52488385590_19edb09830_m.jpg", name: "玩吧桌遊", address: "桃園市八德區建國路250號", time: "週一～週日：11:00~20:00", phone: "03-543-2167" },
      { image: "https://live.staticflickr.com/1124/1320129609_b4d76a50d9_n.jpg", name: "Happy Game桌遊咖啡", address: "桃園市龍潭區中興路25號", time: "週三～週日：13:00~22:30", phone: "03-789-1234" }
    ],
    // 添加其他城市的店家数据
    "台中市": [
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "桌遊小站", "address": "台中市南區建國北路169號", "time": "週一～週日：13:00~22:00", "phone": "04-2222-3333" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "歡樂桌遊坊", "address": "台中市北區健行路188號", "time": "週一～週日：14:00~23:00", "phone": "04-4444-5555" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "遊戲王國", "address": "台中市西屯區文華路118號", "time": "週一～週日：12:00~22:30", "phone": "04-6666-7777" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "樂玩桌遊館", "address": "台中市西區民權路246號", "time": "週二～週日：14:00~21:30", "phone": "04-8888-9999" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "桌遊咖啡館", "address": "台中市南屯區公益路二段45號", "time": "週一～週日：10:00~20:00", "phone": "04-1234-5678" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "神奇桌遊館", "address": "台中市大里區大明路133號", "time": "週一～週日：13:00~22:00", "phone": "04-8765-4321" }
    ],
    "台南市": [
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "骰子日桌遊咖啡", "address": "台南市中西區忠義路二段12號", "time": "週一～週日：13:00~22:00", "phone": "06-123-4567" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "迷你冒險桌遊館", "address": "台南市東區崇善路100號", "time": "週二～週日：14:00~22:00", "phone": "06-234-5678" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "桌遊王國", "address": "台南市永康區中正北路50號", "time": "週一～週日：12:00~23:00", "phone": "06-345-6789" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "魔法桌遊吧", "address": "台南市北區開元路300號", "time": "週三～週日：14:00~21:00", "phone": "06-987-6543" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "桌遊樂園", "address": "台南市安平區健康路三段150號", "time": "週一～週日：12:00~22:00", "phone": "06-543-2167" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "樂趣桌遊館", "address": "台南市新化區中山路40號", "time": "週二～週日：13:00~22:30", "phone": "06-789-1234" }
    ],
    "高雄市": [
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "桌遊基地", "address": "高雄市新興區中山一路100號", "time": "週一～週日：14:00~23:00", "phone": "07-123-4567" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "騎士堡桌遊咖啡", "address": "高雄市鼓山區明誠三路456號", "time": "週二～週日：13:00~22:00", "phone": "07-890-1234" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "樂桌遊樂園", "address": "高雄市左營區裕誠路789號", "time": "週一～週日：12:00~22:00", "phone": "07-456-7890" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "森林桌遊咖啡館", "address": "高雄市前鎮區中華五路123號", "time": "週二～週日：13:00~21:30", "phone": "07-234-5678" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "桌遊天堂", "address": "高雄市苓雅區成功一路321號", "time": "週三～週日：15:00~22:00", "phone": "07-678-9012" },
      { image: "https://live.staticflickr.com/4450/37923973701_ed2c659fbc_n.jpg", "name": "Game Village桌遊村", "address": "高雄市鳳山區光遠路456號", "time": "週一～週日：13:00~23:00", "phone": "07-987-6543" }
    ]
  };

  return (
    <>
      <div className="bg-[#003E52]">
        <Carousel1 />
        <SearchBar onSearchResults={handleSearchResults} /> {/* 将搜索结果传递给父组件 */}

        {/* 为你精选 */}
        <Carousel2 gamesData={searchResults} />  {/* 将搜索结果传递给 Carousel2*/}

        {/* 搜索结果 */}
        <div>
          <div>
            <div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
              <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
                全部
              </button>

              <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center  border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                已成團
              </button>

              <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center  border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                未成團
              </button>

              <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center  border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                桌遊店
              </button>

              <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center  border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                Home Game
              </button>
            </div>
          </div>
          <Gamecard games={searchResults} /> {/* 将搜索结果传递给 Gamecard 组件 */}
        </div>

        {/* 店家位置
        <div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            台北市
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            桃園市
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            台中市
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            台南市
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            高雄市
          </button>
        </div> */}
        {/* 店家位置 */}
        <div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
          {Object.keys(cityStores).map((city) => (
            <button
              key={city}
              className={`inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 ${
                currentCity === city ? 'border-[#EFB880]' : 'border-transparent'
              } bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white`}
              onClick={() => setCurrentCity(city)} // 设置当前城市
            >
              {city}
            </button>
          ))}
        </div>

        {/* 店家信息展示 */}
        <div className="mx-16 my-5 flex flex-wrap justify-center gap-6">
            {cityStores[currentCity]?.map((store, index) => (
                <div key={index} className="relative w-full sm:w-[30%] max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img className="object-cover object-center w-full h-56" src={store.image} alt="找不到圖片" />
                <div className="flex items-center justify-center px-6 py-3 bg-gray-900">
                    <h2 className="text-[24px] font-bold text-white-600 text-center text-white">{store.name}</h2>
                </div>
                <div className="px-6 py-4">
                    <div className="flex flex-col mt-4 text-gray-700 dark:text-gray-200">
                    <h1 className="flex items-center">
                        地址: <span className="px-2 text-sm">{store.address}</span>
                    </h1>
                    <h1 className="flex items-center">
                        營業時間: <span className="px-2 text-sm">{store.time}</span>
                    </h1>
                    <h1 className="flex items-center">
                        電話: <span className="px-2 text-sm">{store.phone}</span>
                    </h1>
                    <br />
                    <div className="flex justify-center items-center">
                    <button 
  className="px-4 py-2 w-32 text-[#003E52] border border-[#003E52] bg-transparent rounded hover:bg-[#003E52] hover:text-white transition-colors"
  onClick={() => window.open('https://www.facebook.com/GrowLifegameshop/?locale=zh_TW', '_blank')}
>
  前往粉專
</button>


                    </div>
                    </div>
                </div>
                </div>
            ))}
        </div>

        
        <Sidebar />
        <CreateRoomButton/>
        <Footer />
      </div>
    </>
  );
}