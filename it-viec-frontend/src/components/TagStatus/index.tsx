import "./TagStatus.scss";
import { LuCircleAlert } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import { getJobStatusOptions } from "@/constants";

type JobStatusLabel = "ACTIVE" | "CLOSED" | "EXPIRED" | "DRAFT";

interface TagStatusProps {
  status: JobStatusLabel;
}

function TagStatus({ status }: TagStatusProps) {
  const { t } = useTranslation();
  const label = getJobStatusOptions(t).find((o) => o.value === status)?.label ?? status;

  switch (status) {
    case "ACTIVE":
      return (
        <div className="tag-status tag-status--active">
          <FaRegCheckCircle /> <span>{label}</span>
        </div>
      );
    case "CLOSED":
      return (
        <div className="tag-status tag-status--closed">
          <IoIosCloseCircleOutline /> <span>{label}</span>
        </div>
      );
    case "EXPIRED":
      return (
        <div className="tag-status tag-status--expired">
          <FaRegClock /> <span>{label}</span>
        </div>
      );
    case "DRAFT":
      return (
        <div className="tag-status tag-status--draft">
          <LuCircleAlert /> <span>{label}</span>
        </div>
      );
    default:
      return null;
  }
}

export default TagStatus;
