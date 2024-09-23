import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Createroom() {
  const [gameTitles, setGameTitles] = useState([""]); // 初始為一個空的輸入框

  const addGameTitle = () => {
    setGameTitles([...gameTitles, ""]); // 增加一個新的空輸入框
  };

  const handleGameTitleChange = (index, value) => {
    const updatedTitles = [...gameTitles];
    updatedTitles[index] = value; // 更新特定索引的遊玩遊戲標題
    setGameTitles(updatedTitles);
  };

  const handleSubmit = () => {
    // 在這裡添加送出的邏輯
    console.log("送出資料:", { gameTitles });
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="bg-[#003E52] min-h-screen">
        <div className="columns-2 flex m-auto size-4/5 rounded border-2 border-slate-200 p-4 relative">
          <div className="m-auto">
            <div className="pt-3.5">
              <label htmlFor="username" className="block text-sm text-gray-500 dark:text-gray-300">揪團標題</label>
              <input type="text" placeholder="請輸入標題" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300" />
            </div>
            <div className="pt-3.5">
              <label htmlFor="Description" className="block text-sm text-gray-500 dark:text-gray-300">揪團簡介</label>
              <textarea placeholder="請輸入簡介" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
            </div>
            <div className="pt-3.5">
              <label htmlFor="image" className="block text-sm text-gray-500 dark:text-gray-300">揪團圖片</label>
              <input type="file" className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
            </div>
            
            {/* 遊玩遊戲輸入框 */}
            <div className="pt-3.5">
              <label htmlFor="gameTitle" className="block text-sm text-gray-500 dark:text-gray-300">遊玩遊戲</label>
              {gameTitles.map((title, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleGameTitleChange(index, e.target.value)}
                    placeholder="請輸入遊玩遊戲"
                    className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  />
                </div>
              ))}
              <button type="button" className="mt-2 p-2 bg-blue-500 text-white rounded-lg" onClick={addGameTitle}>+</button>
            </div>
          </div>

          <div className="m-auto">
            <div className="pt-3.5">
              <label htmlFor="activityday" className="block text-sm text-gray-500 dark:text-gray-300">揪團時間</label>
              <input type="date" placeholder="datetime" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
            </div>
            <div className="flex justify-between">
              <div className="pt-3.5">
                <label htmlFor="minParticipants" className="block text-sm text-gray-500 dark:text-gray-300">最少幾人</label>
                <input type="text" placeholder="人數" className="block mt-2 w-2/5 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
              </div>
              <div className="pt-3.5">
                <label htmlFor="maxParticipants" className="block text-sm text-gray-500 dark:text-gray-300">最多幾人</label>
                <input type="text" placeholder="人數" className="block mt-2 w-2/5 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
              </div>
            </div>
            <div className="pt-3.5">
              <label htmlFor="address" className="block text-sm text-gray-500 dark:text-gray-300">揪團地址</label>
              <textarea placeholder="請輸入地址" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
            </div>
            <div className="pt-3.5">
              <label htmlFor="rules" className="block text-sm text-gray-500 dark:text-gray-300">揪團規則</label>
              <textarea placeholder="請輸入規則" className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"></textarea>
            </div>
          </div>
          
          {/* 送出按鈕，放在框線裡面，並在最右下角 */}
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleSubmit}
              className="bg-[#EFB880] text-white px-4 py-2 rounded-lg hover:bg-[#d6a057]"
            >
              送出
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
