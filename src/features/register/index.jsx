import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import LockSvg from "../../assets/svgs/LockSvg";
import NewInputText from "../../components/Input/NewInputText";
import google from "../../assets/images/google.png";

const INITIAL_REGISTER_OBJ = {
  firstName: "",
  lastName: "",
  emailId: "",
  password: "",
  confirmPassword: "",
};

const RegisterComp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };
  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-xl">
          <div className="flex justify-center mb-2">
            <img src={logo} alt="logo" />
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center text-primary-main">
            Signup to create an account
          </h2>
          <h6 className="text-center text-base font-normal text-secondary-main mb-8">
            <span className="text-[#4B5563]">Already have an account?</span>{" "}
            Login
          </h6>

          <form onSubmit={(e) => submitForm(e)}>
            <NewInputText
              type="text"
              defaultValue={registerObj.firstName}
              name="firstName"
              updateFormValue={updateFormValue}
              inputStyle="mb-3"
              placeholder="First name"
            />

            <NewInputText
              type="text"
              defaultValue={registerObj.lastName}
              name="lastName"
              updateFormValue={updateFormValue}
              inputStyle="mb-3"
              placeholder="Last name"
            />

            <NewInputText
              type="email"
              defaultValue={registerObj.emailId}
              name="emailId"
              updateFormValue={updateFormValue}
              inputStyle="mb-3"
              placeholder="Email address"
            />

            <NewInputText
              type="password"
              defaultValue={registerObj.password}
              name="password"
              updateFormValue={updateFormValue}
              inputStyle="mb-3"
              placeholder="Password"
            />

            <NewInputText
              type="password"
              defaultValue={registerObj.confirmPassword}
              name="confirmPassword"
              updateFormValue={updateFormValue}
              inputStyle="mb-3"
              placeholder="Confirm Password"
            />

            <div className="flex mb-3">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-borderColor-main rounded-md mr-2"
                  />
                  <h6 className="text-base font-normal text-primary-main">
                    I agree to the{" "}
                    <span className="text-secondary-main">Terms of Use</span>{" "}
                    and{" "}
                    <span className="text-secondary-main">Privacy Policy</span>
                  </h6>
                </label>
              </div>
            </div>

            <div className="inline-block w-full mb-4">
              <button
                type="submit"
                className="btn btn-block justify-start bg-secondary-main border-0 hover:bg-secondary-main shadow-shadow-buttonShadow"
              >
                <div className="flex w-full items-center">
                  <LockSvg />

                  <div className="inline-block w-full text-white text-base capitalize">
                    Signup
                  </div>
                </div>
              </button>
            </div>

            <div className="mb-3 inline-block w-full text-center relative before:absolute before:content-[''] before:left-0 before:top-[50%] before:h-[1px] before:bg-[#D2D5DB] before:w-[38%] after:absolute after:content-[''] after:right-0 after:top-[50%] after:h-[1px] after:bg-[#D2D5DB] after:w-[38%]">
              <h6 className="text-primary-light">Or continue with</h6>
            </div>

            <div className="inline-block w-full">
              <button className="btn btn-block bg-white border-[#E5E7EB] hover:bg-white hover:border-[#E5E7EB] capitalize text-base text-[#6B7280]">
                <img src={google} alt="google" className="mr-2" />
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterComp;
