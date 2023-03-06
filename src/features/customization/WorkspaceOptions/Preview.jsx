import React from "react";
import MouseSvg from "../../../assets/svgs/MouseSvg";
import ShareSvg from "../../../assets/svgs/ShareSvg";
import Button from "../../../components/Button/Button";
import NewInputText from "../../../components/Input/NewInputText";
import { OpenEye } from "../SvgComp";

const Preview = ({ register }) => {
  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={11}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Preview
          </div>

          <div className="collapse-content">
            <div className="flex flex-col">
              <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
                <OpenEye />

                <p className="text-sm text-secondary-main font-bold ml-3">
                  Preview how this PopMe widget will look on your website
                  without embedding it.
                </p>
              </div>

              <div className="flex p-3 bg-[#F2F6F0]">
                <MouseSvg width="60" height="30" stroke="#4A8A37" />

                <p className="text-sm text-[#4A8A37] font-bold ml-3">
                  Preview how this PopMe widget will look on your website
                  without embedding it.
                </p>
              </div>

              <NewInputText
                type="text"
                labelTitle="Your website"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="Preview.yourWebsite"
                placeholder="example.com"
                register={register}
              />

              <div className="flex items-center mb-6">
                <ShareSvg height="16" width="16" stroke="#3A6FFA" />
                <p className="text-base text-secondary-main font-bold ml-2">
                  popme.io/preview?example.com
                </p>
              </div>

              <div className="flex flex-col">
                <h5 className="text-primary-main text-base font-semibold py-2 mb-1">
                  Preview via custom domain
                </h5>

                <Button
                  text="Add custom domain"
                  buttonClass="w-full text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
