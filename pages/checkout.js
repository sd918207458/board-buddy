import Checkout from "@/components/checkout/checkout";
import Steps from "@/components/steps";
import Cart from "@/components/cart/cart";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import Sidecart from "@/components/Sidecart/Sidecart";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CheckoutPage() {
  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      <Sidecart />
      <Steps />
      <Checkout />
      <Cart />
      <Footer />
    </div>
  );
}
