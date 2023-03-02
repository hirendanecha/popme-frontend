import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalButton from "../../components/Button/ModalButton";
import { openNewModal } from "../../redux/slices/newModalSlice";
import WebsiteConnectedModal from "./WebsiteConnectedModal";

const VerifyYourWebsiteModal = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
  };
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-4">
        Verifying your website ..
      </h3>
      <p className="mb-6 text-base text-primary-normal font-semibold">
        Please open the website where you have installed the code and refresh it
        a few times.
      </p>

      <p className="mb-8 text-base text-primary-normal font-semibold">
        A success message will show on this page once the Answerly code runs on
        your website.
      </p>

      <div className="flex flex-col">
        <div className="inline-block">
          <ModalButton
            text="Show me the code again"
            id="website-connected"
            buttonClass="mb-2 !bg-white !text-primary-main hover:bg-white !border border-borderColor-main hover:border-borderColor-main w-max"
            clickHandler={() =>
              modalClickHandler({
                id: "website-connected",
                children: <WebsiteConnectedModal />,
              })
            }
          />
        </div>

        <div className="inline-block">
          <ModalButton
            text="I will verify later"
            id={id && id}
            buttonClass="!bg-white !text-primary-main hover:bg-white !border border-borderColor-main hover:border-borderColor-main w-max"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyYourWebsiteModal;
