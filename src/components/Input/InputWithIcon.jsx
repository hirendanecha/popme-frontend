import React, { useState } from "react";

const InputWithIcon = ({
  containerStyle,
  labelTitle,
  labelStyle,
  leftIcon,
  rightIcon,
  type,
  placeholder,
  name,
  inputStyle,
  register,
  rightText,
  max,
  defaultValue,
  updateFormValue,
  disabled,
  valueChangeHandler,
}) => {
  const [value, setValue] = useState(defaultValue);

  // console.log("defaultValue", defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ name, value: val });
  };

  return (
    <>
      <div className={`form-control w-full ${containerStyle}`}>
        {labelTitle && (
          <label className="label">
            <span className={`label-text ${labelStyle}`}>{labelTitle}</span>
          </label>
        )}

        <label className="relative text-gray-400 focus-within:text-gray-600 block">
          {leftIcon && (
            <span className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3">
              {leftIcon}
            </span>
          )}

          {register ? (
            <>
              <input
                type={type || "text"}
                placeholder={placeholder || ""}
                {...register(name, {
                  required: false,
                  onBlur: () => {
                    valueChangeHandler && valueChangeHandler();
                  },
                })}
                className={`form-input w-full bg-white text-primary-main text-base focus:outline-none border border-borderColor-main rounded-lg appearance-none block ${
                  rightIcon ? "pr-14" : "pl-14"
                } ${
                  rightText && "pr-[2.5rem] pl-4"
                } py-[11px] px-4 ${inputStyle}`}
                max={max && max}
                min="0"
              />
            </>
          ) : (
            <>
              <input
                type={type || "text"}
                // value={value}
                placeholder={placeholder || ""}
                onChange={(e) => updateInputValue(e.target.value)}
                className={`form-input w-full bg-white text-primary-main text-base focus:outline-none border border-borderColor-main rounded-lg appearance-none block ${
                  rightIcon ? "pr-14" : "pl-14"
                } ${
                  rightText && "pr-[2.5rem] pl-4"
                } py-[11px] px-4 ${inputStyle}`}
                max={max && max}
                min="0"
                defaultValue={defaultValue !== undefined && defaultValue}
                disabled={disabled && disabled}
              />
            </>
          )}

          {rightIcon && (
            <span className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 right-3">
              {rightIcon}
            </span>
          )}

          {rightText && (
            <span className="absolute top-[22px] right-3 transform -translate-y-1/2 font-base text-primary-main">
              {rightText}
            </span>
          )}
        </label>
      </div>
    </>
  );
};

export default InputWithIcon;
