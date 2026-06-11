import "./CardSavedJob.scss";
import { FaHeart } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationCity } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";
import type { SavedJobItemResponse } from "@/types/response.types";
import { getRelativeTime } from "@/helpers/formattedTime";
import { getJobTypeOptions } from "@/constants";
import { saveJobApi, unsaveJobApi } from "@/services/savedJobApi";
import { useSavedJobsStore } from "@/store/savedJobsStore";

const UNSAVE_TOAST_UNDO_ID = "saved-jobs-undo-btn";

interface CardSavedJobProps {
  item: SavedJobItemResponse;
  appliedJobIds: Set<number>;
  onRemoved: (jobId: number) => void;
  onRestored: (snapshot: SavedJobItemResponse) => void;
}

const CardSavedJob = ({
  item,
  appliedJobIds,
  onRemoved,
  onRestored,
}: CardSavedJobProps) => {
  const { t } = useTranslation("jobseeker");
  const navigate = useNavigate();
  const jobTypeOptions = getJobTypeOptions(t as Parameters<typeof getJobTypeOptions>[0]);
  const jobTypeLabel =
    jobTypeOptions.find((opt) => opt.value === item.jobType)?.label ?? item.jobType;

  const now = dayjs();
  const expiresAt = dayjs(item.expiresAt);
  const daysUntilExpiry = expiresAt.diff(now, "day");
  const isExpiredByDate = now.isAfter(expiresAt);
  const isExpiredByStatus = item.status === "EXPIRED";
  const isClosed = item.status === "CLOSED";
  const isInactive = isExpiredByDate || isExpiredByStatus || isClosed;
  const hasApplied = appliedJobIds.has(item.id);

  const handleCardClick = () => {
    navigate(`/viec-lam-it/${item.slug}`);
  };

  const showUnsaveToast = (jobId: number, snapshot: SavedJobItemResponse) => {
    // Chỉ giữ toast (và undo) của lần bỏ lưu cuối cùng
    if (Swal.isVisible()) {
      Swal.close();
    }

    const handleUndo = async () => {
      Swal.close();
      const { addOptimistic, removeOptimistic } = useSavedJobsStore.getState();
      addOptimistic(jobId);
      onRestored(snapshot);

      try {
        await saveJobApi(jobId);
      } catch {
        removeOptimistic(jobId);
        onRemoved(jobId);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: t("savedJobs.toast.saveFailTitle"),
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      showConfirmButton: false,
      showCloseButton: true,
      timer: 5000,
      timerProgressBar: true,
      html: `
        <div class="card-saved-job__unsave-toast">
          <p class="card-saved-job__unsave-toast-message">${t("savedJobs.toast.unsavedTitle")}</p>
          <button type="button" id="${UNSAVE_TOAST_UNDO_ID}" class="card-saved-job__unsave-toast-undo">
            ${t("savedJobs.toast.undo")}
          </button>
        </div>
      `,
      didOpen: (popup) => {
        popup.querySelector(`#${UNSAVE_TOAST_UNDO_ID}`)?.addEventListener("click", handleUndo);
      },
      willClose: () => {
        useSavedJobsStore.setState({ lastUnsavedJob: null });
      },
    });
  };

  const handleUnsave = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const snapshot = { ...item };
    const { removeOptimistic, addOptimistic } = useSavedJobsStore.getState();

    removeOptimistic(item.id, snapshot);
    onRemoved(item.id);

    try {
      await unsaveJobApi(item.id);
      showUnsaveToast(item.id, snapshot);
    } catch {
      addOptimistic(item.id);
      onRestored(snapshot);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: t("savedJobs.toast.saveFailTitle"),
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const renderApplyButton = () => {
    if (isClosed) {
      return (
        <span className="card-saved-job__apply-btn card-saved-job__apply-btn--disabled">
          {t("savedJobs.closed")}
        </span>
      );
    }
    if (isExpiredByDate || isExpiredByStatus) {
      return (
        <span className="card-saved-job__apply-btn card-saved-job__apply-btn--disabled">
          {t("savedJobs.expired")}
        </span>
      );
    }
    if (hasApplied) {
      return (
        <span className="card-saved-job__apply-btn card-saved-job__apply-btn--disabled">
          {t("savedJobs.alreadyApplied")}
        </span>
      );
    }
    return (
      <Link
        to={`/viec-lam-it/${item.slug}/job_applications/new`}
        className="card-saved-job__apply-btn"
        onClick={(e) => e.stopPropagation()}
      >
        {t("savedJobs.apply")}
      </Link>
    );
  };

  return (
    <div className="card-saved-job" onClick={handleCardClick}>
      <div className="card-saved-job__wrapper">
        <div className="card-saved-job__left">
          <div className="card-saved-job__img-wrap">
            <img
              src={item.company?.logoUrl || IMAGE_NOT_FOUND}
              alt={item.company?.companyName || "company"}
            />
          </div>
          <div className="card-saved-job__content-wrap">
            <h4 className="card-saved-job__title">
              <a
                href={`/viec-lam-it/${item.slug}`}
                onClick={(e) => e.stopPropagation()}
              >
                {item.title}
              </a>
            </h4>
            <Link
              to={`/cong-ty/${item.company?.slug}`}
              className="card-saved-job__company"
              onClick={(e) => e.stopPropagation()}
            >
              {item.company?.companyName}
            </Link>
            <div className="card-saved-job__meta">
              {item.city?.cityName && (
                <span className="card-saved-job__meta-item">
                  <IoLocationOutline />
                  {item.city.cityName}
                </span>
              )}
              {item.jobType && (
                <span className="card-saved-job__meta-item">
                  <MdLocationCity />
                  {jobTypeLabel}
                </span>
              )}
              {item.salary && (
                <span className="card-saved-job__meta-item card-saved-job__salary">
                  <AiOutlineDollarCircle />
                  {item.salary}
                </span>
              )}
              {item.postedAt && (
                <span className="card-saved-job__meta-item">
                  <GoClock />
                  {getRelativeTime(item.postedAt, t as Parameters<typeof getRelativeTime>[1])}
                </span>
              )}
              {!isInactive && item.expiresAt && (
                <span className="card-saved-job__meta-item card-saved-job__expires">
                  {t("savedJobs.expiresIn", { days: daysUntilExpiry })}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="card-saved-job__right">
          {renderApplyButton()}
          <Tooltip title={t("savedJobs.tooltip.saved")} placement="top">
            <button
              type="button"
              className="card-saved-job__heart-btn"
              onClick={handleUnsave}
            >
              <FaHeart />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default CardSavedJob;
