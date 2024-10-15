import React from 'react';

const CreateRoomButton = () => {
  const handleClick = () => {
    window.location.href = 'http://localhost:3000/game-creatroom';
  };

  return (
    <div className="fixed bottom-28 right-4">
      <button
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-20 h-20 border border-[#EFB880] text-[#EFB880] bg-transparent 
            transition-transform duration-300 hover:scale-110 hover:bg-[#EFB880] hover:text-white rounded-lg"

      >
        <span>創建</span>
        <span>房間</span>
      </button>
    </div>
  );
};

export default CreateRoomButton;
