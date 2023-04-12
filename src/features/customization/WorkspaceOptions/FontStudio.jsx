import React from "react";
import { useSelector } from "react-redux";
import InputWithIcon from "../../../components/Input/InputWithIcon";
import SelectBox from "../../../components/Input/SelectBox";

const FontStudio = ({ register, valueChangeHandler }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);
  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-full" id="headingSix">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseSix"
            aria-expanded="false"
            aria-controls="collapseSix"
          >
            Font Studio
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
          id="collapseSix"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingSix"
          data-te-parent="#accordionExample"
        >
          <div>
            <div className="px-4">
              <SelectBox
                labelTitle="Font Family"
                labelStyle="text-primary-main text-base font-semibold"
                options={
                  masterWorkspaceOptions !== null
                    ? masterWorkspaceOptions?.data?.fontFamily
                    : []
                }
                containerStyle="min-w-[18rem] mb-3"
                selectStyle="text-primary-main"
                name="fontStudio.fontFamily"
                register={register}
                placeholder
                valueChangeHandler={valueChangeHandler}
              />
            </div>

            <div className="px-4">
              <InputWithIcon
                type="number"
                labelTitle="Video Title"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.videoTitle"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
              />
            </div>

            <div className="px-4">
              <InputWithIcon
                type="number"
                labelTitle="Video Description"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.videoDescription"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
              />
            </div>

            <div className="px-4">
              <InputWithIcon
                type="number"
                labelTitle="CTA Button"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.ctaButton"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
              />
            </div>

            {/* <div className="px-4 pb-4">
              <InputWithIcon
                type="number"
                labelTitle="Author Name"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.authorName"
                register={register}
                rightText="px"
                valueChangeHandler={valueChangeHandler}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FontStudio;
