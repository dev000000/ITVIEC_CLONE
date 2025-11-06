import "./TopJobItem.scss";
import { Tooltip } from "antd";
import logo from "../../assets/images/382e952f-df7e-49c8-aa11-aa22a5ec823a.webp";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "../TagSkill";
import { getRelativeTime } from "../../helpers/formattedTime";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TagStatus from "../TagStatus";
import MB from "../../assets/images/mb-bank.webp";
import SCANDINAVIAN from "../../assets/images/scandinavian-software-park.webp";
import OTSV from "../../assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "../../assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "../../assets/images/tymex.webp";
import ANDPAD from "../../assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "../../assets/images/employment-hero.webp";
import BOSCH from "../../assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "../../assets/images/ssi-securities-corporation.webp";

const logoMap = {
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
function TopJobItem({ job, type, companyInfoAdd }) {
  // type  can be "home", "employer", or "job-detail"
  const navigate = useNavigate();
  companyInfoAdd = companyInfoAdd || {
    companyName: "",
    slug: "",
  };
  job = job || {};
  job = {
    ...job,
    company: {
      companyName: job.company?.companyName || "",
    },
  };
  const isLogin = useSelector((state) => state.UserReducer);

  const handleClick = () => {
    navigate(`${job.id}`);
  };
  const handleNavigate = () => {
    if (type === "home") {
      return window.open(`/viec-lam-it/${job.slug}`, "_blank");;
    }
  };

  const tagListRef = useRef(null);
  const sortedSkills = [...job.requiredSkills].sort(
    (a, b) => a.length - b.length
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
        totalWidth += tagElements[i].offsetWidth + 5;
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
  if (type === "employer") {
    return (
      <div className="job__item" >
        <div className="job__label job__label--hot">
          <span>HOT</span>
        </div>
        <div className="job__time">{getRelativeTime(job.postedAt)}</div>
        <TagStatus status={job.status} />
        <div className="job__name">{job.title}</div>
        <div
          className={
            isLogin.ok === true
              ? "job__salary job__salary--visible"
              : "job__salary"
          }
        >
          <ImCoinDollar />{" "}
          <span>
            {isLogin.ok === true ? job.salary : "Đăng nhập để xem mức lương"}{" "}
          </span>
        </div>
        <div className="job__location">
          <MdLocationCity className="job__location-icon" />
          <span>{job.jobType}</span>
        </div>
        <div className="job__city">
          <CiLocationOn className="job__city-icon" />
          <span>{job.city}</span>
        </div>
        <div className="job__list-tag job__list-tag--employer" ref={tagListRef}>
          {sortedSkills.slice(0, visibleTagsCount).map((skill, index) => (
            <TagSkill key={`${skill}-${index}`} text={skill} />
          ))}
          {sortedSkills.length > visibleTagsCount && (
            <Tooltip
              title={sortedSkills.slice(visibleTagsCount).join(", ")}
              placement="top"
            >
              <span className="job__more-tags">
                +{sortedSkills.length - visibleTagsCount}
              </span>
            </Tooltip>
          )}
        </div>
        <div className="job__button">
          <button onClick={handleClick}>View details</button>
        </div>
      </div>
    );
  }

  return (
    <div className="job__item" onClick={handleNavigate}>
      <div className="job__label job__label--hot">
        <span>HOT</span>
      </div>
      <div className="job__time">{getRelativeTime(job.postedAt)}</div>
      <div className="job__name">{job.title}</div>
      <div className="job__companies">
        <div className="job__companies-logo">
          <img src={logoMap[companyInfoAdd.slug]} alt="logo_companies" />
        </div>
        <div className="job__companies-name">
          {companyInfoAdd.companyName
            ? companyInfoAdd.companyName
            : job.company.companyName || ""}
        </div>
      </div>

      <div
        className={
          isLogin.ok === true
            ? "job__salary job__salary--visible"
            : "job__salary"
        }
      >
        <ImCoinDollar />{" "}
        <span>
          {isLogin.ok === true ? job.salary : "Đăng nhập để xem mức lương"}{" "}
        </span>
      </div>
      <div className="job__location">
        <MdLocationCity className="job__location-icon" />
        <span>{job.jobType}</span>
      </div>
      <div className="job__city">
        <CiLocationOn className="job__city-icon" />
        <span>{job.city}</span>
      </div>
      <div className="job__list-tag" ref={tagListRef}>
        {sortedSkills.slice(0, visibleTagsCount).map((skill, index) => (
          <TagSkill key={`${skill}-${index}`} text={skill} />
        ))}
        {sortedSkills.length > visibleTagsCount && (
          <Tooltip
            title={sortedSkills.slice(visibleTagsCount).join(", ")}
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

export default TopJobItem;
