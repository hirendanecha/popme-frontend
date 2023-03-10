import React from "react";

const WorkspaceSvg = ({ svgClass }) => {
  return (
    <>
      <svg
        className={svgClass}
        width="20"
        height="14"
        viewBox="0 0 20 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 5L17.5528 2.72361C18.2177 2.39116 19 2.87465 19 3.61803V10.382C19 11.1253 18.2177 11.6088 17.5528 11.2764L13 9M3 13H11C12.1046 13 13 12.1046 13 11V3C13 1.89543 12.1046 1 11 1H3C1.89543 1 1 1.89543 1 3V11C1 12.1046 1.89543 13 3 13Z"
          stroke="#EFF6FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default WorkspaceSvg;
