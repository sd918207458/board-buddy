import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GameCard = ({ game }) => {
    const [heartRed, setHeartRed] = useState(false);

    return (
        <section className="bg-[#003E52] dark:bg-gray-900 transition-colors duration-200 hover:bg-[#EFB880] relative w-4/5 mx-auto rounded-lg mb-6">
            <div className="container mx-auto py-10 border-b-2 border-[#EFB880] rounded-lg">
                <div className="lg:flex lg:items-center">
                    <img
                        className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-48 lg:h-64"
                        src={game.imageUrl || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
                        alt={game.room_name}
                    />ㄒ

                    <div className="relative lg:w-1/2 lg:mx-6 rounded-lg">
                        <button
                            className="absolute top-2 right-2 p-1 z-10"
                            onClick={() => setHeartRed(!heartRed)}
                            aria-label={heartRed ? "Remove from favorites" : "Add to favorites"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${heartRed ? 'text-red-600' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>

                        <p className="text-sm text-blue-500 uppercase">{game.room_type}</p>

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
                                src={game.hostImage || "https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"}
                                alt={game.hostName || "Host"}
                            />

                            <div className="mx-4">
                                <h1 className="text-sm text-gray-100 dark:text-gray-200">{game.hostName || "Host"}</h1>
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
                            <button className="px-4 py-2 w-32 text-white bg-blue-500 rounded hover:bg-blue-600">加入揪團</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

GameCard.propTypes = {
    game: PropTypes.shape({
        imageUrl: PropTypes.string,
        room_type: PropTypes.string,
        room_name: PropTypes.string,
        room_intro: PropTypes.string,
        hostImage: PropTypes.string,
        hostName: PropTypes.string,
        game1: PropTypes.string,
        game2: PropTypes.string,
        game3: PropTypes.string,
        location: PropTypes.string,
        event_date: PropTypes.string,
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
        imageUrl: PropTypes.string,
        room_type: PropTypes.string,
        room_name: PropTypes.string,
        room_intro: PropTypes.string,
        hostImage: PropTypes.string,
        hostName: PropTypes.string,
        game1: PropTypes.string,
        game2: PropTypes.string,
        game3: PropTypes.string,
        location: PropTypes.string,
        event_date: PropTypes.string,
    })),
};

export default GameCardList;
