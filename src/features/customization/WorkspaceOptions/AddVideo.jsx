import React from "react";
import NewInputText from "../../../components/Input/NewInputText";
import NewTextArea from "../../../components/Input/NewTextArea";
import UploadFile from "../../../components/Input/UploadFile";

const AddVideo = ({ register, errors, watch, valueChangeHandler }) => {
  return (
    <>
      {/* <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={1}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Add Video
          </div>
          <div className="collapse-content"> */}
      <div className="flex flex-col w-full p-0 active:bg-transparent hover:bg-transparent">
        <button className="group border-t border-r border-l border-transparant focus:outline-none w-full">
          <div className="flex items-center justify-between h-16 px-3 font-semibold">
            <span className="truncate text-xl text-gray-600">Add Video</span>
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
            <div className="flex px-4">
              <UploadFile
                name="video"
                register={register}
                errorMessage={errors?.video?.message && errors?.video?.message}
                watch={watch}
                valueChangeHandler={valueChangeHandler}
                // handleFile={handleFile}
                // removeImage={removeImage}
                // files={files}
              />
            </div>

            <div className="flex px-4">
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

            <div className="flex pb-6 px-4">
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
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </button>
      </div>
    </>
  );
};

export default AddVideo;
