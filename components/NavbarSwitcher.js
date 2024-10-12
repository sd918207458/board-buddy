import React, { useEffect, useState } from "react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import LoggedOutNavbar from "@/components/LoggedOutNavbar";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";

const NavbarSwitcher = ({onUsernameRetrieved}) => {
  const {
    cartItems,
    totalItems,
    isCartVisible,
    setIsCartVisible,
    updateCartItems,
  } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 控制載入狀態
  const [avatarUrl, setAvatarUrl] = useState(""); // 用來管理頭像 URL
  const [username, setUsername] = useState(""); // 用來管理使用者名稱
  const router = useRouter();

  useEffect(() => {
    // 檢查是否存在 token
    const token = localStorage.getItem("token");
    if (token) {
      // 有 token，進行驗證
      fetch("http://localhost:3005/api/auth/check", {
        method: "GET",
        credentials: "include", // 確保 cookies 被自動發送
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setIsLoggedIn(true);
            setAvatarUrl(data.data.user.avatar); // 設置初始頭像
            setUsername(data.data.user.username); // 設置初始使用者名稱
            if (onUsernameRetrieved) {
              onUsernameRetrieved(data.data.user.username); // 调用 prop 将 username 暴露出去
            }
          } else {
            // 如果 token 無效，清理 localStorage
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("檢查 token 發生錯誤", error);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // 沒有 token，直接設定為未登入狀態
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [router, onUsernameRetrieved]);

  const handleAvatarUpdate = (newAvatarUrl) => {
    setAvatarUrl(newAvatarUrl); // 更新頭像
  };

  if (isLoading) {
    return <div>Loading...</div>; // 顯示載入狀態
  }

  return isLoggedIn ? (
    <LoggedInNavbar
      avatarUrl={avatarUrl}
      username={username}
      onAvatarUpdate={handleAvatarUpdate} // 傳遞更新頭像回調函數
      cartItems={cartItems} // 傳遞購物車內容
      totalItems={totalItems} // 傳遞購物車商品總數
      isCartVisible={isCartVisible} // 傳遞購物車顯示狀態
      updateCartItems={updateCartItems} // 傳遞購物車更新函數
    />
  ) : (
    <LoggedOutNavbar />
  );
};

export default NavbarSwitcher;
