import React from "react";
import NewInputText from "../../../components/Input/NewInputText";
import NewTextArea from "../../../components/Input/NewTextArea";
import UploadFile from "../../../components/Input/UploadFile";

const AddVideo = ({ register, errors, watch, valueChangeHandler }) => {
  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        {/* <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800"> */}

        <h2 className="w-full" id="headingTwo">
          <button
            className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-xl text-gray-600 font-semibold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)]"
            // className="group relative flex w-full items-center rounded-none border-0 bg-white py-4 px-5 text-left text-xl text-gray-600 font-semibold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"

            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Add Video
            <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
              {/* <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white"> */}

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
          id="collapseTwo"
          className="!visible hidden w-full"
          data-te-collapse-item
          aria-labelledby="headingTwo"
          data-te-parent="#accordionExample"
        >
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
      </div>
    </>
  );
};

export default AddVideo;
