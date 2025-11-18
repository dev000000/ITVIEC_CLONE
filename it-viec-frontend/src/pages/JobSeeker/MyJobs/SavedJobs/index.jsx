import React, { useState } from "react";
import "./SavedJobs.scss";
import { ImNotification } from "react-icons/im";
import { Link } from "react-router-dom";
import jobEmptyImg from "../../../../assets/images/job-empty.svg";
import EmptyJobState from "../EmptyJobState";
function SavedJobs() {
  const [jobList, setJobList] = useState([]);
  return jobList.length === 0 ? (
    <div className="saved-jobs">
      <EmptyJobState
        notificationText="Bạn có thể lưu tối đa 20 công việc."
        emptyMessage="Bạn chưa lưu công việc nào."
        buttonText="Tìm việc ngay"
        buttonLink="/"
      />
    </div>
  ) : (
    <div className="saved-jobs"> Noi dung text </div>
  );
}

export default SavedJobs;
