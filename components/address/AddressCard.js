import React from "react";

const AddressCard = ({ address, handleEdit, handleDelete, handleSetDefault }) => (
  <div className="card bg-base-100 shadow-xl w-full">
    <div className="card-body">
      <h2 className="card-title">{address.username}</h2>
      <p>
        {address.city} {address.area} {address.street} {address.detailedAddress}
      </p>
      <p>手機號碼: {address.phone}</p>
      <div className="card-actions justify-end space-x-4">
        <button
          className="btn btn-outline btn-primary"
          onClick={() => handleEdit(address)}
        >
          編輯
        </button>
        <button
          className="btn btn-outline btn-error"
          onClick={() => handleDelete(address.id)}
        >
          刪除
        </button>
        {!address.isDefault && (
          <button
            className="btn btn-outline btn-success"
            onClick={() => handleSetDefault(address.id)}
          >
            設為預設
          </button>
        )}
      </div>
    </div>
  </div>
);

export default AddressCard;
