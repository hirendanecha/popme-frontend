import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import InputWithIcon from "../../../components/Input/InputWithIcon";

const GetLink = ({ register }) => {
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  const [customLink, setCustomLink] = useState("");

  useEffect(() => {
    if (activeWorkspaceData !== null) {
      setCustomLink(
        `${window?.location?.origin}/share/${btoa(
          `${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}`
        )}`
      );
    }
  }, [activeWorkspaceData]);

  return (
    <>
      <div className="flex flex-col w-80 p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-80" id="headingEight">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseEight"
            aria-expanded="false"
            aria-controls="collapseEight"
          >
            Get Link
            <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseEight"
          className="!visible hidden w-80"
          data-te-collapse-item
          aria-labelledby="headingEight"
          data-te-parent="#accordionExample"
        >
          <div className="">
            <div className="px-4">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Share Link
              </h4>
              <div className="flex mb-6">
                <ClipBoardSvg width="90" height="50" />

                <p className="text-base text-left text-[#202223] ml-3">
                  You can share your popme widget through a direct link without
                  embedding it on your website.
                </p>
              </div>
            </div>
            <div className="px-4 pb-6">
              <h4 className="text-lg text-left text-primary-normal font-bold mb-2">
                PopMe Custom Link
              </h4>

              <div className="flex w-full justify-between p-3 rounded-lg border border-borderColor-main text-primary-main">
                <p
                  id="a"
                  onClick={() => navigator.clipboard.writeText(customLink)}
                  className="w-[calc(100%-80px)] inline-block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {customLink}
                </p>

                <div
                  // onClick={() => {
                  //   window.open(customLink, "_blank");
                  // }}
                  className="flex justify-end"
                >
                  <Link to={customLink} target="_blank">
                    <ShareSvg />
                  </Link>
                  {/* <ShareSvg /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLink;
