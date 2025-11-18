import dayjs from "dayjs";
export const getRelativeTime = (dateString) => {
  if (!dateString || !dayjs(dateString).isValid()) return "Không xác định";
  const now = dayjs();
  const posted = dayjs(dateString);
  const diffMinutes = now.diff(posted, "minute");
  const diffHours = now.diff(posted, "hour");
  const diffDays = now.diff(posted, "day");

  if (diffMinutes < 0) {
    return `Sẽ đăng trong ${Math.abs(diffMinutes)} phút`;
  } else if (diffMinutes < 60) {
    return `Đăng ${diffMinutes} phút trước`;
  } else if (diffHours < 24) {
    return `Đăng ${diffHours} giờ trước`;
  } else {
    return `Đăng ${diffDays} ngày trước`;
  }
};