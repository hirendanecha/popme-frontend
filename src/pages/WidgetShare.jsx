import React, { useRef, useEffect } from "react";
import {
  DashSvg,
  MuteSvg,
  PauseSvg,
  PlayerPlaySvg,
  VolumeSvg,
} from "../features/customization/SvgComp";
// import workspace1 from "../assets/images/workspace-1.png";
// import PlayButtonSvg from "../assets/svgs/PlayButtonSvg";

const WidgetShare = () => {
  const ClapprComponent = ({ id, source, height, width }) => {
    let player = useRef();

    useEffect(() => {
      player.current = new Clappr.Player({
        source: "https://www.w3schools.com/tags/movie.ogg",
        // poster: "http://clappr.io/poster.png",
        parentId: "#share_player",
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
    }, []);

    return (
      <div className="flex justify-center">
        <div className="inline-block rounded-2xl overflow-hidden shadow-[0_10px_36px_0px_rgba(51,60,82,1)]">
          <div className="relative player_wrap transform translate-y-0 translate-x-0 opacity-100 transition duration-500 ease-in-out">
            <div ref={player} id={id} className="block"></div>

            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
              <div className="flex justify-between w-full p-4 h-full">
                <div className="flex justify-between play_area_button flex-col z-20">
                  <div className="flex justify-between">
                    <h5 className="text-white text-base">Elie MoreReels</h5>
                    <div className="minimize_icon cursor-pointer">
                      <DashSvg />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col pr-3">
                      <h4 className="text-2xl text-white mb-3">
                        This is PopMe!
                      </h4>

                      <p className="text-sm text-white mb-4 line-clamp-5">
                        A widget you can use to upload videos and get personal
                        with your customers to schedule meetings, ask for
                        reviews, or share the latest features with its CTA
                        functionnality.
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

              <div className="absolute bottom-0 flex w-full">
                {/* <progress
                  className="progress progress-accent bg-opacity-60 w-full"
                  value="70"
                  max="100"
                  id="progress_bar"
                ></progress> */}

                <div
                  className="flex bg-secondary-main h-[6px] rounded-tr-xl"
                  id="progress_calcc"
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
        <ClapprComponent
          id="share_player"
          source="https://www.w3schools.com/tags/movie.ogg"
          height={500}
          width={280}
        />
      </div>
    </div>
  );
};

export default WidgetShare;
