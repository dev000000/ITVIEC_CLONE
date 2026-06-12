import { Tag } from "antd";
import { useTranslation } from "react-i18next";

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "default",
  ACTIVE: "success",
  ACTIVE_VISIBLE: "success",
  SCHEDULED: "processing",
  EXPIRED_PENDING: "warning",
  CLOSED: "error",
  EXPIRED: "warning",
};

interface JobStatusBadgeProps {
  status: string;
  effectiveStatus?: string | null;
}

const JobStatusBadge = ({ status, effectiveStatus }: JobStatusBadgeProps) => {
  const { t } = useTranslation("employer");
  const displayStatus = effectiveStatus || status;
  const color = STATUS_COLORS[displayStatus] ?? "default";
  const label = t(`jobs.status.${displayStatus.toLowerCase()}`, { defaultValue: displayStatus });
  return <Tag color={color}>{label}</Tag>;
};

export default JobStatusBadge;
