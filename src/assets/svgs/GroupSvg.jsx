import React from "react";

const GroupSvg = ({ width = "22", height = "18" }) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 17H21V15C21 13.3431 19.6569 12 18 12C17.0444 12 16.1931 12.4468 15.6438 13.1429M16 17H6M16 17V15C16 14.3438 15.8736 13.717 15.6438 13.1429M6 17H1V15C1 13.3431 2.34315 12 4 12C4.95561 12 5.80686 12.4468 6.35625 13.1429M6 17V15C6 14.3438 6.12642 13.717 6.35625 13.1429M6.35625 13.1429C7.0935 11.301 8.89482 10 11 10C13.1052 10 14.9065 11.301 15.6438 13.1429M14 4C14 5.65685 12.6569 7 11 7C9.34315 7 8 5.65685 8 4C8 2.34315 9.34315 1 11 1C12.6569 1 14 2.34315 14 4ZM20 7C20 8.10457 19.1046 9 18 9C16.8954 9 16 8.10457 16 7C16 5.89543 16.8954 5 18 5C19.1046 5 20 5.89543 20 7ZM6 7C6 8.10457 5.10457 9 4 9C2.89543 9 2 8.10457 2 7C2 5.89543 2.89543 5 4 5C5.10457 5 6 5.89543 6 7Z"
          stroke="#3A6FFA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default GroupSvg;
