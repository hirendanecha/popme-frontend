import React, { useState } from "react";

const NewInputText = ({
  labelTitle,
  labelStyle,
  inputStyle,
  type,
  defaultValue,
  placeholder,
  updateFormValue,
  name,
  containerStyle,
  register,
  errorMessage,
  valueChangeHandler,
}) => {
  const [value, setValue] = useState(defaultValue);

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
              className={`input input-bordered w-full bg-white text-primary-main text-base focus:outline-none border-borderColor-main ${inputStyle}`}
            />
          </>
        ) : (
          <>
            <input
              type={type || "text"}
              value={value}
              placeholder={placeholder || ""}
              onChange={(e) => updateInputValue(e.target.value)}
              className={`input input-bordered w-full bg-white text-primary-main text-base focus:outline-none border-borderColor-main ${inputStyle}`}
            />
          </>
        )}

        {errorMessage && (
          <p className="mb-2 text-sm text-[#991B1B]">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default NewInputText;
