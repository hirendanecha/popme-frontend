import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useSelector, useDispatch } from "react-redux";
import { setImageCrop } from "../../workspaces/reducer/workspaceSlice";
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
      {/* <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]"> */}
      {/* <div
          tabIndex={0}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        > */}
      {/* <input type="checkbox" /> */}

      {/* <div className="collapse-title text-xl font-bold text-primary-normal">
            Basic Setup
          </div> */}

      {/* <div className="collapse-content"> */}

      <div className="flex flex-col w-full p-0 active:bg-transparent hover:bg-transparent">
        <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
          <div className="flex items-center justify-between h-16 px-3 font-semibold">
            <span className="truncate text-xl text-gray-600">Basic Setup</span>
            <svg
              className="mx-2"
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 1L8 8L1 1"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-screen focus-within:max-h-screen">
            {/* <div className="flex flex-col"> */}
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

            <div className="flex flex-col">
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
        </button>
      </div>

      {/* <div className="flex flex-col">
              <h5 className="text-primary-main text-base font-semibold py-2">
                Video Position
              </h5>

              <div className="grid grid-cols-2 gap-2 mb-3">
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

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Preview Style
                </h5>

                <div className="grid grid-cols-2 gap-2">
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
              </div>
            </div> */}

      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default BasicSetup;
