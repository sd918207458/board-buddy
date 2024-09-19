import React from "react";
import { CSSTransition } from "react-transition-group";

const AddressCard = ({
  address,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => {
  if (!address) return null; // 確保 address 有效

  return (
    <CSSTransition in={!!address} timeout={300} classNames="fade">
      <div className="card bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="card-title">{address.username}</h2>
          <p>
            {`${address.city} ${address.area} ${address.street} ${address.detailedAddress}`}
          </p>
          <p>手機號碼: {address.phone}</p>

          <div className="card-actions justify-end space-x-4">
            <button
              type="button"
              className="btn btn-outline btn-primary"
              onClick={() => handleEdit(address)}
              aria-label="編輯地址"
            >
              編輯
            </button>
            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={() => handleDelete(address.id)}
              aria-label="刪除地址"
            >
              刪除
            </button>
            {!address.isDefault && (
              <button
                type="button"
                className="btn btn-outline btn-success"
                onClick={() => handleSetDefault(address.id)}
                aria-label="設為預設地址"
              >
                設為預設
              </button>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddressCard;
