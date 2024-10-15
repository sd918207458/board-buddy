import React, { useState, useEffect, useRef } from 'react';

const CarouselHeader = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intervalRef = useRef(null);

  const contents = [
    {
      title: "好多桌遊找不到人玩？",
      description: "不論任何時間.地點.桌遊類型，只要你揪沒有找不到的小夥伴，Board buddy提供你一個快速方便的揪團平台。",
      modalTitle: "Board buddy 主揪秘籍",
      img: "https://img.freepik.com/premium-photo/organize-variety-games-such-as-board-games-ca-generative-ai_1198270-76354.jpg?w=2000",
      buttonText: "如何當主揪",
      modalImgs: [
        "/創建房間1.png",
        "/創建房間2.png",
        "/創建房間3.png",
      ],
    },
    {
      title: "翻遍社團找不到喜歡的遊戲空間？",
      description: "客製化的篩選條件，快速直觀的找到最適合您的揪團好所在。",
      modalTitle: "Board buddy 參與者秘籍",
      img: "https://img.freepik.com/free-photo/friends-planning-trip-together_23-2148925837.jpg?t=st=1728599036~exp=1728602636~hmac=ea39128b9a84a1e414af86e48553a38e41f43b0aae4f86764af71626228835d9&w=2000",
      buttonText: "揪團怎參加",
      modalImgs: [
        "/加入房間1.png",
        "/加入房間2.png",
        "/加入房間3.png",
      ],
    },
    {
      title: "我是誰我在哪",
      description: "網站功能一覽，快速成為Board buddy的OG",
      modalTitle: "功能一覽",
      img: "https://img.freepik.com/premium-photo/asian-hipster-looking-camera-while-pose-camera-sky-scrapper-endeavor_31965-300226.jpg?w=2000",
      buttonText: "OG養成鈕",
      modalImgs: [
        "https://example.com/modal-experience1.png",
        "https://example.com/modal-experience2.png",
        "https://example.com/modal-experience3.png",
      ],
    },
  ];

  const handleButtonClick = (index) => {
    setCurrentContent(index);
    setIsModalOpen(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 停止轮播
      intervalRef.current = null; // 清除引用
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    startCarousel(); // 关闭模态窗口后重新启动轮播
  };

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      setCurrentContent((prev) => (prev + 1) % contents.length);
    }, 5000);
  };

  useEffect(() => {
    startCarousel(); // 启动轮播

    return () => clearInterval(intervalRef.current); // 清理定时器
  }, [contents.length]);

  useEffect(() => {
    if (isModalOpen) {
      clearInterval(intervalRef.current); // 在模态窗口打开时停止轮播
    }
  }, [isModalOpen]);

  return (
    <header className="bg-[#003E52] dark:bg-gray-900 border-b-2 border-[#EFB880]">
      <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[38rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
          <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
            {contents.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-2 rounded-full lg:mx-0 focus:outline-none ${currentContent === index ? 'bg-[#EFB880]' : 'bg-gray-300'}`}
                onClick={() => setCurrentContent(index)} // 仅更新内容
              ></button>
            ))}
          </div>

          <div className="max-w-lg lg:mx-12 lg:order-2">
            <h1 className="text-3xl font-semibold tracking-wide text-[#EFB880] dark:text-white lg:text-4xl ">
              {contents[currentContent].title}
            </h1>
            <p className="mt-2 text-white dark:text-gray-300">
              {contents[currentContent].description}
            </p>
            <div className="mt-6">
              <button 
                onClick={() => handleButtonClick(currentContent)} // 点击打开模态框
                className="px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-[#EFB880] border border-[#EFB880] bg-transparent rounded-lg 
                transition duration-300 hover:bg-[#EFB880] hover:text-white lg:mx-0 lg:w-auto focus:outline-none">
                {contents[currentContent].buttonText}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
          <img className="object-cover w-full h-full max-w-2xl rounded-md" src={contents[currentContent].img} alt="Carousel" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-2 w-[90%] h-[90%] relative overflow-hidden">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none">
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">{contents[currentContent].modalTitle}</h2>
            <div className="overflow-auto h-[90%]">
              {contents[currentContent].modalImgs.map((img, index) => (
                <img key={index} className="object-contain w-[90%] mb-2" src={img} alt={`Modal ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CarouselHeader;
