import React, { useState } from "react";

export default function CouponSelector({ availableCoupons = [], applyCoupon }) {
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleApplyCoupon = () => {
    if (selectedCoupon) {
      applyCoupon(selectedCoupon);
    } else {
      alert("請選擇一張優惠券");
    }
  };

  const handleSelectCoupon = (coupon) => {
    setSelectedCoupon((prev) =>
      prev && prev.coupon_id === coupon.coupon_id ? null : coupon
    );
  };

  return (
    <div className="coupon-selector">
      <h3 className="text-lg font-semibold mb-4">選擇優惠券</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.isArray(availableCoupons) && availableCoupons.length === 0 ? (
          <p className="text-gray-500">目前沒有可用的優惠券</p>
        ) : (
          availableCoupons.map((coupon) => (
            <div
              key={coupon.coupon_id}
              className={`card p-4 cursor-pointer transition-transform transform hover:scale-105 ${
                selectedCoupon && selectedCoupon.coupon_id === coupon.coupon_id
                  ? "border-4 border-primary bg-primary text-white"
                  : "border bg-white"
              }`}
              onClick={() => handleSelectCoupon(coupon)}
            >
              <h4 className="text-xl font-bold">
                {coupon.discount_type === "percent"
                  ? `${coupon.discount_value}% 折扣`
                  : `NT$${coupon.discount_value} 折抵`}
              </h4>
              <p>
                有效期至: {new Date(coupon.expiry_date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="btn btn-primary"
          onClick={handleApplyCoupon}
          disabled={!selectedCoupon}
        >
          {selectedCoupon ? "使用優惠券" : "請選擇優惠券"}
        </button>
      </div>
    </div>
  );
}
