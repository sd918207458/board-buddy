import React from "react";

const AddressCard = ({
  address,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => {
  if (!address) return null;
  console.log("Address Delivery Method:", address.deliveryMethod);

  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{address.username}</h2>

        {address.isDefault && <span className="badge badge-primary">預設</span>}

        {address.deliveryMethod === "convenienceStore" ? (
          <>
            <p>配送方式: 超商取貨 - {address.storeType}</p>
            <p>門市名稱: {address.storeName || "未提供"}</p>
            <p>門市地址: {address.storeAddress || "未提供"}</p>
          </>
        ) : (
          <>
            <p>配送方式: 宅配到府</p>
            <p>{`${address.city} ${address.area} ${address.street} ${address.detailed_address}`}</p>
            <p>手機號碼: {address.phone}</p>
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleEdit(address)}
          >
            編輯
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleDelete(address.address_id)}
          >
            刪除
          </button>
          {!address.isDefault && (
            <button
              className="btn btn-outline"
              onClick={() => handleSetDefault(address.address_id)}
            >
              設為預設
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
