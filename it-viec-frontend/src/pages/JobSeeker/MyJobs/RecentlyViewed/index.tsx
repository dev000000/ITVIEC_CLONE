import { useState } from "react";
import "./RecentlyViewed.scss";
import EmptyJobState from "../EmptyJobState";
import { useTranslation } from "react-i18next";

function RecentlyViewed() {
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
