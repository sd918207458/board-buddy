import React from "react";
import { CSSTransition } from "react-transition-group";

const AddressCard = ({
  address,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => {
  if (!address) return null; // 確保 address 有效，避免無效數據導致渲染錯誤

  return (
    <CSSTransition in={!!address} timeout={300} classNames="fade">
      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">{address.username}</h2>

          {/* 顯示預設地址標籤 */}
          {address.isDefault && (
            <span className="badge badge-primary">預設</span>
          )}

          {/* 顯示地址詳情 */}
          <p>{`${address.city} ${address.area} ${address.street} ${address.detailedAddress}`}</p>
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
    </CSSTransition>
  );
};

export default AddressCard;
