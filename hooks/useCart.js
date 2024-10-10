import { useState, useEffect } from "react";

// 自定義 useCart hook，管理購物車狀態和邏輯
export const useCart = () => {
  const [cartItems, setCartItems] = useState([]); // 購物車商品數據
  const [totalPrice, setTotalPrice] = useState(0); // 總價
  const [isMounted, setIsMounted] = useState(false); // 判斷是否加載完畢

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log("Loaded cart items:", storedCartItems);
      setCartItems(storedCartItems);

      const storedTotalPrice = storedCartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/,/g, ""));
        return total + itemPrice * item.quantity;
      }, 0);
      setTotalPrice(storedTotalPrice);
      setIsMounted(true); // 在數據加載完畢後設置 isMounted
    }
  }, []);

  // 更新購物車商品數量
  const handleQuantityChange = (index, amount) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity + amount > 0) {
      newCartItems[index].quantity += amount;
      setCartItems(newCartItems); // 更新購物車狀態
      localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // 保存到 localStorage
      updateTotalPrice(newCartItems); // 更新總價
      console.log("Updated cart items:", newCartItems);
    }
  };

  // 移除購物車中的商品
  const handleRemoveItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index); // 移除指定商品
    setCartItems(newCartItems); // 更新購物車狀態
    localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // 保存到 localStorage
    updateTotalPrice(newCartItems); // 更新總價
    console.log("Item removed:", newCartItems);
  };

  // 計算並更新總價
  const updateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price.replace(/,/g, ""));
      return sum + itemPrice * item.quantity;
    }, 0);
    setTotalPrice(total); // 更新總價
    console.log("Updated total price:", total);
  };

  return {
    cartItems,
    totalPrice,
    handleQuantityChange,
    handleRemoveItem,
    isMounted,
  };
};
