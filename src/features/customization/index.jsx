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
  worksapceList,
} from "../workspaces/action";
import BasicSetup from "./WorkspaceOptions/BasicSetup";
import AddVideo from "./WorkspaceOptions/AddVideo";

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
      // shadow: "#273149",
    },
    callToAction: {
      buttonText: "#FFFFFF",
      buttonBackground: "#1B5CF3",
      buttonOutline: "#FFFFFF",
      // buttonIcon: "#FFFFFF",
    },
    player: {
      controls: "#FFFFFF",
      seeker: "#FFFFFF",
      authorName: "#FFFFFF",
      // authorOccupation: "#FFFFFF",
    },
    toggle: {
      playIcon: "#FFFFFF",
      closeBackground: "#FFFFFF",
      closeIconColor: "#FFFFFF",
      // closeIconBorder: "#FFFFFF",
    },
    // others: {
    //   backgroundOverlay: "#000000",
    // },
  },
};

// const jj = [
//   {
//     name: "jkbjb",
//     id: 1,
//   },
//   {
//     name: "lll",
//     id: 2,
//   },
// ];

const Customization = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.workspace);
  const [pickColor, setPickColor] = useState(ColorObj);

  const [selectWorkspaceOptions, setSelectWorkspaceOptions] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState("");

  // console.log("data", data);

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      basicSetup: {
        previewStyle: "",
        videoPosition: "",
      },
      addVideo: {
        addVideo: null,
        videoDescription: "",
        videoTitle: "",
      },
    },
  });

  useEffect(() => {
    if (data !== null) {
      reset({
        basicSetup: {
          previewStyle: "",
          videoPosition: data?.data?.basicSetUp?.videoPosition
            ? data?.data?.basicSetUp?.videoPosition
            : "",
        },
      });
    }
  }, [data]);

  const onSubmit = (data) => {
    console.log("onSubmit", data);
  };

  const updateValue = (data) => {
    // console.log("updateValue", data);
    setActiveWorkspace(data?.value);
  };

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
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
  }, []);

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
        // console.log("res", res);
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
                                  htmlFor={item?.name}
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
                        <NewInputText
                          type="text"
                          labelTitle="Author Name"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.authorName"
                          register={register}
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
                          labelTitle="Size"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.toggle.size"
                          register={register}
                          rightText="%"
                          max="100"
                        />

                        <SelectBox
                          labelTitle="Animation"
                          labelStyle="text-primary-main text-base font-semibold"
                          options={[
                            { name: "Bounce", value: "bounce" },
                            { name: "Fade Up", value: "fadeUp" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="designCustomization.toggle.animation"
                          register={register}
                        />

                        <SelectBox
                          labelTitle="Show Play Icon"
                          labelStyle="text-primary-main text-base font-semibold"
                          options={[
                            { name: "Show", value: "true" },
                            { name: "Hide", value: "false" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="designCustomization.toggle.showPlayIcon"
                          register={register}
                        />

                        <SelectBox
                          labelTitle="Show Close Icon"
                          labelStyle="text-primary-main text-base font-semibold"
                          options={[
                            { name: "Show", value: "true" },
                            { name: "Hide", value: "false" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="designCustomization.toggle.showCloseIcon"
                          register={register}
                        />
                      </div>

                      <div className="flex flex-col px-4">
                        <h4 className="text-xl font-bold text-primary-normal py-4">
                          Player
                        </h4>

                        <InputWithIcon
                          type="number"
                          labelTitle="Size"
                          labelStyle="text-primary-main text-base font-semibold"
                          inputStyle="mb-3 !bg-transparent"
                          name="designCustomization.player.size"
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

                        <SelectBox
                          labelTitle="On mobile devices"
                          labelStyle="text-primary-main text-base font-semibold"
                          options={[
                            { name: "Full screen", value: "fullScreen" },
                            { name: "Half screen", value: "halfScreen" },
                          ]}
                          containerStyle="min-w-[10rem] mb-3"
                          selectStyle="text-primary-main"
                          name="designCustomization.player.onMobileDevices"
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
                              Orange
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
                      <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-14 h-7 text-secondary-main"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                          />
                        </svg>

                        <p className="text-sm text-secondary-main font-bold ml-3">
                          Connect your website with Answerly and embed any
                          widget with one click.
                        </p>
                      </div>

                      <div className="flex p-3 bg-[#F2F6F0] mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-7 text-[#4A8A37]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <p className="text-sm text-[#4A8A37] font-bold ml-3">
                          The process takes one minute by putting a code on your
                          website.
                        </p>
                      </div>

                      <ModalButton
                        text="Connect a Website"
                        id="connect-website"
                        buttonClass="mb-4"
                        clickHandler={() =>
                          modalClickHandler({
                            id: "connect-website",
                            children: <ConnectWebsiteModal />,
                          })
                        }
                      />

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
