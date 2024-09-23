import React, { useEffect, useState } from "react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import LoggedOutNavbar from "@/components/LoggedOutNavbar";
import { useRouter } from "next/router";

const NavbarSwitcher = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 新增一個狀態來控制載入
  const router = useRouter();

  useEffect(() => {
    // 檢查JWT token是否存在於localStorage中
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // 載入完成，設置為false
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    // 當載入狀態時可以顯示一個簡單的loading
    return <div>Loading...</div>;
  }

  // 根據是否登入來渲染不同的 Navbar
  return isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />;
};

export default NavbarSwitcher;
