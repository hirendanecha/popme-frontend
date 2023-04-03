import React from "react";
import { useSelector } from "react-redux";
import InputWithIcon from "../../../components/Input/InputWithIcon";
import NewInputText from "../../../components/Input/NewInputText";
import SelectBox from "../../../components/Input/SelectBox";

const DesignCustomization = ({ register, valueChangeHandler }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);
  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-full" id="headingFour">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseFour"
            aria-expanded="false"
            aria-controls="collapseFour"
          >
            Design Customization
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
          id="collapseFour"
          className="!visible hidden w-full"
          data-te-collapse-item
          aria-labelledby="headingFour"
          data-te-parent="#accordionExample"
        >
          <div className="">
            <div className="px-4 pb-3 border-b">
              <NewInputText
                type="text"
                labelTitle="Author Name"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.authorName"
                register={register}
                valueChangeHandler={valueChangeHandler}
              />
              {/* </div>

<div className="px-4"> */}
              <InputWithIcon
                type="number"
                labelTitle="Vertical Margin"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.verticalMargin"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
                max="500"
              />
              {/* </div>
<div className="px-4 "> */}
              <InputWithIcon
                type="number"
                labelTitle="Horizontal Margin"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.horizontalMargin"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
                max="500"
              />
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Toggle
              </h4>

              <InputWithIcon
                type="number"
                labelTitle="Size"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.toggle.size"
                register={register}
                rightText="%"
                max="100"
                valueChangeHandler={valueChangeHandler}
              />

              <SelectBox
                labelTitle="Animation"
                labelStyle="text-primary-main text-base font-semibold"
                options={
                  masterWorkspaceOptions !== null &&
                  masterWorkspaceOptions?.data?.toggleAnimation
                    ? masterWorkspaceOptions?.data?.toggleAnimation.filter(
                        (item) => item?.value !== ""
                      )
                    : []
                }
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="designCustomization.toggle.animation"
                register={register}
                placeholder
                valueChangeHandler={valueChangeHandler}
              />

              <SelectBox
                labelTitle="Show Play Icon"
                labelStyle="text-primary-main text-base font-semibold"
                options={[
                  { label: "Show", value: "true" },
                  { label: "Hide", value: "false" },
                ]}
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="designCustomization.toggle.showPlayIcon"
                register={register}
                placeholder
                valueChangeHandler={valueChangeHandler}
              />

              <SelectBox
                labelTitle="Show Close Icon"
                labelStyle="text-primary-main text-base font-semibold"
                options={[
                  { label: "Show", value: "true" },
                  { label: "Hide", value: "false" },
                ]}
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="designCustomization.toggle.showCloseIcon"
                register={register}
                placeholder
                valueChangeHandler={valueChangeHandler}
              />
            </div>

            <div className="flex flex-col px-4 pb-3 border-borderColor-main">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Player
              </h4>

              <InputWithIcon
                type="number"
                labelTitle="Width"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.player.size"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
              />

              <InputWithIcon
                type="number"
                labelTitle="Height"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.player.height"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
              />

              <SelectBox
                labelTitle="On mobile devices"
                labelStyle="text-primary-main text-base font-semibold"
                options={[
                  { label: "Full screen", value: "full_screen" },
                  { label: "Actual Size", value: "actual_size" },
                ]}
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="designCustomization.player.onMobileDevice"
                register={register}
                placeholder
                valueChangeHandler={valueChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignCustomization;
