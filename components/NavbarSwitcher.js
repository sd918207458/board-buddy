import React, { useEffect, useState } from "react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import LoggedOutNavbar from "@/components/LoggedOutNavbar";
import { useRouter } from "next/router";

const NavbarSwitcher = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 控制載入狀態
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
          localStorage.removeItem("token"); // 如果還在使用 localStorage 儲存 token，這一步可以保留
          setIsLoggedIn(false);
          console.error("Token 無效，登出", data);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("檢查 token 發生錯誤", error);
        setIsLoggedIn(false);
      })
      .finally(() => {
        // 確保在請求完成後，無論成功或失敗，都將 `isLoading` 設置為 false
        setIsLoading(false);
      });
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 根據是否登入來渲染不同的 Navbar
  return isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />;
};

export default NavbarSwitcher;
