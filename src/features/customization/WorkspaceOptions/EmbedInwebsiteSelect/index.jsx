import React, { useState } from "react";
import SelectBox from "../../../../components/Input/SelectBox";
import ClipBoardSvg from "../../../../assets/svgs/ClipBoardSvg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkspaceWebsiteById,
  getWebsitesByWorkspaceId,
  getWorkspaceById,
  updateWorkspaceOptions,
} from "../../../workspaces/action";
import {
  openNewModal,
  resetCustomWebsites,
  resetModalData,
} from "../../../../redux/slices/newModalSlice";
import ModalButton from "../../../../components/Button/ModalButton";
import SelectPagesModal from "../SelectPagesModal";
import { toast } from "react-toastify";
import { setActiveWorkspaceData } from "../../../workspaces/reducer/workspaceSlice";
import { getUserPlanDetails } from "../../../settingsCom/action";

const EmbedInwebsiteSelect = ({ item }) => {
  //   console.log("item", item);

  const dispatch = useDispatch();
  const { activeWorkspaceData } = useSelector((state) => state.workspace);
  const { resetFormFun } = useSelector((state) => state.modal);

  const [inWebsiteSelect, setInWebsiteSelect] = useState("all");

  const updateValue = (data) => {
    setInWebsiteSelect(data?.value);
    // console.log("inWebsiteSelect", data?.value);

    dispatch(
      updateWorkspaceOptions({
        data: {
          website: {
            show: data?.value ? data?.value : "",
            url: item?.url ? item?.url : "",
            _id: item?._id ? item?._id : "",
          },
        },
        id: activeWorkspaceData?._id,
      })
    );
  };

  const selectPagesModalClickHandler = (props) => {
    const { websiteData, ...rest } = props;
    dispatch(getWebsitesByWorkspaceId(websiteData));
    dispatch(openNewModal(rest));
    dispatch(resetModalData());
    dispatch(resetCustomWebsites());

    if (resetFormFun !== null) {
      resetFormFun();
    }
  };

  const deleteWebsiteHandler = ({ websiteData }) => {
    // console.log("websiteData", websiteData);
    dispatch(deleteWorkspaceWebsiteById(websiteData))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast(res?.message, {
            type: "success",
          });

          dispatch(getUserPlanDetails());

          dispatch(getWorkspaceById(activeWorkspaceData?._id))
            .unwrap()
            .then((res) => {
              if (res?.success) {
                dispatch(setActiveWorkspaceData(res?.data));
              }
            })
            .catch((err) => {
              if (err) {
                toast(err, {
                  type: "error",
                });
              }
            });
        }
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  };

  return (
    <div
      tabIndex={item?._id}
      className="collapse collapse-arrow border border-borderColor-main rounded-lg mb-3"
    >
      <input type="checkbox" />

      <div className="collapse-title break-all text-xl font-bold text-primary-main bg-[#E5E7EB]">
        {`${item?.url}`}
      </div>

      <div className="collapse-content">
        <label className="label mt-2">
          <span
            className={`label-text text-primary-main text-base font-semibold`}
          >
            In this website
          </span>

          <div
            className="inline-block cursor-pointer"
            onClick={() =>
              deleteWebsiteHandler({
                websiteData: {
                  websiteId: item?._id,
                  workspaceId: activeWorkspaceData?._id,
                },
              })
            }
          >
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
          </div>
        </label>

        <div className="inline-block w-full">
          <SelectBox
            labelStyle="text-primary-main text-base font-semibold"
            options={[
              { name: "Show in all pages", value: "all" },
              {
                name: "Do not show",
                value: "none",
              },
              {
                name: "Show in some pages",
                value: "some",
              },
            ]}
            containerStyle="mb-3 w-full"
            selectStyle="text-primary-main"
            updateFormValue={updateValue}
            placeholder
            defaultValue={inWebsiteSelect}
          />
        </div>

        {inWebsiteSelect === "all" && (
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
              This widget will show everywhere in this website
            </p>
          </div>
        )}

        {inWebsiteSelect === "none" && (
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
              This widget will not show in this website
            </p>
          </div>
        )}

        {inWebsiteSelect === "some" && (
          <div className="flex flex-col">
            <div className="flex mb-3">
              <ClipBoardSvg width="60" />
              <p className="text-base text-[#202223] ml-3">
                This widget will show only in the pages/URLs selected below.
              </p>
            </div>

            <div className="inline-block w-full mb-3">
              <ModalButton
                text="Select pages"
                id="select-pages"
                buttonClass="bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                clickHandler={() =>
                  selectPagesModalClickHandler({
                    id: "select-pages",
                    children: (
                      <SelectPagesModal url={item?.url} websiteId={item?._id} />
                    ),
                    websiteData: {
                      websiteId: item?._id,
                      workspaceId: activeWorkspaceData?._id,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedInwebsiteSelect;
