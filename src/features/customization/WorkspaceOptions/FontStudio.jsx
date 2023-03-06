import React from "react";
import { useSelector } from "react-redux";
import InputWithIcon from "../../../components/Input/InputWithIcon";
import SelectBox from "../../../components/Input/SelectBox";

const FontStudio = ({ register }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  //   console.log("masterWorkspaceOptions", masterWorkspaceOptions);

  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={5}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Font Studio
          </div>
          <div className="collapse-content">
            <div className="flex flex-col">
              <SelectBox
                labelTitle="Font Family"
                labelStyle="text-primary-main text-base font-semibold"
                options={
                  masterWorkspaceOptions !== null
                    ? masterWorkspaceOptions?.data?.fontFamily
                    : []
                }
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="fontStudio.fontFamily"
                register={register}
                placeholder
              />

              <InputWithIcon
                type="number"
                labelTitle="Video Title"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.videoTitle"
                register={register}
                rightText="px"
              />

              <InputWithIcon
                type="number"
                labelTitle="Video Description"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.videoDescription"
                register={register}
                rightText="px"
              />

              <InputWithIcon
                type="number"
                labelTitle="CTA Button"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.ctaButton"
                register={register}
                rightText="px"
              />

              <InputWithIcon
                type="number"
                labelTitle="Author Name"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="fontStudio.authorName"
                register={register}
                rightText="px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FontStudio;
