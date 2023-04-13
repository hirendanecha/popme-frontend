import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NewInputText from "../../components/Input/NewInputText";
import Button from "../../components/Button/Button";
import ModalButton from "../../components/Button/ModalButton";
import { updateProfile } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openNewModal } from "../../redux/slices/newModalSlice";

const schema = yup.object({
  firstName: yup
    .string()
    .min(1, "Please enter a first name more than 1 character"),
  lastName: yup
    .string()
    .min(1, "Please enter a last name more than 1 character"),
  email: yup.string().email(),
});

const UpdateProfileModal = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  //   console.log("data", data);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data?.data?.firstName ? data?.data?.firstName : "",
      lastName: data?.data?.lastName ? data?.data?.lastName : "",
      email: data?.data?.email ? data?.data?.email : "",
    },
  });

  const onSubmit = (data) => {
    // console.log("data", data);

    dispatch(updateProfile(data))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast("Profile updated", {
            type: "success",
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
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-6">
        Update your profile
      </h3>

      <form>
        <NewInputText
          type="text"
          inputStyle="mb-2"
          //   placeholder="First name"
          labelTitle="First name"
          labelStyle="text-primary-main text-base font-semibold"
          name="firstName"
          register={register}
          errorMessage={errors.firstName?.message}
        />

        <NewInputText
          type="text"
          inputStyle="mb-2"
          //   placeholder="Last name"
          labelTitle="Last name"
          labelStyle="text-primary-main text-base font-semibold"
          name="lastName"
          register={register}
          errorMessage={errors.lastName?.message}
        />

        <NewInputText
          type="email"
          inputStyle="mb-2"
          //   placeholder="Email address"
          labelTitle="Email address"
          labelStyle="text-primary-main text-base font-semibold"
          name="email"
          register={register}
          errorMessage={errors.email?.message}
        />

        <div className="flex mt-4">
          {/* <Button text="Update" buttonClass="text-base mr-3" type="submit" /> */}

          <div className="inline-block mr-3">
            <ModalButton
              text="Update"
              id="update-profile"
              clickHandler={() => handleSubmit((d) => onSubmit(d))()}
            />
          </div>

          {/* onClick={handleSubmit((d) => console.log(d))} */}

          <div className="inline-block">
            <ModalButton
              text="Cancel"
              id="update-profile"
              buttonClass="!bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
