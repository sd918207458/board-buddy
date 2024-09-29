import React, { useState } from 'react';

const CarouselHeader = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contents = [
    {
      title: "標題一：這是第一個選擇",
      description: "這是第一個選擇的內文，這裡可以放一些詳細的描述。",
      modalTitle: "彈出標題一",
      img: "https://picsum.photos/400/300?random=1",
      buttonText: "我要當主揪 一",
      modalImg: "https://picsum.photos/800/640?random=1",
    },
    {
      title: "標題二：這是第二個選擇",
      description: "這是第二個選擇的內文，這裡可以放一些詳細的描述。",
      modalTitle: "彈出標題二",
      img: "https://picsum.photos/400/300?random=2",
      buttonText: "我要當主揪 二",
      modalImg: "https://picsum.photos/800/640?random=2",
    },
    {
      title: "標題三：這是第三個選擇",
      description: "這是第三個選擇的內文，這裡可以放一些詳細的描述。",
      modalTitle: "彈出標題三",
      img: "https://picsum.photos/400/300?random=3",
      buttonText: "我要當主揪 三",
      modalImg: "https://picsum.photos/800/640?random=3",
    },
    {
      title: "標題四：這是第四個選擇",
      description: "這是第四個選擇的內文，這裡可以放一些詳細的描述。",
      modalTitle: "彈出標題四",
      img: "https://picsum.photos/400/300?random=4",
      buttonText: "我要當主揪 四",
      modalImg: "https://picsum.photos/800/640?random=4",
    },
  ];

  const handleButtonClick = (index) => {
    setCurrentContent(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-[#003E52] dark:bg-gray-900 border-b-2 border-[#EFB880]">
      <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[38rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
          <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
            {contents.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-2 rounded-full lg:mx-0 focus:outline-none ${currentContent === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                onClick={() => setCurrentContent(index)}
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
                onClick={() => handleButtonClick(currentContent)} 
                className=" px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
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
          <div className="bg-white rounded-lg p-6 w-[90%] h-[90%] relative overflow-hidden">
            <button 
              onClick={closeModal} 
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none">
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">{contents[currentContent].modalTitle}</h2>
            <div className="overflow-auto h-[95%]">
              <img className="object-contain w-[90%] h-[180%]" src={contents[currentContent].modalImg} alt="Modal" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default CarouselHeader;
