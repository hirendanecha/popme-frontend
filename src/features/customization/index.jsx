import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setPageTitle } from "../../redux/slices/headerSlice";

import Button from "../../components/Button/Button";
import ClipBoardSvg from "../../assets/svgs/ClipBoardSvg";
import SelectBox from "../../components/Input/SelectBox";
import InputWithIcon from "../../components/Input/InputWithIcon";
import ShareSvg from "../../assets/svgs/ShareSvg";
import UploadFile from "../../components/Input/UploadFile";
import CalendarSvg from "../../assets/svgs/CalendarSvg";
import ColorPickerInput from "../../components/Input/ColorPickerInput";
import workspace1 from "../../assets/images/workspace-1.png";
import PlayButtonSvg from "../../assets/svgs/PlayButtonSvg";
import MouseSvg from "../../assets/svgs/MouseSvg";
import NewInputText from "../../components/Input/NewInputText";
import NewTextArea from "../../components/Input/NewTextArea";

const CloseSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-primary-main"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const RightArrowSvg = ({
  w = "w-6",
  h = "h-6",
  color = "text-primary-main",
}) => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${w} ${h} ${color}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  </>
);

const RightExitSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-primary-main"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
    />
  </svg>
);

const PhoneSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-primary-main"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

const leftIcon = () => (
  <div class="avatar placeholder">
    <div class="bg-[#EC407A] text-white text-xs rounded-full w-8">
      <span>MX</span>
    </div>
  </div>
);

const IconList = [
  {
    icon: <CloseSvg />,
    name: "closeSvg",
  },
  {
    icon: <RightArrowSvg />,
    name: "rightArrowSvg",
  },
  {
    icon: <RightExitSvg />,
    name: "rightExitSvg",
  },
  {
    icon: <CalendarSvg />,
    name: "calendarSvg",
  },
  {
    icon: <PhoneSvg />,
    name: "phoneSvg",
  },
];

const ColorObj = {
  colorStudio: {
    general: {
      videoTitle: "#FFFFFF",
      videoDescription: "#FFFFFF",
      gradientOverlay: "#273149",
      shadow: "#273149",
    },
    player: {
      controls: "#FFFFFF",
      seeker: "#FFFFFF",
      authorName: "#FFFFFF",
      authorOccupation: "#FFFFFF",
    },
    toggle: {
      playIcon: "#FFFFFF",
      closeBackground: "#FFFFFF",
      closeIconColor: "#FFFFFF",
      closeIconBorder: "#FFFFFF",
    },
    callToAction: {
      buttonText: "#FFFFFF",
      buttonBackground: "#1B5CF3",
      buttonOutline: "#FFFFFF",
      buttonIcon: "#FFFFFF",
    },
    others: {
      backgroundOverlay: "#000000",
    },
  },
};

const VolumeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
    />
  </svg>
);

const MuteSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
    />
  </svg>
);

const DashSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-white"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>
);

const OpenEye = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-20 h-8 text-secondary-main font-bold"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Customization = () => {
  const dispatch = useDispatch();
  const [pickColor, setPickColor] = useState(ColorObj);

  const colorHandler = (e) => {
    // console.log("name", e.target.name);
    // console.log("value", e.target.value);

    let inputName = e.target.name;
    let inputValue = e.target.value;

    // console.log("1", [inputName.split('.')[1]]);
    // console.log("2", { ...pickColor.colorStudio[inputName.split('.')[1]] });
    // console.log("3", { [inputName.split('.')[1]]: { ...pickColor.colorStudio[inputName.split('.')[1]] } });

    setPickColor({
      colorStudio: {
        ...pickColor.colorStudio,
        [inputName.split(".")[1]]: {
          ...pickColor.colorStudio[inputName.split(".")[1]],
          [inputName.split(".")[2]]: inputValue,
        },
      },
    });
  };

  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();

  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        setFile([file[i]]);
      } else {
        setMessage("only images accepted");
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("onSubmit", data);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Customization" }));
  }, []);

  const updateValue = (data) => {
    console.log("updateValue", data);
  };

  const ClapprComponent = ({ id, source, height, width }) => {
    let player = useRef();

    useEffect(() => {
      player.current = new Clappr.Player({
        source: "https://www.w3schools.com/tags/movie.ogg",
        // poster: "http://clappr.io/poster.png",
        parentId: "#player",
        height,
        width,
        // autoPlay: true,
        loop: true,
        playback: {
          controls: false,
        },
        includeResetStyle: false,

        events: {
          // onPlay: function () {
          //     player.current.resize({ height: 360, width: 640 });
          // }

          onTimeUpdate: function (e) {
            // console.log("e", e);
            let progressbar = document.getElementById("progress_bar");
            if (progressbar) {
              progressbar.value = e.current;
              progressbar.max = isNaN(e.total) ? 0 : e.total;
            }
          },
        },
      });

      player.current.on(window.Clappr.Events.PLAYER_PLAY, function () {
        player.current.core.mediaControl.disable();
      });

      //   player.current.getPlugin("poster").$playWrapper.hide();

      let volumeIcon = document.querySelector(".volume_icon");
      volumeIcon.addEventListener("click", function (event) {
        player.current.mute();

        const muteIcon = document.querySelector(".mute_icon");

        if (muteIcon.classList.contains("hidden")) {
          muteIcon.classList.remove("hidden");
          document.querySelector(".volume_icon").classList.add("hidden");
        }
      });

      let muteIcon = document.querySelector(".mute_icon");
      muteIcon.addEventListener("click", function (event) {
        player.current.unmute();

        const volumeIcon = document.querySelector(".volume_icon");

        if (volumeIcon.classList.contains("hidden")) {
          volumeIcon.classList.remove("hidden");
          document.querySelector(".mute_icon").classList.add("hidden");
        }
      });

      let imgPlayIcon = document.querySelector(".img_play_button");
      imgPlayIcon.addEventListener("click", function (event) {
        if (document.getElementById(id).classList.contains("hidden")) {
          player.current.play();

          document.getElementById(id).classList.remove("hidden");
          document.getElementById(id).classList.add("block");

          document
            .querySelector(".player_wrap")
            .classList.remove("translate-y-[130%]");
          document
            .querySelector(".player_wrap")
            .classList.remove("translate-x-[-130%]");
          document.querySelector(".player_wrap").classList.remove("opacity-0");

          document.querySelector(".player_wrap").classList.add("translate-y-0");
          document.querySelector(".player_wrap").classList.add("translate-x-0");
          document.querySelector(".player_wrap").classList.add("opacity-100");

          if (
            document.querySelector(".player_wrap").classList.contains("z-0")
          ) {
            document.querySelector(".player_wrap").classList.remove("z-0");
          }

          document.querySelector(".player_wrap").classList.add("z-10");
        }
      });

      let minimizeIcon = document.querySelector(".minimize_icon");
      minimizeIcon.addEventListener("click", function (event) {
        player.current.pause();

        if (document.getElementById(id).classList.contains("block")) {
          document.getElementById(id).classList.remove("block");
          document.getElementById(id).classList.add("hidden");
          document.querySelector(".player_wrap").classList.remove("z-10");
          document.querySelector(".player_wrap").classList.add("z-0");

          document
            .querySelector(".player_wrap")
            .classList.remove("translate-y-0");
          document
            .querySelector(".player_wrap")
            .classList.remove("translate-x-0");
          document
            .querySelector(".player_wrap")
            .classList.remove("opacity-100");

          document
            .querySelector(".player_wrap")
            .classList.add("translate-y-[130%]");
          document
            .querySelector(".player_wrap")
            .classList.add("translate-x-[-130%]");
          document.querySelector(".player_wrap").classList.add("opacity-0");
        }
      });
    }, []);

    return (
      <>
        {/* <div ref={player} id={id}></div> */}

        <div className="inline-block w-full h-full disabled pointer-events-none opacity-25">
          <iframe
            id="iFrameExample"
            src="https://heroicons.com/"
            className="w-full h-full"
          ></iframe>
        </div>

        <div className="absolute bottom-0 left-3 rounded-2xl overflow-hidden">
          <div className="relative player_wrap transform translate-y-[130%] translate-x-[-130%] opacity-0 transition duration-500 ease-in-out">
            <div ref={player} id={id} className="hidden"></div>

            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
              <div className="flex flex-col justify-between h-full px-3 pt-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div class="avatar placeholder mr-2">
                      <div class=" bg-secondary-main text-white text-xs rounded-lg w-8">
                        <span>MX</span>
                      </div>
                    </div>

                    <h5 className="text-white text-base">Elie MoreReels</h5>
                  </div>

                  <div className="flex">
                    <div className="mr-3 inline-block volume_icon cursor-pointer">
                      <VolumeSvg />
                    </div>

                    <div className="mr-3 mute_icon hidden cursor-pointer">
                      <MuteSvg />
                    </div>

                    <div className="minimize_icon cursor-pointer">
                      <DashSvg />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-2xl text-white mb-3">This is PopMe!</h4>

                  <p className="text-sm text-white mb-4">
                    A widget you can use to upload videos and get personal with
                    your customers to schedule meetings, ask for reviews, or
                    share the latest features with its CTA functionnality.
                  </p>

                  <div className="flex mb-4">
                    <Button
                      text="Try for free"
                      rightIcon={RightArrowSvg({
                        w: "w-4",
                        h: "h-4",
                        color: "text-white",
                      })}
                      buttonClass="h-[2rem] min-h-[2rem] w-full"
                    />
                  </div>

                  <div className="flex w-full">
                    <progress
                      className="progress progress-accent bg-opacity-60 w-full"
                      value="70"
                      max="100"
                      id="progress_bar"
                    ></progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-3">
          <div className="relative">
            <img
              src={workspace1}
              alt="workspace1"
              className="h-[200px] w-full object-cover rounded-xl"
            />
            <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer img_play_button">
              <PlayButtonSvg />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-3">
          <img
            src={workspace1}
            alt="workspace1"
            className="h-[178px] w-[178px] object-cover rounded-full"
          />

          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer">
            <PlayButtonSvg />
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="inline-block w-full h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div className="drawer drawer-mobile h-full">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content">
            <div className="inline-block w-full">
              <div className="flex justify-between items-center py-6 pr-4 lg:px-6 border-b">
                <div className="flex items-center">
                  <label
                    htmlFor="my-drawer-2"
                    className="drawer-button lg:hidden mr-3 cursor-pointer py-2 px-4 bg-secondary-main shadow-2xl rounded-r-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  </label>

                  <h3 className="text-primary-normal font-bold text-2xl">
                    Preview
                  </h3>
                </div>

                <div className="flex">
                  <Button
                    type="submit"
                    text="Save"
                    buttonClass="w-32 text-base max-w-full h-[2.50rem] min-h-[2.50rem]"
                  />
                </div>
              </div>
              <div className="inline-block w-full h-[calc(100vh-183px)] relative">
                <ClapprComponent
                  id="player"
                  source="https://www.w3schools.com/tags/movie.ogg"
                  height={461}
                  width={261}
                />
              </div>
            </div>
          </div>

          <div className="drawer-side overflow-auto max-h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-xl max-lg:[&::-webkit-scrollbar]:hidden">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu py-4 w-80 bg-[#f9fafb] text-base-content border-r">
              <li className="mb-12">
                <div className="flex flex-col px-4 items-start focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb] p-0">
                  <h3 className="text-primary-normal font-bold mb-3 text-xl">
                    Workspace
                  </h3>

                  <SelectBox
                    options={[
                      { name: "Workspace #1", value: "Workspace1" },
                      { name: "Workspace #2", value: "Workspace2" },
                    ]}
                    updateFormValue={updateValue}
                    containerStyle="w-full mb-4"
                    selectStyle="text-primary-main"
                  />

                  <div className="inline-block w-full mb-2">
                    <Button
                      text="Delete Selected"
                      buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                    />
                  </div>

                  <div className="flex w-full">
                    <Button
                      text="New Workspace"
                      buttonClass="w-full text-base"
                    />
                  </div>
                </div>
              </li>

              <li>
                <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
                  <div
                    tabIndex={0}
                    className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
                  >
                    <input type="checkbox" />

                    <div className="collapse-title text-xl font-bold text-primary-normal">
                      Basic Setup
                    </div>

                    <div className="collapse-content">
                      <div className="flex flex-col">
                        <div className="flex">
                          <NewInputText
                            type="url"
                            labelTitle="Website URL"
                            labelStyle="text-primary-main text-base font-semibold"
                            inputStyle="mb-3 !bg-transparent"
                            name="basicSetup.websiteUrl"
                            register={register}
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Video Position
                          </h5>

                          <div class="grid grid-cols-2 gap-2 mb-3">
                            <div className="form-control">
                              <input
                                type="radio"
                                id="top-left"
                                name="basicSetup.videoPosition"
                                {...register("basicSetup.videoPosition")}
                                value="top-left"
                                className="hidden peer"
                                // required
                              ></input>

                              <label
                                for="top-left"
                                className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                              >
                                Top Left
                              </label>
                            </div>

                            <div className="form-control">
                              <input
                                type="radio"
                                id="top-right"
                                name="basicSetup.videoPosition"
                                {...register("basicSetup.videoPosition")}
                                value="top-right"
                                className="hidden peer"
                              ></input>

                              <label
                                for="top-right"
                                className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                              >
                                Top Right
                              </label>
                            </div>

                            <div className="form-control">
                              <input
                                type="radio"
                                id="bottom-left"
                                name="basicSetup.videoPosition"
                                {...register("basicSetup.videoPosition")}
                                value="bottom-left"
                                className="hidden peer"
                              ></input>

                              <label
                                for="bottom-left"
                                className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                              >
                                Bottom Left
                              </label>
                            </div>

                            <div className="form-control">
                              <input
                                type="radio"
                                id="bottom-right"
                                name="basicSetup.videoPosition"
                                {...register("basicSetup.videoPosition")}
                                value="bottom-right"
                                className="hidden peer"
                              ></input>

                              <label
                                for="bottom-right"
                                className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                              >
                                Bottom Right
                              </label>
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <h5 className="text-primary-main text-base font-semibold py-2">
                              Preview Style
                            </h5>

                            <div class="grid grid-cols-2 gap-2">
                              <div className="form-control">
                                <input
                                  type="radio"
                                  id="rectangle"
                                  name="basicSetup.previewStyle"
                                  {...register("basicSetup.previewStyle")}
                                  value="rectangle"
                                  className="hidden peer"
                                ></input>

                                <label
                                  for="rectangle"
                                  className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                                >
                                  Rectangle
                                </label>
                              </div>

                              <div className="form-control">
                                <input
                                  type="radio"
                                  id="circularBubble"
                                  name="basicSetup.previewStyle"
                                  {...register("basicSetup.previewStyle")}
                                  value="circularBubble"
                                  className="hidden peer"
                                ></input>

                                <label
                                  for="circularBubble"
                                  className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                                >
                                  Circular Bubble (Loom)
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
                  <div
                    tabIndex={1}
                    className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
                  >
                    <input type="checkbox" />

                    <div className="collapse-title text-xl font-bold text-primary-normal">
                      Add Video
                    </div>
                    <div className="collapse-content">
                      <div className="flex flex-col">
                        <div className="flex">
                          <UploadFile
                            name="addVideo.addVideo"
                            register={register}
                            handleFile={(e) => handleFile(e)}
                            removeImage={(e) => removeImage(e)}
                            files={files}
                          />
                        </div>

                        <div className="flex">
                          <NewInputText
                            type="text"
                            labelTitle="Video Title"
                            labelStyle="text-primary-main text-base font-semibold"
                            inputStyle="mb-3 !bg-transparent"
                            name="addVideo.videoTitle"
                            register={register}
                          />
                        </div>

                        <div className="flex">
                          <NewTextArea
                            labelTitle="Video Description"
                            labelStyle="text-primary-main text-base font-semibold"
                            inputStyle="!bg-transparent"
                            name="addVideo.videoDescription"
                            register={register}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
                  <div
                    tabIndex={2}
                    className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
                  >
                    <input type="checkbox" />

                    <div className="collapse-title text-xl font-bold text-primary-normal">
                      Call To Action
                    </div>
                    <div className="collapse-content">
                      <div className="flex flex-col">
                        <NewInputText
                          type="text"
                          labelTitle="Button Text"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="callToAction.buttonText"
                          register={register}
                        />

                        <NewInputText
                          type="url"
                          labelTitle="Destination URL"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="callToAction.destinationUrl"
                          register={register}
                        />

                        <div className="flex flex-col mb-3">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Button Icon
                          </h5>

                          <div className="flex flex-wrap gap-3">
                            {IconList.map((item, index) => (
                              <div className="inline-block" key={index}>
                                <input
                                  type="radio"
                                  id={item?.name}
                                  name="callToAction.buttonIcon"
                                  {...register("callToAction.buttonIcon")}
                                  value={item?.name}
                                  className="hidden peer"
                                  // required
                                ></input>

                                <label
                                  for={item?.name}
                                  className="peer-checked:border-secondary-main flex items-center justify-center h-6 w-6 border border-borderColor-main"
                                >
                                  {item?.icon}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <SelectBox
                          labelTitle="Button Style"
                          labelStyle="text-primary-main text-base font-semibold"
                          options={[
                            { name: "Filled", value: "filled" },
                            { name: "Dashed", value: "dashed" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="callToAction.buttonStyle"
                          register={register}
                        />

                        <SelectBox
                          labelTitle="Button Corners"
                          labelStyle="text-primary-main text-base font-semibold"
                          options={[
                            { name: "Round", value: "round" },
                            { name: "Square", value: "square" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="callToAction.buttonCorners"
                          register={register}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
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
                        <InputWithIcon
                          type="text"
                          labelTitle="Author Picture"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="!bg-transparent"
                          name="designCustomization.authorPicture"
                          register={register}
                          leftIcon={leftIcon()}
                        />

                        <InputWithIcon
                          type="number"
                          labelTitle="Vertical Margin"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.verticalMargin"
                          register={register}
                          rightText="px"
                        />

                        <InputWithIcon
                          type="number"
                          labelTitle="Horizontal Margin"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.horizontalMargin"
                          register={register}
                          rightText="px"
                        />
                      </div>

                      <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
                        <h4 className="text-xl font-bold text-primary-normal py-4">
                          Toggle
                        </h4>

                        <InputWithIcon
                          type="number"
                          labelTitle="Width"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.toggle.width"
                          register={register}
                          rightText="px"
                        />

                        <InputWithIcon
                          type="number"
                          labelTitle="Height"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.toggle.height"
                          register={register}
                          rightText="px"
                        />

                        <InputWithIcon
                          type="number"
                          labelTitle="Corner Radius"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.toggle.cornerRadius"
                          register={register}
                          rightText="px"
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
                          name="designCustomization.player.width"
                          register={register}
                          rightText="px"
                        />

                        <InputWithIcon
                          type="number"
                          labelTitle="Height"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.player.height"
                          register={register}
                          rightText="px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
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
                              value="#FF0056"
                              className="radio bg-[#FF0056] checked:bg-[#FF0056] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                              checked
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
                              value="#00A3FF"
                              className="radio bg-[#00A3FF] checked:bg-[#00A3FF] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                              checked
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
                              value="#24CB3F"
                              className="radio bg-[#24CB3F] checked:bg-[#24CB3F] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                              checked
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
                              value="#FFBB0E"
                              className="radio bg-[#FFBB0E] checked:bg-[#FFBB0E] checked:!shadow-none checked:!border-4 checked:!border-black/50"
                              checked
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
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={pickColor.colorStudio.general.videoTitle}
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Video Description
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.general.videoDescription"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.general.videoDescription
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Gradient Overlay
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.general.gradientOverlay"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.general.gradientOverlay
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Shadow
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.general.shadow"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={pickColor.colorStudio.general.shadow}
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
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={pickColor.colorStudio.player.controls}
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Seeker
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.player.seeker"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={pickColor.colorStudio.player.seeker}
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Author Name
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.player.authorName"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={pickColor.colorStudio.player.authorName}
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Author Occupation
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.player.authorOccupation"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.player.authorOccupation
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col px-4 pb-3 border-b border-borderColor-main">
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
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={pickColor.colorStudio.toggle.playIcon}
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Close Background
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.toggle.closeBackground"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.toggle.closeBackground
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Close Icon Color
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.toggle.closeIconColor"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.toggle.closeIconColor
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Close Icon Border
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.toggle.closeIconBorder"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.toggle.closeIconBorder
                            }
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
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.callToAction.buttonText
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Button Background
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.callToAction.buttonBackground"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.callToAction
                                .buttonBackground
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Button Outline
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.callToAction.buttonOutline"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.callToAction.buttonOutline
                            }
                          />
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Button Icon
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.callToAction.buttonIcon"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.callToAction.buttonIcon
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col px-4 pb-3">
                        <h4 className="text-xl font-bold text-primary-normal py-4">
                          Others
                        </h4>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2">
                            Background Overlay
                          </h5>
                          <ColorPickerInput
                            name="colorStudio.others.backgroundOverlay"
                            register={register}
                            colorHandler={(e) => colorHandler(e)}
                            pickColor={
                              pickColor.colorStudio.others.backgroundOverlay
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
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
                          options={[
                            { name: "Poppins", value: "poppins" },
                            { name: "Roboto", value: "roboto" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="fontStudio.fontFamily"
                          register={register}
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

                        <InputWithIcon
                          type="number"
                          labelTitle="Author Occupation"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="fontStudio.authorOccupation"
                          register={register}
                          rightText="px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
                  <div
                    tabIndex={11}
                    className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
                  >
                    <input type="checkbox" />

                    <div className="collapse-title text-xl font-bold text-primary-normal">
                      Preview
                    </div>

                    <div className="collapse-content">
                      <div className="flex flex-col">
                        <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
                          <OpenEye />

                          <p className="text-sm text-secondary-main font-bold ml-3">
                            Preview how this PopMe widget will look on your
                            website without embedding it.
                          </p>
                        </div>

                        <div className="flex p-3 bg-[#F2F6F0]">
                          <MouseSvg width="60" height="30" stroke="#4A8A37" />

                          <p className="text-sm text-[#4A8A37] font-bold ml-3">
                            Preview how this PopMe widget will look on your
                            website without embedding it.
                          </p>
                        </div>

                        <NewInputText
                          type="text"
                          labelTitle="Your website"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="Preview.yourWebsite"
                          placeholder="example.com"
                          register={register}
                        />

                        <div className="flex items-center mb-6">
                          <ShareSvg height="16" width="16" stroke="#3A6FFA" />
                          <p className="text-base text-secondary-main font-bold ml-2">
                            popme.io/preview?example.com
                          </p>
                        </div>

                        <div className="flex flex-col">
                          <h5 className="text-primary-main text-base font-semibold py-2 mb-1">
                            Preview via custom domain
                          </h5>

                          <Button
                            text="Add custom domain"
                            buttonClass="w-full text-base"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
                  <div
                    tabIndex={6}
                    className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
                  >
                    <input type="checkbox" />

                    <div className="collapse-title text-xl font-bold text-primary-normal">
                      Get Link
                    </div>
                    <div className="collapse-content">
                      <div className="flex flex-col">
                        <h4 className="text-xl font-bold text-primary-normal py-4">
                          Share Link
                        </h4>

                        <div className="flex">
                          <ClipBoardSvg width="60" />

                          <p className="text-base text-[#202223] ml-3">
                            You can share your facepop widget through a direct
                            link without embedding it on your website.
                          </p>
                        </div>

                        <InputWithIcon
                          type="text"
                          labelTitle="PopMe Custom Link"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="!bg-transparent"
                          name="getLink.popMeCustomLink"
                          register={register}
                          rightIcon={<ShareSvg />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
                  <div
                    tabIndex={7}
                    className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
                  >
                    <input type="checkbox" />

                    <div className="collapse-title text-xl font-bold text-primary-normal">
                      Instant Embed
                    </div>

                    <div className="collapse-content">
                      <div
                        tabIndex={8}
                        className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3"
                      >
                        <input type="checkbox" />

                        <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                          www.mywebsite.com
                        </div>
                        <div className="collapse-content">
                          <div className="inline-block w-full">
                            <SelectBox
                              labelTitle="In this website"
                              labelStyle="text-primary-main text-base font-semibold"
                              options={[
                                {
                                  name: "Show in some pages",
                                  value: "some pages",
                                },
                                { name: "Option 2", value: "option2" },
                              ]}
                              containerStyle="mt-2 mb-3 w-full"
                              selectStyle="text-primary-main"
                              name="instantEmbed.inThisWebsite"
                              register={register}
                            />
                          </div>

                          <div className="flex mb-3">
                            <ClipBoardSvg width="60" />
                            <p className="text-base text-[#202223] ml-3">
                              This widget will show only in the pages/URLs
                              selected below.
                            </p>
                          </div>

                          <div className="inline-block w-full mb-3">
                            <Button
                              text="Select pages"
                              buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                            />
                          </div>

                          <div className="inline-block w-full mb-3">
                            <Button
                              text="Add conditions"
                              buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        tabIndex={9}
                        className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3"
                      >
                        <input type="checkbox" />

                        <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                          www.mywebsite#2.com
                        </div>
                        <div className="collapse-content">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing.
                          </p>
                        </div>
                      </div>

                      <div
                        tabIndex={10}
                        className="collapse collapse-arrow border border-borderColor-main rounded-lg"
                      >
                        <input type="checkbox" />

                        <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                          www.mywebsite#3.com
                        </div>
                        <div className="collapse-content">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Customization;
