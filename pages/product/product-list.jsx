import React from "react";
import GameAccordion from "@/components/GameAccordion/GameAccordion.js";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/card/Card";
const ProductListPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        {/* Sidebar on the left */}
        <aside className="w-70">
          <Breadcrumbs />
          <GameAccordion />
        </aside>

        {/* Main content on the right */}
        <main className="flex-1 p-4">
          {/* Product Card and other components */}
          <div>
            <Card />
            {/* <ProductCard /> */}
            <Pagination />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};
export default ProductListPage;
