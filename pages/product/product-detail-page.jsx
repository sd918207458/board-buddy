import React from "react";
import Cart from "@/components/cart/cart";
import ProductDetail from "@/components/ProductDetail/ProductDetail.jsx";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductDetailTest from "@/components/ProductDetail/ProductDetailTest";
const ProductDetailPage = () => {
  return (
    <div>
      <Navbar />
      <Breadcrumbs />
      <ProductDetailTest />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
