import React from "react";

const MouseSvg = ({ width = "20", height = "20", stroke = "#3A6FFA" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.7615 13.7615L11.7615 18.7615L7.76155 7.76147L18.7615 11.7615L13.7615 13.7615ZM13.7615 13.7615L18.7615 18.7615M5.94978 1L6.72624 3.89778M3.89778 6.7262L1 5.94974M12.7113 2.81177L10.5899 4.93309M4.93318 10.5898L2.81186 12.7112"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default MouseSvg;
