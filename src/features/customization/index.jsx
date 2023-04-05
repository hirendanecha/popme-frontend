import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { setPageTitle } from "../../redux/slices/headerSlice";
import Button from "../../components/Button/Button";
import SelectBox from "../../components/Input/SelectBox";
import workspace1 from "../../assets/images/workspace-1.png";
import PlayButtonSvg from "../../assets/svgs/PlayButtonSvg";

import {
  RightArrowSvg,
  VolumeSvg,
  MuteSvg,
  DashSvg,
  PauseSvg,
  PlayerPlaySvg,
  RightExitSvg,
  CloseSvg,
  CloseCircle,
} from "./SvgComp";
import {
  addWorkspace,
  deleteWorkspaceById,
  getDropdownValues,
  getWorkspaceById,
  updateWorkspaceOptions,
  worksapceListForDropdown,
} from "../workspaces/action";
import {
  setActiveWorkspaceData,
  setVideoUploadedProcess,
} from "../workspaces/reducer/workspaceSlice";
import { useLocation } from "react-router-dom";
import CalendarSvg from "../../assets/svgs/CalendarSvg";
import logo from "../../assets/images/sidebar-logo.png";
import AddVideo from "./WorkspaceOptions/AddVideo";
import BasicSetup from "./WorkspaceOptions/BasicSetup";
import CallToActionModal from "./WorkspaceOptions/CallToActionModal";
import ColorStudio from "./WorkspaceOptions/ColorStudio";
import DesignCustomization from "./WorkspaceOptions/DesignCustomization";
import FontStudio from "./WorkspaceOptions/FontStudio";
import Preview from "./WorkspaceOptions/Preview";
import GetLink from "./WorkspaceOptions/GetLink";
import InstantEmbed from "./WorkspaceOptions/InstantEmbed";
import { socket } from "../../services/socketCon";

const baseURL = import.meta.env.VITE_BASE_URL;

const ClapprComponent = React.memo(
  ({
    id,
    source = "https://www.w3schools.com/tags/movie.ogg",
    height,
    width,
    poster,
    animatedImage,
  }) => {
    // console.log("<<");
    let player = useRef();
    const { activeWorkspaceData, imageCrop } = useSelector(
      (state) => state.workspace
    );

    const [isToggleHiden, setIsToggleHiden] = useState("");
    const [videoSeekTime, setVideoSeekTime] = useState(0);

    const renderSwitch = (activeWorkspaceData, color, fontSize) => {
      switch (activeWorkspaceData !== null) {
        case activeWorkspaceData?.callToAction?.buttonIcon === "arrow":
          return (
            <RightArrowSvg
              w={`w-[${fontSize}px]`}
              h={`h-[${fontSize}px]`}
              color={`text-[${color}]`}
            />
          );

        case activeWorkspaceData?.callToAction?.buttonIcon === "roundedarrow":
          return (
            <RightExitSvg
              w={`w-[${fontSize}px]`}
              h={`h-[${fontSize}px]`}
              color={`text-[${color}]`}
            />
          );

        case activeWorkspaceData?.callToAction?.buttonIcon === "calendar":
          return <CalendarSvg w={fontSize} h={fontSize} color={color} />;

        case activeWorkspaceData?.callToAction?.buttonIcon === "cross":
          return (
            <CloseSvg
              w={`w-[${fontSize}px]`}
              h={`h-[${fontSize}px]`}
              color={`text-[${color}]`}
            />
          );

        default:
          return (
            <RightArrowSvg
              w={`w-[${fontSize}px]`}
              h={`h-[${fontSize}px]`}
              color={`text-[${color}]`}
            />
          );
      }
    };
    useEffect(() => {
      let imgPlayIcon = document.querySelector(".img_play_button");
      imgPlayIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        setIsToggleHiden("hidden");
      });

      let minimizeIcon = document.querySelector(".minimize_icon");
      minimizeIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        setIsToggleHiden("");
      });
      // console.log(activeWorkspaceData, "activeWorkspaceData");
      // console.log("iiiii");
    }, [activeWorkspaceData]);

    useEffect(() => {
      // console.log(activeWorkspaceData, "***");
      player.current = new Clappr.Player({
        source: source,
        parentId: `#${id}`,
        height,
        width,
        // autoPlay: true,
        mute: true,
        loop: true,
        playback: {
          controls: false,
        },
        includeResetStyle: false,

        events: {
          onTimeUpdate: function (e) {
            // let progressbar = document.getElementById("progress_bar");
            // if (progressbar) {
            //   progressbar.value = e.current;
            //   progressbar.max = isNaN(e.total) ? 0 : e.total;
            // }
            // console.log("time", e.current);

            setVideoSeekTime(e.current);

            let progressbar = document.getElementById("progress_calc");
            if (progressbar) {
              let per = `${(e.current / e.total) * 100}%`;
              progressbar.style.width = per;
              progressbar.style.transition = `width .1s linear,height .2s`;
            }
          },
        },
      });

      if (document.getElementById(id).classList.contains("block")) {
        player.current.play();
      }

      // console.log("videoSeekTime", videoSeekTime);

      player.current.seek(videoSeekTime);

      player.current.resize({
        height: activeWorkspaceData?.designCustomization?.player?.height,
        width: activeWorkspaceData?.designCustomization?.player?.size,
      });

      // hide loader
      player.current.getPlugin("spinner").disable();

      player.current.on(window.Clappr.Events.PLAYER_PLAY, function () {
        player.current.core.mediaControl.disable();
      });

      // console.log("klbibib");

      // document.querySelector(".mute_icon").classList.add("hidden");
      // document.querySelector(".mute_icon").classList.remove("block");
      // document.querySelector(".volume_icon").classList.add("block");
      // document.querySelector(".volume_icon").classList.remove("hidden");

      document.querySelector(".mute_icon").classList.add("block");
      document.querySelector(".mute_icon").classList.remove("hidden");
      document.querySelector(".volume_icon").classList.add("hidden");
      document.querySelector(".volume_icon").classList.remove("block");

      document.querySelector(".play_icon").classList.remove("block");
      document.querySelector(".play_icon").classList.add("hidden");
      document.querySelector(".pause_icon").classList.remove("hidden");
      document.querySelector(".pause_icon").classList.add("block");

      let volumeIcon = document.querySelector(".volume_icon");
      volumeIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        player.current.mute();

        const muteIcon = document.querySelector(".mute_icon");

        if (muteIcon.classList.contains("hidden")) {
          muteIcon.classList.remove("hidden");
          muteIcon.classList.add("block");
          document.querySelector(".volume_icon").classList.add("hidden");
        }
      });

      let muteIcon = document.querySelector(".mute_icon");
      muteIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        player.current.unmute();

        const volumeIcon = document.querySelector(".volume_icon");

        if (volumeIcon.classList.contains("hidden")) {
          volumeIcon.classList.remove("hidden");
          volumeIcon.classList.add("block");
          document.querySelector(".mute_icon").classList.add("hidden");
        }
      });

      let imgPlayIcon1 = document.querySelector(".img_play_button");
      imgPlayIcon1.addEventListener("click", function (event) {
        event.stopPropagation();
        if (document.getElementById(id).classList.contains("hidden")) {
          player.current.play();
          // player.current.unmute();

          document.getElementById(id).classList.remove("hidden");
          document.getElementById(id).classList.add("block");

          document.querySelector(".thumbnail_img").classList.remove("block");
          document.querySelector(".thumbnail_img").classList.add("hidden");

          if (
            document.querySelector(".player_wrap").classList.contains("z-0")
          ) {
            document.querySelector(".player_wrap").classList.remove("z-0");
          }

          document.querySelector(".player_wrap").classList.add("z-10");
        }
      });

      let playIcon = document.querySelector(".play_icon");
      playIcon.addEventListener("click", function (event) {
        event.stopPropagation();

        const pauseIcon = document.querySelector(".pause_icon");

        if (pauseIcon.classList.contains("hidden")) {
          player.current.play();

          pauseIcon.classList.remove("hidden");
          pauseIcon.classList.add("block");
          document.querySelector(".play_icon").classList.remove("block");
          document.querySelector(".play_icon").classList.add("hidden");
        }
      });

      let pauseIcon = document.querySelector(".pause_icon");

      pauseIcon.addEventListener("click", function (event) {
        event.stopPropagation();

        const playIcon = document.querySelector(".play_icon");
        if (playIcon.classList.contains("hidden")) {
          player.current.pause();

          playIcon.classList.remove("hidden");
          playIcon.classList.add("block");
          document.querySelector(".pause_icon").classList.remove("block");
          document.querySelector(".pause_icon").classList.add("hidden");
        }
      });

      function playAreaListenerhandler(event) {
        const pauseIcon = document.querySelector(".pause_icon");
        const playIcon = document.querySelector(".play_icon");

        event.stopPropagation();

        if (document.querySelector(".play_icon").classList.contains("hidden")) {
          player.current.pause();

          document.querySelector(".play_icon").classList.remove("hidden");
          document.querySelector(".play_icon").classList.add("block");
          document.querySelector(".pause_icon").classList.remove("block");
          document.querySelector(".pause_icon").classList.add("hidden");
        } else if (
          document.querySelector(".play_icon").classList.contains("block")
        ) {
          player.current.play();

          document.querySelector(".play_icon").classList.remove("block");
          document.querySelector(".play_icon").classList.add("hidden");
          document.querySelector(".pause_icon").classList.remove("hidden");
          document.querySelector(".pause_icon").classList.add("block");
        }
      }

      let playAreaButton = document.querySelector(".play_area_button");
      playAreaButton.addEventListener("click", playAreaListenerhandler);

      let minimizeIcon = document.querySelector(".minimize_icon");
      minimizeIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        player.current.pause();

        if (document.getElementById(id).classList.contains("block")) {
          document.getElementById(id).classList.remove("block");
          document.getElementById(id).classList.add("hidden");
          document.querySelector(".player_wrap").classList.remove("z-10");
          document.querySelector(".player_wrap").classList.add("z-0");

          // document
          //   .querySelector(".player_wrap")
          //   .classList.remove("opacity-100");

          // document.querySelector(".player_wrap").classList.add("opacity-0");

          document.querySelector(".thumbnail_img").classList.remove("hidden");
          document.querySelector(".thumbnail_img").classList.add("block");
        }
      });

      let closeThumbnailSvg = document.querySelector(".close_thumbnail_svg");
      closeThumbnailSvg.addEventListener("click", function (event) {
        event.stopPropagation();
        document.querySelector(".thumbnail_img").classList.remove("block");
        document.querySelector(".thumbnail_img").classList.add("hidden");
      });

      return () => {
        if (player.current) {
          player.current.destroy();
          player.current = null;
        }
      };
    }, [activeWorkspaceData]);

    return (
      <>
        {/* <div ref={player} id={id}></div> */}

        {/* <div className="inline-block w-full h-full disabled pointer-events-none opacity-25">
          <iframe
            id="iFrameExample"
            src="https://heroicons.com/"
            className="w-full h-full"
          ></iframe>
        </div> */}

        <div
          className={`absolute ${
            activeWorkspaceData?.basicSetUp?.videoPosition || "bottom-0 left-3"
          } rounded-2xl overflow-hidden`}
          style={{
            marginBottom: `${activeWorkspaceData?.designCustomization?.verticalMargin}px`,
            marginLeft: `${activeWorkspaceData?.designCustomization?.horizontalMargin}px`,
          }}
        >
          <div
            className={`relative player_wrap ${activeWorkspaceData?.fontStudio?.fontFamily} player_anim transition duration-500 ease-in-out`}
          >
            <div
              ref={player}
              id={id}
              className="hidden clappr_player_custom"
            ></div>

            <div
              className="absolute top-0 bottom-0 left-0 right-0 rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(180deg, transparent 60%, ${activeWorkspaceData?.colorStudio?.general?.gradientOverlay} 100%)`,
              }}
            >
              <div className="flex justify-between w-full px-6 pt-5 pb-2 h-full">
                <div className="flex justify-between flex-col w-full play_area_button z-20">
                  <div className="flex justify-between">
                    <h5
                      className="text-white text-base font-medium"
                      style={{
                        fontSize: `${activeWorkspaceData?.fontStudio?.authorName}px`,
                        color:
                          activeWorkspaceData?.colorStudio?.player?.authorName,
                      }}
                    >
                      {activeWorkspaceData?.designCustomization?.authorName}
                    </h5>

                    <div className="flex items-center">
                      <div className="flex mr-6">
                        <div className="inline-block volume_icon cursor-pointer z-30">
                          <VolumeSvg
                            color={
                              activeWorkspaceData?.colorStudio?.player?.control
                            }
                          />
                        </div>

                        <div className="mute_icon hidden cursor-pointer z-30">
                          <MuteSvg
                            color={
                              activeWorkspaceData?.colorStudio?.player?.control
                            }
                          />
                        </div>
                      </div>

                      <div className="minimize_icon cursor-pointer">
                        <DashSvg
                          color={
                            activeWorkspaceData?.colorStudio?.player?.control
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* {console.log("load....")} */}

                  <div className="flex flex-col">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col pr-3">
                        <h4
                          className="text-2xl text-white mb-3 font-bold"
                          style={{
                            fontSize: `${activeWorkspaceData?.fontStudio?.videoTitle}px`,
                            color:
                              activeWorkspaceData?.colorStudio?.general
                                ?.videoTitle,
                          }}
                        >
                          {activeWorkspaceData?.title || "This is PopMe!"}
                        </h4>

                        <p
                          className="text-sm text-white mb-4 font-bold"
                          style={{
                            fontSize: `${activeWorkspaceData?.fontStudio?.videoDescription}px`,
                            color:
                              activeWorkspaceData?.colorStudio?.general
                                ?.videoDescription,
                          }}
                        >
                          {activeWorkspaceData?.description ||
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                        </p>
                      </div>

                      <div className="flex flex-col mb-4">
                        <div className="play_icon cursor-pointer z-30">
                          <PlayerPlaySvg
                            color={
                              activeWorkspaceData?.colorStudio?.player?.control
                            }
                          />
                        </div>

                        <div className="pause_icon cursor-pointer z-30">
                          <PauseSvg
                            color={
                              activeWorkspaceData?.colorStudio?.player?.control
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex mb-[20px]">
                      <Link
                        to={activeWorkspaceData?.callToAction?.destinationUrl}
                        target="_blank"
                        className="w-full"
                      >
                        <button
                          type="button"
                          className={`btn scale-100 hover:scale-[.98] whitespace-normal cta_show ${activeWorkspaceData?.callToAction?.buttonStyle}
                    ${activeWorkspaceData?.callToAction?.buttonCorner} w-full rounded-full truncate hover:border-transparent bg-secondary-main border border-transparent hover:bg-secondary-main capitalize text-white gap-2`}
                          style={{
                            backgroundColor:
                              activeWorkspaceData?.colorStudio?.callToAction
                                ?.buttonBackground,

                            fontSize: `${activeWorkspaceData?.fontStudio?.ctaButton}px`,

                            borderColor:
                              activeWorkspaceData?.callToAction?.buttonStyle ===
                                "ghost" ||
                              activeWorkspaceData?.callToAction?.buttonStyle ===
                                "link"
                                ? "transparent"
                                : activeWorkspaceData?.colorStudio?.callToAction
                                    ?.buttonOutline,

                            color:
                              activeWorkspaceData?.colorStudio?.callToAction
                                ?.buttonText,

                            height: "auto",
                            minHeight: "38px",

                            paddingTop: "6px",
                            paddingBottom: "6px",

                            // minHeight: "32px",
                            // padding: "0",
                          }}
                        >
                          <span
                            className="flex gap-3 items-center justify-center flex-wrap font-medium"
                            // style={{
                            //   padding: `${+activeWorkspaceData?.fontStudio
                            //     ?.ctaButton}px`,
                            // }}
                          >
                            {activeWorkspaceData?.callToAction?.buttonText ||
                              "Try for free"}
                            {renderSwitch(
                              activeWorkspaceData,
                              activeWorkspaceData?.colorStudio?.callToAction
                                ?.buttonText,
                              activeWorkspaceData?.fontStudio?.ctaButton
                            )}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[2px] flex w-full rounded-xl px-2">
                <div
                  className="flex bg-secondary-main h-[7px] rounded-xl"
                  id="progress_calc"
                  style={{
                    background:
                      activeWorkspaceData?.colorStudio?.player?.seeker,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {activeWorkspaceData?.basicSetUp?.previewStyle === "rectangle" ? (
          <div
            className={`absolute ${
              activeWorkspaceData?.basicSetUp?.videoPosition ||
              "bottom-0 left-3"
            } block thumbnail_img ${
              activeWorkspaceData?.designCustomization?.toggle?.animation
            } ${isToggleHiden}`}
            style={{
              marginBottom: `${activeWorkspaceData?.designCustomization?.verticalMargin}px`,
              marginLeft: `${activeWorkspaceData?.designCustomization?.horizontalMargin}px`,
            }}
          >
            <div className="relative">
              <img
                src={animatedImage || poster || ""}
                // src={animatedImage ? animatedImage : workspace1}
                alt="workspace1"
                className="object-cover rounded-xl"
                style={{
                  // width:
                  //   activeWorkspaceData?.designCustomization?.player?.size *
                  //   (activeWorkspaceData?.designCustomization?.toggle?.size /
                  //     100),

                  width: "100%",
                  maxWidth: "168px",

                  height:
                    activeWorkspaceData?.designCustomization?.player?.height *
                    (activeWorkspaceData?.designCustomization?.toggle?.size /
                      100),
                }}
              />

              <div className="flex items-center justify-center absolute left-0 right-0 text-center bottom-0">
                <img
                  src={logo}
                  alt="logo"
                  className="w-[46px] h-[30px] object-contain"
                />
              </div>

              <div
                className="absolute right-[-10px] top-[-10px] close_thumbnail_svg"
                style={{
                  display:
                    !activeWorkspaceData?.designCustomization?.toggle
                      ?.showCloseIcon && "none",
                }}
              >
                <div
                  className="p-1 rounded-full cursor-pointer"
                  style={{
                    background:
                      activeWorkspaceData?.colorStudio?.toggle?.closeBackground,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                    style={{
                      color:
                        activeWorkspaceData?.colorStudio?.toggle
                          ?.closeIconColor,
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer img_play_button">
                <div
                  style={{
                    display: !activeWorkspaceData?.designCustomization?.toggle
                      ?.showPlayIcon
                      ? "none"
                      : "block",
                  }}
                  className="scale-100 hover:scale-90"
                >
                  <PlayerPlaySvg
                    color={activeWorkspaceData?.colorStudio?.toggle?.playIcon}
                    height="40px"
                    width="40px"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute ${
              activeWorkspaceData?.basicSetUp?.videoPosition ||
              "bottom-0 left-3"
            } block thumbnail_img ${
              activeWorkspaceData?.designCustomization?.toggle?.animation
            } ${isToggleHiden}`}
            style={{
              marginBottom: `${activeWorkspaceData?.designCustomization?.verticalMargin}px`,
              marginLeft: `${activeWorkspaceData?.designCustomization?.horizontalMargin}px`,
            }}
          >
            <div className="relative">
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  height:
                    activeWorkspaceData?.designCustomization?.player?.size *
                      (activeWorkspaceData?.designCustomization?.toggle?.size /
                        100) || "",
                  width:
                    activeWorkspaceData?.designCustomization?.player?.size *
                      (activeWorkspaceData?.designCustomization?.toggle?.size /
                        100) || "",
                }}
              >
                {/* <img
                  src={animatedImage && animatedImage}
                  alt="workspace1"
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    transform: `translate3d(-${imageCrop.x}%, -${imageCrop.y}%, 0) scale3d(${imageCrop.scale},${imageCrop.scale},1)`,
                  }}
                /> */}

                <div
                  style={{
                    backgroundImage: `url(${animatedImage || poster})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100%",
                    width: "100%",
                    backgroundPosition: `${activeWorkspaceData?.basicSetUp?.toggle?.x}% ${activeWorkspaceData?.basicSetUp?.toggle?.y}%`,
                  }}
                />

                <div className="flex items-center justify-center absolute left-0 right-0 text-center bottom-0">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-[46px] h-[30px] object-contain"
                  />
                </div>

                <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer img_play_button">
                  <div
                    style={{
                      display: !activeWorkspaceData?.designCustomization?.toggle
                        ?.showPlayIcon
                        ? "none"
                        : "block",
                    }}
                    className="scale-100 hover:scale-90"
                  >
                    <PlayerPlaySvg
                      color={activeWorkspaceData?.colorStudio?.toggle?.playIcon}
                      height="40px"
                      width="40px"
                    />
                  </div>
                </div>
              </div>

              <div
                className="absolute right-[-10px] top-[-10px] close_thumbnail_svg"
                style={{
                  display:
                    !activeWorkspaceData?.designCustomization?.toggle
                      ?.showCloseIcon && "none",
                }}
              >
                <div
                  className="p-1 rounded-full cursor-pointer"
                  style={{
                    background:
                      activeWorkspaceData?.colorStudio?.toggle?.closeBackground,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                    style={{
                      color:
                        activeWorkspaceData?.colorStudio?.toggle
                          ?.closeIconColor,
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

const Customization = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, error, activeWorkspaceData, imageCrop, videoUploadedProcess } =
    useSelector((state) => state.workspace);

  const [selectWorkspaceOptions, setSelectWorkspaceOptions] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(
    location?.state?.id || ""
  );

  const [videoUploadProcess, setVideoUploadProcess] = useState(0);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  // console.log("selectWorkspaceOptions", selectWorkspaceOptions);

  // console.log("videoUploadedProcess", videoUploadedProcess);

  // console.log("data", data);

  // for upload video delete

  // const [files, setFile] = useState([]);
  // const [message, setMessage] = useState();

  // const handleFile = (e) => {
  //   setMessage("");
  //   let file = e.target.files;

  //   for (let i = 0; i < file.length; i++) {
  //     const fileType = file[i]["type"];
  //     const validImageTypes = ["video/mp4", "video/x-m4v", "video/*"];
  //     setFile([file[i]]);
  //     if (validImageTypes.includes(fileType)) {
  //       setFile([file[i]]);
  //     } else {
  //       setMessage("only images accepted");
  //     }
  //   }
  // };

  // const removeImage = (i) => {
  //   setFile(files.filter((x) => x.name !== i));
  // };

  // const colorTheme = (color) => {
  //   switch (color) {
  //     case "green":
  //       return "#008000";

  //     case "orange":
  //       return "#FFA500";

  //     case "red":
  //       return "#FF0000";

  //     case "blue":
  //       return "#0000FF";
  //   }
  // };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      basicSetUp: {
        previewStyle: "",
        videoPosition: "",
        toggle: {
          x: activeWorkspaceData?.basicSetUp?.toggle?.x
            ? activeWorkspaceData?.basicSetUp?.toggle?.x
            : "",
          y: activeWorkspaceData?.basicSetUp?.toggle?.y
            ? activeWorkspaceData?.basicSetUp?.toggle?.y
            : "",
          scale: activeWorkspaceData?.basicSetUp?.toggle?.scale
            ? activeWorkspaceData?.basicSetUp?.toggle?.scale
            : "",
        },
      },
      callToAction: {
        buttonCorner: "",
        buttonIcon: null,
        buttonStyle: "",
        buttonText: "",
        destinationUrl: "",
      },
      designCustomization: {
        authorName: "",
        horizontalMargin: "",
        verticalMargin: "",
        player: {
          height: "",
          onMobileDevice: "",
          size: "",
        },
        toggle: {
          animation: "",
          showPlayIcon: "",
          showCloseIcon: "",
          size: "",
        },
      },
      colorStudio: {
        templates: "",
        general: {
          gradientOverlay: "",
          videoDescription: "",
          videoTitle: "",
        },
        callToAction: {
          buttonBackground: "",
          buttonOutline: "",
          buttonText: "",
        },
        player: {
          authorName: "",
          control: "",
          seeker: "",
        },
        toggle: {
          closeBackground: "",
          closeIconColor: "",
          playIcon: "",
        },
      },
      fontStudio: {
        authorName: "",
        ctaButton: "",
        fontFamily: "",
        videoDescription: "",
        videoTitle: "",
      },
      title: "",
      description: "",
      video: null,
    },
  });

  useEffect(() => {
    // console.log("activeWorkspaceData", activeWorkspaceData);

    reset({
      basicSetUp: {
        previewStyle: activeWorkspaceData?.basicSetUp?.previewStyle
          ? activeWorkspaceData?.basicSetUp.previewStyle
          : "",
        videoPosition: activeWorkspaceData?.basicSetUp?.videoPosition
          ? activeWorkspaceData?.basicSetUp?.videoPosition
          : "",

        toggle: {
          x: `-${
            activeWorkspaceData?.basicSetUp?.toggle?.x
              ? activeWorkspaceData?.basicSetUp?.toggle?.x
              : 0
          }`,
          y: `-${
            activeWorkspaceData?.basicSetUp?.toggle?.y
              ? activeWorkspaceData?.basicSetUp?.toggle?.y
              : 0
          }`,
          scale: activeWorkspaceData?.basicSetUp?.toggle?.scale
            ? activeWorkspaceData?.basicSetUp?.toggle?.scale
            : 1,
        },

        // toggle: {
        //   x: `-${
        //     activeWorkspaceData?.basicSetUp?.toggle?.x === 0
        //       ? 0
        //       : activeWorkspaceData?.basicSetUp?.toggle?.x || imageCrop?.x
        //   }`,
        //   y: `-${
        //     activeWorkspaceData?.basicSetUp?.toggle?.y === 0
        //       ? 0
        //       : activeWorkspaceData?.basicSetUp?.toggle?.y || imageCrop?.y
        //   }`,
        //   scale: activeWorkspaceData?.basicSetUp?.toggle?.scale || 1,
        // },
      },
      callToAction: {
        buttonCorner: activeWorkspaceData?.callToAction?.buttonCorner
          ? activeWorkspaceData?.callToAction?.buttonCorner
          : "",
        buttonIcon: activeWorkspaceData?.callToAction?.buttonIcon
          ? activeWorkspaceData?.callToAction?.buttonIcon
          : null,
        buttonStyle: activeWorkspaceData?.callToAction?.buttonStyle
          ? activeWorkspaceData?.callToAction?.buttonStyle
          : "",
        buttonText: activeWorkspaceData?.callToAction?.buttonText
          ? activeWorkspaceData?.callToAction?.buttonText
          : "",
        destinationUrl: activeWorkspaceData?.callToAction?.destinationUrl
          ? activeWorkspaceData?.callToAction?.destinationUrl
          : "",
      },
      designCustomization: {
        authorName: activeWorkspaceData?.designCustomization?.authorName
          ? activeWorkspaceData?.designCustomization?.authorName
          : "",

        horizontalMargin: activeWorkspaceData?.designCustomization
          ?.horizontalMargin
          ? activeWorkspaceData?.designCustomization?.horizontalMargin
          : "",

        verticalMargin: activeWorkspaceData?.designCustomization?.verticalMargin
          ? activeWorkspaceData?.designCustomization?.verticalMargin
          : "",

        player: {
          height: activeWorkspaceData?.designCustomization?.player?.height
            ? activeWorkspaceData?.designCustomization?.player?.height
            : "",
          onMobileDevice: activeWorkspaceData?.designCustomization?.player
            ?.onMobileDevice
            ? activeWorkspaceData?.designCustomization?.player?.onMobileDevice
            : "",
          size: activeWorkspaceData?.designCustomization?.player?.size
            ? activeWorkspaceData?.designCustomization?.player?.size
            : "",
        },
        toggle: {
          animation: activeWorkspaceData?.designCustomization?.toggle?.animation
            ? activeWorkspaceData?.designCustomization?.toggle?.animation
            : "",

          showPlayIcon:
            typeof activeWorkspaceData?.designCustomization?.toggle
              ?.showPlayIcon === "boolean"
              ? activeWorkspaceData?.designCustomization?.toggle?.showPlayIcon
              : "",

          showCloseIcon:
            typeof activeWorkspaceData?.designCustomization?.toggle
              ?.showCloseIcon === "boolean"
              ? activeWorkspaceData?.designCustomization?.toggle?.showCloseIcon
              : "",

          size: activeWorkspaceData?.designCustomization?.toggle?.size
            ? activeWorkspaceData?.designCustomization?.toggle?.size
            : "",
        },
      },
      colorStudio: {
        templates: activeWorkspaceData?.colorStudio?.templates
          ? activeWorkspaceData?.colorStudio?.templates
          : "",

        general: {
          gradientOverlay: activeWorkspaceData?.colorStudio?.general
            ?.gradientOverlay
            ? activeWorkspaceData?.colorStudio?.general?.gradientOverlay
            : "#273149",
          videoDescription: activeWorkspaceData?.colorStudio?.general
            ?.videoDescription
            ? activeWorkspaceData?.colorStudio?.general?.videoDescription
            : "#FFFFFF",
          videoTitle: activeWorkspaceData?.colorStudio?.general?.videoTitle
            ? activeWorkspaceData?.colorStudio?.general?.videoTitle
            : "#FFFFFF",
        },
        callToAction: {
          buttonBackground:
            activeWorkspaceData?.colorStudio?.callToAction?.buttonBackground,

          buttonOutline: activeWorkspaceData?.colorStudio?.callToAction
            ?.buttonOutline
            ? activeWorkspaceData?.colorStudio?.callToAction?.buttonOutline
            : "#FFFFFF",

          buttonText: activeWorkspaceData?.colorStudio?.callToAction?.buttonText
            ? activeWorkspaceData?.colorStudio?.callToAction?.buttonText
            : "#FFFFFF",
        },
        player: {
          authorName: activeWorkspaceData?.colorStudio?.player?.authorName
            ? activeWorkspaceData?.colorStudio?.player?.authorName
            : "#FFFFFF",

          control: activeWorkspaceData?.colorStudio?.player?.control
            ? activeWorkspaceData?.colorStudio?.player?.control
            : "#FFFFFF",

          seeker: activeWorkspaceData?.colorStudio?.player?.seeker
            ? activeWorkspaceData?.colorStudio?.player?.seeker
            : "#1B5CF3",
        },
        toggle: {
          closeBackground: activeWorkspaceData?.colorStudio?.toggle
            ?.closeBackground
            ? activeWorkspaceData?.colorStudio?.toggle?.closeBackground
            : "#FFFFFF",
          closeIconColor: activeWorkspaceData?.colorStudio?.toggle
            ?.closeIconColor
            ? activeWorkspaceData?.colorStudio?.toggle?.closeIconColor
            : "#FFFFFF",
          playIcon: activeWorkspaceData?.colorStudio?.toggle?.playIcon
            ? activeWorkspaceData?.colorStudio?.toggle?.playIcon
            : "#FFFFFF",
        },
      },
      fontStudio: {
        authorName: activeWorkspaceData?.fontStudio?.authorName
          ? activeWorkspaceData?.fontStudio?.authorName
          : "",
        ctaButton: activeWorkspaceData?.fontStudio?.ctaButton
          ? activeWorkspaceData?.fontStudio?.ctaButton
          : "",
        fontFamily: activeWorkspaceData?.fontStudio?.fontFamily
          ? activeWorkspaceData?.fontStudio?.fontFamily
          : "",
        videoDescription: activeWorkspaceData?.fontStudio?.videoDescription
          ? activeWorkspaceData?.fontStudio?.videoDescription
          : "",
        videoTitle: activeWorkspaceData?.fontStudio?.videoTitle
          ? activeWorkspaceData?.fontStudio?.videoTitle
          : "",
      },
      title: activeWorkspaceData?.title ? activeWorkspaceData?.title : "",
      description: activeWorkspaceData?.description
        ? activeWorkspaceData?.description
        : "",
      video: activeWorkspaceData?.video
        ? activeWorkspaceData?.video?.originalname
        : "",
    });
  }, [activeWorkspaceData]);

  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        if (key === "video") {
          formData.append(key, data[key][0]);
        } else if (["x", "y"].includes(key)) {
          buildFormData(
            formData,
            Math.abs(data[key]),
            parentKey ? `${parentKey}[${key}]` : key
          );
        } else {
          buildFormData(
            formData,
            data[key],
            parentKey ? `${parentKey}[${key}]` : key
          );
        }
      });
    } else {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }

  function jsonToFormData(data) {
    const formData = new FormData();

    buildFormData(formData, data);

    return formData;
  }

  const onSubmit = (data, isVideo) => {
    // console.log("activeWorkspaceData", activeWorkspaceData);
    // console.log("imageCrop", imageCrop);
    // console.log("data", data);
    // console.log("isVideo", isVideo);

    if (data) {
      let formData = jsonToFormData(data);

      const config = {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setVideoUploadProcess(percentCompleted);

          if (percentCompleted === 100) {
            setIsVideoUploaded(true);
            setVideoUploadProcess(1);
          }
        },
      };

      if (isVideo) {
        dispatch(setVideoUploadedProcess(true));
      }

      dispatch(
        updateWorkspaceOptions({
          data: formData,
          id: activeWorkspace,
          ...(isVideo ? { config: config } : {}),
        })
      );
    }
  };

  // console.log("videoUploadProcess", videoUploadProcess);

  const valueChangeHandler = (name) => {
    // handleSubmit(onSubmit);
    // console.log("name", name);
    // console.log("activeWorkspace", activeWorkspace);
    // console.log("id", activeWorkspaceData?._id);

    if (name === "video") {
      handleSubmit((data) => {
        onSubmit(data, true);
      })();
    } else {
      handleSubmit(({ video, ...data }) => {
        onSubmit(data, false);
      })();
    }
  };

  const updateValue = (data) => {
    // console.log("updateValue", data);
    setActiveWorkspace(data?.value);
  };

  const workspaceListHandlerApi = useCallback(() => {
    dispatch(worksapceListForDropdown())
      .unwrap()
      .then((res) => {
        if (res?.success) {
          const filterData = res?.data
            ?.filter((item) => item?.name && item?.name)
            .map((val) => ({
              name: val?.name,
              value: val?._id,
            }));

          // console.log("filterData", filterData);

          if (filterData?.length > 0 && activeWorkspace === "") {
            setActiveWorkspace(filterData[0]?.value);
          }

          setSelectWorkspaceOptions(filterData);
        }
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  }, [activeWorkspace]);

  const newWorkspaceHandler = () => {
    dispatch(addWorkspace())
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        if (res?.success) {
          workspaceListHandlerApi();
          if (res?.data?.name) {
            setActiveWorkspace(res?.data?._id);
          }
        }
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  };

  const deleteWorkspaceByIdApi = useCallback((id) => {
    dispatch(deleteWorkspaceById(id))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          // console.log(res, "res of delete");

          dispatch(worksapceListForDropdown())
            .unwrap()
            .then((res) => {
              if (res?.success) {
                const filterData = res?.data
                  ?.filter((item) => item?.name && item?.name)
                  .map((val) => ({
                    name: val?.name,
                    value: val?._id,
                  }));

                if (filterData?.length === 0) {
                  dispatch(setActiveWorkspaceData(null));
                }

                if (filterData?.length > 0 && activeWorkspace === "") {
                  setActiveWorkspace(filterData[0]?.value);
                }

                setSelectWorkspaceOptions(filterData);
              }
            })
            .catch((err) => {
              if (err) {
                toast(err, {
                  type: "error",
                });
              }
            });
        }
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  }, []);

  const deleteActiveWorkspace = () => {
    deleteWorkspaceByIdApi(activeWorkspace);
  };

  const workspaceChangeHandlerApi = useCallback((id) => {
    dispatch(getWorkspaceById(id))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          dispatch(setActiveWorkspaceData(res?.data));
          dispatch(setVideoUploadedProcess(false));
        }
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  }, []);

  const getDropdownValuesHandlerApi = useCallback(() => {
    dispatch(getDropdownValues());
  }, []);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Customization" }));
    workspaceListHandlerApi();
    getDropdownValuesHandlerApi();
    // socket.on("vdo-processing", (resp) => {
    //   console.log("vdo-processing", resp);
    // });
  }, []);

  useEffect(() => {
    if (activeWorkspace) {
      // console.log("activeWorkspace - main", activeWorkspace);
      socket.emit("join", { workspaceId: activeWorkspace }, (resp) => {
        // console.log("join", resp);
      });

      socket.on("vdo-processing", (resp) => {
        // console.log("vdo-processing", resp);
        // console.log("activeWorkspace", resp[activeWorkspace]);
        // console.log(Object.keys(resp[activeWorkspace]), "keyyyyy");
        // console.log(Object.keys(resp[activeWorkspace]), "valueeeee");

        const key = Object.keys(resp[activeWorkspace]);
        // console.log("key", key[0]);
        let val = resp[activeWorkspace];
        // console.log("val", val[key]);

        if (val[key]) {
          setVideoUploadProcess((prev) => prev + 33.33);

          if (resp[activeWorkspace]?.video === true) {
            toast("Video uploaded", {
              type: "success",
            });
            workspaceChangeHandlerApi(activeWorkspace);
            setIsVideoUploaded(false);
          }
        }
      });
    }

    workspaceChangeHandlerApi(activeWorkspace);

    return () => {
      // console.log("activeWorkspace - return", activeWorkspace);
      socket.emit("leave", { workspaceId: activeWorkspace });
      socket.off("vdo-processing");
    };
  }, [activeWorkspace]);

  // console.log("vdoProgress", vdoProgress);
  // console.log("convertProcess", convertProcess);

  // console.log("selectWorkspaceOptions", selectWorkspaceOptions);
  // console.log("activeWorkspace", activeWorkspace);

  return (
    <div className="inline-block w-full h-full overflow-y-hidden">
      <form
        onSubmit={handleSubmit(({ video, ...data }) => onSubmit(data, false))}
        className="h-full"
      >
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
                    buttonClass="w-32 text-base max-w-full h-[2.40rem] min-h-[2.40rem]"
                  />
                </div>
              </div>

              {/* {console.log("rendering...")} */}
              {/* {console.log("activeWorkspaceData", activeWorkspaceData)} */}

              {activeWorkspaceData !== null &&
              selectWorkspaceOptions.length > 0 &&
              !videoUploadedProcess ? (
                <div className="inline-block w-full h-[calc(100vh-183px)] relative">
                  <ClapprComponent
                    id="player"
                    source={
                      activeWorkspaceData !== null &&
                      baseURL + "/" + activeWorkspaceData?.video?.path
                    }
                    // base api + video.path
                    height={
                      activeWorkspaceData?.designCustomization?.player
                        ?.height || 461
                    }
                    width={
                      activeWorkspaceData?.designCustomization?.player?.size ||
                      261
                    }
                    poster={
                      activeWorkspaceData !== null &&
                      baseURL +
                        "/" +
                        activeWorkspaceData?.video?.thumbnailDestination +
                        "/" +
                        activeWorkspaceData?.video?.thumbnail
                    }
                    animatedImage={
                      baseURL + "/" + activeWorkspaceData?.video?.animatedImage
                    }
                  />
                </div>
              ) : (
                <div className="inline-block w-full h-[calc(100vh-183px)] relative">
                  <div
                    className={`video_upload_loader border-t-[5px solid] border-t-secondary-main absolute top-0 bottom-0 left-0 right-0 m-auto`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="drawer-side overflow-auto max-h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-xl max-lg:[&::-webkit-scrollbar]:hidden">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul
              id="accordionExample"
              className="menu py-4 w-80 bg-[#f9fafb] text-base-content border-r"
            >
              <li className="mb-12">
                <div className="flex flex-col px-4 items-start focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb] p-0">
                  <h3 className="text-primary-normal font-bold mb-3 text-xl">
                    Workspace
                  </h3>

                  <SelectBox
                    options={selectWorkspaceOptions}
                    updateFormValue={updateValue}
                    containerStyle="w-full mb-4"
                    selectStyle="text-primary-main"
                    placeholder
                    defaultValue={activeWorkspace}
                  />

                  <div className="inline-block w-full mb-2">
                    <Button
                      text="Delete Selected"
                      buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                      clickHandler={deleteActiveWorkspace}
                      disabled={
                        selectWorkspaceOptions.length > 0 ? "" : "disabled"
                      }
                    ></Button>
                  </div>

                  <div className="flex w-full">
                    <Button
                      text="New Workspace"
                      buttonClass="w-full text-base"
                      clickHandler={newWorkspaceHandler}
                    />
                  </div>
                </div>
              </li>

              <li>
                <BasicSetup
                  register={register}
                  valueChangeHandler={valueChangeHandler}
                />
              </li>

              <li>
                <AddVideo
                  register={register}
                  errors={errors && errors}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  videoUploadProcess={videoUploadProcess}
                  isVideoUploaded={isVideoUploaded}
                  // files={files}
                  // handleFile={(e) => handleFile(e)}
                  // removeImage={(e) => removeImage(e)}
                />
              </li>

              <li>
                <CallToActionModal
                  register={register}
                  valueChangeHandler={valueChangeHandler}
                />
              </li>

              <li>
                <DesignCustomization
                  register={register}
                  valueChangeHandler={valueChangeHandler}
                />
              </li>

              <li>
                <ColorStudio
                  register={register}
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  control={control}
                  setValue={setValue}
                />
              </li>

              <li>
                <FontStudio
                  register={register}
                  valueChangeHandler={valueChangeHandler}
                />
              </li>

              <li>
                <Preview register={register} />
              </li>

              <li>
                <GetLink register={register} />
              </li>

              <li>
                <InstantEmbed register={register} />
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Customization;
