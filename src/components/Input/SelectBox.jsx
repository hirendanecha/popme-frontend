import axios from "axios";
import React, { useState, useEffect } from "react";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";

function SelectBox(props) {
  const {
    labelTitle,
    labelDescription,
    defaultValue,
    containerStyle,
    placeholder,
    labelStyle,
    options,
    name,
    updateFormValue,
    selectStyle,
    register,
  } = props;

  const [value, setValue] = useState(defaultValue || "");

  // console.log("value", value);
  // console.log("defaultValue", defaultValue);

  const updateValue = (newValue, e) => {
    // console.log("newValue", newValue);
    // console.log("name", e.nativeEvent.target[e.target.selectedIndex].text);
    // console.log("index", e.target.selectedIndex);

    const name = e.nativeEvent.target[e.target.selectedIndex].text;
    updateFormValue({ name: name, value: newValue });
    setValue(newValue);
  };

  return (
    <div className={`inline-block ${containerStyle}`}>
      {labelDescription && (
        <label className={`label`}>
          <div className={`label-text ${labelStyle}`}>
            {labelTitle && labelTitle}
            {labelDescription && (
              <div
                className="tooltip tooltip-right"
                data-tip={labelDescription}
              >
                <InformationCircleIcon className="w-4 h-4" />
              </div>
            )}
          </div>
        </label>
      )}

      {labelTitle && (
        <label className="label">
          <span className={`label-text ${labelStyle}`}>{labelTitle}</span>
        </label>
      )}

      {register ? (
        <select
          className={`select select-bordered w-full text-primary-main bg-[#F9FAFB] text-base border-borderColor-main focus:outline-none ${selectStyle}`}
          {...register(name, { required: false })}
        >
          {/* {placeholder && (
            <option disabled selected>
              {placeholder}
            </option>
          )} */}

          {placeholder && (
            <option value="" disabled defaultValue>
              Select your option
            </option>
          )}

          {options.map((o, k) => {
            return (
              <option value={o.value ? o.value : o.name} key={k}>
                {o.label ? o.label : o.name}
              </option>
            );
          })}
        </select>
      ) : (
        <select
          className={`select select-bordered w-full text-primary-main bg-[#F9FAFB] text-base border-borderColor-main focus:outline-none ${selectStyle}`}
          onChange={(e) => updateValue(e.target.value, e)}
          value={defaultValue ? defaultValue : value}
        >
          {placeholder && (
            <option value="" disabled defaultValue>
              Select your option
            </option>
          )}

          {options &&
            options?.length > 0 &&
            options.map((o, k) => {
              return (
                <option
                  value={o.value || o.name}
                  key={k}
                  // selected={defaultValue && o.value === defaultValue}
                >
                  {o.name}
                </option>
              );
            })}
        </select>
      )}
    </div>
  );
}

export default SelectBox;
