// Tab "Việc đã lưu" trong trang MyJobs
// Hiện tại jobList luôn rỗng (chưa có API bookmark) → luôn hiển thị EmptyJobState
import { useState } from "react";
import "./SavedJobs.scss";
import EmptyJobState from "../EmptyJobState";
import { useTranslation } from "react-i18next";

function SavedJobs() {
  // jobList: danh sách việc làm đã lưu — hiện luôn rỗng, chờ tích hợp API bookmark
  const [jobList, _setJobList] = useState<unknown[]>([]);
  const { t } = useTranslation("jobseeker");

  return jobList.length === 0 ? (
    <div className="saved-jobs">
      <EmptyJobState
        notificationText={t("savedJobs.notification")}
        emptyMessage={t("savedJobs.emptyMessage")}
        buttonText={t("savedJobs.findJob")}
        buttonLink="/"
      />
    </div>
  ) : (
    <div className="saved-jobs"> Noi dung text </div>
  );
}

export default SavedJobs;
