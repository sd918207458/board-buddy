import React, { useEffect, useState } from "react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import LoggedOutNavbar from "@/components/LoggedOutNavbar";
import { useRouter } from "next/router";

const NavbarSwitcher = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 控制載入狀態
  const [avatarUrl, setAvatarUrl] = useState(""); // 用來管理頭像 URL
  const router = useRouter();

  useEffect(() => {
    // 檢查 token 的有效性，發送 API 請求到後端
    fetch("http://localhost:3005/api/auth/check", {
      method: "GET",
      credentials: "include", // 確保 cookies 被自動發送
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== "success") {
          // 如果 token 無效，清理 localStorage 並登出
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          console.error("Token 無效，登出", data);
        } else {
          setIsLoggedIn(true);
          setAvatarUrl(data.data.user.avatar); // 設置初始頭像
        }
      })
      .catch((error) => {
        console.error("檢查 token 發生錯誤", error);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [router]);

  const handleAvatarUpdate = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl); // 更新頭像
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isLoggedIn ? (
    <LoggedInNavbar avatarUrl={avatarUrl} onAvatarUpdate={handleAvatarUpdate} />
  ) : (
    <LoggedOutNavbar />
  );
};

export default NavbarSwitcher;
