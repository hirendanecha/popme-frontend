import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalButton from "../../../components/Button/ModalButton";
import NewInputText from "../../../components/Input/NewInputText";
import { socket } from "../../../services/socketCon";
import { useDispatch, useSelector } from "react-redux";
import { updateWorkspaceOptions } from "../../workspaces/action";

// const baseURL = import.meta.env.VITE_BASE_URL;

const SelectPagesModal = ({ url, websiteId }) => {
  const dispatch = useDispatch();
  const { activeWorkspaceData } = useSelector((state) => state.workspace);
  // console.log("activeWorkspaceData", activeWorkspaceData);

  // console.log("url", url);

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
  const [websitesData, setWebsitesData] = useState([]);

  const updateValue = (data) => {
    setSearchValue(data?.value);
  };

  // console.log("searchValue", searchValue);

  useEffect(() => {
    socket.on("page", (resp) => {
      // console.log("page", resp);
      setWebsitesData([...websitesData, resp]);
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

  return (
    <>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-primary-normal mb-6">
          Select pages
        </h3>

        <NewInputText
          type="text"
          // labelTitle="Your website"
          // labelStyle="text-primary-main text-base font-semibold"
          inputStyle="mb-3 !bg-transparent"
          name="searchWebsite"
          placeholder="Search..."
          // register={register}
          defaultValue={searchValue}
          updateFormValue={updateValue}
        />

        <form>
          {websitesData.length > 0 &&
            websitesData
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
                      value={item}
                    />
                  </label>
                </div>
              ))}

          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <h6 className="text-base font-normal text-primary-main">
                website
              </h6>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-borderColor-main rounded-md mr-2"
                name="first"
                {...register("first", {})}
              />
            </label>
          </div> */}

          {/* <div className="form-control">
            <label className="label cursor-pointer">
              <h6 className="text-base font-normal text-primary-main">
                website 2
              </h6>
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-borderColor-main rounded-md mr-2"
                name="second"
                {...register("second", {})}
              />
            </label>
          </div> */}

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
