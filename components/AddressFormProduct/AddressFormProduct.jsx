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
const getToken = () => localStorage.getItem("token");

// 包含授權標頭的 fetch 請求
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`, // 添加授權 token
    ...options.headers,
  };
  return fetch(url, { ...options, headers, credentials: "include" });
};

// 當用戶選擇地址時，將地址的值填入表單
const handleAddressSelect = (address, setFormData, formData) => {
  if (address && address.city && address.area && address.street) {
    // 更新 formData 狀態，填入選中的地址資料
    setFormData({
      ...formData,
      address: address.street,
      city: address.city,
      district: address.area,
    });
  } else {
    console.error("選中的地址數據不完整", address);
  }
};

const AddressFormProduct = () => {
  // 7-11 START
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 }
  );

  const [areas, setAreas] = useState([]);
  const [isConvenienceStore, setIsConvenienceStore] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    store_name: "", // 修改為資料庫欄位名稱
    store_address: "", // 修改為資料庫欄位名稱
    address: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
    is_default: false, // 修改為資料庫欄位名稱
    store_type: "", // 修改為資料庫欄位名稱
    district: "",
    address: "",
  });
  // 7-11

  useEffect(() => {
    const handleStoreUpdate = (event) => {
      const { storename, storeaddress } = event.detail;
      setFormData((prevData) => ({
        ...prevData,
        store_name: storename, // 修改為資料庫欄位名稱
        store_address: storeaddress, // 修改為資料庫欄位名稱
      }));
    };

    document.addEventListener("set-store", handleStoreUpdate);

    return () => {
      document.removeEventListener("set-store", handleStoreUpdate);
    };
  }, []);
  // 使用 useShip711StoreCallback 來接收選擇的 7-11 門市資訊
  useShip711StoreCallback((storeInfo) => {
    console.log("7-11 門市資訊回傳: ", storeInfo); // 檢查回傳的資料
    if (storeInfo) {
      setFormData((prevData) => ({
        ...prevData,
        store_name: storeInfo.storeName, // 修改為資料庫欄位名稱
        store_address: storeInfo.storeAddress, // 修改為資料庫欄位名稱
      }));
    }
  });

  useEffect(() => {
    // 當門市選擇完成時，接收資料
    const handleStoreUpdate = (event) => {
      const { storename, storeaddress } = event.detail;
      console.log("接收到的門市名稱和地址: ", storename, storeaddress); // 確認接收到的資料
      setFormData((prevData) => ({
        ...prevData,
        store_name: storename, // 使用正確名稱更新狀態
        store_address: storeaddress,
      }));
    };

    // 監聽從子視窗傳回的 "set-store" 事件
    document.addEventListener("set-store", handleStoreUpdate);

    // 清理事件監聽器
    return () => {
      document.removeEventListener("set-store", handleStoreUpdate);
    };
  }, []);

  const handleOptionChange = (e) => {
    if (e.target.value === "convenience_store") {
      setIsConvenienceStore(true);
      // 清空表單的地址信息，因為選擇了 7-11 門市
      setFormData((prevData) => ({
        ...prevData,
        address: "",
        city: "",
        district: "",
        store_type: "7-11", // 設置商店類型為7-11
      }));
    } else {
      setIsConvenienceStore(false);
      // 如果選擇宅配，重新填充預設地址
      const defaultAddress = addresses.find((address) => address.is_default); // 修改為資料庫欄位名稱
      if (defaultAddress) {
        setFormData((prevData) => ({
          ...prevData,
          address: defaultAddress.detailed_address || "",
          city: defaultAddress.city || "",
          district: defaultAddress.area || "",
          is_default: defaultAddress.is_default, // 設置是否為預設地址
        }));
      }
    }
  };
  //7-11//
  useEffect(() => {
    // 確保只有在客戶端渲染時才初始化表單數據
    if (typeof window !== "undefined") {
      const storedAddress = localStorage.getItem("addressData");
      if (storedAddress) {
        setFormData(JSON.parse(storedAddress));
      }
    }
  }, []);
  // 處理輸入表單變化的函數
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // 根據 name 更新對應的表單值
    }));
  };

  // 當用戶選擇一個地址時，將其值填入表單

  // 用來選擇地址的處理函數
  const handleAddressSelect = (address) => {
    if (address && address.city && address.area && address.street) {
      setFormData({
        city: address.city,
        district: address.area, // 更新鄉鎮市區
        address: address.detailed_address, // 更新詳細地址
      });
    } else {
      console.error("選中的地址數據不完整", address); // 如果地址不完整，打印錯誤
    }
  };
  console.log(formData);

  // 從後端獲取地址列表
  const fetchAddresses = async () => {
    try {
      const response = await fetchWithAuth(
        "http://localhost:3005/api/shipment/addresses"
      ); // 使用你在伺服器設置的 callback URL
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();

      if (!data || !data.data) {
        throw new Error("No address data found");
      }

      setAddresses(data.data); // 假設你的 API 回傳 data 是地址的數組

      // 獲取預設地址並填充表單
      const defaultAddress = data.data.find((address) => address.is_default); // 修改為資料庫欄位名稱
      if (defaultAddress) {
        setFormData((prevData) => ({
          ...prevData,
          address: defaultAddress.detailed_address || "",
          city: defaultAddress.city || "",
          district: defaultAddress.area || "",
          is_default: defaultAddress.is_default, // 設置是否為預設地址
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error("Fetch addresses error: ", error); // 在前端控制台打印詳細錯誤
      setError("無法獲取地址");
      setLoading(false);
    }
  };

  // 更新 setDefaultAddress 函數

  // 設定預設地址的函數
  const setDefaultAddress = async (addressId) => {
    try {
      const response = await fetchWithAuth(
        `http://localhost:3005/api/shipment/addresses/${addressId}/default`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("設置預設地址失敗");
      }

      const result = await response.json();
      setMessage(result.message);

      // 找到設為預設的地址並填入表單
      const selectedAddress = addresses.find(
        (address) => address.address_id === addressId
      );
      if (selectedAddress) {
        setFormData({
          ...formData,
          address: `${selectedAddress.street}, ${selectedAddress.area}, ${selectedAddress.city}`,
          city: selectedAddress.city,
          district: selectedAddress.area,
        });
      }

      fetchAddresses(); // 重新獲取地址列表
    } catch (error) {
      setMessage(error.message);
    }
  };

  //defaultAddress
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(""); // 用來顯示設置預設地址的結果

  useEffect(() => {
    fetchAddresses();
  }, []); // 一進入頁面時呼叫 fetchAddresses

  if (loading) {
    return <div>加載中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // 以下為新增邏輯
  const { cartItems, setCartItems } = useCart(); // 引入購物車 hook
  const router = useRouter();

  // 當用戶按下送出按鈕時提交訂單
  const handleSubmit = (event) => {
    // 阻止表單的預設提交行為
    event.preventDefault();
    // 驗證必填欄位
    if (!formData.city) {
      toast.error("請填寫縣市名稱", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.district) {
      toast.error("請填寫鄉鎮市區名稱", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.address) {
      toast.error("請填寫詳細地址", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.cardNumber) {
      toast.error("請填寫信用卡卡號", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.cardName) {
      toast.error("請填寫持卡人姓名", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.expiryDate) {
      toast.error("請填寫到期日", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.cvc) {
      toast.error("請填寫CVC安全碼", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (cartItems.length === 0) {
      toast.error("購物車內無商品", {
        position: "top-right",
        autoClose: 3000,
      });
      return; // 如果購物車為空，顯示錯誤提示並返回
    }

    // 訂單資料
    const orderData = {
      orderId: new Date().getTime(), // 生成訂單ID
      items: cartItems, // 購物車內容
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ), // 計算總價
      address: formData.address, // 地址
      paymentInfo: {
        cardNumber: formData.cardNumber, // 信用卡卡號
        cardName: formData.cardName, // 持卡人姓名
        expiryDate: formData.expiryDate, // 信用卡到期日
        cvc: formData.cvc, // CVC 安全碼
      },
      date: new Date().toISOString(), // 訂單日期
    };

    // 保存訂單到 LocalStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(orderData); // 添加新的訂單
    localStorage.setItem("orders", JSON.stringify(storedOrders)); // 更新 LocalStorage 中的訂單

    // 清空購物車
    setCartItems([]);
    localStorage.removeItem("cart"); // 從 LocalStorage 中移除購物車內容

    // 顯示完成訂單的通知
    toast.success("訂單已完成", {
      position: "top-right",
      autoClose: 3000,
    });

    // 3秒後跳轉到產品列表頁面
    setTimeout(() => {
      router.push("/product/product-list"); // 跳轉到產品列表頁面
    }, 3000);
  };

  //test

  //test
  return (
    <div>
      <div>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            運送方式
          </h2>
          <div>
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
                <div className="border p-4">
                  <h3 className="text-lg font-semibold">請選擇超商</h3>
                  <div className="flex gap-4 mt-2">
                    <label className="inline-flex items-center border p-3 rounded-md">
                      <input type="radio" name="store" className="radio" />
                      <span className="ml-2">7-11 取貨</span>
                    </label>
                    <label className="inline-flex items-center border p-3 rounded-md">
                      <input type="radio" name="store" className="radio" />
                      <span className="ml-2">全家 取貨</span>
                    </label>
                    <label className="inline-flex items-center border p-3 rounded-md">
                      <input type="radio" name="store" className="radio" />
                      <span className="ml-2">萊爾富 取貨</span>
                    </label>
                  </div>

                  <div className="mt-4">
                    <button
                      className="w-full border border-orange-400 text-orange-400 py-2 px-4 rounded-md"
                      onClick={() => openWindow()}
                    >
                      請選擇取貨門市
                    </button>
                  </div>
                  {/* 顯示選擇的門市名稱和地址 */}
                  {formData.store_name && (
                    <div className="mt-4">
                      <label className="block text-gray-700">
                        7-11 門市名稱
                      </label>
                      <input
                        type="text"
                        name="store_name"
                        value={formData.store_name} // 修改為資料庫欄位名稱
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  )}

                  {formData.store_address && (
                    <div className="mt-4">
                      <label className="block text-gray-700">
                        7-11 門市地址
                      </label>
                      <input
                        type="text"
                        name="store_address"
                        value={formData.store_address} // 修改為資料庫欄位名稱
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 地址資訊 */}
            {/* 預設地址或自訂地址 */}
            <div className="flex gap-6 mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio"
                  defaultChecked
                  onClick={() => handleAddressSelect(address)}
                />
                <span className="ml-2">預設地址</span>
              </label>

              <label className="inline-flex items-center">
                <input type="radio" name="radio-2" className="radio" />
                <span className="ml-2">使用自訂地址</span>
              </label>
            </div>
          </div>

          {/* //////////////////// */}
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-4 ">
            地址資訊
          </h2>
          <div>
            {/* // */}
            <h2>地址列表</h2>
            {message && <div>{message}</div>}
            <ul>
              {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <li
                    key={address.address_id}
                    className="mb-4 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.city}, {address.area}, {address.street}{" "}
                    {address.is_default ? (
                      <span className="text-green-500 font-bold">
                        （預設地址）
                      </span>
                    ) : null}
                  </li>
                ))
              ) : (
                <li>沒有地址可顯示</li>
              )}
            </ul>
            {/* // */}
          </div>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 w-full">
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
                  // onChange={(e) =>
                  //   setFormData({ ...formData, city: e.target.value })
                  // } // 更新狀態
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  placeholder="請輸入縣市"
                />
              </div>

              <div className="w-full">
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
                  // onChange={(e) =>
                  //   setFormData({ ...formData, district: e.target.value })
                  // } // 更新狀態
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
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
                  name="address"
                  value={formData.address}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, district: e.target.value })
                  // } // 更新狀態
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  placeholder="請輸入詳細地址"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-8">
              信用卡資訊
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 w-full">
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
                  onChange={(e) =>
                    setFormData({ ...formData, cardNumber: e.target.value })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
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
                  onChange={(e) =>
                    setFormData({ ...formData, cardName: e.target.value })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
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
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
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
                  onChange={(e) =>
                    setFormData({ ...formData, cvc: e.target.value })
                  }
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  placeholder="三位數安全碼"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                onClick={handleSubmit}
              >
                送出
              </button>
            </div>
          </form>
          <ToastContainer />
        </section>
      </div>
    </div>
  );
};

export default AddressFormProduct;
