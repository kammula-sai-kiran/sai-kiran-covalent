import React from "react";

const Modal = (props) => {

  const { header, body, showModal, setShowModal } = props;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal__header">
        {header}
        <button onClick={handleClose}>x</button>
      </div>
      <div className="modal__body">{body}</div>
    </div>
  );
};

export default Modal;
