import React from "react";
import { useSelector } from "react-redux";
import CalendarSvg from "../../../assets/svgs/CalendarSvg";
import NewInputText from "../../../components/Input/NewInputText";
import SelectBox from "../../../components/Input/SelectBox";
import { CloseSvg, PhoneSvg, RightArrowSvg, RightExitSvg } from "../SvgComp";

const CallToActionModal = ({ register }) => {
  const { masterWorkspaceOptions } = useSelector((state) => state.workspace);

  const IconList = [
    {
      icon: <CloseSvg />,
      name: "closeSvg",
    },
    {
      icon: <RightArrowSvg />,
      name: "rightArrowSvg",
    },
    {
      icon: <RightExitSvg />,
      name: "rightExitSvg",
    },
    {
      icon: <CalendarSvg />,
      name: "calendarSvg",
    },
    {
      icon: <PhoneSvg />,
      name: "phoneSvg",
    },
  ];

  // function decodeHTMLEntities(text) {
  //   let textArea = document.createElement("textarea");
  //   textArea.innerHTML = text;
  //   return textArea.value;
  // }

  // const appendSVG = (id, xml_string) => {
  //   let el = React.createElement("div");
  //   el.key = id;
  //   el.innerHTML = xml_string;
  //   return el;
  // };

  // appendSVG("id", dec);

  return (
    <>
      <div className="flex flex-col p-0 focus:bg-[#f9fafb] active:bg-[#f9fafb] hover:bg-[#f9fafb]">
        <div
          tabIndex={2}
          className="collapse collapse-arrow border-t border-borderColor-main bg-transparent w-full"
        >
          <input type="checkbox" />

          <div className="collapse-title text-xl font-bold text-primary-normal">
            Call To Action
          </div>
          <div className="collapse-content">
            <div className="flex flex-col">
              <NewInputText
                type="text"
                labelTitle="Button Text"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="callToAction.buttonText"
                register={register}
              />

              <NewInputText
                type="url"
                labelTitle="Destination URL"
                labelStyle="text-primary-main text-base font-semibold"
                inputStyle="mb-3 !bg-transparent"
                name="callToAction.destinationUrl"
                register={register}
              />

              <div className="flex flex-col mb-3">
                <h5 className="text-primary-main text-base font-semibold py-2">
                  Button Icon
                </h5>

                <div className="flex flex-wrap gap-3">
                  {/* {masterWorkspaceOptions !== null &&
                    masterWorkspaceOptions?.data?.buttonIcons?.map(
                      (item, index) => (
                        <div className="inline-block" key={index}>
                          <input
                            type="radio"
                            id={item?._id}
                            name="callToAction.buttonIcon"
                            {...register("callToAction.buttonIcon")}
                            value={item?.name}
                            className="hidden peer"
                            // required
                          ></input>

                          <label
                            htmlFor={item?._id}
                            className="peer-checked:border-secondary-main flex items-center justify-center h-6 w-6 border border-borderColor-main"
                          >
                            <div
                              dangerouslySetInnerHTML={{ __html: item?.svg }}
                            />

                            {appendSVG("icon" + index, item?.svg)}
                          </label>
                        </div>
                      )
                    )} */}

                  {IconList.map((item, index) => (
                    <div className="inline-block" key={index}>
                      <input
                        type="radio"
                        id={item?.name}
                        name="callToAction.buttonIcon"
                        {...register("callToAction.buttonIcon")}
                        value={item?.name}
                        className="hidden peer"
                        // required
                      ></input>

                      <label
                        htmlFor={item?.name}
                        className="peer-checked:border-secondary-main flex items-center justify-center h-6 w-6 border border-borderColor-main"
                      >
                        {item?.icon}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <SelectBox
                labelTitle="Button Style"
                labelStyle="text-primary-main text-base font-semibold"
                options={
                  masterWorkspaceOptions !== null
                    ? masterWorkspaceOptions?.data?.buttonStyle
                    : []
                }
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="callToAction.buttonStyle"
                register={register}
                placeholder
              />

              <SelectBox
                labelTitle="Button Corners"
                labelStyle="text-primary-main text-base font-semibold"
                options={
                  masterWorkspaceOptions !== null
                    ? masterWorkspaceOptions?.data?.buttonCorner
                    : []
                }
                containerStyle="min-w-[10rem] mb-3"
                selectStyle="text-primary-main"
                name="callToAction.buttonCorners"
                register={register}
                placeholder
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallToActionModal;
