import React from "react";

const ShareSvg = ({ width = "23", height = "23", stroke = "#707070" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.875 3.625H3.625C2.17525 3.625 1 4.80025 1 6.25V19.375C1 20.8247 2.17525 22 3.625 22H16.75C18.1997 22 19.375 20.8247 19.375 19.375V14.125M14.125 1H22M22 1V8.875M22 1L8.875 14.125"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default ShareSvg;
