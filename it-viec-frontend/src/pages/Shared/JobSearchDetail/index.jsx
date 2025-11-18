import "./JobSearchDetail.scss";
import { Link, useOutletContext } from "react-router-dom";
import { ImCoinDollar } from "react-icons/im";
import logo from "../../../assets/images/Companylogo.webp";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationCity } from "react-icons/md";
import { GoClock } from "react-icons/go";
import TagSkill from "../../../components/TagSkill";
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { getRelativeTime } from "../../../helpers/formattedTime";
function JobSearchDetail() {
  let { jobSelected } = useOutletContext();
    const sortedSkills = [...jobSelected.requiredSkills].sort(
    (a, b) => a.length - b.length
  );
  const isLogin = useSelector((state) => state.UserReducer);
  const tagListRef = useRef(null);
  const [visibleTagsCount, setVisibleTagsCount] = useState(
    sortedSkills.length || 0
  );
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
  return (
    <div className="job-search-detail">
      <div className="job-search-detail__head">
        <div className="job-search-detail__head-content">
          <div className="job-search-detail__head-left">
            <img src={logo} alt="logo_company" />
          </div>
          <div className="job-search-detail__head-right">
            <h2 className="job-search-detail__head-name">
              <a href={`/viec-lam-it/${jobSelected.slug}`} rel="noopener noreferrer" target="_blank">{jobSelected.title || "???"}</a>
            </h2>
            <Link to="#" className="job-search-detail__head-company">
              {jobSelected.company?.companyName || "???"}
            </Link>
            <div className="job-search-detail__head-salary">
              <ImCoinDollar />
              <span>{jobSelected.salary || "???"}</span>
            </div>
          </div>
        </div>
        <div className="card-job-head__wrap-button">
          <Link
            to={`/viec-lam-it/${jobSelected.slug}/job_applications/new`}
            // target="_blank"
            className="card-job-head__button"
          >
            {" "}
            Ứng tuyển{" "}
          </Link>
          {isLogin ? (
            <div className="card-job-head__heart">
              <FaHeart />
            </div>
          ) : (
            <div className="card-job-head__heart">
              <Link to="/login">
                <FaHeart />
              </Link>
            </div>
          )}
        </div>
      </div>
      <hr className="hr" />
      <div className="job-search-detail__body">
        <div className="job-search-detail__preview-job">
          <div className="job-search-detail__list-item">
            <div className="job-search-detail__item">
              <IoLocationOutline />
              <span>{jobSelected.location || "???"}</span>
            </div>
            <div className="job-search-detail__item">
              <MdLocationCity />
              <span>{jobSelected.jobType || "???"}</span>
            </div>
            <div className="job-search-detail__item">
              <GoClock />
              <span> {getRelativeTime(jobSelected.postedAt)} </span>
            </div>
          </div>
          <div className="divide--dashed--small"></div>
          <div className="job-search-detail__skill-wrap">
            <div className="job-search-detail__text">Kỹ năng:</div>
            <div className="job-search-detail__skills">
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
          </div>
          <div className="divide--dashed--large"></div>
          <div className="html-preview">
            <h2>3 Lý do để gia nhập công ty</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobSelected.jobReason),
              }} // Làm sạch HTML trước khi hiển thị
            />
            <h2>Mô tả công việc</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobSelected.jobRequirements),
              }} // Làm sạch HTML trước khi hiển thị
            />
            <h2>Yêu cầu công việc</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobSelected.whyJoinUs),
              }} // Làm sạch HTML trước khi hiển thị
            />
            <h2>Tại sao bạn sẽ yêu thích làm việc tại đây</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobSelected.jobDescription),
              }} // Làm sạch HTML trước khi hiển thị
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearchDetail;
