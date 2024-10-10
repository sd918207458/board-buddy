import "@/styles/globals.css";
import "@/styles/profile_settings.css";
import "@/styles/my_orders.css";
import "@/styles/my-favorites.css";
import "@/styles/member.css";
import "@/styles/payment.css";
import "@/styles/address.css";
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 引入 NavbarSwitcher 組件
import { AuthProvider } from "@/hooks/use-auth";
import { useCart } from "@/hooks/useCart"; // 使用共享的購物車邏輯

export default function App({ Component, pageProps }) {
  const {
    cartItems,
    addToCart,
    setCartItems,
    totalItems,
    isCartVisible,
    setIsCartVisible,
    updateCartItems,
  } = useCart(); // 使用 useCart hook 來管理購物車

  return (
    <AuthProvider>
      <NavbarSwitcher
        cartItems={cartItems}
        isCartVisible={isCartVisible}
        setCartItems={setCartItems}
        setIsCartVisible={setIsCartVisible}
        updateCartItems={updateCartItems} // 傳遞 updateCartItems 給 Navbar
        totalItems={totalItems} // 將 totalItems 傳遞下去
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
