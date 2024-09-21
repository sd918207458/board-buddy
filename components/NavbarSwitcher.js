import React, { useState, useEffect } from "react";
import LoggedInNavbar from "./LoggedInNavbar"; // 已登入時的 Navbar
import LoggedOutNavbar from "./LoggedOutNavbar"; // 未登入時的 Navbar

export default function NavbarSwitcher() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 假設 false 為未登入狀態

  useEffect(() => {
    // 這裡可以使用 fetch API 從後端驗證用戶是否已登入
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/check-auth"); // 假設有一個 API 檢查認證狀態
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking login status", error);
      }
    };
    checkLoginStatus();
  }, []);

  return isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />;
}
