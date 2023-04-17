import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalButton from "../../../components/Button/ModalButton";
import NewInputText from "../../../components/Input/NewInputText";
import { socket } from "../../../services/socketCon";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceOptions } from "../../workspaces/action";
import {
  openNewModal,
  setModalData,
} from "../../../redux/slices/newModalSlice";
import NotFoundWebsiteModal from "./NotFoundWebsiteModal";

// const baseURL = import.meta.env.VITE_BASE_URL;

const SelectPagesModal = ({ url, websiteId }) => {
  const dispatch = useDispatch();
  const { activeWorkspaceData } = useSelector((state) => state.workspace);
  const modalData = useSelector((state) => state.modal);

  // console.log("activeWorkspaceData", activeWorkspaceData);
  // console.log("url", url);
  // console.log("modalData", modalData);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      website: {
        show: "some",
        url: url ? url : "",
        _id: websiteId ? websiteId : "",
        pages: [],
      },
    },
  });

  const onSubmit = (data) => {
    // console.log("darta", data);

    dispatch(
      updateWorkspaceOptions({
        data: data,
        id: activeWorkspaceData?._id,
      })
    )
      .unwrap()
      .then((res) => {
        // console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    {
      name: "first",
      label: "website",
    },
    {
      name: "second",
      label: "website 2",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  // const [websitesData, setWebsitesData] = useState([]);

  const updateValue = (data) => {
    setSearchValue(data?.value);
  };

  // console.log("searchValue", searchValue);

  useEffect(() => {
    socket.on("page", (resp) => {
      // console.log("page", resp);
      // setWebsitesData((prev) => [...prev, resp]);

      dispatch(setModalData(resp));
    });

    socket.on("page-end", (resp) => {
      // console.log("page-end", resp);
    });

    socket.on("page-error", (resp) => {
      // console.log("page-error", resp);
    });

    return () => {
      socket.off("page");
      socket.off("page-end");
      socket.off("page-error");
    };
  }, []);

  // console.log("websitesData", websitesData);

  // let filterData = modalData?.data?.filter((item) => {
  //   return searchValue.toLowerCase() === ""
  //     ? item
  //     : item.toLowerCase().includes(searchValue);
  // });

  // console.log("filterData", filterData);

  const filterDataHandler = (data, string) => {
    let filterData = data?.filter((item) => {
      return string.toLowerCase() === ""
        ? item
        : item.toLowerCase().includes(string);
    });

    return filterData;
  };

  const notFindWebsiteModalClickHandler = (props) => {
    dispatch(openNewModal(props));
  };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-primary-normal mb-6">
          Select pages
        </h3>

        <NewInputText
          type="text"
          inputStyle="mb-3 !bg-transparent"
          name="searchWebsite"
          placeholder="Search..."
          defaultValue={searchValue}
          updateFormValue={updateValue}
        />

        {/* {console.log("modalData?.data", modalData?.data)} */}

        <form>
          {modalData?.data?.length > 0 &&
            modalData?.data
              ?.filter((item) => {
                return searchValue.toLowerCase() === ""
                  ? item
                  : item.toLowerCase().includes(searchValue);
              })
              ?.map((item, index) => (
                <div className="form-control" key={index}>
                  <label className="label cursor-pointer">
                    <h6 className="text-base font-normal text-primary-main">
                      {item}
                    </h6>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-borderColor-main rounded-md mr-2"
                      name="website.pages"
                      {...register(`website.pages`, {})}
                      value={new URL(item)?.pathname}
                    />
                  </label>
                </div>
              ))}

          {modalData?.data?.length > 0 &&
            filterDataHandler(modalData?.data, searchValue).length === 0 && (
              <ModalButton
                text="I can't find a page"
                id="not-found-website"
                buttonClass="bg-transparent !text-primary-main hover:bg-transparent text-base !border border-borderColor-main hover:border-borderColor-main"
                clickHandler={() =>
                  notFindWebsiteModalClickHandler({
                    id: "not-found-website",
                    children: <NotFoundWebsiteModal />,
                  })
                }
              />
            )}

          {/* {console.log("loghh", filterDataHandler(modalData?.data, searchValue))} */}

          <div className="inline-block mt-6 mr-3">
            <ModalButton
              text="Use selected"
              id="select-pages"
              clickHandler={() => handleSubmit((d) => onSubmit(d))()}
            />
          </div>

          <div className="inline-block mt-6">
            <ModalButton
              text="Cancel"
              id="select-pages"
              buttonClass="!bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SelectPagesModal;
