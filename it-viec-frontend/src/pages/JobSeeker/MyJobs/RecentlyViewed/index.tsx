// Tab "Việc đã xem gần đây" trong trang MyJobs
// Hiện tại jobList luôn rỗng (chưa có API theo dõi lịch sử xem) → luôn hiển thị EmptyJobState
import { useState } from "react";
import "./RecentlyViewed.scss";
import EmptyJobState from "../EmptyJobState";
import { useTranslation } from "react-i18next";

function RecentlyViewed() {
  // jobList: danh sách việc làm đã xem — hiện luôn rỗng, chờ tích hợp API tracking lịch sử
  const [jobList, _setJobList] = useState<unknown[]>([]);
  const { t } = useTranslation("jobseeker");

  return jobList.length === 0 ? (
    <div className="applied-jobs">
      <EmptyJobState
        notificationText={t("recentlyViewed.notification")}
        emptyMessage={t("recentlyViewed.emptyMessage")}
        buttonText={t("recentlyViewed.findJob")}
        buttonLink="/"
      />
    </div>
  ) : (
    <div className="applied-jobs"> Noi dung text </div>
  );
}

export default RecentlyViewed;
