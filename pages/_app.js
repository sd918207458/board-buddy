import "@/styles/globals.css";
import "@/styles/profile_settings.css";
import "@/styles/my_orders.css";
import "@/styles/my-favorites.css";
import "@/styles/member.css";
import "@/styles/payment.css";
import "@/styles/address.css";
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 引入 NavbarSwitcher 組件
import { AuthProvider } from "@/hooks/use-auth";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]); // 全局購物車狀態
  const [isCartVisible, setIsCartVisible] = useState(false); // 控制購物車顯示

  // 從 localStorage 初始化購物車
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []); // 僅在頁面初始化時運行

  // 當 cartItems 更新時，保存到 localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]); // 每當 cartItems 更新時都會保存到 localStorage

  // 添加商品到購物車的函數
  const addToCart = (product) => {
    const existingProduct = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: product.quantity }]);
    }
    setIsCartVisible(true); // 點擊加入購物車後顯示購物車內容
  };

  // 更新購物車項目函數，供 Navbar 使用
  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <AuthProvider>
      <NavbarSwitcher
        cartItems={cartItems}
        isCartVisible={isCartVisible}
        updateCartItems={updateCartItems} // 傳遞 updateCartItems 給 Navbar
        totalItems={totalItems} // 將 totalItems 傳遞下去
        setCartItems={setCartItems}
      />
      <Component
        {...pageProps}
        cartItems={cartItems}
        setCartItems={setCartItems}
        addToCart={addToCart}
      />
    </AuthProvider>
  );
}
