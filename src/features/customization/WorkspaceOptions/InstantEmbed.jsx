import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ClipBoardSvg from "../../../assets/svgs/ClipBoardSvg";
import Button from "../../../components/Button/Button";
import ModalButton from "../../../components/Button/ModalButton";
import SelectBox from "../../../components/Input/SelectBox";
import { openNewModal } from "../../../redux/slices/newModalSlice";
import ConnectWebsiteModal from "../ConnectWebsiteModal";

const InstantEmbed = ({ register }) => {
  const dispatch = useDispatch();
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
  };

  return (
    <>
      <div className="flex flex-col w-full p-0 border border-t-0 border-neutral-200 bg-white">
        <h2 className="w-full" id="headingNine">
          <button
            className="group relative flex w-full items-center border-0 bg-white py-4 px-5 text-left text-xl text-gray-700 font-bold [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseNine"
            aria-expanded="false"
            aria-controls="collapseNine"
          >
            Instant Embed
            <span className="ml-auto -mr-1 h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none">
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
          id="collapseNine"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingNine"
          data-te-parent="#accordionExample"
        >
          <div className="">
            <div className="px-4">
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

                <p className="text-sm text-left text-secondary-main font-bold ml-3">
                  Connect your website with Answerly and embed any widget with
                  one click.
                </p>
              </div>
            </div>

            <div className="px-4">
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
                  The process takes one minute by putting a code on your
                  website.
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

              {activeWorkspaceData !== null &&
                activeWorkspaceData?.website
                  ?.filter((web) => web?.isVerfied === true)
                  ?.map((item, index) => (
                    <div
                      tabIndex={item?._id}
                      className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3"
                      key={index}
                    >
                      <input type="checkbox" />

                      <div className="collapse-title text-xl font-bold text-primary-main bg-[#E5E7EB]">
                        {`${item?.url}`}
                      </div>
                      <div className="collapse-content">
                        <label className="label mt-2">
                          <span
                            className={`label-text text-primary-main text-base font-semibold`}
                          >
                            In this website
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 text-primary-main"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </label>

                        <div className="inline-block w-full">
                          <SelectBox
                            // labelTitle="In this website"
                            labelStyle="text-primary-main text-base font-semibold"
                            options={[
                              {
                                name: "Show in some pages",
                                value: "some pages",
                              },
                              { name: "Option 2", value: "option2" },
                            ]}
                            containerStyle="mb-3 w-full"
                            selectStyle="text-primary-main"
                            name="instantEmbed.inThisWebsite"
                            // register={register}
                          />
                        </div>

                        <div className="flex mb-3">
                          <ClipBoardSvg width="60" />
                          <p className="text-base text-[#202223] ml-3">
                            This widget will show only in the pages/URLs
                            selected below.
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
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstantEmbed;
