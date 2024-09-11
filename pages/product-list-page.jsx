import React from 'react';
import ProductList from '../components/ProductList/ProductList'; // 导入 ProductList 组件
import Sidebar from '@/components/ProductList/Sidebar/Sidebar';

const ProductListPage = () => {
  return (
    <div>
      <ProductList />
      <Sidebar></Sidebar>
    </div>
  );
};
export default ProductListPage;