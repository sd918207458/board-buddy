import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Carousel1 from "@/components/carousel-game1";
import Sidebar from "@/components/sidebar2";
import SearchBar from '@/components/searchbar';
import SearchBar2 from '@/components/searchbar2';
import Carousel2 from "@/components/carousel-game2";
import Gamecard from "@/components/gamecard";

export default function Gameindex() {
  const [searchResults, setSearchResults] = useState([]); // 用于存储搜索结果
  const [page, setPage] = useState(1); // 当前页面，用于无限滚动
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据

  const handleSearchResults = (results) => {
    setSearchResults(results); // 更新搜索结果
  };

  // 模拟获取数据的函数，真实情况应该是从后端获取数据
  const fetchGames = async (pageNumber) => {
    try {
      const response = await fetch(`http://localhost:3005/api/search`);
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false); // 没有更多数据
      } else {
        setSearchResults((prevResults) => [...prevResults, ...data]); // 将新数据添加到搜索结果中
      }
    } catch (error) {
      console.error("获取游戏数据失败:", error);
    }
  };

  useEffect(() => {
    fetchGames(page); // 获取初始数据
  }, [page]);

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

  return (
    <>
      <div className="bg-[#003E52]">
        <Navbar />
        <Breadcrumbs />
        <Carousel1 />
        <SearchBar2 />
        <SearchBar onSearchResults={handleSearchResults} /> {/* 将搜索结果传递给父组件 */}

        {/* 为你精选 */}
        <Carousel2 />

        {/* 搜索结果 */}
        <div>
          <div>
            <div>
              <div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
                <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
                  全部
                </button>

                <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                  已成团
                </button>

                <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                  未成团
                </button>

                <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                  桌游店
                </button>

                <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
                  Home Game
                </button>
              </div>
            </div>
          </div>

          <Gamecard games={searchResults} /> {/* 将搜索结果传递给 Gamecard 组件 */}
        </div>

        {/* 店家位置 */}
        <div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            北北基
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            桃竹苗
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            中彰投
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            云嘉南
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            高屏
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            花东
          </button>

          <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white">
            离岛
          </button>
        </div>

        <Sidebar />
        <Footer />
      </div>
    </>
  );
}
