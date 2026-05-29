import { useState } from "react";
import "./SavedJobs.scss";
import EmptyJobState from "../EmptyJobState";
import { useTranslation } from "react-i18next";

function SavedJobs() {
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
