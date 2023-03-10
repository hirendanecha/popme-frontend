import React, { useState, useRef, useEffect } from "react";
import defaultWorkspaceImage from "../../assets/images/defaultWorkspaceImage.png";
import defaultWorkspaceWebp from "../../assets/images/defaultWorkspaceWebp.webp";
import ClockSvg from "../../assets/svgs/ClockSvg";
import GroupSvg from "../../assets/svgs/GroupSvg";
import MouseSvg from "../../assets/svgs/MouseSvg";
import ThreeDotSvg from "../../assets/svgs/ThreeDotSvg";
import playVideoIcon from "../../assets/images/playVideoIcon.png";

const baseURL = import.meta.env.VITE_BASE_URL;

const WorkspacePost = ({ item, index }) => {
  //   console.log(
  //     "video",
  //     baseURL + item?.video?.thumbnailDestination + item?.video?.thumbnail
  //   );

  //   console.log("video", `${baseURL + item?.video?.animatedImage}`);

  //   console.log(
  //     "image",
  //     `${
  //       baseURL +
  //       item?.video?.animatedImagetem?.video?.thumbnailDestination +
  //       item?.video?.thumbnail
  //     }`
  //   );

  const [defaultWorkspaceImg, setDefaultWorkspaceImg] = useState(
    item?.video?.thumbnail
      ? baseURL +
          item?.video?.thumbnailDestination +
          "/" +
          item?.video?.thumbnail
      : defaultWorkspaceImage
  );

  const mouseOver = () => {
    setDefaultWorkspaceImg(
      item?.video?.animatedImage
        ? baseURL + item?.video?.animatedImage
        : defaultWorkspaceWebp
    );
  };

  const mouseOut = () => {
    setDefaultWorkspaceImg(
      item?.video?.thumbnail
        ? baseURL +
            item?.video?.thumbnailDestination +
            "/" +
            item?.video?.thumbnail
        : defaultWorkspaceImage
    );
  };

  const ClapprComponent = ({ id, source, height }) => {
    let playerr = useRef();

    useEffect(() => {
      playerr.current = new Clappr.Player({
        source: "https://www.w3schools.com/tags/movie.ogg",
        // poster: "http://clappr.io/poster.png",
        parentId: "#image_player",
        height,
        width: "100%",
        // autoPlay: true,
        loop: true,

        // playback: {
        //   controls: false,
        // },
      });

      //   player.current.on(window.Clappr.Events.PLAYER_PLAY, function () {
      //     player.current.core.mediaControl.disable();
      //   });

      // hide play button
      playerr.current.getPlugin("poster").$playWrapper.hide();

      let imgPlayIcon = document.querySelector(".img_play_buttonn");
      imgPlayIcon.addEventListener("click", function (event) {
        if (document.getElementById(id).classList.contains("hidden")) {
          document.getElementById(id).classList.remove("hidden");
          document.getElementById(id).classList.add("block");

          document.querySelector(".poster_img").classList.remove("block");
          document.querySelector(".poster_img").classList.add("hidden");

          playerr.current.play();
        }
      });

      let workspaceWraper = document.querySelector(".workspace_wraper");

      workspaceWraper.addEventListener("mouseleave", function (event) {
        // console.log("start");

        if (document.getElementById(id).classList.contains("block")) {
          //   console.log("end");
          playerr.current.pause();
          document.getElementById(id).classList.remove("block");
          document.getElementById(id).classList.add("hidden");

          if (
            document.querySelector(".poster_img").classList.contains("hidden")
          ) {
            document.querySelector(".poster_img").classList.remove("hidden");
            document.querySelector(".poster_img").classList.add("block");
          }
        }
      });
    }, []);

    return (
      <>
        <div ref={playerr} id={id} className="w-full hidden"></div>
      </>
    );
  };

  return (
    <>
      <div
        className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl"
        key={index}
      >
        <div
          className="flex flex-col workspace_wraper"
          onMouseOver={mouseOver}
          //   onMouseOut={mouseOut}
          onMouseLeave={mouseOut}
        >
          <div className="flex p-4 relative">
            <img
              src={defaultWorkspaceImg}
              alt={item?.name}
              className="h-[340px] w-full object-cover block poster_img"
            />

            <ClapprComponent
              id="image_player"
              source="https://www.w3schools.com/tags/movie.ogg"
              height={340}
            />

            <img
              src={playVideoIcon}
              className="absolute left-0 right-0 top-0 bottom-0 m-auto cursor-pointer img_play_buttonn"
            />
          </div>

          <div className="inline-block w-full p-4 bg-white rounded-xl mt-2">
            <div className="flex justify-between items-baseline mb-5">
              <div className="flex flex-col">
                <h4 className=" text-primary-normal text-lg font-bold">
                  {item?.name}
                </h4>

                <p className="text-primary-normal text-sm line-clamp-4 min-h-[89px]">
                  {item?.description}
                </p>
              </div>

              <div className="flex">
                <div className="dropdown dropdown-bottom dropdown-end">
                  <label tabIndex={index} className="cursor-pointer">
                    <ThreeDotSvg />
                  </label>

                  <ul
                    tabIndex={index}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Edit</a>
                    </li>
                    <li>
                      <a>Duplicate</a>
                    </li>
                    <li>
                      <a>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex mb-5">
              <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                <GroupSvg />
              </div>

              <div className="flex flex-col">
                <p className="text-primary-normal text-sm">Total Views</p>
                <h4 className="text-primary-main text-base font-bold">
                  {item?.totalViews}
                </h4>
              </div>
            </div>

            <div className="flex mb-5">
              <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                <ClockSvg />
              </div>

              <div className="flex flex-col">
                <p className="text-primary-normal text-sm">
                  Total Minutes Watchtime
                </p>
                <h4 className="text-primary-main text-base font-bold">
                  {item?.totalWatchedTime}
                </h4>
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                <MouseSvg />
              </div>

              <div className="flex flex-col">
                <p className="text-primary-normal text-sm">Total Clicked CTA</p>
                <h4 className="text-primary-main text-base font-bold">
                  {item?.totalCtaCounter}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspacePost;
