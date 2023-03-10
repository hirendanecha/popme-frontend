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
import { worksapceList } from "./action";
import Button from "../../components/Button/Button";

const Workspaces = () => {
  const dispatch = useDispatch();

  const [workspacePosts, setWorkspacePosts] = useState([]);

  const [totalPage, setTotalPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [page, setPage] = useState(1);

  const perPageSize = 2;

  const workspaceListApi = useCallback((props, options = { merge: false }) => {
    dispatch(worksapceList(props))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          // setWorkspacePosts((prev) => [...prev, ...res?.data]);
          if (options?.merge) {
            setWorkspacePosts((prev) => [...prev, ...res?.data]);
          } else {
            setWorkspacePosts(() => [...res?.data]);
          }
          setTotalPage(res?.pagination?.totalPages);
          setCurrentPage(res?.pagination?.currentPage);
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

    return () => {
      setWorkspacePosts((prev) => [...prev]);
    };
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
              <WorkspacePost key={index} item={item} index={index} />
            ))}

          {/* {Data &&
            Data.map((item, index) => (
              <div
                className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl"
                key={index}
              >
                <div className="flex flex-col">
                  <div className="flex p-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-[340px] w-full object-cover"
                    />
                  </div>

                  <div className="inline-block w-full p-4 bg-white rounded-xl mt-2">
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex flex-col">
                        <h4 className=" text-primary-normal text-lg font-bold">
                          {item.name}
                        </h4>
                        <p className="text-primary-normal text-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex">
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <label tabIndex={index} className="cursor-pointer">
                            <ThreeDotSvg />
                          </label>

                          <ul
                            tabIndex={index}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li>
                              <a>Edit</a>
                            </li>
                            <li>
                              <a>Duplicate</a>
                            </li>
                            <li>
                              <a>Delete</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex mb-5">
                      <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                        <GroupSvg />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-primary-normal text-sm">
                          Total Views
                        </p>
                        <h4 className="text-primary-main text-base font-bold">
                          {item.totalViews}
                        </h4>
                      </div>
                    </div>

                    <div className="flex mb-5">
                      <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                        <ClockSvg />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-primary-normal text-sm">
                          Total Minutes Watchtime
                        </p>
                        <h4 className="text-primary-main text-base font-bold">
                          {item.totalMinWatch}
                        </h4>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                        <MouseSvg />
                      </div>

                      <div className="flex flex-col">
                        <p className="text-primary-normal text-sm">
                          Total Clicked CTA
                        </p>
                        <h4 className="text-primary-main text-base font-bold">
                          {item.totalClickedCTA}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}

          <div className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl h-fit cursor-pointer">
            <div className="flex flex-col">
              <div className="inline-block w-full p-4">
                <div className="flex flex-col justify-center items-center border-4 border-dashed border-borderColor-main h-[340px]">
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
                      workspacePosts &&
                      workspacePosts?.length > 0 &&
                      workspacePosts?.length + 1
                    }`}</h4>
                    <p className="text-primary-normal text-sm">
                      Create a new Workspace
                    </p>
                  </div>

                  <div className="flex justify-center items-center h-8 w-8 rounded-full bg-secondary-main">
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
