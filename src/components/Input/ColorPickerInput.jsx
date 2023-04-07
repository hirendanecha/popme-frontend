import React, { useCallback, useState, useMemo } from "react";
// import { SketchPicker } from "react-color";
import { useSelector } from "react-redux";
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
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  const [state, setState] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setState(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setState(false);
  };

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  function closePicker() {
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

  const debounceFn = useCallback(debounce(closePicker), [activeWorkspaceData]);

  // const openHandler = () => {
  //   setPickColor(true);
  // };

  // const handleClose = () => {
  //   setPickColor(false);
  // };

  // console.log("watch(name)", watch(name));

  return (
    <>
      <div
        className={`form-control w-full h-12 mb-2 border border-borderColor-main rounded-lg ${containerStyle}`}
        onClick={(e) => handleClick(e)}
      >
        <label className="flex h-full items-center justify-between px-4">
          <span className="text-base text-primary-main">{watch(name)}</span>

          {/* {pickColor && (
            <Controller
              name={name}
              control={control}
              render={({ field: { value, onChange, onBlur, ...field } }) => (
                <div
                  onClick={() => setIsShow(true)}
                  // onBlur={() => setIsShow(false)}
                  onMouseLeave={() => setIsShow(false)}
                >
                  <div className="absolute left-0 z-60">
                    <ChromePicker
                      color={value}
                      onChange={({ hex }) => onChange(hex)}
                      onChangeComplete={({ hex }) => {
                        onBlur(hex);
                        debounceFn();
                      }}
                      className={`color_pick_comp ${
                        isShow ? "block" : "hidden"
                      } z-50`}
                      {...field}
                    />
                  </div>
                </div>
              )}
            />
          )} */}

          {state ? (
            <div style={popover}>
              <div style={cover} onClick={(e) => handleClose(e)} />
              <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, onBlur, ...field } }) => (
                  <div className="absolute left-0 z-60">
                    <ChromePicker
                      color={value}
                      onChange={({ hex }) => onChange(hex)}
                      onChangeComplete={({ hex }) => {
                        onBlur(hex);
                        debounceFn();
                      }}
                      className={`color_pick_comp z-50`}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
          ) : null}

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
