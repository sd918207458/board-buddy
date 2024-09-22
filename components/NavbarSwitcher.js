// components/NavbarSwitcher.js
import React, { useEffect, useState } from "react";
import LoggedInNavbar from "@/components/LoggedInNavbar";
import LoggedOutNavbar from "@/components/LoggedOutNavbar";
import { useRouter } from "next/router";

const NavbarSwitcher = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 假設你將JWT token存儲在localStorage中
    const token = localStorage.getItem("token");

    // 檢查token是否存在來判斷是否已登入
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [router]);

  return isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />;
};

export default NavbarSwitcher;
