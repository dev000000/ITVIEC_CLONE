import "./TopJobItemHome.scss"
import { Tooltip } from "antd";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "@/components/TagSkill";
import { getRelativeTime } from "@/helpers/formattedTime";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import MB from "@/assets/images/mb-bank.webp";
import SCANDINAVIAN from "@/assets/images/scandinavian-software-park.webp";
import OTSV from "@/assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "@/assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "@/assets/images/tymex.webp";
import ANDPAD from "@/assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "@/assets/images/employment-hero.webp";
import BOSCH from "@/assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "@/assets/images/ssi-securities-corporation.webp";
import type { JobCardResponse } from "@/types/response.types";

const logoMap: Record<string, string> = {
  "mb-bank": MB,
  "scandinavian-software-park": SCANDINAVIAN,
  "one-tech-stop-vietnam-company-ltd": OTSV,
  "mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei": MCREDIT,
  tymex: TYMEX,
  "andpad-vietnam-co-ltd": ANDPAD,
  "employment-hero": EMPLOYMENTHERO,
  "bosch-global-software-technologies-company-limited": BOSCH,
  "ssi-securities-corporation": SSI,
};


interface TopJobItemProps {
  job: JobCardResponse;
}

function TopJobItemHome({ job }: TopJobItemProps) {
  const authenticated = useUserStore((state) => state.authenticated);
  const role = useUserStore((state) => state.role);
  const isSeekerLoggedIn = authenticated && role === "SEEKER";

  const handleNavigate = () => {
      return window.open(`/viec-lam-it/${job!.slug}`, "_blank");
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
    <div className="job__item" onClick={handleNavigate}>
      <div className="job__label job__label--hot">
        <span>HOT</span>
      </div>
      <div className="job__time">{getRelativeTime(job.postedAt)}</div>
      <div className="job__name">{job.title}</div>
      <div className="job__companies">
        <div className="job__companies-logo">
          <img src={logoMap[job.company?.slug || ""]} alt="logo_companies" />
        </div>
        <div className="job__companies-name">
          {job.company?.companyName || ""}

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
          {isSeekerLoggedIn ? job.salary : "Đăng nhập để xem mức lương"}{" "}
        </span>
      </div>
      <div className="job__location">
        <MdLocationCity className="job__location-icon" />
        <span>{job.jobType}</span>
      </div>
      <div className="job__city">
        <CiLocationOn className="job__city-icon" />
        <span>{job.city?.cityName}</span>
      </div>
      <div className="job__list-tag" ref={tagListRef}>
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
