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
import BasicSetup from "./WorkspaceOptions/BasicSetup";
import AddVideo from "./WorkspaceOptions/AddVideo";
import CallToActionModal from "./WorkspaceOptions/CallToActionModal";
import DesignCustomization from "./WorkspaceOptions/DesignCustomization";
import ColorStudio, { ColorObj } from "./WorkspaceOptions/ColorStudio";
import FontStudio from "./WorkspaceOptions/FontStudio";
import Preview from "./WorkspaceOptions/Preview";
import GetLink from "./WorkspaceOptions/GetLink";
import InstantEmbed from "./WorkspaceOptions/InstantEmbed";
import { setActiveWorkspaceData } from "../workspaces/reducer/workspaceSlice";
import { useLocation } from "react-router-dom";
import CalendarSvg from "../../assets/svgs/CalendarSvg";

const baseURL = import.meta.env.VITE_BASE_URL;

const Customization = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, dataDD, error, activeWorkspaceData } = useSelector(
    (state) => state.workspace
  );
  // console.log(data,"data")

  // console.log("location?.state", location?.state);

  console.log("activeWorkspaceData", activeWorkspaceData);

  // base api + video.path

  // console.log(
  //   "image",
  //   baseURL +
  //     "/" +
  //     activeWorkspaceData?.video?.thumbnailDestination +
  //     "/" +
  //     activeWorkspaceData?.video?.thumbnail
  // );

  // console.log("video", baseURL + "/" + activeWorkspaceData?.video?.path);

  // console.log(
  //   "animatedImage",
  //   `${baseURL + "/" + activeWorkspaceData?.video?.animatedImage}`
  // );

  const [selectWorkspaceOptions, setSelectWorkspaceOptions] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(
    location?.state?.id || ""
  );

  // console.log("selectWorkspaceOptions", selectWorkspaceOptions);

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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      basicSetUp: {
        //       previewStyle: "",
        //       videoPosition: "",
        //     },
        //     callToAction: {
        //       buttonCorner: "",
        //       buttonIcon: null,
        //       buttonStyle: "",
        //       buttonText: "",
        //       destinationUrl: "",
        //     },
        //     designCustomization: {
        //       authorName: "",
        //       horizontalMargin: "",
        //       verticalMargin: "",
        //       player: {
        //         height: "",
        //         onMobileDevice: "",
        //         size: "",
        //       },
        //       toggle: {
        //         animation: "",
        //         showPlayIcon: "",
        //         showCloseIcon: "",
        //         size: "",
        //       },
        //     },
        //     colorStudio: {
        //       templates: "",
        //       general: {
        //         gradientOverlay: "",
        //         videoDescription: "",
        //         videoTitle: "",
        //       },
        //       callToAction: {
        //         buttonBackground: "",
        //         buttonOutline: "",
        //         buttonText: "",
        //       },
        //       player: {
        //         authorName: "",
        //         control: "",
        //         seeker: "",
        //       },
        //       toggle: {
        //         closeBackground: "",
        //         closeIconColor: "",
        //         playIcon: "",
        //       },
        //     },
        //     fontStudio: {
        //       authorName: "",
        //       ctaButton: "",
        //       fontFamily: "",
        //       videoDescription: "",
        //       videoTitle: "",
        //     },
        //     title: "",
        //     description: "",
        //     video: null,
        //   },
        // });

        // useEffect(() => {
        //   if (data !== null) {
        //     reset({
        //       basicSetUp: {

        previewStyle: data?.data?.basicSetUp?.previewStyle
          ? data?.data?.basicSetUp?.previewStyle
          : "",
        videoPosition: data?.data?.basicSetUp?.videoPosition
          ? data?.data?.basicSetUp?.videoPosition
          : "",
      },
      callToAction: {
        buttonCorner: data?.data?.callToAction?.buttonCorner
          ? data?.data?.callToAction?.buttonCorner
          : "",
        buttonIcon: data?.data?.callToAction?.buttonIcon
          ? data?.data?.callToAction?.buttonIcon
          : null,
        buttonStyle: data?.data?.callToAction?.buttonStyle
          ? data?.data?.callToAction?.buttonStyle
          : "",
        buttonText: data?.data?.callToAction?.buttonText
          ? data?.data?.callToAction?.buttonText
          : "",
        destinationUrl: data?.data?.callToAction?.destinationUrl
          ? data?.data?.callToAction?.destinationUrl
          : "",
      },
      designCustomization: {
        authorName: data?.data?.designCustomization?.authorName
          ? data?.data?.designCustomization?.authorName
          : "",

        horizontalMargin: data?.data?.designCustomization?.horizontalMargin
          ? data?.data?.designCustomization?.horizontalMargin
          : "",

        verticalMargin: data?.data?.designCustomization?.verticalMargin
          ? data?.data?.designCustomization?.verticalMargin
          : "",

        player: {
          height: data?.data?.designCustomization?.player?.height
            ? data?.data?.designCustomization?.player?.height
            : "",
          onMobileDevice: data?.data?.designCustomization?.player
            ?.onMobileDevice
            ? data?.data?.designCustomization?.player?.onMobileDevice
            : "",
          size: data?.data?.designCustomization?.player?.size
            ? data?.data?.designCustomization?.player?.size
            : "",
        },
        toggle: {
          animation: data?.data?.designCustomization?.toggle?.animation
            ? data?.data?.designCustomization?.toggle?.animation
            : "",

          showPlayIcon:
            typeof data?.data?.designCustomization?.toggle?.showPlayIcon ===
            "boolean"
              ? data?.data?.designCustomization?.toggle?.showPlayIcon
              : "",

          showCloseIcon:
            typeof data?.data?.designCustomization?.toggle?.showCloseIcon ===
            "boolean"
              ? data?.data?.designCustomization?.toggle?.showCloseIcon
              : "",

          size: data?.data?.designCustomization?.toggle?.size
            ? data?.data?.designCustomization?.toggle?.size
            : "",
        },
      },
      colorStudio: {
        templates: data?.data?.colorStudio?.templates
          ? data?.data?.colorStudio?.templates
          : "",

        general: {
          gradientOverlay: data?.data?.colorStudio?.general?.gradientOverlay
            ? data?.data?.colorStudio?.general?.gradientOverlay
            : "#273149",
          videoDescription: data?.data?.colorStudio?.general?.videoDescription
            ? data?.data?.colorStudio?.general?.videoDescription
            : "#FFFFFF",
          videoTitle: data?.data?.colorStudio?.general?.videoTitle
            ? data?.data?.colorStudio?.general?.videoTitle
            : "#FFFFFF",
        },
        callToAction: {
          buttonBackground: data?.data?.colorStudio?.callToAction
            ?.buttonBackground
            ? data?.data?.colorStudio?.callToAction?.buttonBackground
            : "#1B5CF3",

          buttonOutline: data?.data?.colorStudio?.callToAction?.buttonOutline
            ? data?.data?.colorStudio?.callToAction?.buttonOutline
            : "#FFFFFF",

          buttonText: data?.data?.colorStudio?.callToAction?.buttonText
            ? data?.data?.colorStudio?.callToAction?.buttonText
            : "#FFFFFF",
        },
        player: {
          authorName: data?.data?.colorStudio?.player?.authorName
            ? data?.data?.colorStudio?.player?.authorName
            : "#FFFFFF",
          control: data?.data?.colorStudio?.player?.control
            ? data?.data?.colorStudio?.player?.control
            : "#FFFFFF",
          seeker: data?.data?.colorStudio?.player?.seeker
            ? data?.data?.colorStudio?.player?.seeker
            : "#FFFFFF",
        },
        toggle: {
          closeBackground: data?.data?.colorStudio?.toggle?.closeBackground
            ? data?.data?.colorStudio?.toggle?.closeBackground
            : "#FFFFFF",
          closeIconColor: data?.data?.colorStudio?.toggle?.closeIconColor
            ? data?.data?.colorStudio?.toggle?.closeIconColor
            : "#FFFFFF",
          playIcon: data?.data?.colorStudio?.toggle?.playIcon
            ? data?.data?.colorStudio?.toggle?.playIcon
            : "#FFFFFF",
        },
      },
      fontStudio: {
        authorName: data?.data?.fontStudio?.authorName
          ? data?.data?.fontStudio?.authorName
          : "",
        ctaButton: data?.data?.fontStudio?.ctaButton
          ? data?.data?.fontStudio?.ctaButton
          : "",
        fontFamily: data?.data?.fontStudio?.fontFamily
          ? data?.data?.fontStudio?.fontFamily
          : "",
        videoDescription: data?.data?.fontStudio?.videoDescription
          ? data?.data?.fontStudio?.videoDescription
          : "",
        videoTitle: data?.data?.fontStudio?.videoTitle
          ? data?.data?.fontStudio?.videoTitle
          : "",
      },
      title: data?.data?.title ? data?.data?.title : "",
      description: data?.data?.description ? data?.data?.description : "",
      video: data?.data?.video ? data?.data?.video?.originalname : "",
      // addVideo: null,
    },
  });
  // }
  // }, [data]);

  //*** */

useEffect(() => {
  if (data) {
      // console.log(data?.data,"nhj");
      // console.log("useEffect for data")
      reset({
        basicSetUp: {
          previewStyle: data?.data?.basicSetUp?.previewStyle
            ? data.data.basicSetUp.previewStyle
            : "",
          videoPosition: data?.data?.basicSetUp?.videoPosition
            ? data?.data?.basicSetUp?.videoPosition
            : "",
        },
        callToAction: {
          buttonCorner: data?.data?.callToAction?.buttonCorner
            ? data?.data?.callToAction?.buttonCorner
            : "",
          buttonIcon: data?.data?.callToAction?.buttonIcon
            ? data?.data?.callToAction?.buttonIcon
            : null,
          buttonStyle: data?.data?.callToAction?.buttonStyle
            ? data?.data?.callToAction?.buttonStyle
            : "",
          buttonText: data?.data?.callToAction?.buttonText
            ? data?.data?.callToAction?.buttonText
            : "",
          destinationUrl: data?.data?.callToAction?.destinationUrl
            ? data?.data?.callToAction?.destinationUrl
            : "",
        },
        designCustomization: {
          authorName: data?.data?.designCustomization?.authorName
            ? data?.data?.designCustomization?.authorName
            : "",

          horizontalMargin: data?.data?.designCustomization?.horizontalMargin
            ? data?.data?.designCustomization?.horizontalMargin
            : "",

          verticalMargin: data?.data?.designCustomization?.verticalMargin
            ? data?.data?.designCustomization?.verticalMargin
            : "",

          player: {
            height: data?.data?.designCustomization?.player?.height
              ? data?.data?.designCustomization?.player?.height
              : "",
            onMobileDevice: data?.data?.designCustomization?.player
              ?.onMobileDevice
              ? data?.data?.designCustomization?.player?.onMobileDevice
              : "",
            size: data?.data?.designCustomization?.player?.size
              ? data?.data?.designCustomization?.player?.size
              : "",
          },
          toggle: {
            animation: data?.data?.designCustomization?.toggle?.animation
              ? data?.data?.designCustomization?.toggle?.animation
              : "",

            showPlayIcon:
              typeof data?.data?.designCustomization?.toggle?.showPlayIcon ===
              "boolean"
                ? data?.data?.designCustomization?.toggle?.showPlayIcon
                : "",

            showCloseIcon:
              typeof data?.data?.designCustomization?.toggle?.showCloseIcon ===
              "boolean"
                ? data?.data?.designCustomization?.toggle?.showCloseIcon
                : "",

            size: data?.data?.designCustomization?.toggle?.size
              ? data?.data?.designCustomization?.toggle?.size
              : "",
          },
        },
        colorStudio: {
          templates: data?.data?.colorStudio?.templates
            ? data?.data?.colorStudio?.templates
            : "",

          general: {
            gradientOverlay: data?.data?.colorStudio?.general?.gradientOverlay
              ? data?.data?.colorStudio?.general?.gradientOverlay
              : "#273149",
            videoDescription: data?.data?.colorStudio?.general?.videoDescription
              ? data?.data?.colorStudio?.general?.videoDescription
              : "#FFFFFF",
            videoTitle: data?.data?.colorStudio?.general?.videoTitle
              ? data?.data?.colorStudio?.general?.videoTitle
              : "#FFFFFF",
          },
          callToAction: {
            buttonBackground: data?.data?.colorStudio?.callToAction
              ?.buttonBackground
              ? data?.data?.colorStudio?.callToAction?.buttonBackground
              : "#1B5CF3",

            buttonOutline: data?.data?.colorStudio?.callToAction?.buttonOutline
              ? data?.data?.colorStudio?.callToAction?.buttonOutline
              : "#FFFFFF",

            buttonText: data?.data?.colorStudio?.callToAction?.buttonText
              ? data?.data?.colorStudio?.callToAction?.buttonText
              : "#FFFFFF",
          },
          player: {
            authorName: data?.data?.colorStudio?.player?.authorName
              ? data?.data?.colorStudio?.player?.authorName
              : "#FFFFFF",
            control: data?.data?.colorStudio?.player?.control
              ? data?.data?.colorStudio?.player?.control
              : "#FFFFFF",
            seeker: data?.data?.colorStudio?.player?.seeker
              ? data?.data?.colorStudio?.player?.seeker
              : "#FFFFFF",
          },
          toggle: {
            closeBackground: data?.data?.colorStudio?.toggle?.closeBackground
              ? data?.data?.colorStudio?.toggle?.closeBackground
              : "#FFFFFF",
            closeIconColor: data?.data?.colorStudio?.toggle?.closeIconColor
              ? data?.data?.colorStudio?.toggle?.closeIconColor
              : "#FFFFFF",
            playIcon: data?.data?.colorStudio?.toggle?.playIcon
              ? data?.data?.colorStudio?.toggle?.playIcon
              : "#FFFFFF",
          },
        },
        fontStudio: {
          authorName: data?.data?.fontStudio?.authorName
            ? data?.data?.fontStudio?.authorName
            : "",
          ctaButton: data?.data?.fontStudio?.ctaButton
            ? data?.data?.fontStudio?.ctaButton
            : "",
          fontFamily: data?.data?.fontStudio?.fontFamily
            ? data?.data?.fontStudio?.fontFamily
            : "",
          videoDescription: data?.data?.fontStudio?.videoDescription
            ? data?.data?.fontStudio?.videoDescription
            : "",
          videoTitle: data?.data?.fontStudio?.videoTitle
            ? data?.data?.fontStudio?.videoTitle
            : "",
        },
        title: data?.data?.title ? data?.data?.title : "",
        description: data?.data?.description ? data?.data?.description : "",
        video: data?.data?.video ? data?.data?.video?.originalname : "",
      });
    }
  }, [data]);

  //****** */

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

  const onSubmit = (data) => {
    // console.log("onSubmit", data);

    if (data) {
      let formData = jsonToFormData(data);

      dispatch(updateWorkspaceOptions({ data: formData, id: activeWorkspace }))
        .unwrap()
        .then((res) => {
          // console.log("res", res);
          dispatch(setActiveWorkspaceData(res?.data));
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const valueChangeHandler = (name) => {
    // handleSubmit(onSubmit);

    // console.log("name", name);

    if (name === "video") {
      handleSubmit((data) => {
        onSubmit(data);
      })();
    } else {
      handleSubmit(({ video, ...data }) => {
        onSubmit(data);
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
  }, []);

  useEffect(() => {
    if (activeWorkspace) {
      workspaceChangeHandlerApi(activeWorkspace);
    }
  }, [activeWorkspace]);

  // console.log("selectWorkspaceOptions", selectWorkspaceOptions);
  // console.log("activeWorkspace", activeWorkspace);

  const renderSwitch = (activeWorkspaceData) => {
    switch (activeWorkspaceData !== null) {
      case activeWorkspaceData?.callToAction?.buttonIcon === "arrow":
        return <RightArrowSvg w="w-4" h="h-4" color="text-white" />;

      case activeWorkspaceData?.callToAction?.buttonIcon === "roundedarrow":
        return <RightExitSvg w="w-4" h="h-4" color="text-white" />;

      case activeWorkspaceData?.callToAction?.buttonIcon === "calendar":
        return <CalendarSvg w="13" h="13" color="#fff" />;

      case activeWorkspaceData?.callToAction?.buttonIcon === "cross":
        return <CloseSvg w="w-4" h="h-4" color="text-white" />;

      default:
        return <RightArrowSvg w="w-4" h="h-4" color="text-white" />;
    }
  };

  const ClapprComponent = ({
    id,
    source,
    height,
    width,
    poster,
    animatedImage,
  }) => {
    let player = useRef();

    useEffect(() => {
      player.current = new Clappr.Player({
        source: source,
        // poster: { poster },
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
          onTimeUpdate: function (e) {
            // let progressbar = document.getElementById("progress_bar");
            // if (progressbar) {
            //   progressbar.value = e.current;
            //   progressbar.max = isNaN(e.total) ? 0 : e.total;
            // }

            let progressbar = document.getElementById("progress_calc");
            if (progressbar) {
              let per = `${(e.current / e.total) * 100}%`;
              progressbar.style.width = per;
              progressbar.style.transition = `width .1s linear,height .2s`;
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
        event.stopPropagation();
        player.current.mute();

        const muteIcon = document.querySelector(".mute_icon");

        if (muteIcon.classList.contains("hidden")) {
          muteIcon.classList.remove("hidden");
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
          document.querySelector(".mute_icon").classList.add("hidden");
        }
      });

      let imgPlayIcon = document.querySelector(".img_play_button");
      imgPlayIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        if (document.getElementById(id).classList.contains("hidden")) {
          player.current.play();
          player.current.unmute();

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
        player.current.play();

        const pauseIcon = document.querySelector(".pause_icon");

        if (pauseIcon.classList.contains("hidden")) {
          pauseIcon.classList.remove("hidden");
          document.querySelector(".play_icon").classList.add("hidden");
        }
      });

      let pauseIcon = document.querySelector(".pause_icon");
      pauseIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        player.current.pause();

        const playIcon = document.querySelector(".play_icon");
        if (playIcon.classList.contains("hidden")) {
          playIcon.classList.remove("hidden");
          document.querySelector(".pause_icon").classList.add("hidden");
        }
      });

      let playAreaButton = document.querySelector(".play_area_button");
      playAreaButton.addEventListener("click", function (event) {
        const pauseIcon = document.querySelector(".pause_icon");
        const playIcon = document.querySelector(".play_icon");

        if (pauseIcon.classList.contains("hidden")) {
          event.stopPropagation();
          player.current.play();

          pauseIcon.classList.remove("hidden");
          document.querySelector(".play_icon").classList.add("hidden");
        } else if (playIcon.classList.contains("hidden")) {
          event.stopPropagation();
          player.current.pause();

          playIcon.classList.remove("hidden");
          document.querySelector(".pause_icon").classList.add("hidden");
        }
      });

      let minimizeIcon = document.querySelector(".minimize_icon");
      minimizeIcon.addEventListener("click", function (event) {
        event.stopPropagation();
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

        <div
          // className={`absolute bottom-0 left-3 rounded-lg overflow-hidden`}
          className={`absolute ${
            activeWorkspaceData?.basicSetUp?.videoPosition || "bottom-0 left-3"
          } rounded-lg overflow-hidden`}
        >
          <div className="relative player_wrap transform translate-y-[130%] translate-x-[-130%] opacity-0 transition duration-500 ease-in-out">
            <div ref={player} id={id} className="hidden"></div>

            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
              <div className="flex justify-between w-full p-4 h-[calc(100%-58px)]">
                <div className="flex justify-between flex-col play_area_button z-20">
                  <div className="flex justify-between">
                    <h5
                      className="text-white text-base"
                      style={{
                        fontSize: `${activeWorkspaceData?.fontStudio?.authorName}px`,
                      }}
                    >
                      {activeWorkspaceData?.designCustomization?.authorName}
                    </h5>
                    <div className="minimize_icon cursor-pointer">
                      <DashSvg />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col pr-3">
                      <h4
                        className="text-2xl text-white mb-3 line-clamp-2"
                        style={{
                          fontSize: `${activeWorkspaceData?.fontStudio?.videoTitle}px`,
                        }}
                      >
                        {activeWorkspaceData?.title || "This is PopMe!"}
                      </h4>

                      <p
                        className="text-sm text-white mb-4 line-clamp-5"
                        style={{
                          fontSize: `${activeWorkspaceData?.fontStudio?.videoDescription}px`,
                        }}
                      >
                        {activeWorkspaceData?.description ||
                          "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                      </p>
                    </div>

                    <div className="flex flex-col">
                      <div className="mb-6 inline-block volume_icon cursor-pointer z-30">
                        <VolumeSvg />
                      </div>

                      <div className="mb-6 mute_icon hidden cursor-pointer z-30">
                        <MuteSvg />
                      </div>

                      <div className="play_icon cursor-pointer hidden z-30">
                        <PlayerPlaySvg />
                      </div>

                      <div className="pause_icon cursor-pointer z-30">
                        <PauseSvg />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex px-4 mb-[26px]">
                <Link
                  to={activeWorkspaceData?.callToAction?.destinationUrl}
                  target="_blank"
                  className="w-full"
                >
                  <button
                    type="button"
                    className={`btn h-auto ${activeWorkspaceData?.callToAction?.buttonStyle}
                    ${activeWorkspaceData?.callToAction?.buttonCorner} min-h-[2rem] w-full rounded-full truncate bg-secondary-main border-0 hover:bg-secondary-main capitalize text-white gap-2`}
                    style={{
                      backgroundColor:
                        activeWorkspaceData?.colorStudio?.templates,
                      fontSize: `${activeWorkspaceData?.fontStudio?.ctaButton}px`,
                      border:
                        activeWorkspaceData?.callToAction?.buttonStyle ===
                          "outlined" &&
                        `1px solid ${activeWorkspaceData?.colorStudio?.templates}`,
                    }}
                  >
                    {activeWorkspaceData?.callToAction?.buttonText ||
                      "Try for free"}
                    {renderSwitch(activeWorkspaceData)}
                  </button>
                </Link>
              </div>

              <div className="absolute bottom-0 flex w-full">
                {/* <progress
                  className="progress progress-accent bg-opacity-60 w-full"
                  value="70"
                  max="100"
                  id="progress_bar"
                ></progress> */}

                <div
                  className="flex bg-secondary-main h-[6px] rounded-tr-xl"
                  id="progress_calc"
                  style={{
                    background: activeWorkspaceData?.colorStudio?.templates,
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
            } block thumbnail_img`}
            style={{
              marginBottom: `${activeWorkspaceData?.designCustomization?.verticalMargin}px`,
              marginLeft: `${activeWorkspaceData?.designCustomization?.horizontalMargin}px`,
            }}
          >
            <div className="relative">
              <img
                src={poster && poster}
                // src={animatedImage ? animatedImage : workspace1}
                alt="workspace1"
                className="h-[200px] w-full object-cover rounded-lg"
              />

              <div
                className="absolute right-[-20px] top-[-20px] close_thumbnail_svg"
                style={{
                  display:
                    !activeWorkspaceData?.designCustomization?.toggle
                      ?.showCloseIcon && "none",
                }}
              >
                <CloseCircle />
              </div>

              <div
                className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer img_play_button"
                style={{
                  display:
                    !activeWorkspaceData?.designCustomization?.toggle
                      ?.showPlayIcon && "none",
                }}
              >
                <PlayButtonSvg />
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`absolute ${
              activeWorkspaceData?.basicSetUp?.videoPosition ||
              "bottom-0 left-3"
            } block thumbnail_img`}
            style={{
              marginBottom: `${activeWorkspaceData?.designCustomization?.verticalMargin}px`,
              marginLeft: `${activeWorkspaceData?.designCustomization?.horizontalMargin}px`,
            }}
          >
            <div className="relative">
              <img
                src={poster && poster}
                alt="workspace1"
                className="h-[178px] w-[178px] object-cover rounded-full"
              />

              <div
                className="absolute right-[-10px] top-[-10px] close_thumbnail_svg"
                style={{
                  display:
                    !activeWorkspaceData?.designCustomization?.toggle
                      ?.showCloseIcon && "none",
                }}
              >
                <CloseCircle />
              </div>

              <div
                className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center cursor-pointer img_play_button"
                style={{
                  display:
                    !activeWorkspaceData?.designCustomization?.toggle
                      ?.showPlayIcon && "none",
                }}
              >
                <PlayButtonSvg />
              </div>
            </div>
          </div>
        )}
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

              {activeWorkspaceData !== null && (
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
              )}
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
                    />
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
