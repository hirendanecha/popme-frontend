import React from "react";
import { useSelector } from "react-redux";
import CalendarSvg from "../../../assets/svgs/CalendarSvg";
import NewInputText from "../../../components/Input/NewInputText";
import SelectBox from "../../../components/Input/SelectBox";
import { CloseSvg, PhoneSvg, RightArrowSvg, RightExitSvg } from "../SvgComp";

const CallToActionModal = ({ register, valueChangeHandler }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  // const IconList = [
  //   {
  //     icon: <CloseSvg />,
  //     name: "closeSvg",
  //   },
  //   {
  //     icon: <RightArrowSvg />,
  //     name: "rightArrowSvg",
  //   },
  //   {
  //     icon: <RightExitSvg />,
  //     name: "rightExitSvg",
  //   },
  //   {
  //     icon: <CalendarSvg />,
  //     name: "calendarSvg",
  //   },
  //   {
  //     icon: <PhoneSvg />,
  //     name: "phoneSvg",
  //   },
  // ];

  const conv = (svg) => {
    const decodedString = document.createElement("textarea");
    decodedString.innerHTML = svg;
    return decodedString.value;
  };

  return (
    <>
      {/* <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={2}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Call To Action
          </div>
          <div className="collapse-content"> */}
          <div className="flex flex-col w-full p-0 active:bg-transparent hover:bg-transparent">
                  <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
                    <div className="flex items-center justify-between h-16 px-3 font-semibold">
                      <span className="truncate text-xl text-gray-600">Call To Action</span>
                      <svg className="mx-2" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1L8 8L1 1" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    </div>
                    <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-screen focus-within:max-h-screen">
                      


            {/* <div className="flex flex-col"> */}
            <div className="px-4">
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
              <div className="px-4">
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

              <div className="flex flex-col mb-3 px-4">
                <h5 className="text-primary-main text-base font-semibold py-2 text-left">
                  Button Icon
                </h5>

                <div className="flex flex-wrap gap-3">
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
                            <div
                              dangerouslySetInnerHTML={{
                                __html: conv(item?.svg),
                              }}
                              className="flex items-center justify-center -z-10"
                            />
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
                containerStyle="min-w-[18rem] mb-4 pb-3"
                selectStyle="text-primary-main"
                name="callToAction.buttonCorner"
                register={register}
                placeholder
                valueChangeHandler={valueChangeHandler}
              />
            </div>
          {/* </div> */}
        {/* </div> */}
        </button>
      </div>
    </>
  );
};

export default CallToActionModal;
