import Checkout from "@/components/checkout/checkout";
import Steps from "@/components/steps";
import Cart from "@/components/cart/cart";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import Sidecart from "@/components/Sidecart/Sidecart";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AddressFormProduct from "@/components/AddressFormProduct/AddressFormProduct";

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
