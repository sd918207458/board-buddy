import React, { useState, useEffect } from "react";
import {
  useShip711StoreCallback,
  useShip711StoreOpener,
} from "@/hooks/use-ship-711-store"; // 引入7-11運送商店的回傳和開啟勾子
import Callback from "@/pages/ship/callback";

const AddressFormProduct = () => {
  // useShip711StoreOpener的第一個傳入參數是"伺服器7-11運送商店用Callback路由網址"
  // 指的是node(express)的對應api路由。詳情請見說明文件:
  const { store711, closeWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711",
    { autoCloseMins: 3 } // x分鐘沒完成選擇會自動關閉，預設5分鐘。
  );

  const [areas, setAreas] = useState([]);
  const [isConvenienceStore, setIsConvenienceStore] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    storeName: "",
    storeAddress: "",
    address: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });

  // 使用 7-11 門市選擇 API 鈎子
  const { openWindow } = useShip711StoreOpener(
    "http://localhost:3005/api/shipment/711", // 使用你在伺服器設置的 callback URL
    { autoCloseMins: 3 }
  );
  useEffect(() => {
    // 訂閱 "set-store" 事件，從子視窗中接收 store 資訊
    const handleStoreUpdate = (event) => {
      const { storename, storeaddress } = event.detail;
      setFormData((prevData) => ({
        ...prevData,
        storeName: storename,
        storeAddress: storeaddress,
      }));
    };

    // 監聽從子視窗傳回的資料
    document.addEventListener("set-store", handleStoreUpdate);

    return () => {
      document.removeEventListener("set-store", handleStoreUpdate);
    };
  }, []);

  // 回傳門市資訊的勾子，處理選擇 7-11 門市後的資料
  useShip711StoreCallback((storeInfo) => {
    console.log("7-11 門市資訊回傳: ", storeInfo); // 確認回傳資料
    if (storeInfo) {
      setFormData((prevData) => ({
        ...prevData,
        storeName: storeInfo.storeName,
        storeAddress: storeInfo.storeAddress,
      }));
    }
  });

  const handleOptionChange = (e) => {
    if (e.target.value === "convenience_store") {
      setIsConvenienceStore(true);
    } else {
      setIsConvenienceStore(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("表單資料：", formData); // 提交表單資料的邏輯
  };

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
                  {formData.storeName && (
                    <div className="mt-4">
                      <label className="block text-gray-700">
                        7-11 門市名稱
                      </label>
                      <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  )}

                  {formData.storeAddress && (
                    <div className="mt-4">
                      <label className="block text-gray-700">
                        7-11 門市地址
                      </label>
                      <input
                        type="text"
                        name="storeAddress"
                        value={formData.storeAddress}
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 地址資訊 */}
            <div className="flex gap-6 mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio"
                  defaultChecked
                />
                <span className="ml-2">預設地址</span>
              </label>

              <label className="inline-flex items-center">
                <input type="radio" name="radio-2" className="radio" />
                <span className="ml-2">使用自訂地址</span>
              </label>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-4 ">
            地址資訊
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 w-full">
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
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  placeholder="請輸入詳細地址"
                />
              </div>

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
                  onChange={handleChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                  placeholder="請輸入鄉鎮市區"
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
        </section>
      </div>
    </div>
  );
};

export default AddressFormProduct;
