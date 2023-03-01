import React from "react";

const TestingSvg = ({ svgClass }) => {
  return (
    <>
      <svg
        className={svgClass}
        width="22"
        height="18"
        viewBox="0 0 22 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.6038 12.4282C18.3246 12.149 17.969 11.9587 17.5818 11.8812L15.1943 11.4037C13.8859 11.1421 12.5277 11.324 11.3343 11.9207L11.0169 12.0793C9.8235 12.676 8.46526 12.8579 7.15691 12.5963L5.22516 12.2099C4.56944 12.0788 3.89157 12.284 3.41872 12.7569M7.17558 1H15.1756L14.1756 2V7.17157C14.1756 7.70201 14.3863 8.21071 14.7614 8.58579L19.7614 13.5858C21.0213 14.8457 20.129 17 18.3472 17H4.00401C2.2222 17 1.32987 14.8457 2.5898 13.5858L7.5898 8.58579C7.96487 8.21071 8.17558 7.70201 8.17558 7.17157V2L7.17558 1Z"
          stroke="#EFF6FF"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default TestingSvg;
