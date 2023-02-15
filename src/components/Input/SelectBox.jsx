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
    register
  } = props;

  const [value, setValue] = useState(defaultValue || "");

  const updateValue = (newValue) => {
    updateFormValue({ name, value: newValue });
    setValue(newValue);
  };

  return (
    <div className={`inline-block w-full ${containerStyle}`}>

      {labelDescription ? (
        <label className={`label`}>
          <div className={`label-text ${labelStyle}`}>
            {labelTitle && labelTitle}
            {labelDescription && (
              <div className='tooltip tooltip-right' data-tip={labelDescription}>
                <InformationCircleIcon className='w-4 h-4' />
              </div>
            )}
          </div>
        </label>
      ) : (
        <label className="label">
          <span className={`label-text ${labelStyle}`}>{labelTitle}</span>
        </label>
      )}

      {
        register ? (

          <select
            className={`select select-bordered w-full text-primary-main bg-[#F9FAFB] text-base border-borderColor-main focus:outline-none ${selectStyle}`}
            {...register(name, { required: false })}
          >
            {
              placeholder && (
                <option disabled selected>
                  {placeholder}
                </option>
              )
            }

            {options.map((o, k) => {
              return (
                <option value={o.value || o.name} key={k}>
                  {o.name}
                </option>
              );
            })}
          </select>
        ) : (
          <select
            className={`select select-bordered w-full text-primary-main bg-[#F9FAFB] text-base border-borderColor-main focus:outline-none ${selectStyle}`}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          >
            {
              placeholder && (
                <option disabled selected>
                  {placeholder}
                </option>
              )
            }

            {options.map((o, k) => {
              return (
                <option value={o.value || o.name} key={k}>
                  {o.name}
                </option>
              );
            })}
          </select>
        )
      }


    </div >
  );
}

export default SelectBox;
