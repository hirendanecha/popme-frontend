import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import ModalButton from "../../components/Button/ModalButton";
import NewInputText from "../../components/Input/NewInputText";
import { openNewModal } from "../../redux/slices/newModalSlice";
import { addWebsite } from "../workspaces/action";
import { setCurrentWebsiteUrl } from "../workspaces/reducer/workspaceSlice";
import AddInstantEmbedModal from "./AddInstantEmbedModal";

const ConnectWebsiteModal = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.modal);
  const { activeWorkspaceData } = useSelector((state) => state.workspace);

  // console.log("activeWorkspaceData", activeWorkspaceData);

  const [webUrl, setWebUrl] = useState("");

  const modalClickHandler = (props) => {
    // console.log("activeWorkspace", webUrl);

    if (webUrl.length > 4 && activeWorkspaceData !== null) {
      const data = {
        url: webUrl,
      };
      dispatch(addWebsite({ data: data, id: activeWorkspaceData?._id }))
        .unwrap()
        .then((res) => {
          if (res?.success) {
            dispatch(setCurrentWebsiteUrl(webUrl));
            // dispatch(setActiveWorkspaceData(res?.data));
            dispatch(openNewModal(props));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateValue = (data) => {
    // console.log("updateValue", data);
    setWebUrl(data?.value);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-bold text-primary-normal mb-4">
        Connect a Website
      </h3>
      <p className="mb-5 text-base text-primary-normal font-semibold">
        Insert only your domain/subdomain without https and any other special
        characters.
      </p>

      <NewInputText
        type="text"
        labelStyle="text-primary-main text-base font-semibold"
        inputStyle="mb-3 !bg-transparent"
        name="websiteUrl"
        updateFormValue={updateValue}
        defaultValue={webUrl}
      />

      <div className="flex gap-3">
        <div className="inline-block">
          <ModalButton
            text="Continue"
            id="add-instant-embed"
            buttonClass="mb-4"
            clickHandler={() =>
              modalClickHandler({
                id: "add-instant-embed",
                children: <AddInstantEmbedModal />,
              })
            }
          />
        </div>
        <div className="inline-block">
          <ModalButton
            text="Cancel"
            id={id && id}
            buttonClass="mb-4 !bg-[#F3F3F4] !text-primary-main hover:bg-[#F3F3F4]"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectWebsiteModal;
