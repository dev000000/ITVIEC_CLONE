import React from "react";
import "./TagStatus.scss"
import { LuCircleAlert } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
function TagStatus({ status }) {
  switch (status) {
    case "Active":
      return <div className="tag-status tag-status--active"> <FaRegCheckCircle/> <span>{status}</span></div>;
    case "Closed":
      return <div className="tag-status tag-status--closed"> <IoIosCloseCircleOutline/> <span>{status}</span></div>;
    case "Expired":
      return <div className="tag-status tag-status--expired"> <FaRegClock/> <span>{status}</span></div>;
    case "Draft":
      return <div className="tag-status tag-status--draft"> <LuCircleAlert/> <span>{status}</span></div>;
    default:
      break;
  }
  
}

export default TagStatus;
