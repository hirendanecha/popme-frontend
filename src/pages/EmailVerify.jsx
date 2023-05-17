import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import { verifyRegiterEmail } from "../redux/actions/authAction";

const EmailVerify = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const { token } = useParams();
  const navigate = useNavigate();

  // console.log("token", token);

  // console.log("success", success);
  // console.log("loading", loading);
  // console.log("error", error);

  const verifyEmailApi = useCallback((token) => {
    dispatch(verifyRegiterEmail(token));
  }, []);

  useEffect(() => {
    verifyEmailApi(token);
  }, [token]);

  //  atob(token);

  const loginClickHandler = () => {
    navigate("/login");
  };

  const registrationClickHandler = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-xl">
        {loading === true ? (
          <div>Loading...</div>
        ) : (
          <div className="artboard artboard-horizontal phone-3 shadow-xl p-4 rounded-2xl bg-white">
            <div className="flex flex-col h-full justify-center items-center">
              <div className="flex mb-3">
                {success === true && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-24 h-24 text-secondary-main"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                )}

                {error !== null && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-24 h-24 text-[#991B1B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>

              <div className="flex flex-col mb-5">
                <h4 className="text-2xl text-primary-main font-bold mb-2 text-center">
                  {error !== null ? "Not Verified" : "Verified!"}
                </h4>
                <p className="text-base text-primary-normal font-semibold text-center">
                  {error !== null
                    ? "You have not verified account, so please check"
                    : "You have successfully verified account."}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  text="Go to login"
                  buttonClass="normal-case"
                  clickHandler={loginClickHandler}
                />
                {error !== null && (
                  <Button
                    text="Go to Registration"
                    buttonClass="normal-case bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                    clickHandler={registrationClickHandler}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
