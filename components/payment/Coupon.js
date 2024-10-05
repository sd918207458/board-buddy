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

  const getCouponBackgroundColor = (coupon) => {
    const now = new Date();
    const expiryDate = new Date(coupon.expiry_date);

    if (expiryDate < now) {
      return "bg-gray-300 text-gray-500"; // 過期的優惠券顯示灰色
    }

    if (coupon.discount_type === "percent") {
      return coupon.discount_value >= 50
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"; // 50%以上折扣用紅色，以下用黃色
    } else {
      return coupon.discount_value >= 500
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"; // 折扣金額大於 500 用綠色，小於 500 用藍色
    }
  };

  return (
    <div className="coupon-selector p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(availableCoupons) && availableCoupons.length === 0 ? (
          <p className="text-gray-500">目前沒有可用的優惠券</p>
        ) : (
          availableCoupons.map((coupon) => (
            <div
              key={coupon.coupon_id}
              className={`relative p-6 cursor-pointer rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl ticket-style ${
                selectedCoupon && selectedCoupon.coupon_id === coupon.coupon_id
                  ? "border-4 border-primary bg-primary text-white"
                  : `${getCouponBackgroundColor(coupon)} border border-gray-300`
              }`}
              onClick={() => handleSelectCoupon(coupon)}
            >
              {/* 左右兩側的打孔樣式 */}
              <div className="absolute top-0 left-0 h-full w-4 bg-gray-200 dark:bg-gray-700 rounded-l-lg ticket-holes"></div>
              <div className="absolute top-0 right-0 h-full w-4 bg-gray-200 dark:bg-gray-700 rounded-r-lg ticket-holes"></div>

              <h4 className="text-2xl font-bold mb-2 text-center">
                {coupon.discount_type === "percent"
                  ? `${coupon.discount_value}% 折扣`
                  : `NT$${coupon.discount_value} 折抵`}
              </h4>

              <div className="my-2 border-t border-dashed border-gray-400"></div>

              <p
                className={`text-center ${
                  selectedCoupon &&
                  selectedCoupon.coupon_id === coupon.coupon_id
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                有效期至:{" "}
                <span className="font-semibold">
                  {new Date(coupon.expiry_date).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-4 text-center">
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${getCouponBackgroundColor(
                    coupon
                  )}`}
                >
                  {coupon.discount_type === "percent"
                    ? `${coupon.discount_value}% 折扣`
                    : `NT$${coupon.discount_value} 折抵`}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="btn btn-primary px-6 py-2 rounded-lg bg-[#003E52] text-white hover:bg-[#005071] transition-colors"
          onClick={handleApplyCoupon}
          disabled={!selectedCoupon}
        >
          {selectedCoupon ? "使用優惠券" : "請選擇優惠券"}
        </button>
      </div>

      {/* 自定義的票券樣式 (CSS) */}
      <style jsx>{`
        .ticket-style {
          position: relative;
          padding: 1.5rem;
          border-radius: 1.5rem;
          overflow: hidden;
        }
        .ticket-holes {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 4px,
            gray 4px,
            gray 8px
          );
        }
      `}</style>
    </div>
  );
}
