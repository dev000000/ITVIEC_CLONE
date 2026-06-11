import "./SaveJobButton.scss";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useSavedJobsStore } from "@/store/savedJobsStore";
import { useIsSeekerLoggedIn } from "@/hooks/use-is-seeker-logged-in";
import { getLoginRouteByRole } from "@/utils/roleRedirect";
import { ROLE } from "@/types/common.types";
import { saveJobApi, unsaveJobApi } from "@/services/savedJobApi";
import { useEffect } from "react";

const SAVED_JOBS_PATH = "/viec-lam-cua-toi";
const SAVE_TOAST_VIEW_LIST_ID = "save-job-toast-view-list";

interface SaveJobButtonProps {
  jobId: number;
}

const SaveJobButton = ({ jobId }: SaveJobButtonProps) => {
  const { t } = useTranslation("jobseeker");
  const navigate = useNavigate();
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

  const showSaveSuccessToast = () => {
    if (Swal.isVisible()) {
      Swal.close();
    }

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true,
      html: `
        <div class="save-job-btn__toast">
          <p class="save-job-btn__toast-message">${t("savedJobs.toast.savedTitle")}</p>
          <button type="button" id="${SAVE_TOAST_VIEW_LIST_ID}" class="save-job-btn__toast-link">
            ${t("savedJobs.toast.viewList")}
          </button>
        </div>
      `,
      didOpen: (popup) => {
        popup.querySelector(`#${SAVE_TOAST_VIEW_LIST_ID}`)?.addEventListener("click", () => {
          Swal.close();
          navigate(SAVED_JOBS_PATH);
        });
      },
    });
  };

  const showSaveFailToast = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: t("savedJobs.toast.saveFailTitle"),
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const handleSave = async () => {
    addOptimistic(jobId);
    try {
      await saveJobApi(jobId);
      confirm();
      showSaveSuccessToast();
    } catch (err: unknown) {
      rollback(jobId);
      const code = (err as { response?: { data?: { code?: number } } })?.response
        ?.data?.code;
      if (code === 1095) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: t("savedJobs.toast.limitTitle"),
          text: t("savedJobs.toast.limitDesc", { max: 20 }),
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        showSaveFailToast();
      }
    }
  };

  const handleUnsave = async () => {
    removeOptimistic(jobId);
    try {
      await unsaveJobApi(jobId);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: t("savedJobs.toast.unsavedTitle"),
        showConfirmButton: false,
        timer: 3000,
      });
    } catch {
      addOptimistic(jobId);
      showSaveFailToast();
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
