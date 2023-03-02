import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import ModalButton from "../../components/Button/ModalButton";
import { openNewModal } from "../../redux/slices/newModalSlice";
import VerifyYourWebsiteModal from "./VerifyYourWebsiteModal";

const AddInstantEmbedModal = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-4">
        Add Instant Embed
      </h3>
      <p className="mb-5 text-base text-primary-normal font-semibold">
        Add the Instant Embed code below into the footer of your website:
      </p>
      <div className="flex w-full mb-6">
        <p className="py-1 px-2 bg-[#F6F6F6] text-primary-main text-sm overflow-x-scroll whitespace-nowrap rounded-md [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[#f1f1f1] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown
        </p>
      </div>

      <div className="flex gap-3">
        <div className="inline-block">
          <ModalButton
            text="I have added the code"
            id="verify-your-website"
            buttonClass="mb-4"
            clickHandler={() =>
              modalClickHandler({
                id: "verify-your-website",
                children: <VerifyYourWebsiteModal />,
              })
            }
          />
        </div>

        <div className="inline-block">
          <ModalButton
            text="Cancel"
            id={id && id}
            buttonClass="mb-4 !bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
          />
        </div>
      </div>
    </div>
  );
};

export default AddInstantEmbedModal;
