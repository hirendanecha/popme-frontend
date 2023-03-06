import React from "react";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import InputWithIcon from "../../../components/Input/InputWithIcon";

const GetLink = ({ register }) => {
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
                name="getLink.popMeCustomLink"
                register={register}
                rightIcon={<ShareSvg />}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetLink;
