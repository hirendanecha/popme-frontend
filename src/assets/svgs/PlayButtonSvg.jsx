import React from "react";

const PlayButtonSvg = () => {
  return (
    <>
      <svg
        width="23"
        height="26"
        viewBox="0 0 23 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_457_1276)">
          <path
            d="M6.23177 3.31502C5.57656 2.90884 4.75312 2.89545 4.08464 3.27485C3.41615 3.65424 3 4.3684 3 5.14505V20.8566C3 21.6332 3.41615 22.3474 4.08464 22.7268C4.75312 23.1062 5.57656 23.0883 6.23177 22.6866L18.9818 14.8308C19.6148 14.4425 20 13.7507 20 13.0008C20 12.2509 19.6148 11.5636 18.9818 11.1708L6.23177 3.31502Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_457_1276"
            x="0"
            y="0"
            width="23"
            height="26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.43 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_457_1276"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_457_1276"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default PlayButtonSvg;
