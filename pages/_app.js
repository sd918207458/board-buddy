import "@/styles/globals.css";
import "@/styles/profile_settings.css";
import "@/styles/my_orders.css";
import "@/styles/my-favorites.css";
import "@/styles/member.css";
import "@/styles/payment.css";
import "@/styles/address.css";
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 引入 NavbarSwitcher 組件
import { AuthProvider } from "@/hooks/use-auth";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]); // 全局購物車狀態
  const [isCartVisible, setIsCartVisible] = useState(false); // 控制購物車顯示

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

  return (
    <AuthProvider>
      <NavbarSwitcher cartItems={cartItems} isCartVisible={isCartVisible} />
      <Component {...pageProps} cartItems={cartItems} addToCart={addToCart} />
    </AuthProvider>
  );
}
