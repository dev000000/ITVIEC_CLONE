import "./TopJobItemEmployer.scss";
import { Tooltip } from "antd";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "@/components/TagSkill";
import { getRelativeTime } from "@/helpers/formattedTime";
import { getJobTypeOptions, getCityLabel } from "@/constants";
import { useNavigate } from "react-router-dom";
import type { JobCardResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import { useVisibleTagCount } from "@/hooks/use-visible-tag-count";
import TagStatus from "../TagStatus";
import { useMemo } from "react";

interface TopJobItemProps {
  job?: JobCardResponse;
}
// Component hiển thị thông tin công việc trong danh sách công việc của nhà tuyển dụng
const TopJobItemEmployer = ({ job }: TopJobItemProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("job");

  const authenticated = useUserStore((state) => state.authenticated);
  const jobTypeOptions = getJobTypeOptions(t);
  const jobTypeLabel = jobTypeOptions.find((opt) => opt.value === job.jobType)?.label || job.jobType;
  const cityLabel = getCityLabel(job.city?.cityName, t);

  // Hàm xử lí khi click vào nút xem chi tiết
  const handleClick = () => {
    navigate(`${job!.id}`);
  };
  
  // Sắp xếp skills theo thứ tự độ dài trước khi hiển thị
  const sortedSkills = useMemo(() => {
    if (!job?.skills) return [];
    return [...job.skills].sort((a, b) => a.skillName.length - b.skillName.length);
  }, [job?.skills]);

  const { tagListRef, visibleTagsCount } = useVisibleTagCount(sortedSkills);

  return (
    <div className="job__item">
      <div className="job__label job__label--hot">
        <span>HOT</span>
      </div>
      <div className="job__time">{getRelativeTime(job.postedAt, t)}</div>
      <TagStatus status={job.status} />
      <div className="job__name">{job.title}</div>
      <div
        className={
          authenticated
            ? "job__salary job__salary--visible"
            : "job__salary"
        }
      >
        <ImCoinDollar />{" "}
        <span>
          {authenticated ? job.salary : t("loginToSeeSalary")}{" "}
        </span>
      </div>
      <div className="job__location">
        <MdLocationCity className="job__location-icon" />
        <span>{jobTypeLabel}</span>
      </div>
      <div className="job__city">
        <CiLocationOn className="job__city-icon" />
        <span>{cityLabel}</span>
      </div>
      <div className="job__list-tag job__list-tag--employer" ref={tagListRef}>
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
      <div className="job__button">
        <button onClick={handleClick}>{t("card.viewDetails")}</button>
      </div>
    </div>
  );
}

export default TopJobItemEmployer;
