import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import ModalButton from "../../components/Button/ModalButton";
import { openNewModal } from "../../redux/slices/newModalSlice";
import { getWorkspaceById } from "../workspaces/action";
import { setActiveWorkspaceData } from "../workspaces/reducer/workspaceSlice";
import VerifyYourWebsiteModal from "./VerifyYourWebsiteModal";
import WebsiteConnectedModal from "./WebsiteConnectedModal";

const baseURL = import.meta.env.VITE_BASE_URL;

const AddInstantEmbedModal = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);
  const { activeWorkspaceData, currentWebsiteUrl } = useSelector(
    (state) => state.workspace
  );

  // console.log("activeWorkspaceData", activeWorkspaceData);
  // console.log("currentWebsiteUrl", currentWebsiteUrl);

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
    // console.log("isVerify", isVerify);
  };

  const getWorkspaceHandler = () => {
    dispatch(getWorkspaceById(activeWorkspaceData._id))
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        // console.log("currentWebsiteUrl", currentWebsiteUrl);

        if (res?.success) {
          const checkData = res?.data?.website?.find(
            (item) =>
              item?.url === currentWebsiteUrl && item?.isVerfied === true
          );

          dispatch(setActiveWorkspaceData(res?.data));

          // console.log("checkData", checkData);

          if (checkData !== undefined) {
            modalClickHandler({
              id: "website-connected",
              children: <WebsiteConnectedModal />,
            });
          } else {
            modalClickHandler({
              id: "verify-your-website",
              children: <VerifyYourWebsiteModal />,
            });
          }

          // console.log("checkData", checkData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-4">
        Add Instant Embed
      </h3>
      <p className="mb-5 text-base text-primary-normal font-semibold">
        Add the Instant Embed code below into the footer of your website:
      </p>

      {/* {console.log("activeWorkspaceData", activeWorkspaceData)} */}

      {activeWorkspaceData !== null && (
        <div className="flex justify-end mb-2">
          <div className="tooltip" data-tip="Copy">
            <div
              className="flex justify-center items-center p-1 bg-white drop-shadow-xl rounded-md cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(
                  `<script type="text/javascript" src="${baseURL}/scripts/fn.js?org=${activeWorkspaceData?.identity}"></script>`
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-primary-normal"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full mb-6">
        {activeWorkspaceData !== null && (
          <p className="py-1 px-2 bg-[#F6F6F6] text-primary-main text-sm overflow-x-scroll whitespace-nowrap rounded-md [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-xl">
            {`<script type="text/javascript" src="${baseURL}/scripts/fn.js?org=${activeWorkspaceData?.identity}"></script>`}
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <div className="inline-block">
          <ModalButton
            text="I have added the code"
            id="verify-your-website"
            buttonClass="mb-4"
            clickHandler={() => getWorkspaceHandler()}
          />
        </div>

        <div className="inline-block">
          <ModalButton
            text="Cancel"
            id={id && id}
            buttonClass="mb-4 !bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
          />
        </div>
      </div>
    </div>
  );
};

export default AddInstantEmbedModal;
