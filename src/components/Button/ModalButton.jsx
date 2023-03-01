import React from "react";

const ModalButton = ({ buttonClass, text, clickHandler, id }) => {
  return (
    <>
      <label
        htmlFor={id}
        className={`btn bg-secondary-main border-0 text-white w-full normal-case hover:bg-secondary-main text-base ${buttonClass}`}
        onClick={clickHandler}
      >
        {text}
      </label>
    </>
  );
};

export default ModalButton;
