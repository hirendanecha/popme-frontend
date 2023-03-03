import React from "react";
import { useSelector } from "react-redux";

const BasicSetup = ({ register }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  console.log("masterWorkspaceOptions", masterWorkspaceOptions);

  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={0}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Basic Setup
          </div>

          <div className="collapse-content">
            <div className="flex flex-col">
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
                            name="basicSetup.videoPosition"
                            {...register("basicSetup.videoPosition")}
                            value={item?.value}
                            className="hidden peer"
                          ></input>

                          <label
                            htmlFor={item?._id}
                            className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                          >
                            {item?.value}
                          </label>
                        </div>
                      );
                    }
                  )}

                {/* <div className="form-control">
                  <input
                    type="radio"
                    id="top-left"
                    name="basicSetup.videoPosition"
                    {...register("basicSetup.videoPosition")}
                    value="Top Left"
                    className="hidden peer"
                  ></input>

                  <label
                    htmlFor="top-left"
                    className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                  >
                    Top Left
                  </label>
                </div> */}

                {/* <div className="form-control">
                  <input
                    type="radio"
                    id="top-right"
                    name="basicSetup.videoPosition"
                    {...register("basicSetup.videoPosition")}
                    value="top-right"
                    className="hidden peer"
                  ></input>

                  <label
                    htmlFor="top-right"
                    className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                  >
                    Top Right
                  </label>
                </div> */}

                {/* <div className="form-control">
                  <input
                    type="radio"
                    id="bottom-left"
                    name="basicSetup.videoPosition"
                    {...register("basicSetup.videoPosition")}
                    value="bottom-left"
                    className="hidden peer"
                  ></input>

                  <label
                    htmlFor="bottom-left"
                    className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                  >
                    Bottom Left
                  </label>
                </div> */}

                {/* <div className="form-control">
                  <input
                    type="radio"
                    id="bottom-right"
                    name="basicSetup.videoPosition"
                    {...register("basicSetup.videoPosition")}
                    value="bottom-right"
                    className="hidden peer"
                  ></input>

                  <label
                    htmlFor="bottom-right"
                    className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                  >
                    Bottom Right
                  </label>
                </div> */}
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Preview Style
                </h5>

                <div className="grid grid-cols-2 gap-2">
                  <div className="form-control">
                    <input
                      type="radio"
                      id="rectangle"
                      name="basicSetup.previewStyle"
                      {...register("basicSetup.previewStyle")}
                      value="rectangle"
                      className="hidden peer"
                    ></input>

                    <label
                      htmlFor="rectangle"
                      className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                    >
                      Rectangle
                    </label>
                  </div>

                  <div className="form-control">
                    <input
                      type="radio"
                      id="circularBubble"
                      name="basicSetup.previewStyle"
                      {...register("basicSetup.previewStyle")}
                      value="circularBubble"
                      className="hidden peer"
                    ></input>

                    <label
                      htmlFor="circularBubble"
                      className="peer-checked:text-secondary-main peer-checked:border-secondary-main w-full py-[11px] px-2 bg-[#F3F3F4] text-center text-black border border-transparent rounded-lg cursor-pointer"
                    >
                      Circular Bubble (Loom)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicSetup;
