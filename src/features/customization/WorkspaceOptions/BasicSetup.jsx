import React from "react";
import { useSelector } from "react-redux";

const BasicSetup = ({ register }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

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
                              name="basicSetup.previewStyle"
                              {...register("basicSetup.previewStyle")}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicSetup;
