import React, { useState, useEffect } from "react";
import {
  useShip711StoreCallback,
  useShip711StoreOpener,
} from "@/hooks/use-ship-711-store";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/hooks/useCart"; // 引入購物車 hook

// 從 localStorage 中獲取 token
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

// 包含授權標頭的 fetch 請求
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`, // 添加授權 token
    ...options.headers,
  };
  return fetch(url, { ...options, headers, credentials: "include" });
};

const AddressFormProduct = () => {
  const [isConvenienceStore, setIsConvenienceStore] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    store_name: "",
    store_address: "",
    address: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
    is_default: false,
    store_type: "",
    district: "",
    detailed_address: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // 新增可編輯狀態

  // 引入購物車 hook，確保在組件頂層調用
  const { cartItems, setCartItems, totalPrice } = useCart();
  const router = useRouter();

  // 7-11 Hooks
  const { store711, openWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 }
  );

  useEffect(() => {
    fetchAddresses();
    fetchPaymentMethods();
  }, []);

  // 使用 useShip711StoreCallback 來接收選擇的 7-11 門市資訊
  useShip711StoreCallback((storeInfo) => {
    if (storeInfo) {
      setFormData((prevData) => ({
        ...prevData,
        store_name: storeInfo.storeName,
        store_address: storeInfo.storeAddress,
      }));
    }
  });

  // 從後端獲取地址列表
  const fetchAddresses = async () => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:3005/api/shipment/addresses"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      setAddresses(data.data || []);
      const defaultAddress = data.data?.find((address) => address.isDefault);
      if (defaultAddress) {
        const fullAddress = [
          defaultAddress.city || "",
          defaultAddress.area || "",
          defaultAddress.street || "",
          defaultAddress.detailed_address || "",
        ]
          .filter(Boolean)
          .join(" ");

        setFormData((prevData) => ({
          ...prevData,
          address: fullAddress, // 將完整地址組合存入 address 欄位
          city: defaultAddress.city || "",
          district: defaultAddress.area || "",
          street: defaultAddress.street || "",
          detailed_address: defaultAddress.detailed_address || "",
        }));
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch addresses error: ", error);
      setError("無法獲取地址");
      setLoading(false);
    }
  };
  //////default address
  const handleDefaultClick = async () => {
    try {
      // 從後端獲取地址列表
      const response = await fetchWithAuth(
        "http://localhost:3005/api/shipment/addresses"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }

      const data = await response.json();
      console.log(data); // 確認這裡的資料結構
      const defaultAddress = data.data.find((address) => address.isDefault);

      // 如果有預設地址，更新表單資料
      if (defaultAddress) {
        // 將四個地址欄位合併成一個完整的地址
        const fullAddress = [
          defaultAddress.city || "",
          defaultAddress.area || "", // 使用 'district' 或 'area'
          defaultAddress.street || "",
          defaultAddress.detailed_address || "",
        ]
          .filter(Boolean)
          .join(" ");

        setFormData((prevData) => ({
          ...prevData,
          address: fullAddress, // 將完整地址存入 address 欄位
          city: defaultAddress.city || "",
          district: defaultAddress.area || "",
          street: defaultAddress.street || "",
          detailed_address: defaultAddress.detailed_address || "",
        }));
        setIsEditable(false); // 設置為只讀
        // toast.success("已獲取預設地址"); // 顯示成功消息
      } else {
        // toast.info("沒有設置預設地址"); // 沒有預設地址的情況
      }
    } catch (error) {
      console.error("Fetch default address error: ", error);
      toast.error("無法獲取預設地址");
    }
  };

  const handleCustomAddressClick = () => {
    setFormData((prevData) => ({
      ...prevData,
      city: "",
      district: "",
      detailed_address: "",
      address: "", // 如果需要清空完整地址欄位
    }));
    setIsEditable(true); // 設置為可編輯狀態
  };

  // 從後端獲取付款方式
  const fetchPaymentMethods = async () => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:3005/api/payment-methods"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payment methods");
      }
      const data = await response.json();
      setPaymentMethods(data.data || []);
      const defaultPayment = data.data.find((method) => method.is_default);
      if (defaultPayment) {
        setSelectedPaymentMethod(defaultPayment);
        setFormData((prevData) => ({
          ...prevData,
          cardNumber: defaultPayment.card_number || "",
          cardName: defaultPayment.card_type || "",
          expiryDate: defaultPayment.expiration_date || "",
        }));
      }
    } catch (error) {
      console.error("Fetch payment methods error: ", error);
    }
  };

  const handleOptionChange = (e) => {
    setIsConvenienceStore(e.target.value === "convenience_store");
    if (e.target.value === "convenience_store") {
      setFormData((prevData) => ({
        ...prevData,
        address: "",
        city: "",
        district: "",
        store_type: "7-11",
      }));
    } else {
      const defaultAddress = addresses.find((address) => address.is_default);
      if (defaultAddress) {
        setFormData((prevData) => ({
          ...prevData,
          address: defaultAddress.detailed_address || "",
          city: defaultAddress.city || "",
          district: defaultAddress.area || "",
          is_default: defaultAddress.is_default,
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false); // 新增狀態來追蹤訂單是否已提交

  const handleSubmit = (event) => {
    event.preventDefault();

    // 確認 7-11 店鋪地址是否已填寫
    const isStore711AddressFilled = store711.storename && store711.storeaddress;
    if (!isStore711AddressFilled) {
      if (!formData.city || !formData.district || !formData.address) {
        toast.error("請填寫完整的地址資訊");
        return;
      }
    }

    // 確認信用卡資訊是否填寫完整
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate) {
      toast.error("請填寫完整的信用卡資訊");
      return;
    }

    // 確認購物車內是否有商品
    if (cartItems.length === 0) {
      toast.error("購物車內無商品");
      return;
    }

    // 建立訂單資料
    const orderData = {
      orderId: new Date().getTime(),
      items: cartItems,
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      address: {
        address: formData.address,
        store_name: store711.storename,
        store_address: store711.storeaddress,
      },
      paymentInfo: {
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        paymentType: selectedPaymentMethod?.payment_type || "credit_card", // 使用信用卡付款
      },
      date: new Date().toISOString(),
    };

    // 儲存訂單至 localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    // 清空購物車
    setCartItems([]);
    localStorage.removeItem("cart");

    // 顯示成功訊息
    toast.success("訂單已完成", {
      position: "top-right",
      autoClose: 3000,
    });

    // 跳轉至商品列表頁
    setTimeout(() => {
      router.push("/product/product-list");
    }, 3000);
  };

  // 處理綠界 ECPay 付款的 goECPay
  const goECPay = () => {
    // 確認購物車內是否有商品
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    if (total <= 0) {
      toast.error("請確認購物車內有商品");
      return;
    }

    // 建立訂單資料
    const orderData = {
      orderId: new Date().getTime(),
      items: cartItems,
      total,
      address: {
        address: formData.address,
        store_name: store711.storename,
        store_address: store711.storeaddress,
      },
      paymentInfo: {
        paymentType: "ecpay", // 綠界付款
      },
      date: new Date().toISOString(),
    };

    // 儲存訂單至 localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    // 清空購物車
    setCartItems([]);
    localStorage.removeItem("cart");

    // 顯示成功訊息
    toast.success("訂單已完成", {
      position: "top-right",
      autoClose: 3000,
    });

    // 跳轉至 ECPay 測試頁面
    window.location.href = `http://localhost:3005/api/ecpay-test-only?amount=${total}`;
  };

  // if (loading) {
  //   return <div>加載中...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  //ECPay
  // 導向至ECPay付款頁面

  // const goECPay = () => {
  //   // 確保 cartItems 不為 null 或 undefined
  //   if (!cartItems || cartItems.length === 0) {
  //     alert("購物車是空的，請添加商品後再進行付款！");
  //     return; // 退出函數
  //   }

  //   const total = totalPrice; // 使用 totalPrice 作為總價
  //   // 確認導向ECPay
  //   if (window.confirm("確認要導向至ECPay進行付款?")) {
  //     // // 創建訂單資料
  //     // const orderData = {
  //     //   orderId: new Date().getTime(),
  //     //   items: cartItems,
  //     //   total: cartItems.reduce(
  //     //     (total, item) => total + item.price * item.quantity,
  //     //     0
  //     //   ),
  //     //   address: {
  //     //     address: formData.address,
  //     //     store_name: store711.storename,
  //     //     store_address: store711.storeaddress,
  //     //   },
  //     //   paymentInfo: {
  //     //     cardNumber: formData.cardNumber,
  //     //     cardName: formData.cardName,
  //     //     expiryDate: formData.expiryDate,
  //     //     paymentType: selectedPaymentMethod?.payment_type || "cash",
  //     //   },
  //     //   date: new Date().toISOString(),
  //     // };

  //     // // 將訂單資料存入 localStorage
  //     // localStorage.setItem("orderData", JSON.stringify(orderData));

  //     // 跳轉至 ECPay
  //     window.location.href = `http://localhost:3005/api/ecpay-test-only?amount=${total}`;
  //   }
  // };

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-8">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          運送方式
        </h2>
        <div className="flex gap-6 mt-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="radio-1"
              value="home_delivery"
              className="radio"
              defaultChecked
              onChange={handleOptionChange}
            />
            <span className="ml-2">宅配</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="radio-1"
              value="convenience_store"
              className="radio"
              onChange={handleOptionChange}
            />
            <span className="ml-2">超商取貨</span>
          </label>
        </div>
        {isConvenienceStore && (
          <div className="mt-4">
            <button
              className="w-full border border-orange-400 text-orange-400 py-2 px-4 rounded-md"
              onClick={() => openWindow()}
            >
              請選擇取貨門市
            </button>
            {store711.storename && (
              <div className="mt-4">
                <label className="block text-gray-700">7-11 門市名稱</label>
                <input
                  type="text"
                  name="store_name"
                  value={store711.storename}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  readOnly
                />
              </div>
            )}
            {store711.storeaddress && (
              <div className="mt-4">
                <label className="block text-gray-700">7-11 門市地址</label>
                <input
                  type="text"
                  name="store_address"
                  value={store711.storeaddress}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  readOnly
                />
              </div>
            )}
          </div>
        )}
        {/* 地址資訊 */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-4">
            地址資訊
          </h2>

          {/* 使用 flex 排版按鈕，並確保不影響下方的 grid */}
          <div className="flex justify-start mb-2 mt-2">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="radio-2"
                value="is_default"
                className="radio"
                onClick={handleDefaultClick}
                defaultChecked
              />
              <span className="ml-2">預設地址</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="radio-2"
                value="customed_address"
                className="radio"
                onClick={handleCustomAddressClick}
              />
              <span className="ml-2">自訂地址</span>
            </label>
          </div>

          {/* 使用 grid 排版其他三個 input */}
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="city"
              >
                縣市名稱
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                readOnly={!isEditable} // 根據可編輯狀態設置
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                placeholder="請輸入縣市"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="district"
              >
                鄉鎮市區名稱
              </label>
              <input
                id="district"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                readOnly={!isEditable} // 根據可編輯狀態設置
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                placeholder="請輸入鄉鎮市區"
              />
            </div>
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="address"
              >
                地址
              </label>
              <input
                id="address"
                type="text"
                name="detailed_address"
                value={formData.detailed_address}
                onChange={handleChange}
                readOnly={!isEditable} // 根據可編輯狀態設置
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                placeholder="請輸入詳細地址"
              />
            </div>
          </div>
          {/* 
  
          {/* /////// */}
          {/* //////付款方式//// */}
          <h1 className="text-xl font-bold mb-4 mt-8">選擇付款方式</h1>
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                className="radio"
                value="creditCard"
                onChange={() => setPaymentMethod("creditCard")}
              />
              <label htmlFor="creditCard" className="ml-2">
                信用卡付款
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="ecpay"
                name="paymentMethod"
                className="radio"
                value="ecpay"
                onChange={() => setPaymentMethod("ecpay")}
              />
              <label htmlFor="ecpay" className="ml-2">
                ECPay付款
              </label>
            </div>
          </div>

          {/* //////付款方式//// */}
          {/* //////// */}

          {/* 顯示信用卡表單 */}
          {paymentMethod === "creditCard" && (
            <div>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="card_number"
                  >
                    信用卡卡號
                  </label>
                  <input
                    id="card_number"
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    placeholder="請輸入信用卡卡號"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="card_name"
                  >
                    持卡人姓名
                  </label>
                  <input
                    id="card_name"
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    placeholder="請輸入持卡人姓名"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="expiry_date"
                  >
                    到期日 (MM/YY)
                  </label>
                  <input
                    id="expiry_date"
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label
                    className="text-gray-700 dark:text-gray-200"
                    htmlFor="cvc"
                  >
                    CVC 安全碼
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    name="cvc"
                    value={formData.cvc}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-2 border rounded-md"
                    placeholder="三位數安全碼"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-8 py-2.5 leading-5 text-white bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  送出
                </button>
              </div>
            </div>
          )}
          {/* 顯示ECPay付款按鈕 */}
          {paymentMethod === "ecpay" && (
            <div className="flex justify-end mt-6">
              <button
                onClick={(handleSubmit, goECPay)}
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
              >
                前往ECPay付款
              </button>
            </div>
          )}
        </form>
        <ToastContainer />
      </section>
      {/* test ecpay */}

      {/* <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">確認付款</h1>
          <p className="text-lg mb-6">點擊下方按鈕以導向至ECPay進行付款。</p>
          <button
            onClick={goECPay}
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
          >
            前往ECPay付款
          </button>
        </div>
      </div> */}
      {/* test ecpay */}
    </div>
  );
};

export default AddressFormProduct;
