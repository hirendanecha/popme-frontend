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

const ColorStudio = ({
  register,
  watch,
  valueChangeHandler,
  control,
  setValue,
}) => {
  const colorTheme = (color) => {
    switch (color) {
      case "green":
        return "#24CB3F";

      case "orange":
        return "#FFBB0E";

      case "red":
        return "#FF0056";

      case "blue":
        return "#00A3FF";
    }
  };

  const changeHandler = (e) => {
    // console.log("selected value", e.target.value);

    let color = colorTheme(e.target.value);

    // console.log("jjj", color);

    setValue("colorStudio.callToAction.buttonBackground", color);
    setValue("colorStudio.callToAction.buttonOutline", color);
    setValue("colorStudio.player.seeker", color);
    valueChangeHandler();
  };

  return (
    <>
      <div className="flex flex-col w-full p-0 active:bg-transparent hover:bg-transparent">
        <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
          <div className="flex items-center justify-between h-16 px-3 font-semibold">
            <span className="truncate text-xl text-gray-600">Color Studio</span>
            <svg
              className="mx-2"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L8 8L1 1"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-full focus-within:max-h-full [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h5 className="text-primary-main text-base text-left font-semibold py-2">
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
                    {...register("colorStudio.templates", {
                      onChange: (e) => changeHandler(e),
                    })}
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
                    {...register("colorStudio.templates", {
                      onChange: (e) => changeHandler(e),
                    })}
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
                    {...register("colorStudio.templates", {
                      onChange: (e) => changeHandler(e),
                    })}
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
                    {...register("colorStudio.templates", {
                      onChange: (e) => changeHandler(e),
                    })}
                    value="orange"
                    className="radio bg-[#FFBB0E] checked:bg-[#FFBB0E] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                General
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base text-left font-semibold py-2">
                  Video Title
                </h5>
                <ColorPickerInput
                  name="colorStudio.general.videoTitle"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Video Description
                </h5>
                <ColorPickerInput
                  name="colorStudio.general.videoDescription"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Gradient Overlay
                </h5>
                <ColorPickerInput
                  name="colorStudio.general.gradientOverlay"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Call To Action
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Button Text
                </h5>
                <ColorPickerInput
                  name="colorStudio.callToAction.buttonText"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Button Background
                </h5>
                <ColorPickerInput
                  name="colorStudio.callToAction.buttonBackground"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Button Outline
                </h5>
                <ColorPickerInput
                  name="colorStudio.callToAction.buttonOutline"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Player
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Controls
                </h5>
                <ColorPickerInput
                  name="colorStudio.player.control"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Seeker
                </h5>
                <ColorPickerInput
                  name="colorStudio.player.seeker"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Author Name
                </h5>
                <ColorPickerInput
                  name="colorStudio.player.authorName"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 pb-4">
              <h4 className="text-xl text-left font-bold text-primary-normal py-4">
                Toggle
              </h4>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Play Icon
                </h5>
                <ColorPickerInput
                  name="colorStudio.toggle.playIcon"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Close Background
                </h5>
                <ColorPickerInput
                  name="colorStudio.toggle.closeBackground"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-left text-base font-semibold py-2">
                  Close Icon Color
                </h5>
                <ColorPickerInput
                  name="colorStudio.toggle.closeIconColor"
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default ColorStudio;
