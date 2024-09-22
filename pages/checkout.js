import Checkout from "@/components/checkout/checkout";
import Steps from "@/components/steps";
import Cart from "@/components/cart/cart";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

export default function CheckoutPage() {
  return (
    <>
      <Steps />
      <Cart />
      <ProductDetail />
    </>
  );
}
