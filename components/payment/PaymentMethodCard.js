import { CSSTransition, TransitionGroup } from "react-transition-group";

const PaymentMethodCard = ({
  method,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => (
  <CSSTransition key={method.id} timeout={500} classNames="fade-slide">
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">付款方式</h2>
        <p>卡號: {method.cardNumber}</p>
        <p>到期日: {method.expiryDate}</p>
        {method.isDefault && <span className="badge badge-primary">預設</span>}
        <div className="flex justify-between">
          <button
            className="btn btn-primary"
            onClick={() => handleEdit(method)}
          >
            編輯
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleDelete(method.id)}
          >
            刪除
          </button>
          <button
            className="btn btn-outline"
            onClick={() => handleSetDefault(method.id)}
          >
            設為預設
          </button>
        </div>
      </div>
    </div>
  </CSSTransition>
);

const PaymentMethodList = ({
  methods,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => (
  <TransitionGroup>
    {methods.map((method) => (
      <PaymentMethodCard
        key={method.id}
        method={method}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSetDefault={handleSetDefault}
      />
    ))}
  </TransitionGroup>
);

export default PaymentMethodList;
