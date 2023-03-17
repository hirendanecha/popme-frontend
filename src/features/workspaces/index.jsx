import React, { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
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

const Workspaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [workspacePosts, setWorkspacePosts] = useState([]);

  const [newWorkspaceNum, setNewWorkspaceNum] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [page, setPage] = useState(1);

  const perPageSize = 4;

  const workspaceListApi = useCallback((props, options = { merge: false }) => {
    dispatch(worksapceList(props))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          // console.log(res, "ressss>>");
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
    workspaceListApi({ page: page, size: perPageSize });
  }, []);

  const loadmoreHandler = () => {
    setPage((prev) => prev + 1);
    workspaceListApi(
      { page: page + 1, size: perPageSize },
      {
        merge: true,
      }
    );
  };

  const createNewWorkspaceHandler = () => {
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
  };

  const duplicateWorkspaceByIdApi = useCallback((id) => {
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
            // console.log(res, "res of delete");
            let filterData =
              workspacePosts &&
              workspacePosts?.filter((item) => item?._id !== id);
            setWorkspacePosts(() => [...filterData]);
            // workspaceListApi({ page: page, size: 4 });
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

  // console.log("workspacePosts", workspacePosts);

  const onDeleteHandler = (id) => {
    // console.log(id,"id of deleted item")
    deleteWorkspaceByIdApi(id);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {workspacePosts &&
            workspacePosts?.length > 0 &&
            workspacePosts?.map((item, index) => (
              <WorkspacePost
                key={index}
                item={item}
                index={index}
                onDeleteHandler={onDeleteHandler}
                onEditHandler={onEditHandler}
                onDuplicateHandler={onDuplicateHandler}
              />
            ))}

          <div className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl h-fit cursor-pointer">
            <div className="flex flex-col">
              <div className="inline-block w-full p-4">
                <div
                  onClick={createNewWorkspaceHandler}
                  className="flex flex-col justify-center items-center border-4 border-dashed border-borderColor-main h-[340px]"
                >
                  {PlusIcon()}
                  <h3 className="text-lg text-primary-normal">
                    <span className="text-secondary-main">Create</span> a new
                    Workspace
                  </h3>
                </div>
              </div>

              <div className="inline-block w-full p-4 bg-white rounded-xl mt-2">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h4 className=" text-primary-normal text-lg font-bold">{`Workspace #${
                      // workspacePosts &&
                      // workspacePosts?.length > 0 &&
                      // workspacePosts?.length + 1
                      newWorkspaceNum &&
                      newWorkspaceNum > 0 &&
                      newWorkspaceNum + 1
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
    </div>
  );
};

export default Workspaces;
