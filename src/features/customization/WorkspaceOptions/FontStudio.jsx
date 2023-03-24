import React from "react";
import { useSelector } from "react-redux";
import InputWithIcon from "../../../components/Input/InputWithIcon";
import SelectBox from "../../../components/Input/SelectBox";

const FontStudio = ({ register, valueChangeHandler }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  //   console.log("masterWorkspaceOptions", masterWorkspaceOptions);

  return (
    <>
      {/* <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={5}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Font Studio
          </div>
          <div className="collapse-content"> */}
<div className="flex flex-col w-full p-0 active:bg-transparent hover:bg-transparent">
                  <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
                    <div className="flex items-center justify-between h-16 px-3 font-semibold">
                      <span className="truncate text-xl text-gray-600">Font Studio</span>
                      <svg className="mx-2" width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 1L8 8L1 1" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    </div>
                    <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-screen focus-within:max-h-screen">
                     




            {/* <div className="flex flex-col"> */}
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

<div className="px-4 pb-4">
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

export default FontStudio;
