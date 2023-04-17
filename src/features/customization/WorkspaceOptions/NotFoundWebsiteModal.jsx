import React, { useState } from "react";
import ModalButton from "../../../components/Button/ModalButton";
import NewTextArea from "../../../components/Input/NewTextArea";

const NotFoundWebsiteModal = () => {
  const [multipleWebsiteManual, setMultipleWebsiteManual] = useState("");

  const updateValue = (data) => {
    setMultipleWebsiteManual(data?.value);
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
              //   id="select-pages"
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
