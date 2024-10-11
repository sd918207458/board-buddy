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
  // useState Hooks
  const [areas, setAreas] = useState([]);
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
    address: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // 引入購物車 hook，確保在組件頂層調用
  const { cartItems, setCartItems } = useCart();
  const router = useRouter();

  // 7-11 Hooks
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 }
  );

  useEffect(() => {
    fetchAddresses(); // 一進入頁面時呼叫 fetchAddresses
  }, []);

  // 使用 useShip711StoreCallback 來接收選擇的 7-11 門市資訊
  useShip711StoreCallback((storeInfo) => {
    console.log("7-11 門市資訊回傳: ", storeInfo);
    if (storeInfo) {
      setFormData((prevData) => ({
        ...prevData,
        store_name: storeInfo.storeName,
        store_address: storeInfo.storeAddress,
      }));
    }
  });

  useEffect(() => {
    const handleStoreUpdate = (event) => {
      const { storename, storeaddress } = event.detail;
      setFormData((prevData) => ({
        ...prevData,
        store_name: storename,
        store_address: storeaddress,
      }));
    };

    document.addEventListener("set-store", handleStoreUpdate);
    return () => {
      document.removeEventListener("set-store", handleStoreUpdate);
    };
  }, []);

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
      const defaultAddress = data.data?.find((address) => address.is_default);
      if (defaultAddress) {
        setFormData((prevData) => ({
          ...prevData,
          address: defaultAddress.detailed_address || "",
          city: defaultAddress.city || "",
          district: defaultAddress.area || "",
          is_default: defaultAddress.is_default,
        }));
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch addresses error: ", error);
      setError("無法獲取地址");
      setLoading(false);
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

  // 當用戶按下送出按鈕時提交訂單
  const handleSubmit = (event) => {
    event.preventDefault();

    // 驗證必填欄位
    if (!formData.city || !formData.district || !formData.address) {
      toast.error("請填寫完整的地址資訊", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (
      !formData.cardNumber ||
      !formData.cardName ||
      !formData.expiryDate ||
      !formData.cvc
    ) {
      toast.error("請填寫完整的信用卡資訊", {
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
      return;
    }

    // 訂單資料
    const orderData = {
      orderId: new Date().getTime(),
      items: cartItems,
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      address: formData.address,
      paymentInfo: {
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        cvc: formData.cvc,
      },
      date: new Date().toISOString(),
    };

    // 打印訂單資料以供檢查
    console.log("Order Data:", orderData);

    // 檢查是否在瀏覽器環境中
    if (typeof window !== "undefined") {
      // 保存訂單到 LocalStorage
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      storedOrders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(storedOrders));

      // 打印已儲存的訂單資料
      console.log("Stored Orders:", JSON.parse(localStorage.getItem("orders")));

      // 清空購物車
      setCartItems([]);
      localStorage.removeItem("cart");

      // 顯示完成訂單的通知
      toast.success("訂單已完成", {
        position: "top-right",
        autoClose: 3000,
      });

      // 3秒後跳轉到產品列表頁面
      setTimeout(() => {
        router.push("/product/product-list");
      }, 3000);
    }
  };

  if (loading) {
    return <div>加載中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
