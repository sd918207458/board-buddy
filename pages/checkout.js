import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddressFormProduct from "@/components/AddressFormProduct/AddressFormProduct";
import dynamic from "next/dynamic";
// 動態加載 Checkout 和 Sidecart 組件
const Checkout = dynamic(() => import("@/components/checkout/checkout"), {
  ssr: false,
});
const Sidecart = dynamic(() => import("@/components/Sidecart/Sidecart"), {
  ssr: false,
});

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Breadcrumbs />
      <div className="flex justify-center">
        {/* Sidecart 固定在左邊 */}
        <div className="fixed left-40 top-20 w-72 h-[calc(100vh-100px)] overflow-y-auto z-50">
          <Sidecart />
        </div>

        {/* Checkout 部分不被 Sidecart 擋住，並居中排列 */}
        <div className="flex-1 max-w-3xl  ml-[23rem] p-3  shadow-lg ">
          <h1>購物車內容</h1>
          <Checkout />
          <h1>地址資訊</h1>
          <AddressFormProduct />
        </div>
      </div>
      <Footer />
    </div>
  );
}
