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

  const [playIcon, setPlayIcon] = useState(false);

  const mouseOver = () => {
    setDefaultWorkspaceImg(
      item?.video?.animatedImage
        ? baseURL + item?.video?.animatedImage
        : defaultWorkspaceWebp
    );

    setPlayIcon(true);
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

    setPlayIcon(false);
  };

  return (
    <>
      <div
        className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-2xl"
        key={index}
      >
        <div className="flex flex-col workspace_wraper">
          <div
            className="flex relative"
            onMouseOver={mouseOver}
            onMouseLeave={mouseOut}
          >
            <img
              src={defaultWorkspaceImg}
              alt={item?.name}
              className="h-[340px] w-full object-cover rounded-t-2xl block poster_img"
            />

            {!playIcon && (
              <img
                src={playVideoIcon}
                className="absolute left-0 right-0 top-0 bottom-0 m-auto cursor-pointer"
              />
            )}
          </div>

          <div className="inline-block w-full p-4 bg-white rounded-b-2xl">
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
