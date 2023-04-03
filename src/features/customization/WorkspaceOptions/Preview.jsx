import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MouseSvg from "../../../assets/svgs/MouseSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import Button from "../../../components/Button/Button";
import NewInputText from "../../../components/Input/NewInputText";
import { OpenEye } from "../SvgComp";

const Preview = ({ register }) => {
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  const [userWebsite, setUserWebsite] = useState("");

  const updateValue = (data) => {
    setUserWebsite(data?.value);
  };

  const url = `${window?.location?.origin}/preview/${btoa(
    `${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}`
  )}?site=https://${userWebsite}`;

  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-full" id="headingSeven">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseSeven"
            aria-expanded="false"
            aria-controls="collapseSeven"
          >
            Preview
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
          id="collapseSeven"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingSeven"
          data-te-parent="#accordionExample"
        >
          <div className="">
            <div className="px-4 pb-4">
              <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
                <OpenEye />

                <p className="text-sm text-left text-secondary-main font-bold ml-3">
                  Preview how this PopMe widget will look on your website
                  without embedding it.
                </p>
              </div>
              {/* </div>

<div className="px-4"> */}
              <div className="flex p-3 bg-[#F2F6F0]">
                <MouseSvg width="60" height="30" stroke="#4A8A37" />

                <p className="text-sm text-left text-[#4A8A37] font-bold ml-3">
                  Enter your website in the input field and then click the
                  URL(s) below.
                </p>
              </div>
              {/* </div>

<div className="px-4"> */}
              <NewInputText
                type="text"
                labelTitle="Your website"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="Preview.yourWebsite"
                placeholder="example.com"
                // register={register}
                defaultValue={userWebsite}
                updateFormValue={updateValue}
              />
              {/* </div>

<div className="px-4"> */}
              {/* {console.log(activeWorkspaceData?.identity,"???")} */}
              <div className="flex items-center mb-6">
                <ShareSvg height="18" width="18" stroke="#3A6FFA" />

                {activeWorkspaceData !== null && (
                  <Link
                    // // to={`${window?.location?.origin}/preview/${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}?site=https://${userWebsite}`}
                    to={url}
                    target="_blank"
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   window.open(url, "_blank");
                    // }}

                    //   // to={`http://localhost:5173/share/preview?site=https://${userWebsite}`}
                  >
                    <p
                      // onClick={() => {
                      //   window.open(
                      //     `${window?.location?.origin}/preview/${btoa(
                      //       `${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}`
                      //     )}?site=https://${userWebsite}`,
                      //     "_blank"
                      //   );
                      // }}
                      className="text-base text-secondary-main font-bold ml-2 text-left"
                    >
                      {/* popme.io/preview?example.com */}
                      {/* https://popme-frontend.vercel.app/app/preview?site=https://opash.in */}
                      {`${window?.location?.origin}/preview?${userWebsite}`}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
