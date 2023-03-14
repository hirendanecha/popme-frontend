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

        if (res?.success) {
          const checkData = res?.data?.website?.find(
            (item) =>
              item?.url === currentWebsiteUrl && item?.isVerfied === true
          );

          if (checkData !== undefined) {
            dispatch(setActiveWorkspaceData(res?.data));

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

      <div className="flex w-full mb-6">
        {activeWorkspaceData !== null && (
          <p className="py-1 px-2 bg-[#F6F6F6] text-primary-main text-sm overflow-x-scroll whitespace-nowrap rounded-md [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-xl">
            {`<script type="text/javascript" src="${baseURL}scripts/fn.js?org=${activeWorkspaceData?.identity}"></script>`}
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
