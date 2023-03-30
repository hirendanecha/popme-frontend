import React, { useRef, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../components/Button/Button";
import {
  CloseSvg,
  DashSvg,
  MuteSvg,
  PauseSvg,
  PlayerPlaySvg,
  RightArrowSvg,
  RightExitSvg,
  VolumeSvg,
} from "../features/customization/SvgComp";
import {
  getWorkspaceById,
  getWorkspaceByIdentity,
} from "../features/workspaces/action";
import CalendarSvg from "../assets/svgs/CalendarSvg";
// import workspace1 from "../assets/images/workspace-1.png";
// import PlayButtonSvg from "../assets/svgs/PlayButtonSvg";

const baseURL = import.meta.env.VITE_BASE_URL;

const WidgetShare = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [workspaceData, setWorkspaceData] = useState(null);

  // console.log("id", id);
  let decodedStringAtoB = atob(id);
  // console.log("decodedStringAtoB", decodedStringAtoB);

  const workspaceChangeHandlerApi = useCallback((id) => {
    const splitId = id.split(":");

    dispatch(getWorkspaceByIdentity(splitId[1]))
      .unwrap()
      .then((res) => {
        // console.log("res", res);

        if (res) {
          setWorkspaceData(res);
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

  useEffect(() => {
    if (decodedStringAtoB) {
      workspaceChangeHandlerApi(decodedStringAtoB);
    }
  }, [decodedStringAtoB]);

  console.log("workspaceData", workspaceData);

  const renderSwitch = (activeWorkspaceData) => {
    switch (activeWorkspaceData !== null) {
      case activeWorkspaceData?.callToAction?.buttonIcon === "arrow":
        return <RightArrowSvg w="w-6" h="h-6" color="text-white" />;

      case activeWorkspaceData?.callToAction?.buttonIcon === "roundedarrow":
        return <RightExitSvg w="w-6" h="h-6" color="text-white" />;

      case activeWorkspaceData?.callToAction?.buttonIcon === "calendar":
        return <CalendarSvg w="15" h="15" color="#fff" />;

      case activeWorkspaceData?.callToAction?.buttonIcon === "cross":
        return <CloseSvg w="w-6" h="h-6" color="text-white" />;

      default:
        return <RightArrowSvg w="w-6" h="h-6" color="text-white" />;
    }
  };

  const ClapprComponent = ({ id, source, height, width }) => {
    let player = useRef();

    useEffect(() => {
      player.current = new Clappr.Player({
        source: source,
        // poster: "http://clappr.io/poster.png",
        parentId: `#${id}`,
        height,
        width,
        autoPlay: true,
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

            let progressbar = document.getElementById("progress_calcc");
            if (progressbar) {
              let per = `${(e.current / e.total) * 100}%`;
              progressbar.style.width = per;
              progressbar.style.transition = `width .1s linear,height .2s`;
            }
          },
        },
      });

      player.current.unmute();

      player.current.on(window.Clappr.Events.PLAYER_PLAY, function () {
        player.current.core.mediaControl.disable();
      });

      // hide loader
      player.current.getPlugin("spinner").disable();

      // hide play button
      player.current.getPlugin("poster").$playWrapper.hide();

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

      let minimizeIcon = document.querySelector(".minimize_icon");
      minimizeIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        player.current.pause();

        if (document.getElementById(id).classList.contains("block")) {
          document.getElementById(id).classList.remove("block");
          document.getElementById(id).classList.add("hidden");

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
        event.stopPropagation();
        const pauseIcon = document.querySelector(".pause_icon");
        const playIcon = document.querySelector(".play_icon");

        if (pauseIcon.classList.contains("hidden")) {
          player.current.play();

          pauseIcon.classList.remove("hidden");
          document.querySelector(".play_icon").classList.add("hidden");
        } else if (playIcon.classList.contains("hidden")) {
          player.current.pause();

          playIcon.classList.remove("hidden");
          document.querySelector(".pause_icon").classList.add("hidden");
        }
      });
    }, []);

    return (
      <div className="flex justify-center">
        <div className="inline-block rounded-2xl overflow-hidden shadow-[0_10px_36px_0px_rgba(51,60,82,1)]">
          <div
            className={`relative player_wrap ${workspaceData?.fontStudio?.fontFamily} transform translate-y-0 translate-x-0 opacity-100 transition duration-500 ease-in-out`}
          >
            <div
              ref={player}
              id={id}
              className="block clappr_player_custom"
            ></div>

            <div
              className="absolute top-0 bottom-0 left-0 right-0"
              style={{
                background: `linear-gradient(180deg, transparent 60%, ${workspaceData?.colorStudio?.general?.gradientOverlay} 100%)`,
              }}
            >
              <div className="flex justify-between w-full px-6 pt-5 pb-2 h-full">
                <div className="flex justify-between play_area_button flex-col z-20 w-full">
                  <div className="flex justify-between">
                    <h5
                      className="text-white text-base font-medium"
                      style={{
                        fontSize: `${workspaceData?.fontStudio?.authorName}px`,
                        color: workspaceData?.colorStudio?.player?.authorName,
                      }}
                    >
                      {workspaceData?.designCustomization?.authorName}
                    </h5>

                    <div className="flex items-center">
                      <div className="flex mr-6">
                        <div className="inline-block volume_icon cursor-pointer z-30">
                          <VolumeSvg
                            color={workspaceData?.colorStudio?.player?.control}
                          />
                        </div>

                        <div className="mute_icon hidden cursor-pointer z-30">
                          <MuteSvg
                            color={workspaceData?.colorStudio?.player?.control}
                          />
                        </div>
                      </div>

                      <div className="minimize_icon cursor-pointer">
                        <DashSvg
                          color={workspaceData?.colorStudio?.player?.control}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col pr-3">
                        <h4
                          className="text-2xl text-white mb-3 font-bold"
                          style={{
                            fontSize: `${workspaceData?.fontStudio?.videoTitle}px`,
                            color:
                              workspaceData?.colorStudio?.general?.videoTitle,
                          }}
                        >
                          {workspaceData?.title || "This is PopMe!"}
                        </h4>

                        <p
                          className="text-sm text-white mb-4 font-bold"
                          style={{
                            fontSize: `${workspaceData?.fontStudio?.videoDescription}px`,
                            color:
                              workspaceData?.colorStudio?.general
                                ?.videoDescription,
                          }}
                        >
                          {workspaceData?.description ||
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                        </p>
                      </div>

                      <div className="flex flex-col mb-4">
                        <div className="play_icon cursor-pointer hidden z-30">
                          <PlayerPlaySvg
                            color={workspaceData?.colorStudio?.player?.control}
                          />
                        </div>

                        <div className="pause_icon cursor-pointer z-30">
                          <PauseSvg
                            color={workspaceData?.colorStudio?.player?.control}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex mb-[20px]">
                      {/* <Button
                        text="Try for free"
                        rightIcon={RightArrowSvg({
                          w: "w-4",
                          h: "h-4",
                          color: "text-white",
                        })}
                        buttonClass="h-[2rem] min-h-[2rem] w-full rounded-full"
                      /> */}

                      <Link
                        to={workspaceData?.callToAction?.destinationUrl}
                        target="_blank"
                        className="w-full"
                      >
                        <button
                          type="button"
                          className={`btn whitespace-normal cta_show ${workspaceData?.callToAction?.buttonStyle}
                    ${workspaceData?.callToAction?.buttonCorner} w-full rounded-full truncate hover:border-transparent bg-secondary-main border border-transparent hover:bg-secondary-main capitalize text-white gap-2`}
                          style={{
                            backgroundColor:
                              workspaceData?.colorStudio?.callToAction
                                ?.buttonBackground,

                            fontSize: `${workspaceData?.fontStudio?.ctaButton}px`,

                            borderColor:
                              workspaceData?.colorStudio?.callToAction
                                ?.buttonOutline,

                            color:
                              workspaceData?.colorStudio?.callToAction
                                ?.buttonText,

                            height: "auto",
                            minHeight: "38px",

                            paddingTop: "6px",
                            paddingBottom: "6px",
                          }}
                        >
                          <span
                            className="flex gap-3 items-center justify-center flex-wrap"
                            // style={{
                            //   padding: `${+workspaceData?.fontStudio
                            //     ?.ctaButton}px`,
                            // }}
                          >
                            {workspaceData?.callToAction?.buttonText ||
                              "Try for free"}
                            {renderSwitch(workspaceData)}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[2px] flex w-full px-2">
                {/* <progress
                  className="progress progress-accent bg-opacity-60 w-full"
                  value="70"
                  max="100"
                  id="progress_bar"
                ></progress> */}

                <div
                  className="flex bg-secondary-main h-[7px] rounded-xl"
                  id="progress_calcc"
                  style={{
                    background: workspaceData?.colorStudio?.player?.seeker,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center bg-[#E5E7EB]">
      <div className="mx-auto w-full max-w-xl">
        {workspaceData !== null && (
          <ClapprComponent
            id="share_player"
            source={baseURL + "/" + workspaceData?.video?.path}
            height={664}
            width={336}
          />
        )}
      </div>
    </div>
  );
};

export default WidgetShare;
