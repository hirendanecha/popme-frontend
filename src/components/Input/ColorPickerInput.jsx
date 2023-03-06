import React from "react";

const ColorPickerInput = ({ containerStyle, name, register, watch }) => {
  return (
    <>
      <div
        className={`form-control w-full h-12 border border-borderColor-main rounded-lg ${containerStyle}`}
      >
        <label className="flex h-full items-center justify-between px-4">
          <span className="text-base text-primary-main">{watch(name)}</span>

          <input
            type="color"
            {...register(name, {
              required: false,
              onChange: (e) => {},
            })}
            className={`invisible input input-bordered bg-white text-primary-main text-base focus:outline-none border-borderColor-main`}
          />

          <div
            style={{ background: watch(name) }}
            className={`h-6 w-6 rounded-full`}
          ></div>
        </label>
      </div>
    </>
  );
};

export default ColorPickerInput;
