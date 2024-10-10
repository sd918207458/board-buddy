import React, { useState, useEffect } from "react";
import {
  useShip711StoreCallback,
  useShip711StoreOpener,
} from "@/hooks/use-ship-711-store";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to get token
const getToken = () => localStorage.getItem("token");

// Helper function to make authenticated fetch requests
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
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
  const { store711, closeWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
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
  const { openWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 }
  );

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

  useShip711StoreCallback((storeInfo) => {
    if (storeInfo) {
      setFormData((prevData) => ({
        ...prevData,
        store_name: storeInfo.storeName, // 修改為資料庫欄位名稱
        store_address: storeInfo.storeAddress, // 修改為資料庫欄位名稱
      }));
    }
  });

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
  //7-11
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 當用戶選擇一個地址時，將其值填入表單

  const handleAddressSelect = (address) => {
    if (address && address.city && address.area && address.street) {
      setFormData({
        city: address.city,
        district: address.area, // 確保正確地使用 area 替代 district
        address: address.detailed_address,
      });
    } else {
      console.error("選中的地址數據不完整", address);
    }
  };
  console.log(formData);

  // const handleAddressSelect = (address) => {
  //   setFormData({
  //     ...formData,
  //     address: `${address.street}, ${address.area}, ${address.city}`,
  //     city: address.city,
  //     district: address.area,
  //   });
  // };
  // 在組件加載時從後端獲取地址

  // 獲取地址列表的函數
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

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetchWithAuth(
  //       "http://localhost:3005/api/shipment/addresses",
  //       {
  //         method: "POST", // 根據需要也可以是 PUT
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("提交表單失敗");
  //     }

  //     const result = await response.json();
  //     console.log("表單提交成功：", result);
  //     setMessage(result.message); // 顯示成功訊息
  //     fetchAddresses(); // 重新加載地址列表
  //   } catch (error) {
  //     console.error("表單提交錯誤：", error);
  //     setMessage("表單提交失敗");
  //   }
  // };
  // 更新 setDefaultAddress 函數
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
  //送出
  const router = useRouter();

  // const handleSubmit = () => {
  //   // 顯示 Toast 提示
  //   toast.success("完成訂單", {
  //     position: "top-right",
  //     autoClose: 3000, // 自動關閉時間
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  //   // 在 3 秒後跳轉到 /product/product-list 頁面
  //   setTimeout(() => {
  //     router.push("/product/product-list");
  //   }, 3000); // 等待3秒後跳轉
  // };
  //
  //test
  const handleSubmit = () => {
    // 模擬訂單資訊
    const orderData = {
      orderId: new Date().getTime(), // 簡單的生成訂單ID
      items: cartItems,
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      date: new Date().toISOString(),
    };

    // 保存訂單到LocalStorage（儲存到訂單歷史記錄中）
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    // 清空購物車
    localStorage.removeItem("cart");

    // 顯示完成訂單的Toast
    toast.success("訂單已完成", {
      position: "top-right",
      autoClose: 3000,
    });

    // 3秒後跳轉到產品列表頁面
    setTimeout(() => {
      router.push("/product/product-list");
    }, 3000);
  };

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
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  } // 更新狀態
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
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  } // 更新狀態
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
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  } // 更新狀態
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
