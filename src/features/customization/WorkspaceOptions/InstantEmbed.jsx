import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import Button from "../../../components/Button/Button";
import ModalButton from "../../../components/Button/ModalButton";
import SelectBox from "../../../components/Input/SelectBox";
import { openNewModal } from "../../../redux/slices/newModalSlice";
import ConnectWebsiteModal from "../ConnectWebsiteModal";
import { toast } from "react-toastify";
import SelectPagesModal from "./SelectPagesModal";
import { getWebsitesByWorkspaceId } from "../../workspaces/action";
import EmbedInwebsiteSelect from "./EmbedInwebsiteSelect";

const InstantEmbed = ({ register }) => {
  const dispatch = useDispatch();
  const { activeWorkspaceData } = useSelector((state) => state.workspace);
  const { userPlanDetails } = useSelector((state) => state.setting);

  // const [inWebsiteSelect, setInWebsiteSelect] = useState("all");

  // console.log("workspaceList", workspaceList);
  // console.log("userPlanDetails", userPlanDetails);
  // console.log(
  //   "userPlanDetails",
  //   userPlanDetails?.analytics?.websites,
  //   userPlanDetails?.selectedPlan?.props?.displayVideoToWeb
  // );

  const modalClickHandler = (props) => {
    if (
      userPlanDetails !== null &&
      userPlanDetails?.analytics?.websites !==
        userPlanDetails?.selectedPlan?.props?.displayVideoToWeb
    ) {
      dispatch(openNewModal(props));
    } else {
      toast("Your limit has been over please upgrade your plan", {
        type: "info",
      });
    }
    // dispatch(openNewModal(props));
  };

  // const updateValue = (data) => {
  //   setInWebsiteSelect(data?.value);
  //   console.log("inWebsiteSelect", data?.value);
  // };

  // const selectPagesModalClickHandler = (props) => {
  //   const { websiteData, ...rest } = props;
  //   dispatch(getWebsitesByWorkspaceId(websiteData));
  //   dispatch(openNewModal(rest));
  // };

  // console.log("inWebsiteSelect", inWebsiteSelect);
  // console.log("activeWorkspaceData", activeWorkspaceData);

  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-full" id="headingNine">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseNine"
            aria-expanded="false"
            aria-controls="collapseNine"
          >
            Instant Embed
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
          id="collapseNine"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingNine"
          data-te-parent="#accordionExample"
        >
          <>
            <div className="px-4">
              <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-14 h-7 text-secondary-main"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>

                <p className="text-sm text-left text-secondary-main font-bold ml-3">
                  Connect your website with Popme and embed any widget with one
                  click.
                </p>
              </div>
            </div>

            <div className="px-4">
              <div className="flex p-3 bg-[#F2F6F0] mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-7 text-[#4A8A37]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="text-sm text-[#4A8A37] font-bold ml-3">
                  The process takes one minute by putting a code on your
                  website.
                </p>
              </div>

              <ModalButton
                text="Connect a Website"
                id="connect-website"
                buttonClass="mb-4"
                clickHandler={() =>
                  modalClickHandler({
                    id: "connect-website",
                    children: <ConnectWebsiteModal />,
                  })
                }
              />

              {activeWorkspaceData !== null &&
                activeWorkspaceData?.website
                  ?.filter((web) => web?.isVerfied === true)
                  ?.map((item) => (
                    <div className="inline-block w-full" key={item?._id}>
                      <EmbedInwebsiteSelect item={item} />
                    </div>
                  ))}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default InstantEmbed;
