import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaceById } from "../features/workspaces/action";

const PreviewPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);

  // const { state } = useLocation();
  // const { questions } = state || {};

  // console.log("location", location);
  // console.log("id", id);

  // console.log("dfhfdfdhfdh", window.location.origin);
  // console.log("hostname", window.location.hostname);
  // console.log("pathname", window.location.pathname);
  // console.log("href", window.location.href);
  // console.log("location?.state", location?.state);

  // https://popme-api.opash.in/scripts/fn.js?org=C7A29agd9fuv

  const workspaceChangeHandlerApi = useCallback((id) => {
    dispatch(getWorkspaceById(id))
      .unwrap()
      .then(({ success, data }) => {
        if (success) {
          // console.log("res", res);
          if (success) {
            const scriptTag = document.createElement("script");
            scriptTag.id = "popme-preview-scr";
            scriptTag.src = `http://3.76.141.173:8080/scripts/fn.js?org=${data?.identity}`;
            scriptTag.addEventListener("load", () => setLoaded(true));
            document.body.appendChild(scriptTag);
          }
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

  useEffect(() => {
    if (id) {
      workspaceChangeHandlerApi(id);
    }
    return () => {
      // script already loaded then remove
    };
  }, [id]);

  // useEffect(() => {
  //   const scriptTag = document.createElement("script");
  //   scriptTag.src = "";
  //   scriptTag.addEventListener("load", () => setLoaded(true));
  //   document.body.appendChild(scriptTag);
  // }, []);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();

  // console.log("query", query.get("site"));

  return (
    <div className="inline-block w-full h-screen">
      <div className="inline-block w-full h-full">
        {query.get("site") && (
          <iframe
            id="iFrameExample"
            src={query.get("site")}
            className="w-full h-full"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
