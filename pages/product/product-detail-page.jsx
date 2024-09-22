import React from "react";
import Cart from "@/components/cart/cart";
import ProductDetail from "@/components/ProductDetail/ProductDetail.jsx";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
const ProductDetailPage = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      <ProductDetail />
      <Cart />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
