import React, { useState } from 'react';

const cardsData = [
    {
        img: "https://imgs.gvm.com.tw/upload/gallery/20191231/70302_11.jpg",
        title: "勇者鬥惡龍",
        description: "一款經典的角色扮演遊戲，讓你探索廣闊的世界。",
        type: "RPG",
        game: "Dragon Quest",
        location: "台北",
        date: "2024-01-15"
    },
    {
        img: "https://example.com/image2.jpg",
        title: "超級瑪利歐",
        description: "一起冒險拯救公主，經典的平台遊戲。",
        type: "Platformer",
        game: "Super Mario",
        location: "台北",
        date: "2024-02-20"
    },
    {
        img: "https://example.com/image3.jpg",
        title: "傳說中的塞爾達",
        description: "解開神秘的謎題，拯救海拉魯。",
        type: "Adventure",
        game: "The Legend of Zelda",
        location: "高雄",
        date: "2024-03-30"
    },
    {
        img: "https://example.com/image4.jpg",
        title: "絕地求生",
        description: "刺激的多人競技生存遊戲，只有一人能夠勝出。",
        type: "Battle Royale",
        game: "PUBG",
        location: "台中",
        date: "2024-04-05"
    },
    {
        img: "https://example.com/image5.jpg",
        title: "動物之森",
        description: "在這個可愛的島嶼上，與動物朋友共度悠閒時光。",
        type: "Simulation",
        game: "Animal Crossing",
        location: "台南",
        date: "2024-05-10"
    },
    {
        img: "https://example.com/image6.jpg",
        title: "我的世界",
        description: "在無限的世界中自由創建與探索。",
        type: "Sandbox",
        game: "Minecraft",
        location: "新北",
        date: "2024-06-15"
    }
];

const Card = ({ img, title, description, type, game, location, date }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="relative w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img className="object-cover object-center w-full h-56" src={img} alt={title} />
            <div className="flex items-center px-6 py-3 bg-gray-900">
                <h1 className="mx-3 text-[24px] font-bold text-red-600">人數: 7/9 (已成團)</h1>
            </div>
            <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
                <p className="py-2 text-gray-700 dark:text-gray-400">{description}</p>
                <div className="flex flex-col mt-4 text-gray-700 dark:text-gray-200">
                    <h1 className="flex items-center">
                        類型: <span className="px-2 text-sm">{type}</span>
                    </h1>
                    <h1 className="flex items-center">
                        遊戲: <span className="px-2 text-sm">{game}</span>
                    </h1>
                    <h1 className="flex items-center">
                        地點: <span className="px-2 text-sm">{location}</span>
                    </h1>
                    <h1 className="flex items-center">
                        日期: <span className="px-2 text-sm">{date}</span>
                    </h1>
                </div>
            </div>
            <button 
                className={`absolute top-2 right-2 text-3xl ${isFavorite ? 'text-red-600' : 'text-white'}`} 
                onClick={toggleFavorite}
            >
                ♥
            </button>
            <button className="absolute bottom-2 right-2 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg">
                +
            </button>
        </div>
    );
};

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (cardsData.length / 3));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (cardsData.length / 3)) % (cardsData.length / 3));
    };

    return (
        <div>
            <div className="mx-11 my-5 flex items-center">
    <span className="text-[1.5rem] text-[#a16207] mr-2">★</span>
    <h1 className="text-[#a16207] text-[36px]">為您精選</h1>
</div>

            <div className="relative">
                <div className="flex justify-center space-x-4">
                    {cardsData.slice(currentIndex * 3, currentIndex * 3 + 3).map((card, index) => (
                        <Card key={index} {...card} />
                    ))}
                </div>
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded" onClick={handlePrev}>
                    &#10094;
                </button>
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
