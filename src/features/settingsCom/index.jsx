import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { setPageTitle } from "../../redux/slices/headerSlice";
import Button from "../../components/Button/Button";
import { logoutUser } from "../../redux/actions/authAction";
import { customerPortal, getAllPlansList, paymentLink } from "./action";
import { socket } from "../../services/socketCon";

const Data = [
  {
    id: 1,
    title: "Standard",
    description: "Getting started and off-site video messages",
    price: "0.00",
    isPurchase: true,
    embedding: {
      title: "Video Embedding",
      description: "includes 100 video views",
    },
    workspace: {
      title: "Up to 1 Workspace",
      description: "display 1 video to your website",
    },
    watermark: true,
  },
  {
    id: 2,
    title: "Premium",
    description:
      "Best for websites with under 30K visitors/month and video messaging power users",
    price: "49.99",
    isPurchase: false,
    embedding: {
      title: "Video Embedding",
      description: "includes 10,000 video views",
    },
    workspace: {
      title: "Up to 5 Workspaces",
      description: "display 5 videos to your website",
    },
    watermark: false,
  },
  {
    id: 3,
    title: "Advanced",
    description:
      "Best for websites with 30K-100K visitors/month and video messaging teams",
    price: "99.99",
    isPurchase: false,
    embedding: {
      title: "Video Embedding",
      description: "includes 50,000 video views",
    },
    workspace: {
      title: "Up to 20 Workspaces",
      description: "display 20 videos to your website",
    },
    watermark: false,
    mostPopular: true,
  },
  {
    id: 4,
    title: "Enterprise",
    description:
      "Best for websites with over 100K visitors/month and brands seeking enterprise-grade service level",
    isPurchase: false,
    embedding: {
      title: "Video Embedding",
      description: "includes custom number of views",
    },
    workspace: {
      title: "Unlimited Workspaces",
      description: "display unlimited videos to your website",
    },
    watermark: false,
  },
];

const SettingsCom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // console.log("searchParams", +searchParams.get("tb"));
  // console.log("location", location.pathname);
  // console.log("location", location);
  // console.log("navigate", window.location.href);
  // console.log("navigate", navigate("/", { state: { previousPath: pathname } }););

  useEffect(() => {
    if (searchParams.get("tb")) {
      setActiveTab(+searchParams.get("tb"));
    }
  }, [searchParams.get("tb")]);

  const [checkoutData, setCheckoutData] = useState(null);
  const [activeTab, setActiveTab] = useState(location?.state?.tab || 1);

  const { data } = useSelector((state) => state.auth);

  const { billingPlans } = useSelector((state) => state.setting);

  // console.log("data", data);
  // console.log("billingPlans", billingPlans);

  const getAllBillingPlanHandlerApi = useCallback(() => {
    dispatch(getAllPlansList())
      .unwrap()
      .then((res) => {
        // console.log("res", res);
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
    dispatch(setPageTitle({ title: "Settings" }));
    getAllBillingPlanHandlerApi();
  }, []);

  const activeTabHandler = (e, id, data) => {
    e.preventDefault();
    setActiveTab(id);

    if (data) {
      // console.log("data", data);
      setCheckoutData(data);
    }
  };

  const CodeBracket = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 text-primary-main"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
      />
    </svg>
  );

  const VideoCamera = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 text-primary-main"
    >
      <path
        strokeLinecap="round"
        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );

  const OpenEye = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 text-primary-main"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );

  const CloseEye = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8 text-primary-main"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser())
      .unwrap()
      .then((res) => {
        if (res.success === true) {
          // console.log(res,"rrr<>")
          setTimeout(() => {
            navigate("/login");
          }, 100);
          socket.close();
        }
      })
      .catch((err) => {
        // console.log(err,"er")
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  };

  const paymentLinkHandler = (e, data) => {
    e.preventDefault();
    // console.log("data", data);
    dispatch(paymentLink({ planId: data?._id }))
      .unwrap()
      .then((res) => {
        // console.log("res", res);
        window.location.href = res.data.url;
      })
      .catch((err) => {
        if (err) {
          toast(err, {
            type: "error",
          });
        }
      });
  };

  const openPortalHandler = (e, tab) => {
    e.preventDefault();
    let url = window.location.href.split("?");

    if (url) {
      dispatch(customerPortal({ returnUrl: `${url[0]}?tb=${tab}` }))
        .unwrap()
        .then((res) => {
          // console.log("res", res);
          window.location.href = res.data.url;
        })
        .catch((err) => {
          if (err) {
            toast(err, {
              type: "error",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="inline-block w-full h-full">
        <div className="inline-block w-full pt-4 border-b">
          <div className="tabs ml-4">
            <div
              className={`inline-block p-3 ${
                activeTab === 1
                  ? "border-b-2 border-secondary-main"
                  : "border-b-2 border-transparent"
              } `}
            >
              <a
                className={`tab text-lg font-bold ${
                  activeTab === 1 ? "text-secondary-main" : "text-primary-light"
                } `}
                onClick={(e) => activeTabHandler(e, 1)}
              >
                Settings
              </a>
            </div>

            <div
              className={`inline-block p-3 ${
                activeTab === 2
                  ? "border-b-2 border-secondary-main"
                  : "border-b-2 border-transparent"
              } `}
            >
              <a
                className={`tab text-lg font-bold ${
                  activeTab === 2 ? "text-secondary-main" : "text-primary-light"
                } `}
                onClick={(e) => activeTabHandler(e, 2)}
              >
                Plans
              </a>
            </div>

            <div
              className={`inline-block p-3 ${
                activeTab === 3
                  ? "border-b-2 border-secondary-main"
                  : "border-b-2 border-transparent"
              } `}
            >
              <a
                className={`tab text-lg font-bold ${
                  activeTab === 3 ? "text-secondary-main" : "text-primary-light"
                } `}
                onClick={(e) => activeTabHandler(e, 3)}
              >
                Billing
              </a>
            </div>

            <div
              className={`inline-block p-3 ${
                activeTab === 4
                  ? "border-b-2 border-secondary-main"
                  : "border-b-2 border-transparent"
              } `}
            >
              <a
                className={`tab text-lg font-bold items-baseline ${
                  activeTab === 4 ? "text-secondary-main" : "text-primary-light"
                } `}
                onClick={(e) => e.preventDefault()}
              >
                Team Members
                <span className="bg-[#DBEAFE] rounded-2xl px-2 text-sm text-[#1E40AF] font-medium ml-3">
                  Soon
                </span>
              </a>
            </div>

            <div
              className={`inline-block p-3 ${
                activeTab === 5
                  ? "border-b-2 border-secondary-main"
                  : "border-b-2 border-transparent"
              } `}
            >
              <a
                className={`tab text-lg font-bold items-baseline ${
                  activeTab === 5 ? "text-secondary-main" : "text-primary-light"
                } `}
                onClick={(e) => e.preventDefault()}
              >
                Integrations
                <span className="bg-[#DBEAFE] rounded-2xl px-2 text-sm text-[#1E40AF] font-medium ml-3">
                  Soon
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="inline-block w-full px-4 lg:px-6">
          {activeTab === 1 && (
            <div className="flex flex-col">
              <div className="inline-block w-full pt-11 pb-6 border-b">
                <h3 className="text-primary-normal font-bold text-2xl">
                  Account
                </h3>
                <p className="text-base text-primary-light">
                  Your account settings.
                </p>
              </div>

              <div className="grid grid-cols-8 py-5 border-b">
                <div className="col-start-1 col-end-3">
                  <h6 className="text-base text-primary-light font-semibold">
                    Email
                  </h6>
                </div>
                <div className="col-start-3 col-end-9">
                  <h6 className="text-base text-[#121827] font-semibold">
                    {/* elie@morereels.com */}
                    {`${data?.data?.email}`}
                  </h6>
                </div>
              </div>

              <div className="grid grid-cols-8 py-5 border-b">
                <div className="col-start-1 col-end-3">
                  <h6 className="text-base text-primary-light font-semibold">
                    Password
                  </h6>
                </div>
                <div className="col-start-3 col-end-9">
                  <h6 className="text-base text-[#121827] font-semibold">
                    *********
                  </h6>
                </div>
              </div>

              <div className="grid grid-cols-8 py-5 border-b">
                <div className="col-start-1 col-end-3">
                  <h6 className="text-base text-primary-light font-semibold">
                    First Name
                  </h6>
                </div>
                <div className="col-start-3 col-end-9">
                  <h6 className="text-base text-[#121827] font-semibold">
                    {/* Elie */}
                    {`${data?.data?.firstName}`}
                  </h6>
                </div>
              </div>

              <div className="grid grid-cols-8 py-5 border-b">
                <div className="col-start-1 col-end-3">
                  <h6 className="text-base text-primary-light font-semibold">
                    Last Name
                  </h6>
                </div>
                <div className="col-start-3 col-end-9">
                  <h6 className="text-base text-[#121827] font-semibold">
                    {/* MoreReels */}
                    {`${data?.data?.lastName}`}
                  </h6>
                </div>
              </div>

              <div className="flex mt-3">
                <button
                  className="btn btn-link text-base no-underline hover:no-underline capitalize text-[#D73939] px-0"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="flex flex-col">
              <div className="inline-block w-full pt-11 pb-6">
                <div className="grid grid-cols-2">
                  <div className="inline-block w-full">
                    <h3 className="text-primary-normal font-bold text-2xl">
                      Plans
                    </h3>
                    <p className="text-base text-primary-light">
                      Take your website to the next level with PopMe. See more
                      details about our pricing plans here.{" "}
                      {(data?.data?.plan?.selected !== null ||
                        data?.data?.plan?.selected !== undefined) &&
                        data?.data?.plan?.isActive !== false && (
                          <span>
                            Cancel your subscription by{" "}
                            <span
                              className=" lowercase text-secondary-main no-underline hover:no-underline cursor-pointer"
                              onClick={(e) => openPortalHandler(e, 2)}
                            >
                              clicking here.
                            </span>
                          </span>
                        )}
                    </p>
                  </div>

                  <div />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {/* {Data &&
                  Data.map((item) => (
                    <div
                      className={`flex flex-col relative px-3 py-4 border ${
                        item?.mostPopular
                          ? "border-secondary-main"
                          : "border-[#D1D5DB]"
                      } rounded-xl`}
                      key={item?.id}
                    >
                      {item?.mostPopular && (
                        <div className="absolute top-[-13px] right-6">
                          <span className="bg-[#FCEB97] rounded-2xl px-2 text-sm text-primary-main font-medium ml-3">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <h4 className="text-2xl font-bold text-primary-main">
                        {item?.title}
                      </h4>
                      <p className="text-base text-primary-main mb-5 line-clamp-3 min-h-[66px]">
                        {item?.description}
                      </p>

                      {item?.price ? (
                        <div className="flex flex-col mb-6">
                          <h4 className="text-[#183169] text-2xl font-bold">
                            ${item?.price.split(".")[0]}.
                            <span className="text-lg font-normal">
                              {item?.price.split(".")[1]}
                            </span>
                          </h4>

                          <span className="text-base text-primary-light">
                            per month
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col mb-6 min-h-[54px]">
                          <h4 className="text-primary-main text-xl font-bold">
                            Let’s Talk
                          </h4>
                        </div>
                      )}

                      <div className="inline-block w-full mb-6">
                        {item?.isPurchase ? (
                          <Button
                            text="Current Plan"
                            buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main font-semibold"
                          />
                        ) : (
                          <Button
                            text="Select Plan"
                            buttonClass="w-full text-base font-semibold"
                            clickHandler={(e) => activeTabHandler(e, 3, item)}
                          />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex mb-5">
                          <CodeBracket />

                          <div className="flex flex-col ml-5">
                            <h5 className="text-base font-bold text-primary-normal">
                              {item?.embedding?.title}
                            </h5>
                            <p className="text-sm text-primary-light">
                              {item?.embedding?.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex mb-5">
                          <VideoCamera />

                          <div className="flex flex-col ml-5">
                            <h5 className="text-base font-bold text-primary-normal">
                              {item?.workspace?.title}
                            </h5>
                            <p className="text-sm text-primary-light">
                              {item?.workspace?.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          {item?.watermark ? (
                            <>
                              <OpenEye />

                              <div className="flex flex-col ml-5">
                                <h5 className="text-base font-bold text-primary-normal">
                                  PopMe Watermark
                                </h5>
                                <p className="text-sm text-primary-light">
                                  our logo will be displayed
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <CloseEye />

                              <div className="flex flex-col ml-5">
                                <h5 className="text-base font-bold text-primary-normal">
                                  No Watermark
                                </h5>
                                <p className="text-sm text-primary-light">
                                  our logo will be displayed
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))} */}

                {billingPlans !== null &&
                  billingPlans?.data?.map((item) => (
                    <div
                      className={`flex flex-col relative px-3 py-4 border ${
                        item?.name === "Advanced"
                          ? "border-secondary-main"
                          : "border-[#D1D5DB]"
                      } rounded-xl hover:border-secondary-main`}
                      key={item?._id}
                    >
                      {item?.name === "Advanced" && (
                        <div className="absolute top-[-13px] right-6">
                          <span className="bg-[#FCEB97] rounded-2xl px-2 text-sm text-primary-main font-medium ml-3">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <h4 className="text-2xl font-bold text-primary-main">
                        {item?.name}
                      </h4>

                      <p className="text-base text-primary-main mb-5 line-clamp-3 min-h-[66px]">
                        {item?.description}
                      </p>

                      <div className="flex flex-col mb-6">
                        <h4 className="text-[#183169] text-2xl font-bold">
                          ${(item?.amount / 100).toString().split(".")[0]}.
                          <span className="text-lg font-normal">
                            {(item?.amount / 100).toString().split(".")[1]}
                          </span>
                          {/* {console.log(
                            "remov",
                            (item?.amount / 100).toString().split(".")
                          )} */}
                        </h4>

                        <span className="text-base text-primary-light">
                          per month
                        </span>
                      </div>

                      {/* {console.log("item?._id", item?._id)} */}

                      {/* {console.log(
                        "data?.plan?.selected",
                        data?.data?.plan?.selected
                      )} */}

                      <div className="inline-block w-full mb-6">
                        {data?.data?.plan?.selected === item?._id &&
                        data?.data?.plan?.isActive === true ? (
                          <Button
                            text="Current Plan"
                            buttonClass="w-full bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main font-semibold"
                          />
                        ) : (
                          <Button
                            text="Select Plan"
                            buttonClass="w-full text-base font-semibold"
                            // clickHandler={(e) => activeTabHandler(e, 3, item)}
                            clickHandler={(e) => paymentLinkHandler(e, item)}
                          />
                        )}

                        {/* <Button
                          text="Select Plan"
                          buttonClass="w-full text-base font-semibold"
                          // clickHandler={(e) => activeTabHandler(e, 3, item)}
                          clickHandler={(e) => paymentLinkHandler(e, item)}
                        /> */}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex mb-5">
                          <CodeBracket />

                          <div className="flex flex-col ml-5">
                            <h5 className="text-base font-bold text-primary-normal">
                              Video Embedding
                            </h5>
                            <p className="text-sm text-primary-light">
                              {`includes ${item?.props?.videoEmbedingViews} video
                              views`}
                            </p>
                          </div>
                        </div>

                        <div className="flex mb-5">
                          <VideoCamera />

                          <div className="flex flex-col ml-5">
                            <h5 className="text-base font-bold text-primary-normal">
                              {`Up to ${item?.props?.upToWorkspace} Workspaces`}
                            </h5>
                            <p className="text-sm text-primary-light">
                              {`display ${item?.props?.displayVideoToWeb} videos to your website`}
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          {item?.props?.watermark ? (
                            <>
                              <OpenEye />

                              <div className="flex flex-col ml-5">
                                <h5 className="text-base font-bold text-primary-normal">
                                  PopMe Watermark
                                </h5>
                                <p className="text-sm text-primary-light">
                                  our logo will be displayed
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <CloseEye />

                              <div className="flex flex-col ml-5">
                                <h5 className="text-base font-bold text-primary-normal">
                                  No Watermark
                                </h5>
                                <p className="text-sm text-primary-light">
                                  our logo will be displayed
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                {billingPlans !== null && (
                  <div
                    className={`flex flex-col relative px-3 py-4 border border-[#D1D5DB] rounded-xl hover:border-secondary-main`}
                  >
                    <h4 className="text-2xl font-bold text-primary-main">
                      Enterprise
                    </h4>

                    <p className="text-base text-primary-main mb-5 line-clamp-3 min-h-[66px]">
                      Best for websites with over 100K visitors/month and brands
                      seeking enterprise-grade service level
                    </p>

                    <div className="flex flex-col mb-6 min-h-[54px]">
                      <h4 className="text-primary-main text-xl font-bold">
                        Let’s Talk
                      </h4>
                    </div>

                    <div className="inline-block w-full mb-6">
                      <Button
                        text="Contact Us"
                        buttonClass="w-full text-base font-semibold"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex mb-5">
                        <CodeBracket />

                        <div className="flex flex-col ml-5">
                          <h5 className="text-base font-bold text-primary-normal">
                            Video Embedding
                          </h5>
                          <p className="text-sm text-primary-light">
                            contact us
                          </p>
                        </div>
                      </div>

                      <div className="flex mb-5">
                        <VideoCamera />

                        <div className="flex flex-col ml-5">
                          <h5 className="text-base font-bold text-primary-normal">
                            Unlimited Workspaces
                          </h5>
                          <p className="text-sm text-primary-light">
                            contact us
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <CloseEye />

                        <div className="flex flex-col ml-5">
                          <h5 className="text-base font-bold text-primary-normal">
                            No Watermark
                          </h5>
                          <p className="text-sm text-primary-light">
                            contact us
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="flex flex-col">
              <div className="inline-block w-full pt-11 pb-6 border-b mb-5">
                <h3 className="text-primary-normal font-bold text-2xl">
                  Billing
                </h3>
                <p className="text-base text-primary-light">
                  Manage your billing information, payment methods, and
                  invoices.
                </p>
              </div>

              {(data?.data?.plan?.selected !== null ||
                data?.data?.plan?.selected !== undefined) &&
                data?.data?.plan?.isActive !== false && (
                  <div className="flex justify-between">
                    <h5 className="text-lg text-primary-normal font-semibold">
                      Payment, subscription and invoices
                    </h5>

                    <span
                      className="text-secondary-main text-lg no-underline hover:no-underline cursor-pointer font-semibold"
                      onClick={(e) => openPortalHandler(e, 3)}
                    >
                      Open billing portal
                    </span>
                  </div>
                )}

              {checkoutData && (
                <div className="flex justify-between items-center mt-10">
                  <div className="flex flex-col">
                    <h3 className="text-primary-normal font-bold text-2xl">
                      {checkoutData?.title}
                    </h3>

                    <p className="text-base text-primary-light">
                      {checkoutData?.description}
                    </p>

                    <p className="text-base text-primary-light">
                      Your payable ammount is{" "}
                      <span className="text-secondary-main font-bold">
                        ${checkoutData?.price}
                      </span>
                    </p>
                  </div>

                  <div className="flex">
                    <Link
                      to="https://buy.stripe.com/test_aEU2c0c317bh5iMbII"
                      target="_blank"
                    >
                      <Button
                        text="Paynow"
                        buttonClass="w-32 text-base max-w-full h-[2.40rem] min-h-[2.40rem]"
                      />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsCom;
