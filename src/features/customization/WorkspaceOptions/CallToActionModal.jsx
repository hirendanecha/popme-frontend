import React from "react";
import { useSelector } from "react-redux";
import CalendarSvg from "../../../assets/svgs/CalendarSvg";
import NewInputText from "../../../components/Input/NewInputText";
import SelectBox from "../../../components/Input/SelectBox";
import {
  CheckSvg,
  CloseSvg,
  GiftSvg,
  InfoCircleSvg,
  MessageSvg,
  NewCalendarSvg,
  NewPhoneSvg,
  NewRightArrowSvg,
  PhoneSvg,
  RightArrowSvg,
  RightExitSvg,
  SendSvg,
} from "../SvgComp";

const CallToActionModal = ({ register, valueChangeHandler }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  const conv = (svg) => {
    const decodedString = document.createElement("textarea");
    decodedString.innerHTML = svg;
    return decodedString.value;
  };

  const renderSwitch = (activeWorkspaceData) => {
    // console.log("activeWorkspaceData", activeWorkspaceData);

    switch (activeWorkspaceData !== null) {
      case activeWorkspaceData === "arrow":
        return <NewRightArrowSvg />;

      case activeWorkspaceData === "send":
        return <SendSvg />;

      case activeWorkspaceData === "roundedarrow":
        return <RightExitSvg />;

      case activeWorkspaceData === "calendar":
        return <NewCalendarSvg />;

      case activeWorkspaceData === "cross":
        return <CloseSvg />;

      case activeWorkspaceData === "none":
        return null;

      case activeWorkspaceData === "phone":
        return <NewPhoneSvg />;

      case activeWorkspaceData === "check":
        return <CheckSvg />;

      case activeWorkspaceData === "gift":
        return <GiftSvg />;

      case activeWorkspaceData === "info-circle":
        return <InfoCircleSvg />;

      case activeWorkspaceData === "message-2":
        return <MessageSvg />;

      default:
        return <NewRightArrowSvg />;
    }
  };

  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        {/* <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800"> */}

        <h2 className="w-full" id="headingThree">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none  [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            // className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-600 font-semibold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"

            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Call To Action
            <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
              {/* <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"> */}

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
          id="collapseThree"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingThree"
          data-te-parent="#accordionExample"
        >
          <div className="pb-2 px-4">
            <div>
              <NewInputText
                type="text"
                labelTitle="Button Text"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="callToAction.buttonText"
                register={register}
                valueChangeHandler={valueChangeHandler}
              />
            </div>
            <div>
              <NewInputText
                type="url"
                labelTitle="Destination URL"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="callToAction.destinationUrl"
                register={register}
                valueChangeHandler={valueChangeHandler}
              />
            </div>

            <div className="flex flex-col mb-3">
              <h5 className="text-primary-main text-base font-semibold py-2 text-left">
                Button Icon
              </h5>

              <div className="flex flex-wrap gap-3">
                {/* {console.log(masterWorkspaceOptions,"rr>>>")} */}
                {masterWorkspaceOptions !== null &&
                  masterWorkspaceOptions?.data?.buttonIcons?.map(
                    (item, index) => (
                      <div className="inline-block" key={index}>
                        <input
                          type="radio"
                          id={item?._id}
                          name="callToAction.buttonIcon"
                          {...register("callToAction.buttonIcon", {
                            onChange: () => {
                              valueChangeHandler();
                            },
                          })}
                          value={item?.name}
                          className="hidden peer"
                          // required
                        ></input>

                        <label
                          htmlFor={item?._id}
                          className="peer-checked:border-secondary-main flex items-center justify-center h-6 w-6 border border-borderColor-main"
                        >
                          {/* <div
                            dangerouslySetInnerHTML={{
                              __html: conv(item?.svg),
                            }}
                            className="flex items-center justify-center"
                          /> */}

                          {renderSwitch(item?.name)}
                        </label>
                      </div>
                    )
                  )}
              </div>
            </div>

            <SelectBox
              labelTitle="Button Style"
              labelStyle="text-primary-main text-base font-semibold"
              options={
                masterWorkspaceOptions !== null
                  ? masterWorkspaceOptions?.data?.buttonStyle
                  : []
              }
              containerStyle="min-w-[18rem] mb-3"
              selectStyle="text-primary-main"
              name="callToAction.buttonStyle"
              register={register}
              placeholder
              valueChangeHandler={valueChangeHandler}
            />

            <SelectBox
              labelTitle="Button Corners"
              labelStyle="text-primary-main text-base font-semibold"
              options={
                masterWorkspaceOptions !== null
                  ? masterWorkspaceOptions?.data?.buttonCorner
                  : []
              }
              containerStyle="min-w-[18rem] pb-3"
              selectStyle="text-primary-main"
              name="callToAction.buttonCorner"
              register={register}
              placeholder
              valueChangeHandler={valueChangeHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CallToActionModal;
