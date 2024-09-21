// components/Modal.js
import { CSSTransition } from "react-transition-group";

const Modal = ({ isOpen, children, onClose }) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="fade" unmountOnExit>
      <div className="modal-backdrop">
        <div className="modal-box">
          {children}
          <button className="btn btn-secondary" onClick={onClose}>
            關閉
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
