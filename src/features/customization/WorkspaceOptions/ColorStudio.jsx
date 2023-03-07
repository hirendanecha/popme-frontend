import React from "react";
import ColorPickerInput from "../../../components/Input/ColorPickerInput";

export const ColorObj = {
  colorStudio: {
    general: {
      videoTitle: "#FFFFFF",
      videoDescription: "#FFFFFF",
      gradientOverlay: "#273149",
    },
    callToAction: {
      buttonText: "#FFFFFF",
      buttonBackground: "#1B5CF3",
      buttonOutline: "#FFFFFF",
    },
    player: {
      controls: "#FFFFFF",
      seeker: "#FFFFFF",
      authorName: "#FFFFFF",
    },
    toggle: {
      playIcon: "#FFFFFF",
      closeBackground: "#FFFFFF",
      closeIconColor: "#FFFFFF",
    },
  },
};

const ColorStudio = ({ register, watch }) => {
  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={4}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Color Studio
          </div>
          <div className="collapse-content p-0">
            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h5 className="text-primary-main text-base font-semibold py-2">
                Templates
              </h5>

              <div className="form-control border border-borderColor-main rounded-lg mb-2">
                <label className="label cursor-pointer py-[12px] px-4">
                  <span className="label-text text-base text-primary-main">
                    Red
                  </span>
                  <input
                    type="radio"
                    name="colorStudio.templates"
                    {...register("colorStudio.templates")}
                    value="red"
                    className="radio bg-[#FF0056] checked:bg-[#FF0056] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                  />
                </label>
              </div>

              <div className="form-control border border-borderColor-main rounded-lg mb-2">
                <label className="label cursor-pointer py-[12px] px-4">
                  <span className="label-text text-base text-primary-main">
                    Blue
                  </span>
                  <input
                    type="radio"
                    name="colorStudio.templates"
                    {...register("colorStudio.templates")}
                    value="blue"
                    className="radio bg-[#00A3FF] checked:bg-[#00A3FF] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                  />
                </label>
              </div>

              <div className="form-control border border-borderColor-main rounded-lg mb-2">
                <label className="label cursor-pointer py-[12px] px-4">
                  <span className="label-text text-base text-primary-main">
                    Green
                  </span>
                  <input
                    type="radio"
                    name="colorStudio.templates"
                    {...register("colorStudio.templates")}
                    value="green"
                    className="radio bg-[#24CB3F] checked:bg-[#24CB3F] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                  />
                </label>
              </div>

              <div className="form-control border border-borderColor-main rounded-lg mb-2">
                <label className="label cursor-pointer py-[12px] px-4">
                  <span className="label-text text-base text-primary-main">
                    Orange
                  </span>
                  <input
                    type="radio"
                    name="colorStudio.templates"
                    {...register("colorStudio.templates")}
                    value="orange"
                    className="radio bg-[#FFBB0E] checked:bg-[#FFBB0E] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl font-bold text-primary-normal py-4">
                General
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Video Title
                </h5>
                <ColorPickerInput
                  name="colorStudio.general.videoTitle"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Video Description
                </h5>
                <ColorPickerInput
                  name="colorStudio.general.videoDescription"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Gradient Overlay
                </h5>
                <ColorPickerInput
                  name="colorStudio.general.gradientOverlay"
                  register={register}
                  watch={watch}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl font-bold text-primary-normal py-4">
                Call To Action
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Button Text
                </h5>
                <ColorPickerInput
                  name="colorStudio.callToAction.buttonText"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Button Background
                </h5>
                <ColorPickerInput
                  name="colorStudio.callToAction.buttonBackground"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Button Outline
                </h5>
                <ColorPickerInput
                  name="colorStudio.callToAction.buttonOutline"
                  register={register}
                  watch={watch}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl font-bold text-primary-normal py-4">
                Player
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Controls
                </h5>
                <ColorPickerInput
                  name="colorStudio.player.controls"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Seeker
                </h5>
                <ColorPickerInput
                  name="colorStudio.player.seeker"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Author Name
                </h5>
                <ColorPickerInput
                  name="colorStudio.player.authorName"
                  register={register}
                  watch={watch}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3">
              <h4 className="text-xl font-bold text-primary-normal py-4">
                Toggle
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Play Icon
                </h5>
                <ColorPickerInput
                  name="colorStudio.toggle.playIcon"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Close Background
                </h5>
                <ColorPickerInput
                  name="colorStudio.toggle.closeBackground"
                  register={register}
                  watch={watch}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Close Icon Color
                </h5>
                <ColorPickerInput
                  name="colorStudio.toggle.closeIconColor"
                  register={register}
                  watch={watch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorStudio;
