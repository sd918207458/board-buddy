import React, { useState } from "react";

export default function Coupon({ applyCoupon }) {
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setErrorMessage("請輸入優惠券代碼");
      return;
    }

    applyCoupon(couponCode)
      .then((discount) => {
        setErrorMessage(""); // 清除錯誤訊息
        alert(`優惠券應用成功，折扣：${discount}`);
      })
      .catch((err) => {
        setErrorMessage("無效的優惠券代碼");
      });
  };

  return (
    <div className="coupon-container">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="輸入優惠券代碼"
        className="input input-bordered w-full"
      />
      <button className="btn btn-primary mt-4" onClick={handleApplyCoupon}>
        應用優惠券
      </button>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}
