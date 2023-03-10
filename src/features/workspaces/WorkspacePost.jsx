import React, { useState } from "react";
import defaultWorkspaceImage from "../../assets/images/defaultWorkspaceImage.png";
import defaultWorkspaceWebp from "../../assets/images/defaultWorkspaceWebp.webp";
import ClockSvg from "../../assets/svgs/ClockSvg";
import GroupSvg from "../../assets/svgs/GroupSvg";
import MouseSvg from "../../assets/svgs/MouseSvg";
import ThreeDotSvg from "../../assets/svgs/ThreeDotSvg";

const WorkspacePost = ({ item, index }) => {
  const [defaultWorkspaceImg, setDefaultWorkspaceImg] = useState(
    defaultWorkspaceImage
  );

  const mouseOver = () => {
    setDefaultWorkspaceImg(defaultWorkspaceWebp);
  };

  const mouseOut = () => {
    setDefaultWorkspaceImg(defaultWorkspaceImage);
  };

  return (
    <>
      <div
        className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl"
        key={index}
      >
        <div
          className="flex flex-col"
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
        >
          <div className="flex p-4">
            <img
              src={defaultWorkspaceImg}
              alt={item?.name}
              className="h-[340px] w-full object-cover"
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
