import React, { useState } from "react";
import "./RecentlyViewed.scss";
import EmptyJobState from "../EmptyJobState";
function RecentlyViewed() {
  const [jobList, setJobList] = useState([]);
  return jobList.length === 0 ? (
    <div className="applied-jobs">
      <EmptyJobState
        notificationText="Chỉ hiển thị công việc đã xem trong 3 tháng gần nhất"
        emptyMessage="Bạn chưa xem công việc nào trong 12 tháng qua."
        buttonText="Tìm việc ngay"
        buttonLink="/"
      />
    </div>
  ) : (
    <div className="applied-jobs"> Noi dung text </div>
  );
}

export default RecentlyViewed;
