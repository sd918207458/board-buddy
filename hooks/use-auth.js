import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// 1. 建立與導出它
// defaultValue是在套用context失敗時才會出現的值，可以使用有意義的預設值，或使用null(目的是為了除錯)。
const AuthContext = createContext(null);

// 2. 建立一個Context Provider元件
// 目的: 將所有要共享狀態集中統一管理，提供給上層元件(_app.js)使用
// props.children屬性，代表包覆在Provider中所有的子女元件
export function AuthProvider({ children }) {
  // 建立路由器
  const router = useRouter();

  // 會員使用的認証&授權狀態
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: {
      member_id: 0,
      username: "",
    },
  });

  const handleCheck = async () => {
    try {
      const url = "http://localhost:3005/api/auth/check";
      const res = await fetch(url, {
        credentials: "include", // 設定cookie或是存取隱私資料時要加這個參數
        method: "GET",
      });

      const resData = await res.json();
      console.log(resData);

      if (resData.status === "success" && resData.data && resData.data.user) {
        const user = resData.data.user;
        // 設定全域的AuthContext(useAuth勾子)
        const nextAuth = {
          isAuth: true,
          userData: {
            id: user.member_id, // 確保 user.id 是正確的路徑
            username: user.username, // 根據返回的結構設置其他字段
          },
        };
        setAuth(nextAuth);
      } else {
        console.error("無法找到用戶資料");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleCheck();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, handleCheck }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. 建立一個包裝useContext與對應context的專用函式
// 目的: 讓消費者們(consumers)方便呼叫使用共享狀態，提高可閱讀性
export const useAuth = () => useContext(AuthContext);
