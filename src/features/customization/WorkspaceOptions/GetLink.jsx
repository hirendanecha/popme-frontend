import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import InputWithIcon from "../../../components/Input/InputWithIcon";

const GetLink = ({ register }) => {
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  // console.log("activeWorkspaceData", activeWorkspaceData);

  const [customLink, setCustomLink] = useState("");

  useEffect(() => {
    if (activeWorkspaceData !== null) {
      setCustomLink(`http://localhost:5173/share/${activeWorkspaceData?._id}`);
    }
  }, [activeWorkspaceData]);

  // console.log("customLink", customLink);

  // const updateValue = (data) => {
  //   setCustomLink(data?.value);
  // };

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
              <div className="flex mb-6">
                <ClipBoardSvg width="60" />

                <p className="text-base text-[#202223] ml-3">
                  You can share your facepop widget through a direct link
                  without embedding it on your website.
                </p>
              </div>
              <span className={`text-lg text-primary-normal font-bold mb-2`}>
                PopMe Custom Link
              </span>

              <div className="flex w-full justify-between p-3 rounded-lg border border-borderColor-main text-primary-main">
                <p
                  id="a"
                  onClick={() => navigator.clipboard.writeText(customLink)}
                  className="w-[calc(100%-80px)] inline-block whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {customLink}
                </p>

                <div className="flex justify-end">
                  <Link to={customLink} target="_blank">
                    <ShareSvg />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLink;
