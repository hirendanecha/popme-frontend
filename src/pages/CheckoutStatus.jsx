import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button/Button";

const CheckoutStatus = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get("success"));
  // console.log(searchParams.get("canceled"));

  // console.log(searchParams.get("status"));

  // console.log(searchParams.entries());

  // for (const entry of searchParams.entries()) {
  //   console.log(entry);
  // }

  const backToDashboardHandler = () => {
    navigate("/app/setting", { state: { tab: 3 } });
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-xl">
        <div className="artboard artboard-horizontal phone-3 shadow-xl p-4 rounded-2xl bg-white">
          <div className="flex flex-col h-full justify-center items-center">
            <div className="flex mb-3">
              {searchParams.get("success") && (
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

              {searchParams.get("canceled") && (
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
                {/* {error !== null ? "Not Verified" : "Verified!"} */}
                {searchParams.get("success") && "Payment Success!"}
                {searchParams.get("canceled") && "Payment Failed!"}
              </h4>
              <p className="text-base text-primary-normal font-semibold text-center">
                {/* {error !== null
                  ? "You have not verified account, so please check"
                  : "You have successfully verified account."} */}

                {searchParams.get("success") &&
                  "You have successfully verified account."}

                {searchParams.get("canceled") &&
                  "You have not verified account, so please check"}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                text="Go to profile"
                buttonClass="normal-case"
                clickHandler={backToDashboardHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStatus;
