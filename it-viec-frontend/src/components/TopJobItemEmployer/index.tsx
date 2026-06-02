import "./TopJobItemEmployer.scss";
import { Tooltip } from "antd";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "@/components/TagSkill";
import { getRelativeTime } from "@/helpers/formattedTime";
import { getJobTypeOptions, getCityLabel } from "@/constants";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { JobCardResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import { useUserStore } from "@/store/userStore";
import TagStatus from "../TagStatus";

interface TopJobItemProps {
  job?: JobCardResponse;
}

function TopJobItemEmployer({ job }: TopJobItemProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("job");
  const authenticated = useUserStore((state) => state.authenticated);
  const jobTypeOptions = getJobTypeOptions(t);
  const jobTypeLabel = jobTypeOptions.find((opt) => opt.value === job.jobType)?.label || job.jobType;
  const cityLabel = getCityLabel(job.city?.cityName, t);

  const handleClick = () => {
    navigate(`${job!.id}`);
  };

  const tagListRef = useRef<HTMLDivElement>(null);
  const rawSkills = job.skills || [];
  const sortedSkills = [...rawSkills].sort(
    (a, b) => a.skillName.length - b.skillName.length
  );
  const [visibleTagsCount, setVisibleTagsCount] = useState(sortedSkills.length);
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
