import "./TopJobItemHome.scss"
import { Tooltip } from "antd";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "@/components/TagSkill";
import { getRelativeTime } from "@/helpers/formattedTime";
import { getJobTypeOptions, getCityLabel } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import type { JobCardResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";

interface TopJobItemProps {
  job: JobCardResponse;
}
// Component hiển thị một item việc làm trong phần Top Job trên trang chủ
const TopJobItemHome = ({ job }: TopJobItemProps) => {
  console.log("job in TopJobItemHome component:", job);

  // Lấy thông tin xác thực và vai trò người dùng từ store
  const authenticated = useUserStore((state) => state.authenticated);
  const role = useUserStore((state) => state.role);
  // Kiểm tra nếu người dùng đã đăng nhập và có vai trò là "SEEKER"
  const isSeekerLoggedIn = authenticated && role === "SEEKER";

  const { t } = useTranslation("job");
  // Sử dụng useRef để tham chiếu đến wrapper chứa các tag kỹ năng
  const tagListRef = useRef<HTMLDivElement>(null);

  // Lấy nhãn loại công việc từ giá trị jobType (i18n)
  const jobTypeOptions = getJobTypeOptions(t);
  const jobTypeLabel = jobTypeOptions.find((opt) => opt.value === job.jobType)?.label || job.jobType;

  // Lấy nhãn thành phố từ tên thành phố (i18n)
  const cityLabel = getCityLabel(job.city?.cityName, t);

  // Sắp xếp kỹ năng theo độ dài tên để ưu tiên hiển thị những kỹ năng có tên ngắn hơn
  const sortedSkills = [...job.skills].sort(
    (a, b) => a.skillName.length - b.skillName.length
  );
  const [visibleTagsCount, setVisibleTagsCount] = useState(sortedSkills.length);

  // Sử dụng useEffect để tính toán số lượng tag kỹ năng hiển thị dựa trên kích thước của wrapper và kích thước của các tag kỹ năng
  useEffect(() => {
    const handleTagOverflow = () => {
      const tagList = tagListRef.current;
      if (!tagList) return;
      const tagElements = tagList.getElementsByClassName("tag-skill");
      const wrapperWidth = tagList.offsetWidth;
      let totalWidth = 0;
      let count = 0;
      for (let i = 0; i < tagElements.length; i++) {
        totalWidth += (tagElements[i] as HTMLElement).offsetWidth + 5;
        if (totalWidth > wrapperWidth) {
          break;
        }
        count++;
      }
      setVisibleTagsCount(count);
      window.addEventListener("resize", handleTagOverflow);
      return () => {
        window.removeEventListener("resize", handleTagOverflow);
      };
    };
    handleTagOverflow();
  }, [sortedSkills.length]);

  // Hàm xử lý khi người dùng click vào item việc làm, mở trang chi tiết việc làm trong tab mới
  const handleNavigate = () => {
    return window.open(`/viec-lam-it/${job!.slug}`, "_blank");
  };


  return (
    <div className="job__item" onClick={handleNavigate}>
      <div className="job__label job__label--hot">
        <span>HOT</span>
      </div>
      {/* Hiển thị thông tin thời gian đăng tuyển */}
      <div className="job__time">{getRelativeTime(job.postedAt, t)}</div>
      {/* Hiển thị tên công việc */}
      <div className="job__name">{job.title}</div>
      <div className="job__companies">
        {/* Hiển thị logo công ty */}
        <div className="job__companies-logo">
          <img src={job.company?.logoUrl || IMAGE_NOT_FOUND} alt="logo_companies" />
        </div>
        {/* Hiển thị tên công ty */}
        <div className="job__companies-name">
          {job.company?.companyName || "--"}

        </div>
      </div>

      <div
        className={
          isSeekerLoggedIn
            ? "job__salary job__salary--visible"
            : "job__salary"
        }
      >
        <ImCoinDollar />{" "}
        <span>
          {isSeekerLoggedIn ? job.salary : t("loginToSeeSalary")}{" "}
        </span>
      </div>
      <div className="job__location">
        <MdLocationCity className="job__location-icon" />
        {/* Hiển thị loại công việc */}
        <span>{jobTypeLabel}</span>
      </div>
      <div className="job__city">
        {/* Hiển thị thành phố */}
        <CiLocationOn className="job__city-icon" />
        <span>{cityLabel}</span>
      </div>
      <div className="job__list-tag" ref={tagListRef}>
        {/* Hiển thị kỹ năng */}
        {sortedSkills.slice(0, visibleTagsCount).map((skill) => (
          <TagSkill key={skill.id} text={skill.skillName} />
        ))}
        {sortedSkills.length > visibleTagsCount && (
          <Tooltip
            title={sortedSkills
              .slice(visibleTagsCount)
              .map((skill) => skill.skillName)
              .join(", ")}
            placement="top"
          >
            <span className="job__more-tags">
              +{sortedSkills.length - visibleTagsCount}
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default TopJobItemHome;
