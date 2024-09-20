import Checkout from "@/components/checkout/checkout";
import Steps from "@/components/steps";
import Cart from "@/components/cart/cart";
import OrderDetail from "@/components/OrderDetail/OrderDetail";

export default function CheckoutPage(){
return(
  <>
  <Steps/>
<Checkout/>
<Cart/>
<OrderDetail/>
</>
);
}