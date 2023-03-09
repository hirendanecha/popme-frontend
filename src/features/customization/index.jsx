import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
import ModalButton from "../../components/Button/ModalButton";
import { openNewModal } from "../../redux/slices/newModalSlice";
import ConnectWebsiteModal from "./ConnectWebsiteModal";
import {
  CloseSvg,
  RightArrowSvg,
  RightExitSvg,
  PhoneSvg,
  leftIcon,
  VolumeSvg,
  MuteSvg,
  DashSvg,
  OpenEye,
} from "./SvgComp";
import {
  addWorkspace,
  getDropdownValues,
  getWorkspaceById,
  updateWorkspaceOptions,
  worksapceList,
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

const Customization = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.workspace);

  const [selectWorkspaceOptions, setSelectWorkspaceOptions] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState("");

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      basicSetUp: {
        previewStyle: "",
        videoPosition: "",
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
    if (data !== null) {
      reset({
        basicSetUp: {
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
        // addVideo: null,
      });
    }
  }, [data]);

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

      // console.log("data", data);
      // console.log("parentKey", parentKey);

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

    let formData = jsonToFormData(data);

    dispatch(updateWorkspaceOptions({ data: formData, id: activeWorkspace }))
      .unwrap()
      .then((res) => {
        // console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const updateValue = (data) => {
    // console.log("updateValue", data);
    setActiveWorkspace(data?.value);
  };

  const workspaceListHandlerApi = useCallback(() => {
    dispatch(worksapceList())
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
                    <div className="avatar placeholder mr-2">
                      <div className=" bg-secondary-main text-white text-xs rounded-lg w-8">
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
                <BasicSetup register={register} />
              </li>

              <li>
                <AddVideo
                  register={register}
                  errors={errors && errors}
                  // files={files}
                  // handleFile={(e) => handleFile(e)}
                  // removeImage={(e) => removeImage(e)}
                />
              </li>

              <li>
                <CallToActionModal register={register} />
              </li>

              <li>
                <DesignCustomization register={register} />
              </li>

              <li>
                <ColorStudio register={register} watch={watch} />
              </li>

              <li>
                <FontStudio register={register} />
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
