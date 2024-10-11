import React, { useState, useEffect } from "react";
import {
  useShip711StoreCallback,
  useShip711StoreOpener,
} from "@/hooks/use-ship-711-store";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/hooks/useCart";

// 從 localStorage 中獲取 token
const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

// 包含授權標頭的 fetch 請求
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
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
  });
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems, setCartItems } = useCart();
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
      console.log("Store information received from 7-11:", storeInfo);
      setFormData((prevData) => ({
        ...prevData,
        store_name: storeInfo.storename,
        store_address: storeInfo.storeaddress,
        address: "",
        city: "",
        district: "",
      }));
    }
  });

  // 從後端獲取地址列表
  const fetchAddresses = async () => {
    try {
      console.log("Fetching addresses...");
      const response = await fetchWithAuth(
        "http://localhost:3005/api/shipment/addresses"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch addresses");
      }
      const data = await response.json();
      console.log("Addresses fetched:", data);
      setAddresses(data.data || []);

      // 獲取預設地址
      const defaultAddress = data.data?.find((address) => address.isDefault);
      if (defaultAddress) {
        console.log("Default address found:", defaultAddress);
        updateFormDataWithDefaultAddress(defaultAddress);
      } else {
        console.log("No default address found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch addresses error: ", error);
      setError("無法獲取地址");
      setLoading(false);
    }
  };

  // 更新表單資料的函數
  const updateFormDataWithDefaultAddress = (defaultAddress) => {
    console.log("Updating form data with default address:", defaultAddress);
    if (defaultAddress.deliveryMethod === "homeDelivery") {
      setFormData((prevData) => ({
        ...prevData,
        address:
          `${defaultAddress.city} ${defaultAddress.area} ${defaultAddress.street} ${defaultAddress.detailed_address}` ||
          "",
        city: defaultAddress.city || "",
        district: defaultAddress.area || "",
        is_default: defaultAddress.isDefault,
      }));
    } else if (defaultAddress.deliveryMethod === "convenienceStore") {
      setFormData((prevData) => ({
        ...prevData,
        store_name: defaultAddress.storeName || "",
        store_address: defaultAddress.storeAddress || "",
        store_type: defaultAddress.storeType || "7-11",
        is_default: defaultAddress.isDefault,
      }));
      setIsConvenienceStore(true);
    }
  };

  // 從後端獲取付款方式
  const fetchPaymentMethods = async () => {
    try {
      console.log("Fetching payment methods...");
      const response = await fetchWithAuth(
        "http://localhost:3005/api/payment-methods"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch payment methods");
      }
      const data = await response.json();
      console.log("Payment methods fetched:", data);
      setPaymentMethods(data.data || []);
      const defaultPayment = data.data.find((method) => method.is_default);
      if (defaultPayment) {
        console.log("Default payment method found:", defaultPayment);
        setSelectedPaymentMethod(defaultPayment);
        setFormData((prevData) => ({
          ...prevData,
          cardNumber: defaultPayment.card_number || "",
          cardName: defaultPayment.card_type || "",
          expiryDate: defaultPayment.expiration_date || "",
        }));
      } else {
        console.log("No default payment method found.");
      }
    } catch (error) {
      console.error("Fetch payment methods error: ", error);
    }
  };

  const handleOptionChange = (e) => {
    const selectedMethod = e.target.value;
    console.log("Selected delivery method:", selectedMethod);
    setIsConvenienceStore(selectedMethod === "convenience_store");
    if (selectedMethod === "convenience_store") {
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
        updateFormDataWithDefaultAddress(defaultAddress);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name} = ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data being submitted:", formData);

    if (
      !isConvenienceStore &&
      (!formData.city || !formData.district || !formData.address)
    ) {
      toast.error("請填寫完整的地址資訊");
      return;
    }

    if (
      isConvenienceStore &&
      (!formData.store_name || !formData.store_address)
    ) {
      toast.error("請選擇超商取貨門市");
      return;
    }

    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate) {
      toast.error("請填寫完整的信用卡資訊");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("購物車內無商品");
      return;
    }

    const orderData = {
      orderId: new Date().getTime(),
      items: cartItems,
      total: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      address: formData.address || formData.store_address,
      storeName: formData.store_name || "",
      paymentInfo: {
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        paymentType: selectedPaymentMethod?.payment_type || "cash",
      },
      date: new Date().toISOString(),
    };

    console.log("Order Data:", orderData);

    if (typeof window !== "undefined") {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      console.log("Current stored orders:", storedOrders);
      storedOrders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(storedOrders));

      setCartItems([]);
      localStorage.removeItem("cart");

      toast.success("訂單已完成", {
        position: "top-right",
        autoClose: 3000,
      });

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

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
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
            {formData.store_name && (
              <div className="mt-4">
                <label className="block text-gray-700">7-11 門市名稱</label>
                <input
                  type="text"
                  name="store_name"
                  value={formData.store_name}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  readOnly
                />
              </div>
            )}
            {formData.store_address && (
              <div className="mt-4">
                <label className="block text-gray-700">7-11 門市地址</label>
                <input
                  type="text"
                  name="store_address"
                  value={formData.store_address}
                  className="w-full px-4 py-2 mt-2 border rounded-md"
                  readOnly
                />
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-4">
            地址資訊
          </h2>
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
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                placeholder="請輸入縣市"
                disabled={isConvenienceStore}
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
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                placeholder="請輸入鄉鎮市區"
                disabled={isConvenienceStore}
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
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 border rounded-md"
                placeholder="請輸入詳細地址"
                disabled={isConvenienceStore}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-8">
            信用卡資訊
          </h2>
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
              <label className="text-gray-700 dark:text-gray-200" htmlFor="cvc">
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
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default AddressFormProduct;
