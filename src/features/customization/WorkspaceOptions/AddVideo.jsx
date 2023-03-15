import React from "react";
import NewInputText from "../../../components/Input/NewInputText";
import NewTextArea from "../../../components/Input/NewTextArea";
import UploadFile from "../../../components/Input/UploadFile";

const AddVideo = ({ register, errors, watch, valueChangeHandler }) => {
  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={1}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Add Video
          </div>
          <div className="collapse-content">
            <div className="flex flex-col">
              <div className="flex">
                <UploadFile
                  name="video"
                  register={register}
                  errorMessage={
                    errors?.video?.message && errors?.video?.message
                  }
                  watch={watch}
                  valueChangeHandler={valueChangeHandler}
                  // handleFile={handleFile}
                  // removeImage={removeImage}
                  // files={files}
                />
              </div>

              <div className="flex">
                <NewInputText
                  type="text"
                  labelTitle="Video Title"
                  labelStyle="text-primary-main text-base font-semibold"
                  inputStyle="mb-3 !bg-transparent"
                  name="title"
                  register={register}
                  valueChangeHandler={valueChangeHandler}
                />
              </div>

              <div className="flex">
                <NewTextArea
                  labelTitle="Video Description"
                  labelStyle="text-primary-main !text-base font-semibold"
                  inputStyle="!bg-transparent"
                  name="description"
                  register={register}
                  valueChangeHandler={valueChangeHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVideo;
