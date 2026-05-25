import { useState } from "react";
import "./SavedJobs.scss";
import EmptyJobState from "../EmptyJobState";

function SavedJobs() {
  const [jobList, _setJobList] = useState<unknown[]>([]);

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
