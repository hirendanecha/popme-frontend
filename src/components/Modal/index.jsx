import React from "react";
import { useSelector } from "react-redux";

const ModalComp = () => {
  const { id, children } = useSelector((state) => state.modal);

  //   console.log("id", id);

  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative bg-white" htmlFor="">
          <label
            htmlFor={id}
            className="btn btn-xs btn-circle bg-white text-primary-light border-primary-light hover:bg-white hover:border-primary-light absolute right-2 top-2"
          >
            ✕
          </label>
          {children !== null && children}
        </label>
      </label>
    </>
  );
};

export default ModalComp;
