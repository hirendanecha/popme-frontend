import React, { useState } from "react";
import UploadImgSvg from "../../assets/svgs/UploadImgSvg";

const UploadFile = ({
  name,
  register,
  // handleFile,
  // removeImage,
  // files,
  inputStyle,
  errorMessage,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    let file = e.target.files;

    setFileName(file[0]?.name);
    // console.log("file", file);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="h-36 w-full overflow-hidden relative shadow-md items-center rounded-md cursor-pointer border-3 border-dashed border-borderColor-main">
        <input
          type="file"
          accept="video/*"
          className="h-full w-full opacity-0 z-10 absolute p-3"
          {...register(name, {
            required: false,
            onChange: (e) => handleFile(e),
            // validate: {
            //   lessThan10MB: (files) =>
            //     files[0]?.size < 104857600 || "Max 100mb",
            //   acceptedFormats: (files) =>
            //     [
            //       "video/mp4",
            //       "video/x-m4v",
            //       "video/x-msvideo",
            //       "video/quicktime",
            //       "video/vnd.mpegurl",
            //       "video/webm",
            //       "video/x-matroska",
            //     ].includes(files[0]?.type) || "Unsupported video format",
            // },
          })}
          // accept="video/mp4,video/x-m4v,video/*"
        />

        <div className="h-full w-full bg-transparent absolute z-1 flex justify-center items-center top-0">
          <div className="flex flex-col">
            <div className="flex justify-center mb-3">
              <UploadImgSvg />
            </div>
            <h6 className="text-base text-primary-normal font-semibold text-center mb-1">
              <span className="text-secondary-main">Upload a file</span> or drag
              and drop
            </h6>
            <p className="text-primary-light text-sm text-center">
              MP4, AVI, MOV, MKV, M4V, WEBM up to 80MB
            </p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <p className="mt-3 text-sm text-[#991B1B]">{errorMessage}</p>
      )}

      {fileName && (
        <p className="mt-3 text-sm text-primary-normal">{fileName}</p>
      )}

      {/* {console.log("files", files)} */}

      {/* <div className="flex flex-wrap gap-2 mt-2">
        {files &&
          files.map((file, key) => {
            return (
              <div
                key={key}
                className="w-full h-16 flex items-center justify-between rounded p-3"
              >
                <div className="flex flex-row items-center gap-2">
                  <span className="truncate w-44">{file.name}</span>
                </div>

                <div
                  className="flex"
                  onClick={() => {
                    removeImage(file.name);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
      </div> */}
    </div>
  );
};

export default UploadFile;
