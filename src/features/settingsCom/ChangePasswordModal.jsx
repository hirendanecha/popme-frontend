import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import NewInputText from "../../components/Input/NewInputText";
import * as yup from "yup";
import ModalButton from "../../components/Button/ModalButton";
import { changePasswordSetting } from "../../redux/actions/authAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const schema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
      "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
    )
    .test(
      "",
      "New password is not same compare to password",
      (value, testContext) => {
        if (testContext.parent.password === value) return false;
        return true;
      }
    ),
});

const ChangePasswordModal = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = (data) => {
    // console.log("data", data);

    dispatch(changePasswordSetting(data))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast(res?.message, {
            type: "success",
          });
          reset();
        }
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
          reset();
        }
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-primary-normal mb-6">
          Update your profile
        </h3>

        <form>
          <NewInputText
            type="password"
            inputStyle="mb-2"
            name="password"
            register={register}
            errorMessage={errors.password?.message}
            // placeholder="Password"
            labelTitle="Password"
            labelStyle="text-primary-main text-base font-semibold"
          />

          <NewInputText
            type="password"
            inputStyle="mb-2"
            name="newPassword"
            register={register}
            errorMessage={errors.newPassword?.message}
            // placeholder="Confirm Password"
            labelTitle="New password"
            labelStyle="text-primary-main text-base font-semibold"
          />

          <div className="flex mt-4">
            <div className="inline-block mr-3">
              <ModalButton
                text="Update"
                id="change-password"
                clickHandler={() => handleSubmit((d) => onSubmit(d))()}
              />
            </div>

            <div className="inline-block">
              <ModalButton
                text="Cancel"
                id="change-password"
                buttonClass="!bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
                clickHandler={() => reset()()}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordModal;
