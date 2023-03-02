import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import logo from "../../assets/images/logo.png";
import Button from "../../components/Button/Button";
import NewInputText from "../../components/Input/NewInputText";
import {
  forgotPassword,
  resetPassword,
  verifyForgotPasswordToken,
} from "../../redux/actions/authAction";

const ForgotPasswordComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const { loading, error, success, userToken, data } = useSelector(
    (state) => state.auth
  );

  //   console.log("loading", loading);
  //   console.log("success", success);
  //   console.log("error", error);
  //   console.log("ForgotPasswordComp-dataaaaaa", data);

  const [alertMessage, setAlertMessage] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [verifyForgotPwsToken, setverifyForgotPwsToken] = useState(false);

  //   console.log("token", token);

  useEffect(() => {
    if (userToken) {
      setAlertMessage(true);
    }
  }, [userToken]);

  const verifyTokenHandler = useCallback((token) => {
    dispatch(verifyForgotPasswordToken({ token: token }))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          setverifyForgotPwsToken(true);
          toast(res?.message, {
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
  }, []);

  useEffect(() => {
    if (token !== undefined) {
      verifyTokenHandler(token);
    }
  }, [token]);

  const forgotPasswordSchema = yup.object({
    email: yup.string().email().required("Email is required"),
  });

  const resetPasswordSchema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
        "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords does not match"),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      verifyForgotPwsToken ? resetPasswordSchema : forgotPasswordSchema
    ),
  });

  const onSubmit = (userInfo) => {
    // console.log("forgotInfo", userInfo);

    if (verifyForgotPwsToken) {
      const userData = {
        token: token,
        password: userInfo.password,
      };

      dispatch(resetPassword(userData))
        .unwrap()
        .then((res) => {
          if (res.success === true) {
            navigate("/login");
            toast(res?.message, {
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
    } else {
      setRegisterEmail(userInfo.email);
      dispatch(forgotPassword(userInfo))
        .unwrap()
        .then((res) => {})
        .catch((err) => {
          if (err) {
            toast(err, {
              type: "error",
            });
          }
        });
    }
    reset();
    // console.log("userData", userData);
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-xl">
        <div className="flex justify-center mb-2">
          <img src={logo} alt="logo" />
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center text-primary-main">
          {verifyForgotPwsToken ? "Change password" : "Forgot password?"}
        </h2>
        <h6 className="text-center text-base font-normal text-[#4B5563] mb-8">
          {verifyForgotPwsToken
            ? "Enter new password and then repeat it"
            : "No worries. we'll send you reset instructions."}
        </h6>

        {alertMessage && (
          <div className="alert alert-info shadow-lg mb-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold text-white">Verify Email Address!</h3>
                <div className="text-xs text-white">{`You've entered ${
                  registerEmail?.length > 0 && registerEmail
                } as the email address for your account.
                  Please verify this email address by clicking button below.
                  `}</div>
              </div>
            </div>

            <div className="flex-none">
              {data && data?.link && (
                <Link
                  to={data && data?.link}
                  target="_blank"
                  onClick={() => setAlertMessage(false)}
                >
                  <button className="btn btn-sm text-white normal-case">
                    Verify
                  </button>
                </Link>
              )}

              <button
                className="btn btn-circle btn-xs btn-outline border-white hover:bg-transparent hover:border-white"
                onClick={() => setAlertMessage(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={!verifyForgotPwsToken && "mb-8"}
        >
          {verifyForgotPwsToken ? (
            <>
              <NewInputText
                type="password"
                inputStyle="mb-2"
                placeholder="Password"
                name="password"
                register={register}
                errorMessage={errors.password?.message}
              />

              <NewInputText
                type="password"
                inputStyle="mb-2"
                placeholder="Confirm Password"
                name="confirmPassword"
                register={register}
                errorMessage={errors.confirmPassword?.message}
              />
            </>
          ) : (
            <>
              <NewInputText
                type="email"
                inputStyle="mb-2"
                placeholder="Enter your email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
            </>
          )}

          <div className="flex w-full mt-3">
            <Button
              type="submit"
              text={verifyForgotPwsToken ? "Change password" : "Reset password"}
              buttonClass="w-full text-base"
            />
          </div>
        </form>

        {!verifyForgotPwsToken && (
          <div
            className="flex justify-center"
            onClick={() => navigate("/login")}
          >
            <button
              type="button"
              className="btn btn-sm btn-link p-0 no-underline hover:no-underline normal-case text-secondary-main"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-secondary-main mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Back to login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordComp;
