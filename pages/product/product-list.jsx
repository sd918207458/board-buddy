import React from "react";
import GameAccordion from "@/components/GameAccordion/GameAccordion";
import Card from "@/components/card/Card";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination/Pagination";
import Breadcrumbs from "@/components/Breadcrumbs";
const ProductList = () => {
  return (
    <>
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
            <Pagination />
            {/* 其他卡片可以繼續加入 */}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
export default ProductList;
