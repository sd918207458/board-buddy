import React from "react";
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
    return (
      <>
      <div className="bg-[#003E52]">
        <Navbar />
        <Breadcrumbs />
        <Carousel1/>
        <SearchBar2/>
        <SearchBar />

        {/* 為你精選 */}
        <Carousel2/>
{/* 搜尋結果 */}
<div>
<div>
<div>
    <div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
        <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap focus:outline-none hover:bg-[#EFB880] hover:text-white" onClick={() => {/* handle click */}}>
            全部
        </button>

        <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white" onClick={() => {/* handle click */}}>
            已成團
        </button>

        <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white" onClick={() => {/* handle click */}}>
            未成團
        </button>

        <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white" onClick={() => {/* handle click */}}>
            桌遊店
        </button>

        <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white" onClick={() => {/* handle click */}}>
            Home Game
        </button>
    </div>
</div>

</div>

<Gamecard/>

</div>
{/* 店家位置 */}
<div>
<div className="flex overflow-x-11 whitespace-nowrap mx-11 my-5">
    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        北北基
    </button>

    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        桃竹苗
    </button>

    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        中彰投
    </button>

    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        雲嘉南
    </button>

    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        高屏
    </button>

    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        花東        
    </button>

    <button className="inline-flex items-center h-12 px-4 py-2 text-[24px] text-white text-center border-b-2 border-[#EFB880] bg-transparent sm:text-[24px] dark:border-gray-500 whitespace-nowrap cursor-base focus:outline-none hover:bg-[#EFB880] hover:text-white">
        離島
    </button>
</div>
<div className="flex justify-around mx-11 my-5">
    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img className="object-cover object-center w-full h-56" src="https://imgs.gvm.com.tw/upload/gallery/20191231/70302_11.jpg"/>
        <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Board Buddy 桌遊店</h1>
            <p className="py-2 text-gray-700 dark:text-gray-400">每人1小時50元，3小時以上算包日每人150元遊戲皆會進行教學，店內不提供餐飲，有提供飲水機可自行使用當日場地消費可折抵買桌遊的費用唷！</p>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">營業時間: 11:00-22:00</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">地點: California</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">聯絡電話: 123-456-7890</h1>
            </div>
            <div className="flex justify-end mt-4">
                <button className="px-4 py-2 text-white bg-blue-500 rounded">聯絡粉專</button>
            </div>
        </div>
    </div>

    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img className="object-cover object-center w-full h-56" src="https://imgs.gvm.com.tw/upload/gallery/20191231/70302_11.jpg"/>
        <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Board Buddy 桌遊店</h1>
            <p className="py-2 text-gray-700 dark:text-gray-400">每人1小時50元，3小時以上算包日每人150元遊戲皆會進行教學，店內不提供餐飲，有提供飲水機可自行使用當日場地消費可折抵買桌遊的費用唷！</p>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">營業時間: 11:00-22:00</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">地點: California</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">聯絡電話: 123-456-7890</h1>
            </div>
            <div className="flex justify-end mt-4">
                <button className="px-4 py-2 text-white bg-blue-500 rounded">聯絡粉專</button>
            </div>
        </div>
    </div>

    <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img className="object-cover object-center w-full h-56" src="https://imgs.gvm.com.tw/upload/gallery/20191231/70302_11.jpg"/>
        <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Board Buddy 桌遊店</h1>
            <p className="py-2 text-gray-700 dark:text-gray-400">每人1小時50元，3小時以上算包日每人150元遊戲皆會進行教學，店內不提供餐飲，有提供飲水機可自行使用當日場地消費可折抵買桌遊的費用唷！</p>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">營業時間: 11:00-22:00</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">地點: California</h1>
            </div>
            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                <h1 className="px-2 text-sm">聯絡電話: 123-456-7890</h1>
            </div>
            <div className="flex justify-end mt-4">
                <button className="px-4 py-2 text-white bg-blue-500 rounded">聯絡粉專</button>
            </div>
        </div>
    </div>
</div>

<Sidebar/>

</div>
        <Footer />
</div>
    </>
    
  );
}
