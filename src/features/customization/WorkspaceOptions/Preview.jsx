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

  // console.log("activeWorkspaceData", activeWorkspaceData);

  const [userWebsite, setUserWebsite] = useState("");

  const updateValue = (data) => {
    setUserWebsite(data?.value);
  };

  // console.log("userWebsite", userWebsite);

  // to={`${window?.location?.origin}/preview/${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}?site=https://${userWebsite}`}

  // let decodedStringBtoA = `${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}`;
  // let encodedStringBtoA = btoa(decodedStringBtoA);
  // console.log("encodedStringBtoA", encodedStringBtoA);

  return (
    <>
      {/* <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={11}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Preview
          </div>

          <div className="collapse-content"> */}
      <div className="flex flex-col w-full p-0 active:bg-transparent hover:bg-transparent">
        <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
          <div className="flex items-center justify-between h-16 px-3 font-semibold">
            <span className="truncate text-xl text-gray-600">Preview</span>
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
            <div className="px-4 pb-4">
              <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
                <OpenEye />

                <p className="text-sm text-secondary-main font-bold ml-3">
                  Preview how this PopMe widget will look on your website
                  without embedding it.
                </p>
              </div>
              {/* </div>

<div className="px-4"> */}
              <div className="flex p-3 bg-[#F2F6F0]">
                <MouseSvg width="60" height="30" stroke="#4A8A37" />

                <p className="text-sm text-[#4A8A37] font-bold ml-3">
                  Preview how this PopMe widget will look on your website
                  without embedding it.
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
              <div
                className="flex items-center mb-6"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    `${window?.location?.origin}/preview/${btoa(
                      `${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}`
                    )}?site=https://${userWebsite}`,
                    "_blank"
                  );
                }}
              >
                <ShareSvg height="16" width="16" stroke="#3A6FFA" />

                {activeWorkspaceData !== null && (
                  <Link
                  // to={`${window?.location?.origin}/preview/${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}?site=https://${userWebsite}`}

                  // to={`${window?.location?.origin}/preview/${btoa(
                  //   `${activeWorkspaceData?._id}:${activeWorkspaceData?.identity}`
                  // )}?site=https://${userWebsite}`}

                  // target="_blank"

                  // to="https://stripe.com/docs/stripe-js/react"
                  // to={`http://localhost:5173/share/preview?site=https://${userWebsite}`}
                  >
                    <p className="text-base text-secondary-main font-bold ml-2">
                      {/* popme.io/preview?example.com */}
                      {/* https://popme-frontend.vercel.app/app/preview?site=https://opash.in */}
                      {`${window?.location?.origin}/preview?${userWebsite}`}
                    </p>
                  </Link>
                )}
              </div>
            </div>

            {/* <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2 mb-1">
                  Preview via custom domain
                </h5>

                <Button
                  text="Add custom domain"
                  buttonClass="w-full text-base"
                />
              </div> */}
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

export default Preview;
