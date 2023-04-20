import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import NewInputText from "../../components/Input/NewInputText";
import logo from "../../assets/images/logo.png";
import LockSvg from "../../assets/svgs/LockSvg";
import google from "../../assets/images/google.png";
import { loginUser, logoutUser } from "../../redux/actions/authAction";

const schema = yup.object({
  email: yup.string().required("Email is required"),
});

const LoginComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => state.auth);

  // const { loading, error, success, userToken, data } = useSelector(
  //   (state) => state.auth
  // );

  // console.log("loading", loading);
  // console.log("success", success);
  // console.log("error", error);
  // console.log("userToken", userToken);
  // console.log("userInfo", data);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (loginInfo) => {
    dispatch(loginUser(loginInfo))
      .unwrap()
      .then((res) => {
        if (res.success === true) {
          // console.log(res, "response");
          // navigate("/app/dashboard");
          navigate("/app/workspaces");
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

  const createAccoutHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="min-h-screen flex items-center">
        <div className="mx-auto w-full max-w-xl">
          {errors.email?.message && (
            <div className="flex justify-center">
              <p className="mb-3 text-sm text-[#991B1B] py-1 px-3 bg-[#FEE2E2] rounded-xl text-center">
                {errors.email?.message}
              </p>
            </div>
          )}

          {errors.password?.message && (
            <div className="flex justify-center">
              <p className="mb-3 text-sm text-[#991B1B] py-1 px-3 bg-[#FEE2E2] rounded-xl text-center">
                {errors.password?.message}
              </p>
            </div>
          )}

          <div className="flex justify-center mb-2">
            <img src={logo} alt="logo" />
          </div>

          <h2 className="text-3xl font-bold mb-2 text-center text-primary-main">
            Sign in to your account
          </h2>
          <h6 className="text-center text-base font-normal text-secondary-main mb-8">
            <span className="text-[#4B5563]">And</span> start your free trial
          </h6>

          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="inline-block w-full border border-borderColor-main rounded-md mb-4">
              <NewInputText
                type="email"
                name="email"
                inputStyle="border-0 border-b rounded-none rounded-t-md"
                placeholder="Email address"
                register={register}
              />
              <NewInputText
                type="password"
                name="password"
                inputStyle="border-0 rounded-none rounded-b-md"
                placeholder="Password"
                register={register}
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-secondary-main rounded-md mr-2"
                  />
                  <span className="label-text text-primary-main text-base">
                    Remember me
                  </span>
                </label>
              </div>

              <div className="flex">
                <Link to="/forgot-password">
                  <span className="text-base flex text-secondary-main hover:underline hover:cursor-pointer transition duration-200">
                    Forgot your password?
                  </span>
                </Link>
              </div>
            </div>

            <div className="inline-block w-full">
              <button
                type="submit"
                className="btn btn-block justify-start bg-secondary-main border-0 hover:bg-secondary-main shadow-shadow-buttonShadow"
              >
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

          <div className="inline-block w-full mb-4">
            <button
              type="button"
              className="btn btn-block justify-start bg-white border-[#E5E7EB] hover:bg-white hover:border-[#E5E7EB] shadow-shadow-buttonShadow"
              onClick={createAccoutHandler}
            >
              <div className="flex w-full items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-[#6B7280]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>

                <div className="inline-block w-full text-[#6B7280] text-base capitalize">
                  Create account with email
                </div>
              </div>
            </button>
          </div>

          <div className="inline-block w-full">
            <button
              type="button"
              className="btn btn-block bg-white border-[#E5E7EB] hover:bg-white hover:border-[#E5E7EB] capitalize text-base text-[#6B7280]"
            >
              <img src={google} alt="google" className="mr-2" />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginComp;
