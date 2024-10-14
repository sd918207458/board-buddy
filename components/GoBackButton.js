import React from "react";
import { useRouter } from "next/router";

const GoBackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back(); // 返回上一頁
  };

  return (
    <button
      onClick={goBack}
      className="btn btn-primary bg-[#003E52] hover:bg-black"
    >
      回上一頁
    </button>
  );
};

export default GoBackButton;
