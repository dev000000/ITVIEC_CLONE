import dayjs from "dayjs";
import type { TFunction } from "i18next";

export const getRelativeTime = (dateString: string, t?: TFunction): string => {
  if (!dateString || !dayjs(dateString).isValid()) {
    return t ? t("common:relativeTime.undefined") : "Không xác định";
  }
  const now = dayjs();
  const posted = dayjs(dateString);
  const diffMinutes = now.diff(posted, "minute");
  const diffHours = now.diff(posted, "hour");
  const diffDays = now.diff(posted, "day");

  if (!t) {
    // Fallback to Vietnamese if no translation function provided
    if (diffMinutes < 0) {
      return `Sẽ đăng trong ${Math.abs(diffMinutes)} phút`;
    } else if (diffMinutes < 60) {
      return `Đăng ${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
      return `Đăng ${diffHours} giờ trước`;
    } else {
      return `Đăng ${diffDays} ngày trước`;
    }
  }

  if (diffMinutes < 0) {
    return t("common:relativeTime.willPostInMinutes", {
      count: Math.abs(diffMinutes),
    });
  } else if (diffMinutes < 60) {
    return t("common:relativeTime.minutesAgo", { count: diffMinutes });
  } else if (diffHours < 24) {
    return t("common:relativeTime.hoursAgo", { count: diffHours });
  } else {
    return t("common:relativeTime.daysAgo", { count: diffDays });
  }
};
