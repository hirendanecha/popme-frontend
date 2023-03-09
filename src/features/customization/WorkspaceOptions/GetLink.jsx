import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import InputWithIcon from "../../../components/Input/InputWithIcon";

const GetLink = ({ register }) => {
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  console.log("activeWorkspaceData", activeWorkspaceData);

  const [customLink, setCustomLink] = useState("");

  useEffect(() => {
    if (activeWorkspaceData !== null) {
      setCustomLink(`http://localhost:5173/share/${activeWorkspaceData?._id}`);
    }
  }, [activeWorkspaceData]);

  // console.log("customLink", customLink);

  const updateValue = (data) => {
    // console.log("updateValue", data);
    setCustomLink(data?.value);
  };

  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={6}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Get Link
          </div>
          <div className="collapse-content">
            <div className="flex flex-col">
              <h4 className="text-xl font-bold text-primary-normal py-4">
                Share Link
              </h4>

              <div className="flex">
                <ClipBoardSvg width="60" />

                <p className="text-base text-[#202223] ml-3">
                  You can share your facepop widget through a direct link
                  without embedding it on your website.
                </p>
              </div>

              <InputWithIcon
                type="text"
                labelTitle="PopMe Custom Link"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="!bg-transparent"
                name="getLink"
                updateFormValue={updateValue}
                defaultValue={customLink}
                // register={register}
                rightIcon={<ShareSvg />}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLink;
