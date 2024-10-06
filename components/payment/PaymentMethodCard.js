
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PaymentMethodCard = ({
  method,
  handleEdit,
  handleDelete,
  handleSetDefault,
}) => (
  <CSSTransition key={method.id} timeout={500} classNames="fade-slide">
<<<<<<< HEAD
    <div className="card bg-base-100 shadow-xl mb-4">

      <div className="card-body">
        <h2 className="card-title">付款方式</h2>
        <p>卡號: {method.cardNumber}</p>
        <p>到期日: {method.expiryDate}</p>
        {method.isDefault && <span className="badge badge-primary">預設</span>}
        <div className="flex justify-between">

=======
    <div className="card bg-white dark:bg-gray-800 shadow-lg mb-4 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="card-body p-6">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-lg font-semibold text-gray-800 dark:text-gray-100">
            {method.type === "creditCard" ? "信用卡付款" : "其他付款方式"}
          </h2>
          {method.isDefault && (
            <span className="badge badge-primary bg-blue-500 text-white">
              預設
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          卡號: {method.cardNumber}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          到期日: {method.expiryDate}
        </p>

        <div className="flex justify-between mt-4">
>>>>>>> Login
          <button
            className="btn btn-primary bg-[#003E52] hover:bg-[#005071] text-white"
            onClick={() => handleEdit(method)}
          >
            編輯
          </button>
          <button
            className="btn btn-error bg-red-500 hover:bg-red-600 text-white"
            onClick={() => handleDelete(method.id)}
          >
            刪除
          </button>
<<<<<<< HEAD
          <button
            className="btn btn-outline"
            onClick={() => handleSetDefault(method.id)}
          >

            設為預設
          </button>
=======
          {!method.isDefault && (
            <button
              className="btn btn-outline border border-blue-500 text-blue-500 hover:bg-blue-100"
              onClick={() => handleSetDefault(method.id)}
            >
              設為預設
            </button>
          )}
>>>>>>> Login
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
  <TransitionGroup className="space-y-4">
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
