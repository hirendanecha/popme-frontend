import React from "react";
import { useDispatch } from "react-redux";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import Button from "../../../components/Button/Button";
import ModalButton from "../../../components/Button/ModalButton";
import SelectBox from "../../../components/Input/SelectBox";
import { openNewModal } from "../../../redux/slices/newModalSlice";
import ConnectWebsiteModal from "../ConnectWebsiteModal";

const InstantEmbed = ({ register }) => {
  const dispatch = useDispatch();

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
  };

  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={7}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Instant Embed
          </div>

          <div className="collapse-content">
            <div className="flex p-3 mb-4 bg-secondary-light/30 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-14 h-7 text-secondary-main"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>

              <p className="text-sm text-secondary-main font-bold ml-3">
                Connect your website with Answerly and embed any widget with one
                click.
              </p>
            </div>

            <div className="flex p-3 bg-[#F2F6F0] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-7 text-[#4A8A37]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <p className="text-sm text-[#4A8A37] font-bold ml-3">
                The process takes one minute by putting a code on your website.
              </p>
            </div>

            <ModalButton
              text="Connect a Website"
              id="connect-website"
              buttonClass="mb-4"
              clickHandler={() =>
                modalClickHandler({
                  id: "connect-website",
                  children: <ConnectWebsiteModal />,
                })
              }
            />

            <div
              tabIndex={8}
              className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3"
            >
              <input type="checkbox" />

              <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                www.mywebsite.com
              </div>
              <div className="collapse-content">
                <div className="inline-block w-full">
                  <SelectBox
                    labelTitle="In this website"
                    labelStyle="text-primary-main text-base font-semibold"
                    options={[
                      {
                        name: "Show in some pages",
                        value: "some pages",
                      },
                      { name: "Option 2", value: "option2" },
                    ]}
                    containerStyle="mt-2 mb-3 w-full"
                    selectStyle="text-primary-main"
                    name="instantEmbed.inThisWebsite"
                    register={register}
                  />
                </div>

                <div className="flex mb-3">
                  <ClipBoardSvg width="60" />
                  <p className="text-base text-[#202223] ml-3">
                    This widget will show only in the pages/URLs selected below.
                  </p>
                </div>

                <div className="inline-block w-full mb-3">
                  <Button
                    text="Select pages"
                    buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                  />
                </div>

                <div className="inline-block w-full mb-3">
                  <Button
                    text="Add conditions"
                    buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                  />
                </div>
              </div>
            </div>

            <div
              tabIndex={9}
              className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3"
            >
              <input type="checkbox" />

              <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                www.mywebsite#2.com
              </div>
              <div className="collapse-content">
                <p>Lorem Ipsum is simply dummy text of the printing.</p>
              </div>
            </div>

            <div
              tabIndex={10}
              className="collapse collapse-arrow border border-borderColor-main rounded-lg"
            >
              <input type="checkbox" />

              <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                www.mywebsite#3.com
              </div>
              <div className="collapse-content">
                <p>Lorem Ipsum is simply dummy text of the printing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstantEmbed;
