import React, { useRef, useEffect } from "react";
import { DashSvg, MuteSvg, VolumeSvg } from "../features/customization/SvgComp";
import workspace1 from "../assets/images/workspace-1.png";
import PlayButtonSvg from "../assets/svgs/PlayButtonSvg";

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

      // hide play button
      player.current.getPlugin("poster").$playWrapper.hide();

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

      let minimizeIcon = document.querySelector(".minimize_icon");
      minimizeIcon.addEventListener("click", function (event) {
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
    }, []);

    return (
      <div className="flex justify-center">
        <div className="inline-block rounded-2xl overflow-hidden">
          <div className="relative player_wrap transform translate-y-0 translate-x-0 opacity-100 transition duration-500 ease-in-out">
            <div ref={player} id={id} className="block"></div>

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
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center">
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
