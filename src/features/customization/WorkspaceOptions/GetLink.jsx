import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import InputWithIcon from "../../../components/Input/InputWithIcon";

const GetLink = ({ register }) => {
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  // console.log("activeWorkspaceData", activeWorkspaceData);

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

  // console.log("customLink", customLink);
  // const updateValue = (data) => {
  //   setCustomLink(data?.value);
  // };

  return (
    <>
      {/* <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={6}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Get Link
          </div>
          <div className="collapse-content"> */}
      <div className="flex flex-col w-80 p-0 active:bg-transparent hover:bg-transparent">
        <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
          <div className="flex items-center justify-between h-16 px-3 font-semibold">
            <span className="truncate text-xl text-gray-600">Get Link</span>
            <svg
              className="mx-2"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L8 8L1 1"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-screen focus-within:max-h-screen">
            {/* <div className="flex flex-col"> */}

            <div className="px-4">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Share Link
              </h4>
              <div className="flex mb-6">
                <ClipBoardSvg width="90" height="50" />

                <p className="text-base text-left text-[#202223] ml-3">
                  You can share your facepop widget through a direct link
                  without embedding it on your website.
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
                  className="flex justify-end"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(customLink, "_blank");
                  }}
                >
                  {/* <Link to={customLink} target="_blank"> */}
                  <ShareSvg />
                  {/* </Link> */}
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div>
          </div>
        </div> */}
          </div>
        </button>
      </div>
    </>
  );
};

export default GetLink;
