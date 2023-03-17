import React from "react";
import { useSelector } from "react-redux";
import InputWithIcon from "../../../components/Input/InputWithIcon";
import NewInputText from "../../../components/Input/NewInputText";
import SelectBox from "../../../components/Input/SelectBox";

const DesignCustomization = ({ register, valueChangeHandler }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  // console.log("masterWorkspaceOptions", masterWorkspaceOptions);

  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={3}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Design Customization
          </div>

          <div className="collapse-content p-0">
            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <NewInputText
                type="text"
                labelTitle="Author Name"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="designCustomization.authorName"
                register={register}
                valueChangeHandler={valueChangeHandler}
              />

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
              <h4 className="text-xl font-bold text-primary-normal py-4">
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

            <div className="flex flex-col px-4">
              <h4 className="text-xl font-bold text-primary-normal py-4">
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
