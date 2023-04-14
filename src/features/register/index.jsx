import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import logo from "../../assets/images/logo.png";
import LockSvg from "../../assets/svgs/LockSvg";
import NewInputText from "../../components/Input/NewInputText";
import google from "../../assets/images/google.png";
import { registerUser } from "../../redux/actions/authAction";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
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
      .oneOf(
        [yup.ref("password")],
        "Confirm Password does not match with password"
      ),
  })
  .required();

const RegisterComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, userToken, data } = useSelector(
    (state) => state.auth
  );

  const [alertMessage, setAlertMessage] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");

  // console.log("loading", loading);
  // console.log("success", success);
  // console.log("error", error);
  // console.log("dataaaaaa", data);
  // console.log("userToken", userToken);

  useEffect(() => {
    if (userToken) {
      setAlertMessage(true);
    }
  }, [userToken]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (registerInfo) => {
    setRegisterEmail(registerInfo.email);

    const { confirmPassword, ...rest } = registerInfo;
    dispatch(registerUser(rest))
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
    reset();
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
          <h6 className="text-center text-base font-normal text-[#4B5563] mb-8">
            Already have an account?{" "}
            <span
              className=" text-secondary-main cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
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
                  <h3 className="font-bold text-white">
                    Verify Email Address!
                  </h3>
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <NewInputText
              type="text"
              inputStyle="mb-2"
              placeholder="First name"
              name="firstName"
              register={register}
              errorMessage={errors.firstName?.message}
            />

            <NewInputText
              type="text"
              inputStyle="mb-2"
              placeholder="Last name"
              name="lastName"
              register={register}
              errorMessage={errors.lastName?.message}
            />

            <NewInputText
              type="email"
              inputStyle="mb-2"
              placeholder="Email address"
              name="email"
              register={register}
              errorMessage={errors.email?.message}
            />

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

            <div className="flex mb-3">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-borderColor-main rounded-md mr-2"
                    required
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
