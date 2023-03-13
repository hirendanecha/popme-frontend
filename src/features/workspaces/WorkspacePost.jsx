import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import defaultWorkspaceImage from "../../assets/images/defaultWorkspaceImage.png";
import defaultWorkspaceWebp from "../../assets/images/defaultWorkspaceWebp.webp";
import ClockSvg from "../../assets/svgs/ClockSvg";
import GroupSvg from "../../assets/svgs/GroupSvg";
import MouseSvg from "../../assets/svgs/MouseSvg";
import ThreeDotSvg from "../../assets/svgs/ThreeDotSvg";
import { deleteWorkspaceById, getWorkspaceById, worksapceList } from "./action";
import { setActiveWorkspaceData } from "./reducer/workspaceSlice";

const WorkspacePost = ({ item, index, onDeleteHandler, onEditHandler, onDuplicateHandler }) => {
  const dispatch = useDispatch();
  const [defaultWorkspaceImg, setDefaultWorkspaceImg] = useState(
    defaultWorkspaceImage
  );

  const mouseOver = () => {
    setDefaultWorkspaceImg(defaultWorkspaceWebp);
  };

  const mouseOut = () => {
    setDefaultWorkspaceImg(defaultWorkspaceImage);
  };

  const editWorkspaceHandler = () => {
    // console.log(item._id, "item");
    onEditHandler(item._id);
  };
  
  const deleteWorkspaceHandler = () => {
    // console.log(item._id, "item");
    onDeleteHandler(item._id);
  };

  const duplicateWorkspaceHandler = ()=>{
    console.log(item._id,"duplicate item id")
    onDuplicateHandler(item._id)
  }

  
  
  return (
    <>
      <div
        className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl"
        key={item._id}
      >
        <div className="flex flex-col">
          <div
            onMouseOver={mouseOver}
            onMouseOut={mouseOut}
            className="flex p-4"
          >
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
                  <label tabIndex={item._id} className="cursor-pointer">
                    <ThreeDotSvg />
                  </label>

                  <ul
                    tabIndex={item._id}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a onClick={editWorkspaceHandler}>Edit</a>
                    </li>
                    <li>
                      <a onClick={duplicateWorkspaceHandler}>Duplicate</a>
                    </li>
                    <li>
                      <a onClick={deleteWorkspaceHandler}>Delete</a>
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
