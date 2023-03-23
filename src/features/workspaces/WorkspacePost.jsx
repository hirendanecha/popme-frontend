import React, { useState, useRef, useEffect } from "react";
import defaultWorkspaceImage from "../../assets/images/defaultWorkspaceImage.png";
import defaultWorkspaceWebp from "../../assets/images/defaultWorkspaceWebp.webp";
import ClockSvg from "../../assets/svgs/ClockSvg";
import GroupSvg from "../../assets/svgs/GroupSvg";
import MouseSvg from "../../assets/svgs/MouseSvg";
import ThreeDotSvg from "../../assets/svgs/ThreeDotSvg";
import playVideoIcon from "../../assets/images/playVideoIcon.png";

const baseURL = import.meta.env.VITE_BASE_URL;

const WorkspacePost = ({
  item,
  index,
  onDeleteHandler,
  onEditHandler,
  onDuplicateHandler,
}) => {
  // console.log("item", item);

  // console.log(
  //   "video",
  //   baseURL + item?.video?.thumbnailDestination + item?.video?.thumbnail
  // );

  //   console.log("video", `${baseURL + item?.video?.animatedImage}`);

  //   console.log(
  //     "image",
  //     `${
  //       baseURL +
  //       item?.video?.animatedImagetem?.video?.thumbnailDestination +
  //       item?.video?.thumbnail
  //     }`
  //   );

  const [defaultWorkspaceImg, setDefaultWorkspaceImg] = useState(
    item?.video?.thumbnail
      ? baseURL +
          "/" +
          item?.video?.thumbnailDestination +
          "/" +
          item?.video?.thumbnail
      : defaultWorkspaceImage
  );

  // const [showPlayer, setShowPlayer] = useState(false);

  const mouseOver = () => {
    setDefaultWorkspaceImg(
      item?.video?.animatedImage
        ? baseURL + "/" + item?.video?.animatedImage
        : defaultWorkspaceWebp
    );
  };

  const mouseOut = () => {
    setDefaultWorkspaceImg(
      item?.video?.thumbnail
        ? baseURL +
            "/" +
            item?.video?.thumbnailDestination +
            "/" +
            item?.video?.thumbnail
        : defaultWorkspaceImage
    );
  };

  const editWorkspaceHandler = () => {
    onEditHandler(item._id);
  };

  const deleteWorkspaceHandler = () => {
    onDeleteHandler(item._id);
  };

  const duplicateWorkspaceHandler = () => {
    onDuplicateHandler(item._id);
  };

  function ClapprPlayer({ id, source, item }) {
    const myRef = useRef([]);
    myRef.current = [];
    const addToRefs = (el) => {
      if (el && !myRef.current.includes(el)) {
        myRef.current.push(el);
      }
    };

    // console.log("myRef", myRef);

    useEffect(() => {
      // let clappr_player = null;

      var playerElement = document.getElementById(id);
      myRef.current = new Clappr.Player({
        source: source,
        // plugins: [Video360],
        poster:
          baseURL +
          "/" +
          item?.video?.thumbnailDestination +
          "/" +
          item?.video?.thumbnail,
        width: "100%",
        height: "480",
        autoPlay: false,
        loop: true,

        playback: {
          controls: true,
        },
        includeResetStyle: false,
      });

      myRef.current.attachTo(playerElement);

      // console.log("id", id + "play");

      // if (!showPlayer) {
      //   let playAreaButton = document.getElementById(id + "play");
      //   playAreaButton.addEventListener("click", function (event) {
      //     event.stopPropagation();
      //     setShowPlayer(true);
      //     myRef.current.play();
      //   });
      // }

      // if (showPlayer) {
      //   let volumeIcon = document.getElementById(id + "mute");
      //   volumeIcon.addEventListener("click", function (event) {
      //     event.stopPropagation();
      //     setShowPlayer(true);
      //     myRef.current.mute();
      //   });
      // }

      // remove live control bar
      myRef.current.on(Clappr.Events.PLAYER_PLAY, function () {
        myRef.current.core.mediaControl.disable();
      });

      return () => {
        if (myRef.current) {
          myRef.current.destroy();
          myRef.current = null;
        }
      };
    }, [id]);

    return (
      <div className="inline-block w-full">
        <div className="inline-block w-full h-full rounded-t-xl overflow-hidden">
          <div
            className="clappr-player h-full clappr_player_customm"
            id={id}
            ref={addToRefs}
          />
        </div>
      </div>
    );
  }

  function fromNow(
    date,
    nowDate = Date.now(),
    rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
  ) {
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const intervals = [
      { ge: YEAR, divisor: YEAR, unit: "year" },
      { ge: MONTH, divisor: MONTH, unit: "month" },
      { ge: WEEK, divisor: WEEK, unit: "week" },
      { ge: DAY, divisor: DAY, unit: "day" },
      { ge: HOUR, divisor: HOUR, unit: "hour" },
      { ge: MINUTE, divisor: MINUTE, unit: "minute" },
      { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
      { ge: 0, divisor: 1, text: "just now" },
    ];
    const now =
      typeof nowDate === "object"
        ? nowDate.getTime()
        : new Date(nowDate).getTime();
    const diff =
      now - (typeof date === "object" ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const interval of intervals) {
      if (diffAbs >= interval.ge) {
        const x = Math.round(Math.abs(diff) / interval.divisor);
        const isFuture = diff < 0;
        return interval.unit
          ? rft.format(isFuture ? x : -x, interval.unit)
          : interval.text;
      }
    }
  }

  let hih = fromNow(new Date(item?.updatedAt));

  console.log("hih", hih);

  return (
    <>
      <div
        className="inline-block w-full bg-[#E5E7EB] border border-borderColor-main rounded-xl"
        key={item._id}
      >
        <div className="flex flex-col workspace_wraper">
          <div
            className="flex relative"
            // onMouseOver={mouseOver}
            // onMouseLeave={mouseOut}
          >
            <ClapprPlayer
              id={item?._id}
              source={baseURL + "/" + item?.video?.path}
              item={item}
            />
          </div>

          <div className="inline-block w-full p-4 bg-white rounded-b-xl">
            <div className="flex justify-between items-center mb-5">
              <div className="flex flex-col">
                <h4 className=" text-primary-normal text-lg font-bold">
                  {item?.name}
                </h4>

                {/* <p className="text-primary-normal text-sm line-clamp-4 min-h-[89px]">
                  {item?.description}
                </p> */}

                <p className="text-primary-light text-sm">
                  Uploaded {fromNow(new Date(item?.createdAt))}
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
                      <a onClick={editWorkspaceHandler}>Edit</a>
                    </li>
                    <li>
                      <a onClick={duplicateWorkspaceHandler}>Duplicate</a>
                    </li>
                    <li>
                      <a onClick={deleteWorkspaceHandler}>Delete</a>
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
                <p className="text-primary-normal text-sm">Total Views</p>
                <h4 className="text-primary-main text-base font-bold">
                  {item?.totalViews}
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
                  {item?.totalWatchedTime}
                </h4>
              </div>
            </div>

            <div className="flex">
              <div className="flex items-center justify-center w-11 h-11 bg-secondary-light/30 rounded-full mr-2">
                <MouseSvg />
              </div>

              <div className="flex flex-col">
                <p className="text-primary-normal text-sm">Total Clicked CTA</p>
                <h4 className="text-primary-main text-base font-bold">
                  {item?.totalCtaCounter}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspacePost;
