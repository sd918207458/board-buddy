import React, { useState } from 'react';

const GameCard = () => {
    const [heartRed, setHeartRed] = useState(false);

    return (
<section className={`bg-[#003E52] dark:bg-gray-900 transition-colors duration-200 hover:bg-[#EFB880] relative w-4/5 mx-auto rounded-lg mb-6`}>
    <div className="container mx-auto py-10 border-b-2 border-[#EFB880] rounded-lg">
        <div className="lg:flex lg:items-center ">
            <img className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-48 lg:h-64" src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

            <div className="relative lg:w-1/2 lg:mx-6 rounded-lg">
                {/* 實心愛心按鈕 */}
                <button className="absolute top-2 right-2 p-1 z-10" onClick={() => setHeartRed(!heartRed)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${heartRed ? 'text-red-600' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>

                <p className="text-sm text-blue-500 uppercase">Home Game</p>

                <a href="#" className="block mt-4 text-2xl font-semibold text-white dark:text-white">
                    重策玩家請進 主玩奶酪大盜/七大奇蹟 輕鬆玩~
                </a>

                <p className="mt-3 text-sm text-gray-100 dark:text-gray-300 md:text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis sint autem nesciunt,
                    laudantium quia tempore delect
                </p>

                <a href="#" className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">詳看內文</a>

                <div className="flex items-center mt-6">
                    <img className="object-cover object-center w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt=""/>

                    <div className="mx-4">
                        <h1 className="text-sm text-gray-100 dark:text-gray-200">Miss. 林</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Host</p>
                    </div>

                    <div className="ml-4 text-sm text-gray-100 dark:text-gray-300">
                        <p>遊戲: 奶酪大盜</p>
                        <p>地點: 台北市</p>
                        <p>日期: 2024年9月30日</p>
                    </div>
                </div>

                {/* 按鈕區域 */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                    <button className="px-4 py-2 w-32 text-white bg-green-500 rounded hover:bg-green-600">聯絡房主</button>
                    <button className="px-4 py-2 w-32 text-white bg-blue-500 rounded hover:bg-blue-600">加入揪團</button>
                </div>
            </div>
        </div>
    </div>
</section>

    );
};

const GameCardList = () => {
    return (
        <div>
            <GameCard />
            <GameCard />
            <GameCard />
        </div>
    );
};

export default GameCardList;
