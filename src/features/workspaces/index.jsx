import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../redux/slices/headerSlice";
import workspace1 from "../../assets/images/workspace-1.png";
import workspace2 from "../../assets/images/workspace-2.png";
import workspace3 from "../../assets/images/workspace-3.png";
import ThreeDotSvg from "../../assets/svgs/ThreeDotSvg";
import GroupSvg from "../../assets/svgs/GroupSvg";
import ClockSvg from "../../assets/svgs/ClockSvg";
import MouseSvg from "../../assets/svgs/MouseSvg";
import WorkspacePost from "./WorkspacePost";
import {
  addWorkspace,
  deleteWorkspaceById,
  duplicateWorkspaceById,
  getWorkspaceById,
  updateWorkspaceOptions,
  worksapceList,
} from "./action";
import Button from "../../components/Button/Button";
import { setActiveWorkspaceData } from "./reducer/workspaceSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EventEmitter } from "../../utils/event";
import ModalButton from "../../components/Button/ModalButton";
import { getUserPlanDetails } from "../settingsCom/action";

const Workspaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = EventEmitter;

  const renderSwitch = (width) => {
    // console.log("width", width);

    switch (width !== null) {
      case width < 768:
        return 1;

      case width < 1024:
        return 2;

      case width < 1280:
        return 3;

      case width < 1536:
        return 4;

      default:
        return 6;
    }
  };

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log("windowDimensions", windowDimensions);
  // console.log("renderSwitch", renderSwitch(windowDimensions?.width));

  const [workspacePosts, setWorkspacePosts] = useState([]);
  const [allPlayer, setAllPlayer] = useState([]);
  const [newWorkspaceNum, setNewWorkspaceNum] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [page, setPage] = useState(1);

  const perPageSize = 6;

  const { data } = useSelector((state) => state.auth);
  const { deleteWorkspaceId, workspaceList } = useSelector(
    (state) => state.workspace
  );
  const { userPlanDetails } = useSelector((state) => state.setting);

  const workspaceListApi = useCallback((props, options = { merge: false }) => {
    dispatch(worksapceList(props))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          if (options?.merge) {
            setWorkspacePosts((prev) => [...prev, ...res?.data]);
          } else {
            setWorkspacePosts(() => [...res?.data]);
          }
          setTotalPage(res?.pagination?.totalPages);
          setCurrentPage(res?.pagination?.currentPage);
          setNewWorkspaceNum(res?.pagination?.totalItems);
        }

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
    dispatch(setPageTitle({ title: "Workspaces" }));
    workspaceListApi({
      page: page,
      size: renderSwitch(windowDimensions?.width) - 1,
    });
  }, []);

  const loadmoreHandler = () => {
    setPage((prev) => prev + 1);
    workspaceListApi(
      { page: page + 1, size: renderSwitch(windowDimensions?.width) },
      {
        merge: true,
      }
    );
  };

  const createNewWorkspaceHandler = () => {
    if (
      userPlanDetails !== null &&
      workspacePosts?.length <
        userPlanDetails?.selectedPlan?.props?.upToWorkspace
    ) {
      dispatch(addWorkspace())
        .unwrap()
        .then((res) => {
          if (res?.success) {
            dispatch(setActiveWorkspaceData(res?.data));
            navigate("/app/customization", { state: { id: res?.data?._id } });
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
      toast("Your limit has been over please upgrade your plan", {
        type: "info",
      });
    }
  };

  // console.log("workspacePosts", workspacePosts);
  // console.log("workspaceList", workspaceList);

  const duplicateWorkspaceByIdApi = useCallback((id) => {
    // console.log(
    //   "userPlanDetails",
    //   workspaceList?.length,
    //   userPlanDetails?.selectedPlan?.props?.upToWorkspace
    // );

    if (
      userPlanDetails !== null &&
      workspaceList?.length <
        userPlanDetails?.selectedPlan?.props?.upToWorkspace
    ) {
      dispatch(duplicateWorkspaceById(id))
        .unwrap()
        .then((res) => {
          // console.log(res, "response of duplicate");
          if (res?.success) {
            dispatch(setActiveWorkspaceData(res?.data));
            navigate("/app/customization", { state: { id: res?.data?._id } });
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
      toast("Your limit has been over please upgrade your plan", {
        type: "info",
      });
    }
  }, []);

  const onDuplicateHandler = (id) => {
    // console.log(id,"duplicate id")
    duplicateWorkspaceByIdApi(id);
  };

  const deleteWorkspaceByIdApi = useCallback(
    (id) => {
      dispatch(deleteWorkspaceById(id))
        .unwrap()
        .then((res) => {
          if (res?.success) {
            let filterData =
              workspacePosts &&
              workspacePosts?.filter((item) => item?._id !== id);
            setWorkspacePosts(() => [...filterData]);
            // workspaceListApi({ page: page, size: 4 });

            toast(res?.message, {
              type: "success",
            });

            dispatch(getUserPlanDetails());
          }
        })
        .catch((err) => {
          if (err) {
            toast(err, {
              type: "error",
            });
          }
        });
    },
    [workspacePosts]
  );

  const onDeleteHandler = () => {
    if (deleteWorkspaceId !== null) {
      deleteWorkspaceByIdApi(deleteWorkspaceId);
    }
  };

  // console.log("deleteWorkspaceId", deleteWorkspaceId);

  const getWorkspaceByIdApi = useCallback((id) => {
    dispatch(getWorkspaceById(id))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          dispatch(setActiveWorkspaceData(res?.data));
          navigate("/app/customization", { state: { id: res?.data?._id } });
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

  const onEditHandler = (id) => {
    // console.log(id,"edit item id")
    getWorkspaceByIdApi(id);
  };

  // console.log("workspacePosts", workspacePosts);

  // const Data = [
  //   {
  //     id: 1,
  //     name: "Workspace #1",
  //     description: "Uploaded 19 hours ago",
  //     totalViews: 9843,
  //     totalMinWatch: 543,
  //     totalClickedCTA: 346,
  //     img: workspace1,
  //   },
  //   {
  //     id: 2,
  //     name: "Workspace #2",
  //     description: "Uploaded 3 days ago",
  //     totalViews: 253,
  //     totalMinWatch: 129,
  //     totalClickedCTA: 25,
  //     img: workspace2,
  //   },
  //   {
  //     id: 3,
  //     name: "Workspace #3",
  //     description: "Uploaded 15 days ago",
  //     totalViews: 253,
  //     totalMinWatch: 129,
  //     totalClickedCTA: 25,
  //     img: workspace3,
  //   },
  // ];

  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );

  return (
    <div className="min-h-screen py-8 px-4 lg:px-6">
      <div className="inline-block w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {workspacePosts &&
            workspacePosts?.length > 0 &&
            workspacePosts?.map((item, index) => (
              <WorkspacePost
                key={index.toString()}
                item={item}
                index={index.toString()}
                // onDeleteHandler={onDeleteHandler}
                onEditHandler={onEditHandler}
                onDuplicateHandler={onDuplicateHandler}
                allPlayer={allPlayer}
                event={event}
              />
            ))}

          <div className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl h-fit cursor-pointer">
            <div className="flex flex-col">
              <div className="inline-block w-full p-4">
                <div
                  onClick={createNewWorkspaceHandler}
                  className="flex flex-col justify-center items-center border-4 border-dashed border-borderColor-main h-[448px]"
                >
                  {PlusIcon()}
                  <h3 className="text-lg text-primary-normal text-center">
                    <span className="text-secondary-main">Create</span> a new
                    Workspace
                  </h3>
                </div>
              </div>

              <div className="inline-block w-full p-4 bg-white rounded-xl">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h4 className=" text-primary-normal text-lg font-bold min-h-[55px] line-clamp-2">{`Workspace #${
                      data?.data?.workspaceIndex + 1
                    }`}</h4>
                    <p className="text-primary-normal text-sm">
                      Create a new Workspace
                    </p>
                  </div>

                  <div
                    onClick={createNewWorkspaceHandler}
                    className="flex justify-center items-center h-8 w-8 rounded-full bg-secondary-main"
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {workspacePosts?.length <= 0 ||
          (totalPage != currentPage && (
            <div className="flex justify-center mt-8">
              <Button
                text="Load More"
                buttonClass="w-32 text-base max-w-full h-[2.50rem] min-h-[2.50rem]"
                clickHandler={loadmoreHandler}
              />
            </div>
          ))}
      </div>

      <input
        type="checkbox"
        id="delete_verify_modal"
        className="modal-toggle"
      />
      <label htmlFor="delete_verify_modal" className="modal cursor-pointer">
        <label className="modal-box relative bg-white" htmlFor="">
          <label
            htmlFor="delete_verify_modal"
            className="btn btn-xs btn-circle bg-white text-primary-light border-primary-light hover:bg-white hover:border-primary-light absolute right-2 top-2"
          >
            ✕
          </label>

          <h3 className="text-xl font-bold text-primary-normal mb-4">
            Are you sure you want to delete ?
          </h3>

          <div className="flex">
            <div className="inline-block mr-4">
              <ModalButton
                text="Delete"
                id="delete_verify_modal"
                clickHandler={() => onDeleteHandler()}
              />
            </div>

            <div className="inline-block">
              <ModalButton
                text="Cancel"
                id="delete_verify_modal"
                buttonClass="!bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
              />
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default Workspaces;
