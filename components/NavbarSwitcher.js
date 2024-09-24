import React, { useEffect, useState } from "react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import LoggedOutNavbar from "@/components/LoggedOutNavbar";
import { useRouter } from "next/router";

const NavbarSwitcher = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 控制載入狀態
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 檢查 token 的有效性，發送 API 請求到後端
      fetch("http://localhost:3005/api/auth/check", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            // 如果 token 無效，清理 localStorage 並登出
            localStorage.removeItem("token");
            setIsLoggedIn(false);
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
    } else {
      // 沒有 token，直接結束 loading 狀態
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 根據是否登入來渲染不同的 Navbar
  return isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />;
};

export default NavbarSwitcher;
