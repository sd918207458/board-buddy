import React from "react";
import Sidebar from "@/components/sidebar/sidebar.js";
import ProductCard from "@/components/productcard/productcard";

const ProductListPage = () => {
  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <aside className="w-64">
        <Sidebar />
      </aside>

      {/* Main content on the right */}
      <main className="flex-1 p-4">
        {/* Product Card and other components */}
        <div>
          <ProductCard />

          {/* 其他卡片可以繼續加入 */}
        </div>
      </main>
    </div>
  );
};
export default ProductListPage;
