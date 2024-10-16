import React, { useState } from 'react';

const Card = ({ img, title, description, type, game, location, date }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="relative w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {img && <img className="object-cover object-center w-full h-56" src={img} alt={title} />}
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

const Carousel = ({ gamesData }) => {
    console.log('接收到的游戏数据:', gamesData);
    
    const displayedGamesData = [...gamesData]
        .sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
        .slice(0, 6);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNext = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(displayedGamesData.length / 3));
            setIsVisible(true);
        }, 300);
    };

    const handlePrev = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(displayedGamesData.length / 3)) % Math.ceil(displayedGamesData.length / 3));
            setIsVisible(true);
        }, 300);
    };

    return (
        <div>
            <div className="mx-11 my-5 flex items-center">
                <span className="text-[1.5rem] mr-2 text-[#EFB880]">★</span>
                <h1 className="text-[36px] text-[#EFB880]">為您精選</h1>
            </div>
    
            <div className="relative">
                <div 
                    className="flex justify-center space-x-4" 
                    style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'scale(1)' : 'scale(0.5)', // 从一半缩小
                        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                    }}
                >
                    {displayedGamesData.slice(currentIndex * 3, currentIndex * 3 + 3).map((cardData, index) => {
                        const { room_name, room_intro, room_type, game1, game2, game3, location, event_date, img } = cardData;
                        const games = `${game1}, ${game2}, ${game3}`;
                        const typeDisplay = room_type === 1 ? 'HOME GAME' : room_type === 2 ? '桌遊店' : '未知類型';

                        return (
                            <Card 
                                key={index} 
                                img={img ? `http://localhost:3005/room/${img}` : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"} 
                                title={room_name} 
                                description={room_intro} 
                                type={typeDisplay}  
                                game={games} 
                                location={location} 
                                date={event_date.split('T')[0]}

                            />
                        );
                    })}
                </div>
                <button className="absolute top-1/2 left-24 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded" onClick={handlePrev}>
                    &#10094;
                </button>
                <button className="absolute top-1/2 right-24 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Carousel;
