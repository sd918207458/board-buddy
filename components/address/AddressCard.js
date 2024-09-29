import React from "react";

const AddressCard = ({
  address,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => {
  if (!address) return null; // 防止 address 無效

  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{address.username}</h2>

        {address.isDefault && <span className="badge badge-primary">預設</span>}

        <p>{`${address.city} ${address.area} ${address.street} ${address.detailed_address}`}</p>
        <p>手機號碼: {address.phone}</p>

        <div className="flex justify-between">
          <button
            className="btn btn-primary"
            onClick={() => handleEdit(address)}
          >
            編輯
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleDelete(address.id)}
          >
            刪除
          </button>
          {!address.isDefault && (
            <button
              className="btn btn-outline"
              onClick={() => handleSetDefault(address.id)}
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
