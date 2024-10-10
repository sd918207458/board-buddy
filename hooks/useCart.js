import { createContext, useContext, useState, useEffect } from "react";

// 創建一個 CartContext
const CartContext = createContext();
// 提供 CartProvider 給應用中的所有組件
export const CartProvider = ({ children }) => {
  // 初始化購物車商品數據的狀態
  const [cartItems, setCartItems] = useState([]);

  // 控制購物車是否可見的狀態
  const [isCartVisible, setIsCartVisible] = useState(false);

  const [isMounted, setIsMounted] = useState(false); // 新增 isMounted 狀態

  // useEffect 用於在組件加載時從 localStorage 讀取購物車數據
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems); // 設置購物車的初始數據
    setIsMounted(true); // 當購物車數據加載完成後設置 isMounted 為 true
  }, []); // 空依賴數組意味著這個效果僅在組件首次加載時運行

  // useEffect 用於在 cartItems 改變時自動保存購物車數據到 localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems)); // 保存購物車數據到 localStorage
    }
  }, [cartItems]); // 當 cartItems 改變時觸發這個效果

  // 將商品加入購物車的函數
  const addToCart = (product) => {
    // 檢查購物車中是否已經存在該商品
    const existingProduct = cartItems.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      // 如果商品已存在，更新數量
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + product.quantity } // 增加數量
            : item
        )
      );
    } else {
      // 如果商品不存在，將商品添加到購物車
      setCartItems([...cartItems, { ...product, quantity: product.quantity }]);
    }
    setIsCartVisible(true); // 顯示購物車內容
  };
  // 更新購物車項目函數，供 Navbar 使用
  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // 計算購物車內所有商品的總價
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace(/,/g, "")); // 去除價格中的逗號，並轉換為數字
    return total + itemPrice * item.quantity; // 將每個商品的價格乘以數量，並累加到總價
  }, 0); // 初始總價為 0
  const handleQuantityChange = (index, amount) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity + amount > 0) {
      newCartItems[index].quantity += amount; // 更新數量
      setCartItems(newCartItems); // 更新狀態
      localStorage.setItem("cartItems", JSON.stringify(newCartItems)); // 保存更新到 localStorage
    }
  };

  useEffect(() => {
    console.log("Cart items in useCart:", cartItems);
    console.log("Total price in useCart:", totalPrice);
  }, [cartItems, totalPrice]);

  return (
    <CartContext.Provider
      value={{
        cartItems, // 返回購物車中的商品
        addToCart, // 返回將商品加入購物車的函數
        setCartItems, // 返回設置購物車內容的函數
        totalPrice, // 返回購物車的總價
        isCartVisible, // 返回購物車是否可見的狀態
        setIsCartVisible, // 返回設置購物車可見狀態的函數
        updateCartItems, // 返回更新購物車項目的函數
        totalItems, // 返回購物車內所有商品的總數
        handleQuantityChange,
        isMounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// 使用 useContext 來獲取共享的購物車狀態
export const useCart = () => useContext(CartContext);
