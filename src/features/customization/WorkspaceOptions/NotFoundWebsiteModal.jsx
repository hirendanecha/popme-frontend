import React, { useState } from "react";
import ModalButton from "../../../components/Button/ModalButton";
import NewTextArea from "../../../components/Input/NewTextArea";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceOptions } from "../../workspaces/action";
import { toast } from "react-toastify";

const NotFoundWebsiteModal = ({ url, websiteId }) => {
  const dispatch = useDispatch();
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  const [multipleWebsiteManual, setMultipleWebsiteManual] = useState("");

  const updateValue = (data) => {
    setMultipleWebsiteManual(data?.value);
  };

  const addPagesHandler = () => {
    setMultipleWebsiteManual("");

    const pattern = /\s+/g;
    const stringWithoutSpaces = multipleWebsiteManual.replace(pattern, "");
    let dd = stringWithoutSpaces.split(",");
    // console.log("fffff", stringWithoutSpaces.split(","));

    const newArray = [];

    for (let i = 0; i < dd.length; i++) {
      try {
        // Check the value of the current element and modify it
        const newValue = new URL(dd[i])?.pathname;
        if (newValue) {
          newArray.push(newValue);
        }
      } catch (error) {
        console.error(error);
      }
    }

    // console.log("newArray", newArray);

    dispatch(
      updateWorkspaceOptions({
        data: {
          website: {
            show: "some",
            url: url ? url : "",
            _id: websiteId ? websiteId : "",
            pages: newArray,
          },
        },
        id: activeWorkspaceData?._id,
      })
    )
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        toast("Websites updated", {
          type: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        toast(err, {
          type: "error",
        });
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-primary-normal mb-6">
          Add new pages
        </h3>

        <p className="mb-2 text-base text-primary-light font-bold">
          List of pages, separated by comma
        </p>

        <div className="flex pb-6">
          <NewTextArea
            // labelTitle="Video Description"
            // labelStyle="text-primary-main !text-base font-semibold"
            inputStyle="!bg-transparent"
            name="description"
            defaultValue={multipleWebsiteManual}
            updateFormValue={updateValue}
          />
        </div>

        <div className="flex">
          <div className="inline-block mt-6 mr-3">
            <ModalButton
              text="Add pages"
              id="not-found-website"
              clickHandler={() => addPagesHandler()}
            />
          </div>

          <div className="inline-block mt-6">
            <ModalButton
              text="Cancel"
              id="not-found-website"
              buttonClass="!bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundWebsiteModal;
