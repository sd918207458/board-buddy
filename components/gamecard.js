import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const GameCard = ({ game }) => {
    const router = useRouter();

    // 当点击卡片时跳转到 /game-addroom 页面并传递游戏数据
    const handleCardClick = () => {
        router.push({
            pathname: '/game-addroom',
            query: { game: JSON.stringify(game) }, // 将 game 对象转换为 JSON 字符串
        });
    };

    // 加入最爱时，将游戏数据发送到后端
    const handleAddToFavorites = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/roomheart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(game), // 将游戏数据传递到后端
            });
            if (response.ok) {
                alert('成功加入最爱!');
            } else {
                alert('加入最爱失败!');
            }
        } catch (error) {
            console.error('加入最爱时发生错误:', error);
        }
    };

    return (
        <section 
            className="bg-[#003E52] dark:bg-gray-900 transition-colors duration-200 hover:bg-[#EFB880] relative w-4/5 mx-auto rounded-lg mb-6 cursor-pointer"
            onClick={handleCardClick}  // 使整个卡片可以点击
        >
            <div className="container mx-auto py-10 border-b-2 border-[#EFB880] rounded-lg">
                <div className="lg:flex lg:items-center">
                    <img
                        className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-48 lg:h-64"
                        src={game.img ? `http://localhost:3005/room/${game.img}` : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"}
                        alt={game.room_name}
                        onError={(e) => {
                            e.target.onerror = null; // 防止无限循环
                            e.target.src = "https://via.placeholder.com/150"; // 替换为占位符
                        }}
                    />
                    <div className="relative lg:w-1/2 lg:mx-6 rounded-lg">
                        <p className="text-sm text-blue-500 uppercase">
                            {game.room_type === 1 ? "Home Game" : game.room_type === 2 ? "桌遊店" : ""}
                        </p>

                        <a href="#" className="block mt-4 text-2xl font-semibold text-white dark:text-white">
                            {game.room_name}
                        </a>

                        <p className="mt-3 text-sm text-gray-100 dark:text-gray-300 md:text-sm">
                            {game.room_intro}
                        </p>

                        <a href="#" className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">詳看內文</a>

                        <div className="flex items-center mt-6">
                            <img
                                className="object-cover object-center w-10 h-10 rounded-full"
                                src={game.hostImage || "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt={game.hostName || "Host"}
                            />

                            <div className="mx-4">
                                <h1 className="text-sm text-gray-100 dark:text-gray-200">{game.member_id || "Host"}</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Host</p>
                            </div>

                            <div className="ml-4 text-sm text-gray-100 dark:text-gray-300">
                                <p>遊戲: {game.game1}, {game.game2}, {game.game3}</p>
                                <p>地點: {game.location}</p>
                                <p>日期: {game.event_date}</p>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                            <button className="px-4 py-2 w-32 text-white bg-green-500 rounded hover:bg-green-600">聯絡房主</button>
                            <button 
                                className="px-4 py-2 w-32 text-white bg-blue-500 rounded hover:bg-blue-600"
                                onClick={(e) => {
                                    e.stopPropagation(); // 阻止事件冒泡
                                    handleAddToFavorites(); // 调用加入最爱处理函数
                                }}
                            >
                                加入最愛
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

GameCard.propTypes = {
    game: PropTypes.shape({
        img: PropTypes.string,
        room_id: PropTypes.string,
        member_id: PropTypes.string,
        room_type: PropTypes.number,
        room_name: PropTypes.string,
        room_intro: PropTypes.string,
        hostImage: PropTypes.string,
        hostName: PropTypes.string,
        game1: PropTypes.string,
        game2: PropTypes.string,
        game3: PropTypes.string,
        location: PropTypes.string,
        event_date: PropTypes.string,
        roomrule: PropTypes.string,
    }).isRequired,
};

const GameCardList = ({ games = [] }) => {
    return (
        <div>
            {games.map((game, index) => (
                <GameCard key={index} game={game} />
            ))}
        </div>
    );
};

GameCardList.propTypes = {
    games: PropTypes.arrayOf(PropTypes.shape({
        img: PropTypes.string,
        room_id: PropTypes.string,
        member_id: PropTypes.string,
        room_type: PropTypes.number,
        room_name: PropTypes.string,
        room_intro: PropTypes.string,
        hostImage: PropTypes.string,
        hostName: PropTypes.string,
        game1: PropTypes.string,
        game2: PropTypes.string,
        game3: PropTypes.string,
        location: PropTypes.string,
        event_date: PropTypes.string,
        roomrule: PropTypes.string,
    })),
};

export default GameCardList;
