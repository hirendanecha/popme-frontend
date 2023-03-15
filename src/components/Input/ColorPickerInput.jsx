import React, { useCallback, useState, useMemo } from "react";
// import { SketchPicker } from "react-color";
import { PhotoshopPicker, ChromePicker } from "react-color";
import { Controller } from "react-hook-form";

const ColorPickerInput = ({
  containerStyle,
  name,
  register,
  watch,
  valueChangeHandler,
  control,
}) => {
  const [pickColor, setPickColor] = useState(false);
  // const [colorValue, setColorValue] = useState("#ddd");

  function closePicker() {
    setPickColor(false);

    valueChangeHandler && valueChangeHandler();
  }

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 800);
    };
  };

  const debounceFn = useCallback(debounce(closePicker), []);

  // const eventHandler = () => {
  //   valueChangeHandler && valueChangeHandler();
  // };

  // const handleChangeComplete = (e) => {
  //   console.log("color", e);
  //   // setPickColor(false);
  //   setColorValue(e?.hex);
  // };

  const openHandler = () => {
    setPickColor(true);
  };

  const handleClose = () => {
    setPickColor(false);
  };

  const popover = {
    position: "absolute",
    right: 0,
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  return (
    <>
      <div
        className={`form-control w-full h-12 border border-borderColor-main rounded-lg ${containerStyle}`}
      >
        <label
          className="flex h-full items-center justify-between px-4"
          onClick={openHandler}
        >
          <span className="text-base text-primary-main">{watch(name)}</span>

          {/* <input
            type="color"
            {...register(name, {
              required: false,
              // onChange: (e) => {
              //   optimizedFn();
              // },
              // onChange: optimizedFn,
            })}
            className={`invisible input input-bordered bg-white text-primary-main text-base focus:outline-none border-borderColor-main`}
          /> */}

          {/* <PhotoshopPicker
            color={pickColor}
            onChangeComplete={(e) => handleChangeComplete(e)}
          /> */}

          {/* {pickColor && (
            <ChromePicker onChangeComplete={(e) => handleChangeComplete(e)} />
          )} */}

          {/* <div>
            {pickColor ? (
              <div style={popover}>
                <div style={cover} onClick={handleClose} />
                <ChromePicker
                  {...register(name, {
                    required: false,
                  })}
                  style={inputStyles}
                />
              </div>
            ) : null}
          </div> */}

          {/* <Controller
            name={name}
            control={control}
            render={({ field }) => <ChromePicker {...field} />}
          /> */}

          {pickColor && (
            <Controller
              name={name}
              control={control}
              render={({ field: { value, onChange, onBlur, ...field } }) => (
                <ChromePicker
                  color={value}
                  onChange={({ hex }) => onChange(hex)}
                  onChangeComplete={({ hex }) => {
                    onBlur(hex);
                    debounceFn();
                  }}
                  className="color_pick_comp"
                  {...field}
                />
              )}
            />
          )}

          {/* {pickColor && (
            <div className="color-picker__popover">
              <ChromePicker
                color={colorValue}
                // onChange={handleChangeComplete}
                onChangeComplete={handleChangeComplete}
                className="color_pick_comp"
              />
            </div>
          )} */}

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
