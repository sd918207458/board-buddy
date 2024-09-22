import React from "react";
import Sidebar from "@/components/sidebar/sidebar.js";
import ProductCard from "@/components/productcard/productcard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
const ProductListPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar on the left */}
        <aside className="w-64">
          <Breadcrumbs />
          <Sidebar />
        </aside>

        {/* Main content on the right */}
        <main className="flex-1 p-4">
          {/* Product Card and other components */}
          <div>
            <ProductCard />
            <Pagination />
            {/* 其他卡片可以繼續加入 */}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};
export default ProductListPage;
