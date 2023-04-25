import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, useLocation, Link, useNavigate } from "react-router-dom";
import CustomizationSvg from "../../../../assets/svgs/CustomizationSvg";
import DashboardSvg from "../../../../assets/svgs/DashboardSvg";
import SettingsSvg from "../../../../assets/svgs/SettingsSvg";
import TestingSvg from "../../../../assets/svgs/TestingSvg";
import WorkspaceSvg from "../../../../assets/svgs/WorkspaceSvg";
import sidebarLogo from "../../../../assets/images/sidebar-logo.png";
import SmallSidebarLogo from "../../../../assets/svgs/SmallSidebarLogo";
import CakeSvg from "../../../../assets/svgs/CakeSvg";
import Button from "../../../../components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, getToken } from "../../../../redux/actions/authAction";
import { getUserPlanDetails } from "../../../../features/settingsCom/action";
// import SidebarLinkGroup from "./SidebarLinkGroup";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.auth);
  const { userPlanDetails } = useSelector((state) => state.setting);

  // console.log(data?.data,"datasss")
  // console.log(userPlanDetails, "userPlanDetails");

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? true : storedSidebarExpanded === "true"
  );

  const getUserPlanDetailsHandler = useCallback(() => {
    dispatch(getUserPlanDetails())
      .unwrap()
      .then((res) => {
        // console.log("res", res);

        if (Object.keys(res?.selectedPlan).length === 0) {
          navigate("/app/setting", { state: { tab: 2 } });
        }

        // else {
        //   navigate("/app/workspaces");
        // }

        // if (
        //   !(
        //     res?.selectedPlan &&
        //     res?.selectedPlan?.selected &&
        //     res?.selectedPlan?.isActive
        //   )
        // ) {
        //   navigate("/app/setting", { state: { tab: 2 } });
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // let selectedPlan = {};
  // console.log("selectedPlan", Object.keys(res?.selectedPlan).length);

  //get data of currentUser
  useEffect(() => {
    dispatch(getToken());
    dispatch(currentUser());
    getUserPlanDetailsHandler();
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const goToPlansHandler = () => {
    navigate("/app/setting", { state: { tab: 2 } });
  };

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-secondary-sidebarColor bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        // className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 bg-secondary-sidebarColor transition-all duration-200 ease-in-out ${
        //   sidebarOpen ? "translate-x-0" : "-translate-x-72"
        // } max-lg:[&::-webkit-scrollbar]:hidden`}

        className={`lg:static absolute lg:left-auto left-0 lg:top-auto top-0 lg:translate-x-0 w-72 lg:w-20 sidebar-expanded:!w-72 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-72"
        } lg:min-h-[550px] overflow-y-auto h-screen z-40 flex flex-col bg-secondary-sidebarColor transition-all duration-200 ease-in-out max-lg:[&::-webkit-scrollbar]:hidden`}
      >
        {/* Sidebar header */}
        <div className="inline-block p-4">
          <div className="flex justify-between mb-10 pr-3 sm:px-2">
            {/* Close button mobile */}

            {/* Logo */}
            <div className="flex items-center justify-between w-full">
              <NavLink end to="/app/workspaces" className="block">
                <div className="flex">
                  <img src={sidebarLogo} alt="sidebarLogo" className="w-36" />
                </div>
              </NavLink>

              <button
                ref={trigger}
                className="lg:hidden text-slate-500 hover:text-slate-400"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">Close sidebar</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white fill-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* <div
                className="cursor-pointer hidden sidebar-expanded:block"
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div> */}
            </div>

            <div
              className="cursor-pointer hidden lg:block sidebar-expanded:hidden"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <div className="flex">
                <SmallSidebarLogo />
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="mt-3 p-4">
              {/* Dashboard */}

              {/* <li
                className={`p-3 mb-2 rounded-md last:mb-0 ${
                  pathname.includes("dashboard") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/app/dashboard"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("dashboard") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <DashboardSvg svgClass="shrink-0 h-6 w-6" />

                    <span className="text-base text-white ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li> */}

              {/* Workspaces */}
              <li
                className={`p-3 mb-2 rounded-md last:mb-0 ${
                  pathname.includes("workspaces") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/app/workspaces"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("workspaces") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <WorkspaceSvg svgClass="shrink-0 h-6 w-6" />

                    <span className="text-base text-white ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Workspaces
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Customization */}
              <li
                className={`p-3 mb-2 rounded-md last:mb-0 ${
                  pathname.includes("customization") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/app/customization"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("customization") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <CustomizationSvg svgClass="shrink-0 h-6 w-6" />

                    <span className="text-base text-white ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Customization
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Testing */}
              <li
                className={`p-3 mb-2 rounded-md last:mb-0 ${
                  pathname.includes("testing") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/app/workspaces"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("testing") && "hover:text-slate-200"
                  }`}
                  onClick={(event) => event.preventDefault()}
                >
                  <div className="flex items-center">
                    <TestingSvg svgClass="shrink-0 h-6 w-6" />

                    <span className="text-base mr-6 text-white/50 ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      A/B Testing
                    </span>

                    <span className="bg-[#DBEAFE] rounded-2xl px-2 text-sm text-[#1E40AF] font-medium">
                      Soon
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* Settings */}
              <li
                className={`p-3 rounded-md last:mb-0 ${
                  pathname.includes("settings") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/app/setting"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("settings") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <SettingsSvg svgClass="shrink-0 h-6 w-6" />

                    <span className="text-base text-white ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Settings
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col mt-auto">
          {userPlanDetails !== null && (
            <div className="flex flex-col px-4 py-8 text-center border-y lg:hidden sidebar-expanded:block">
              <div className="flex justify-between mb-4">
                <h5 className="text-base text-white font-bold">
                  Views Remaining
                </h5>

                <span className="text-sm text-white font-normal">{`${userPlanDetails?.analytics?.views}/${userPlanDetails?.selectedPlan?.props?.videoEmbedingViews}`}</span>
              </div>

              <div className="flex mb-4">
                <progress
                  className="progress progress-success w-full bg-white/50"
                  value={`${userPlanDetails?.analytics?.views}`}
                  max={`${userPlanDetails?.selectedPlan?.props?.videoEmbedingViews}`}
                ></progress>
              </div>

              <div className="flex justify-between">
                <span className="bg-[#DBEAFE] rounded-2xl px-2 text-sm text-[#1E40AF] font-medium">
                  {/* Free Trial */}
                  {`${userPlanDetails?.selectedPlan?.name} plan`}
                </span>

                <span
                  className="text-sm text-white font-normal cursor-pointer"
                  onClick={() => goToPlansHandler()}
                >
                  Upgrade plan
                </span>
              </div>
            </div>
          )}

          {data?.data !== undefined && (
            <div className="flex items-center justify-between px-4 py-8">
              <div className="flex">
                <div className="flex items-center justify-center rounded-lg h-11 w-11 bg-indigo-500 mr-3">
                  <div className="flex items-center justify-center rounded-lg border-2 h-10 w-10 bg-[#EC407A]">
                    {/* <span className="text-sm text-white">E</span> */}
                    <span className="text-sm text-white">{`${data?.data?.firstName.charAt(
                      0
                    )}${data?.data?.lastName.charAt(0)}`}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:hidden sidebar-expanded:block">
                  {/* <h6 className="text-base text-white">Elie MoreReels</h6> */}
                  <h6 className="text-base text-white">{`${data?.data?.firstName} ${data?.data?.lastName}`}</h6>
                  {/* <h6 className="text-sm text-[#CBCBCB]">elie@morereels.com</h6> */}
                  <h6 className="text-sm text-[#CBCBCB]">{`${data?.data?.email}`}</h6>
                </div>
              </div>

              <div className="flex lg:hidden sidebar-expanded:block">
                <Link to="/app/setting">
                  <SettingsSvg color="#CBCBCB" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* <div className="hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
