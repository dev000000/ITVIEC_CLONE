import "./SaveJobButton.scss";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { notification, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useSavedJobsStore } from "@/store/savedJobsStore";
import { useIsSeekerLoggedIn } from "@/hooks/use-is-seeker-logged-in";
import { getLoginRouteByRole } from "@/utils/roleRedirect";
import { ROLE } from "@/types/common.types";
import { saveJobApi, unsaveJobApi } from "@/services/savedJobApi";
import { useEffect } from "react";

interface SaveJobButtonProps {
  jobId: number;
}

const SaveJobButton = ({ jobId }: SaveJobButtonProps) => {
  const { t } = useTranslation("jobseeker");
  const isSeekerLoggedIn = useIsSeekerLoggedIn();
  const seekerLoginPath = getLoginRouteByRole(ROLE.SEEKER);

  const hydrated = useSavedJobsStore((s) => s.hydrated);
  const savedJobIds = useSavedJobsStore((s) => s.savedJobIds);
  const { hydrate, addOptimistic, removeOptimistic, confirm, rollback } =
    useSavedJobsStore.getState();

  const isSaved = savedJobIds.has(jobId);

  useEffect(() => {
    if (isSeekerLoggedIn && !hydrated) {
      hydrate();
    }
  }, [isSeekerLoggedIn, hydrated, hydrate]);

  if (!isSeekerLoggedIn) {
    return (
      <div className="card-job-head__heart">
        <Link to={seekerLoginPath}>
          <FaHeart />
        </Link>
      </div>
    );
  }

  const handleSave = async () => {
    addOptimistic(jobId);
    try {
      await saveJobApi(jobId);
      confirm();
      notification.success({
        message: t("savedJobs.toast.savedTitle"),
        description: (
          <Link to="/viec-lam-cua-toi">{t("savedJobs.toast.viewList")}</Link>
        ),
        placement: "bottomRight",
      });
    } catch (err: unknown) {
      rollback(jobId);
      const code = (err as { response?: { data?: { code?: number } } })?.response
        ?.data?.code;
      if (code === 1095) {
        notification.warning({
          message: t("savedJobs.toast.limitTitle"),
          description: t("savedJobs.toast.limitDesc", { max: 20 }),
          placement: "bottomRight",
        });
      } else {
        notification.error({
          message: t("savedJobs.toast.saveFailTitle"),
          placement: "bottomRight",
        });
      }
    }
  };

  const handleUnsave = async () => {
    removeOptimistic(jobId);
    try {
      await unsaveJobApi(jobId);
      notification.info({
        message: t("savedJobs.toast.unsavedTitle"),
        placement: "bottomRight",
      });
    } catch {
      // rollback: add lại
      addOptimistic(jobId);
      notification.error({
        message: t("savedJobs.toast.saveFailTitle"),
        placement: "bottomRight",
      });
    }
  };

  return (
    <Tooltip
      title={isSaved ? t("savedJobs.tooltip.saved") : t("savedJobs.tooltip.save")}
      placement="top"
    >
      <button
        type="button"
        className={`save-job-btn${isSaved ? " save-job-btn--saved" : ""}`}
        onClick={isSaved ? handleUnsave : handleSave}
      >
        <FaHeart />
      </button>
    </Tooltip>
  );
};

export default SaveJobButton;
