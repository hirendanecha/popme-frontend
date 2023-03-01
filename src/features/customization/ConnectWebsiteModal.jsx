import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import NewInputText from "../../components/Input/NewInputText";

const ConnectWebsiteModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log("onSubmit", data);

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-4">
        Connect a Website
      </h3>
      <p className="mb-5 text-base text-primary-normal">
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
          <Button text="Continue" buttonClass="w-full text-base" />
        </div>
        <div className="inline-block">
          <Button
            text="Cancel"
            buttonClass="!bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4] text-base !border border-borderColor-main hover:border-borderColor-main"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectWebsiteModal;
