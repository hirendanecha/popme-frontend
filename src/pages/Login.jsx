import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorText from "../components/Typography/ErrorText";
// import InputText from "../components/Input/InputText";
import NewInputText from "../components/Input/NewInputText";
import logo from "../assets/images/logo.png";
import LockSvg from "../assets/svgs/LockSvg";
import google from "../assets/images/google.png";

const Login = () => {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "")
      return setErrorMessage("Email Id is required! (use any value)");
    if (loginObj.password.trim() === "")
      return setErrorMessage("Password is required! (use any value)");
    else {
      setLoading(true);
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem("token", "DumyTokenHere");
      setLoading(false);
      window.location.href = "/app/dashboard";
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };
  return (
    <div className='min-h-screen flex items-center'>
      <div className='mx-auto w-full max-w-xl'>

        <div className="flex justify-center mb-2">
          <img src={logo} alt="logo" />
        </div>

        <h2 className='text-3xl font-bold mb-2 text-center text-primary-main'>Sign in to your account</h2>
        <h6 className="text-center text-base font-normal text-secondary-main mb-8"><span className="text-[#4B5563]">Or</span> start your 3-day free trial</h6>

        <form onSubmit={(e) => submitForm(e)} className="mb-4">
          <div className="inline-block w-full border border-borderColor-main rounded-md mb-4">
            <NewInputText
              type="emailId"
              defaultValue={loginObj.emailId}
              name='emailId'
              updateFormValue={updateFormValue}
              inputStyle="border-0 border-b rounded-none rounded-t-md"
              placeholder="Email address"
            />
            <NewInputText
              type='password'
              defaultValue={loginObj.password}
              name='password'
              updateFormValue={updateFormValue}
              inputStyle="border-0 rounded-none rounded-b-md"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-secondary-main rounded-md mr-2" />
                <span className="label-text text-primary-main text-base">Remember me</span>
              </label>
            </div>

            <div className='flex'>
              <Link to='/forgot-password'>
                <span className='text-base flex text-secondary-main hover:underline hover:cursor-pointer transition duration-200'>
                  Forgot your password?
                </span>
              </Link>
            </div>
          </div>


          <ErrorText styleClass='my-3'>{errorMessage}</ErrorText>

          <div className="inline-block w-full">
            <button type='submit' className="btn btn-block justify-start bg-secondary-main border-0 hover:bg-secondary-main shadow-shadow-buttonShadow">
              <div className="flex w-full items-center">

                <LockSvg />

                <div className="inline-block w-full text-white text-base capitalize">
                  Sign in
                </div>
              </div>
            </button>
          </div>
        </form>

        <div className="mb-3 inline-block w-full text-center relative before:absolute before:content-[''] before:left-0 before:top-[50%] before:h-[1px] before:bg-[#D2D5DB] before:w-[38%] after:absolute after:content-[''] after:right-0 after:top-[50%] after:h-[1px] after:bg-[#D2D5DB] after:w-[38%]">
          <h6 className="text-primary-light">Or continue with</h6>
        </div>

        <div className="inline-block w-full">
          <button className="btn btn-block bg-white border-[#E5E7EB] hover:bg-white hover:border-[#E5E7EB] capitalize text-base text-[#6B7280]">
            <img src={google} alt="google" className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
