import React from "react";

const CustomizationSvg = ({ svgClass }) => {
  return (
    <>
      <svg
        className={svgClass}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3V1M9 3C7.89543 3 7 3.89543 7 5C7 6.10457 7.89543 7 9 7M9 3C10.1046 3 11 3.89543 11 5C11 6.10457 10.1046 7 9 7M3 15C4.10457 15 5 14.1046 5 13C5 11.8954 4.10457 11 3 11M3 15C1.89543 15 1 14.1046 1 13C1 11.8954 1.89543 11 3 11M3 15V17M3 11V1M9 7V17M15 15C16.1046 15 17 14.1046 17 13C17 11.8954 16.1046 11 15 11M15 15C13.8954 15 13 14.1046 13 13C13 11.8954 13.8954 11 15 11M15 15V17M15 11V1"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default CustomizationSvg;
