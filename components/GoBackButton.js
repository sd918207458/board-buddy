import React from "react";
import { useRouter } from "next/router";
import Image from "next/image"; // 引入 Image 組件來處理圖片

const GoBackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); // 返回上一頁
  };

  return (
    <button onClick={goBack} className=" bg-transparent p-0">
      <Image
        src="/back-arrow.png" // 圖片的相對路徑
        alt="返回上一頁"
        width={30} // 圖片的寬度
        height={30} // 圖片的高度
        className="hover:opacity-80" // 加入hover效果
      />
    </button>
  );
};

export default GoBackButton;
