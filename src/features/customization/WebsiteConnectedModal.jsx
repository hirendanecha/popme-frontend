import React from "react";
import { useSelector } from "react-redux";
import ModalButton from "../../components/Button/ModalButton";

const WebsiteConnectedModal = () => {
  const { id } = useSelector((state) => state.modal);
  return (
    <div div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-6">
        Verifying your website ..
      </h3>

      <div className="flex p-3 bg-[#F2F6F0] mb-6 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-7 text-[#4A8A37]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p className="text-sm text-[#4A8A37] font-bold ml-1">
          You have successfully connected your website with popme
        </p>
      </div>

      <p className="mb-6 text-base text-primary-normal font-semibold">
        You can now seamless embed any of our widgets through the{" "}
        <span className="font-bold">Instant Embed</span> page.
      </p>

      <p className="mb-8 text-base text-primary-normal font-semibold">
        <span className="font-bold">Note:</span> For your conveniece, all widget
        are disabled from showing on your website by default.
      </p>

      <div className="flex">
        <ModalButton text="Close" id={id && id} buttonClass="mb-4" />
      </div>
    </div>
  );
};

export default WebsiteConnectedModal;
