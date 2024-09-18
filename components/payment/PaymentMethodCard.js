import { motion } from "framer-motion";

const PaymentMethodCard = ({ method, handleEdit, handleDelete, handleSetDefault }) => {
  return (
    <motion.div
      className="card bg-base-100 shadow-xl mb-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="card-body">
        <h2 className="card-title">付款方式</h2>
        <p>卡號: {method.cardNumber}</p>
        <p>到期日: {method.expiryDate}</p>
        {method.isDefault && <span className="badge badge-primary">預設</span>}
        <div className="flex justify-between">
          <button className="btn btn-primary" onClick={() => handleEdit(method)}>
            編輯
          </button>
          <button className="btn btn-error" onClick={() => handleDelete(method.id)}>
            刪除
          </button>
          <button className="btn btn-outline" onClick={() => handleSetDefault(method.id)}>
            設為預設
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethodCard;
