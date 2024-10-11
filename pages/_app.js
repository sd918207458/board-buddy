import "@/styles/globals.css";
import "@/styles/profile_settings.css";
import "@/styles/my_orders.css";
import "@/styles/my-favorites.css";
import "@/styles/member.css";
import "@/styles/payment.css";
import "@/styles/address.css";
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 引入 NavbarSwitcher
import { ToastContainer } from "react-toastify"; // 引入 ToastContainer
import "react-toastify/dist/ReactToastify.css"; // 引入 react-toastify 的樣式
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/useCart"; // 使用 CartProvider 來包裹應用

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <NavbarSwitcher />
        <ToastContainer />
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
