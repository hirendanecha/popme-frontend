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
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-full" id="headingFive">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-600 font-semibold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseFive"
            aria-expanded="false"
            aria-controls="collapseFive"
          >
            Color Studio
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
          id="collapseFive"
          className="!visible hidden w-full"
          data-te-collapse-item
          aria-labelledby="headingFive"
          data-te-parent="#accordionExample"
        >
          <div className="py-4">
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
        </div>
      </div>
    </>
  );
};

export default ColorStudio;
