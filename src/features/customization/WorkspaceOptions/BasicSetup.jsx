import React, { useState, useCallback, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCropSizee,
  setImageCrop,
} from "../../workspaces/reducer/workspaceSlice";
import * as te from "tw-elements";
// import defaultWorkspaceImage from "../../../assets/images/defaultWorkspaceImage.png";
// import Cropper from "react-easy-crop";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const baseURL = import.meta.env.VITE_BASE_URL;

const BasicSetupTest = ({ register, valueChangeHandler }) => {
  const dispatch = useDispatch();
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  // console.log("activeWorkspaceData", activeWorkspaceData);

  const [crop, setCrop] = useState({
    x: 0,
    y: 65.625,
  });

  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, "croppedArea");
    // console.log("croppedAreaPixels", croppedAreaPixels);
    const scale = 100 / croppedArea.width;

    if (!Number.isNaN(scale)) {
      dispatch(
        setImageCrop({
          x: croppedArea.x * scale,
          y: croppedArea.y * scale,
          scale,
        })
      );
    }
  }, []);

  const cropperRef = createRef();

  const hh = (data) => {
    // console.log("data", data);

    // var styles = getComputedStyle(
    //   document.getElementsByClassName("cropper-crop-box")
    // );
    // var display = styles.getPropertyValue("transform");
    // var x = window
    //   .getComputedStyle(document.getElementsByClassName("cropper-crop-box"))
    //   .getPropertyValue("width");

    const para = document.querySelector(".hhhhh img");
    const compStyles = window.getComputedStyle(para);

    console.log(
      compStyles.getPropertyValue("transform").split(","),
      "transform"
    );

    console.log(
      compStyles.getPropertyValue("transform").split(",")[5].replace(")", ""),
      "transform"
    );
    // console.log(compStyles.getPropertyValue("width"), "width");
    // console.log(compStyles.getPropertyValue("height"), "height");

    dispatch(
      setCropSizee({
        width: compStyles.getPropertyValue("width"),
        height: compStyles.getPropertyValue("height"),
        transform: compStyles.getPropertyValue("transform"),
      })
    );
  };

  return (
    <>
      <div className="flex flex-col w-full p-0 border border-neutral-200 bg-white">
        <h2 className="w-full" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Basic Setup
            <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
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
          className="!visible hidden"
          data-te-collapse-item
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
                    <div className="absolute top-0 bottom-0 left-0 right-0">
                      {/* <Cropper
                        image={
                          baseURL +
                          "/" +
                          activeWorkspaceData?.video?.thumbnailDestination +
                          "/" +
                          activeWorkspaceData?.video?.thumbnail
                        }
                        aspect={1}
                        crop={crop}
                        zoom={zoom}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropAreaChange={(croppedArea) => {
                          setCroppedArea(croppedArea);
                        }}
                        onCropComplete={onCropComplete}
                        disableAutomaticStylesInjection={true}
                        onMediaLoaded={() =>
                          setCrop({
                            x: 0,
                            y: 65.625,
                          })
                        }
                        style={{
                          cropAreaStyle: {
                            minWidth: "168.75px",
                            minHeight: "168.75px",
                          },
                        }}
                      /> */}

                      <div style={{ width: "100%" }}>
                        <Cropper
                          ref={cropperRef}
                          style={{ height: 260, width: "100%" }}
                          zoomTo={0}
                          initialAspectRatio={1}
                          aspectRatio={1}
                          preview=".img-preview"
                          src={
                            baseURL +
                            "/" +
                            activeWorkspaceData?.video?.animatedImage
                          }
                          viewMode={1}
                          minCropBoxHeight={100}
                          minCropBoxWidth={100}
                          minContainerWidth={260}
                          minContainerHeight={307}
                          background={false}
                          responsive={true}
                          autoCropArea={1}
                          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                          guides={false}
                          cropBoxResizable={false}
                          className="croper_wrapperr"
                          crop={(event) => {
                            console.log("===========================");
                            // console.log(event.detail.x);
                            // console.log(event.detail.y);
                            // console.log(event.detail.width);
                            // console.log(event.detail.height);
                            // console.log(event.detail.rotate);
                            // console.log(event.detail.scaleX);
                            // console.log(event.detail.scaleY);
                            // console.log(event.detail);
                          }}
                          cropend={(e) => {
                            // console.log("e", e);
                            hh(e);
                          }}
                          zoom={(e) => {
                            hh(e);
                          }}
                        />
                      </div>
                    </div>

                    {/* <div
                      className="img-preview mt-10 overflow-hidden"
                      style={{ width: "100%", float: "left", height: "50px" }}
                    /> */}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicSetupTest;
