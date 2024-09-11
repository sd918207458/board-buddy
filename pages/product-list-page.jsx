import React from 'react';
import ProductList from '../components/ProductList/ProductList'; // 导入 ProductList 组件
import Sidebar from '@/components/ProductList/Sidebar/Sidebar';
import Card from '@/components/card/card';

const ProductListPage = () => {
  return (
    <div>
      <ProductList />
      <main>
      <Sidebar></Sidebar>
      <Card></Card>
      </main>
    </div>
  );
};
export default ProductListPage;