import React from "react";
import { useSelector } from "react-redux";

const ModalComp = () => {
  const { id, children } = useSelector((state) => state.modal);

  // console.log("id", id);
  // console.log("children", children);

  return (
    <>
      {/* <input type="checkbox" id={id} className="modal-toggle" />
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
      </label> */}

      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-white">
          <label
            htmlFor={id}
            className="btn btn-xs btn-circle bg-white text-primary-light border-primary-light hover:bg-white hover:border-primary-light absolute right-2 top-2"
          >
            ✕
          </label>

          {(children !== null || children !== undefined) && children}
        </div>
      </div>
    </>
  );
};

export default ModalComp;
