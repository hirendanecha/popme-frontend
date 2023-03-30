import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useSelector, useDispatch } from "react-redux";
import { setImageCrop } from "../../workspaces/reducer/workspaceSlice";
import * as te from "tw-elements";
// import defaultWorkspaceImage from "../../../assets/images/defaultWorkspaceImage.png";

const baseURL = import.meta.env.VITE_BASE_URL;

const BasicSetup = ({ register, valueChangeHandler }) => {
  const dispatch = useDispatch();
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  // console.log("activeWorkspaceData", activeWorkspaceData);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  // console.log("croppedArea", croppedArea);
  // dispatch(crop);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, "croppedArea");
    // console.log("croppedAreaPixels", croppedAreaPixels);

    const scale = 100 / croppedArea.width;

    dispatch(
      setImageCrop({
        x: `${-croppedArea.x * scale}%`,
        y: `${-croppedArea.y * scale}%`,
        scale,
      })
    );
  }, []);

  return (
    <>
      <div className="flex flex-col w-full p-0 border border-neutral-200 bg-white">
        {/* <div className="flex flex-col w-full p-0 border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800"> */}

        <h2 className="w-full" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-xl text-gray-600 font-semibold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
            // className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white py-4 px-5 text-left text-xl text-gray-600 font-semibold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"

            type="button"
            data-te-collapse-init
            data-te-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Basic Setup
            <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
              {/* <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"> */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="!visible w-full"
          data-te-collapse-item
          data-te-collapse-show
          aria-labelledby="headingOne"
          data-te-parent="#accordionExample"
        >
          <div className="w-full inline-block">
            <div className="flex flex-col">
              <h5 className="text-primary-main text-base font-semibold pb-4 px-4 text-left">
                Video Position
              </h5>

              <div className="grid grid-cols-2 gap-2 px-4 pb-4">
                {masterWorkspaceOptions !== null &&
                  masterWorkspaceOptions?.data?.videoPosition?.map(
                    (item, index) => {
                      return (
                        <div className="form-control" key={index}>
                          <input
                            type="radio"
                            id={item?._id}
                            name="basicSetUp.videoPosition"
                            {...register("basicSetUp.videoPosition", {
                              onChange: () => {
                                valueChangeHandler();
                              },
                            })}
                            value={item?.value}
                            className="hidden peer"
                          ></input>

                          <label
                            htmlFor={item?._id}
                            className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                          >
                            {item?.label}
                          </label>
                        </div>
                      );
                    }
                  )}
              </div>

              <h5 className="text-primary-main text-base font-semibold py-4 px-4 text-left">
                Preview Style
              </h5>

              <div className="grid grid-cols-2 gap-2 px-4 pb-6">
                {masterWorkspaceOptions !== null &&
                  masterWorkspaceOptions?.data?.previewStyle?.map(
                    (item, index) => {
                      return (
                        <div className="form-control" key={index}>
                          <input
                            type="radio"
                            id={item?._id}
                            name="basicSetUp.previewStyle"
                            {...register("basicSetUp.previewStyle", {
                              onChange: () => {
                                valueChangeHandler();
                              },
                            })}
                            value={item?.value}
                            className="hidden peer"
                          ></input>

                          <label
                            htmlFor={item?._id}
                            className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                          >
                            {item?.label}
                          </label>
                        </div>
                      );
                    }
                  )}
              </div>

              {activeWorkspaceData !== null &&
                activeWorkspaceData?.basicSetUp?.previewStyle ===
                  "circular" && (
                  <div className="inline-block w-full relative h-[300px]">
                    <Cropper
                      image={
                        baseURL +
                        "/" +
                        activeWorkspaceData?.video?.thumbnailDestination +
                        "/" +
                        activeWorkspaceData?.video?.thumbnail
                      }
                      crop={crop}
                      zoom={zoom}
                      cropShape="round"
                      showGrid={false}
                      aspect={1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      onCropAreaChange={(croppedArea) => {
                        setCroppedArea(croppedArea);
                      }}
                    />
                  </div>
                )}
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicSetup;
