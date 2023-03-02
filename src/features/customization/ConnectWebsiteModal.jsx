import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import ModalButton from "../../components/Button/ModalButton";
import NewInputText from "../../components/Input/NewInputText";
import { openNewModal } from "../../redux/slices/newModalSlice";
import AddInstantEmbedModal from "./AddInstantEmbedModal";

const ConnectWebsiteModal = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("onSubmit", data);

  const modalClickHandler = (props) => {
    dispatch(openNewModal(props));
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-4">
        Connect a Website
      </h3>
      <p className="mb-5 text-base text-primary-normal font-semibold">
        Insert only your domain/subdomain without https and any other special
        characters.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <NewInputText
          type="text"
          labelStyle="text-primary-main text-base font-semibold"
          inputStyle="mb-3 !bg-transparent"
          name="websiteUrl"
          register={register}
        />
      </form>

      <div className="flex gap-3">
        <div className="inline-block">
          {/* <Button text="Continue" buttonClass="w-full text-base" /> */}
          <ModalButton
            text="Continue"
            id="add-instant-embed"
            buttonClass="mb-4"
            clickHandler={() =>
              modalClickHandler({
                id: "add-instant-embed",
                children: <AddInstantEmbedModal />,
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

export default ConnectWebsiteModal;
