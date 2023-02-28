import React from "react";

const Button = ({
  buttonClass,
  text,
  leftIcon,
  rightIcon,
  type = "button",
  clickHandler,
}) => {
  return (
    <>
      <button
        type={type}
        className={`btn bg-secondary-main border-0 hover:bg-secondary-main capitalize text-white gap-2 ${buttonClass}`}
        onClick={clickHandler}
      >
        {leftIcon && leftIcon}
        {text}
        {rightIcon && rightIcon}
      </button>
    </>
  );
};

export default Button;
