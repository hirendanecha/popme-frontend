import React from "react";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  function logoutUser() {
    localStorage.clear();
    navigate("/", {
      replace: true,
    });
  }
  return (
    <button
      className='btn btn-ghost ml-4 btn-circle bg-[#0639AB]'
      onClick={() => openNotification()}
    >
      <div className='indicator'>
        <BellIcon className='h-6 w-6 text-white' />
        {noOfNotifications > 0 ? (
          <span className='indicator-item badge bg-[#FF0000] text-white border-0 badge-sm'>
            {noOfNotifications}
          </span>
        ) : null}
      </div>
    </button>
  );
};

export default Notification;
