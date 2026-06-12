import "./JobSearchDetail.scss";
import { Link, useOutletContext } from "react-router-dom";
import { ImCoinDollar } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocationCity } from "react-icons/md";
import { GoClock } from "react-icons/go";
import TagSkill from "@/components/TagSkill";
import { Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { getRelativeTime } from "@/helpers/formattedTime";
import { useTranslation } from "react-i18next";
import { getJobBySlugApi } from "@/services/jobApi";
import { useIsSeekerLoggedIn } from "@/hooks/use-is-seeker-logged-in";
import { getLoginRouteByRole } from "@/utils/roleRedirect";
import { ROLE } from "@/types/common.types";
import { useVisibleTagCount } from "@/hooks/use-visible-tag-count";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";
import { type JobCardResponse, type JobDetailResponse } from "@/types/response.types";
import { getJobTypeOptions } from "@/constants";
import SaveJobButton from "@/components/SaveJobButton";
import { formatJobSalary } from "@/utils/formatSalary";

interface JobSearchDetailOutletContext {
  jobSelected: JobCardResponse;
}

// Component hiển thị chi tiết công việc đang được chọn trong JobSearch, nhận dữ liệu qua useOutletContext từ JobSearch
const JobSearchDetail = () => {
  const { t } = useTranslation("shared");
  const { t: tJob } = useTranslation("job");

  // Lấy jobSelected từ context của Outlet
  const { jobSelected } = useOutletContext<JobSearchDetailOutletContext>();

  // State để lưu chi tiết công việc sau khi fetch từ API
  const [jobDetail, setJobDetail] = useState<JobDetailResponse>(jobSelected as JobDetailResponse);

  const isSeekerLoggedIn = useIsSeekerLoggedIn();
  const seekerLoginPath = getLoginRouteByRole(ROLE.SEEKER);

  // Sắp xếp skills theo thứ tự độ dài trước khi hiển thị
  const sortedSkills = useMemo(() => {
    if (!jobDetail?.skills) return [];
    return [...jobDetail.skills].sort((a, b) => a.skillName.length - b.skillName.length);
  }, [jobDetail?.skills]);

  // Sử dụng hook custom để quản lý số lượng tag hiển thị và ref cho danh sách tag
  const { tagListRef, visibleTagsCount } = useVisibleTagCount(sortedSkills);

  // State để quản lý trạng thái loading khi fetch chi tiết công việc
  const [isLoading, setIsLoading] = useState(false);
  const jobTypeOptions = getJobTypeOptions(t);
  const jobTypeLabel = jobTypeOptions.find((opt) => opt.value === jobDetail.jobType)?.label || jobDetail.jobType;



  useEffect(() => {
    let isCancelled = false;

    const fetchJobDetail = async () => {
      try {
        if (!jobSelected.slug) {
          return;
        }

        const response = await getJobBySlugApi(jobSelected.slug);
        if (!isCancelled) {
          setJobDetail(response.data.result);

          console.log("Fetched job detail for search panel:", response.data.result);
        }
      } catch (error) {
        console.error("Error fetching job detail for search panel:", error);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }

      }
    };

    fetchJobDetail();

    return () => {
      isCancelled = true;
    };
  }, [jobSelected]);

  if (isLoading || !jobDetail) {
    return <div>Loading...</div>
  }

  return (
    <div className="job-search-detail">
      {/* Hiển thị khối đầu */}
      <div className="job-search-detail__head">
        <div className="job-search-detail__head-content">
          {/* Hiển thị logo công ty */}
          <div className="job-search-detail__head-left">
            <img src={jobDetail.company?.logoUrl || IMAGE_NOT_FOUND} alt="logo_company" />
          </div>
          <div className="job-search-detail__head-right">
            {/* Hiển thị tiêu đề công việc */}
            <h2 className="job-search-detail__head-name">
              <a href={`/viec-lam-it/${jobDetail?.slug}`} rel="noopener noreferrer" target="_blank">{jobDetail?.title || "???"}</a>
            </h2>
            {/* Hiển thị tên công ty */}
            <Link to="#" className="job-search-detail__head-company">
              {jobDetail.company?.companyName || "???"}
            </Link>
            {/* Hiển thị mức lương */}
            <div
              className={
                isSeekerLoggedIn
                  ? "job-search-detail__head-salary job-search-detail__head-salary--visible"
                  : "job-search-detail__head-salary"
              }
            >
              <ImCoinDollar />
              {isSeekerLoggedIn ? (
                <span>{formatJobSalary(jobDetail ?? {}, tJob("card.negotiable"))}</span>
              ) : (
                <Link to={seekerLoginPath} className="job-search-detail__head-salary-link">
                  {t("jobSearchDetail.loginToSeeSalary")}
                </Link>
              )}
            </div>

          </div>
        </div>
        <div className="card-job-head__wrap-button">
          {/* Button ứng tuyển */}
          <Link
            to={
              isSeekerLoggedIn
                ? `/viec-lam-it/${jobDetail.slug}/job_applications/new`
                : seekerLoginPath
            }
            className="card-job-head__button"
          >
            {t("jobSearchDetail.applyNow")}
          </Link>
          {/* Button yêu thích */}
          <div className="card-job-head__heart">
            <SaveJobButton jobId={jobDetail.id} />
          </div>
        </div>
      </div>
      <hr className="hr" />
      {/* Hiển thị khối thân */}
      <div className="job-search-detail__body">
        <div className="job-search-detail__preview-job">
          <div className="job-search-detail__list-item">
            <div className="job-search-detail__item">
              <IoLocationOutline />
              <span>{jobDetail.location || "???"}</span>
            </div>
            <div className="job-search-detail__item">
              <MdLocationCity />
              <span>{jobTypeLabel || "???"}</span>
            </div>
            <div className="job-search-detail__item">
              <GoClock />
              <span> {getRelativeTime(jobDetail.postedAt, t)} </span>
            </div>
          </div>
          <div className="divide--dashed--small"></div>
          <div className="job-search-detail__skill-wrap">
            <div className="job-search-detail__text">{t("jobSearchDetail.skills")}</div>
            <div className="job-search-detail__skills">
              {/* Hiển thị danh sách kỹ năng */}
              <div className="job__list-tag" ref={tagListRef}>
                {sortedSkills.slice(0, visibleTagsCount).map((skill, index) => (
                  <TagSkill key={`${skill.skillName}-${index}`} text={skill.skillName} />
                ))}
                {sortedSkills.length > visibleTagsCount && (
                  <Tooltip
                    title={sortedSkills.slice(visibleTagsCount).map(skill => skill.skillName).join(", ")}
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
            <h2>{t("jobSearchDetail.reasonToJoin")}</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobDetail.jobReason),
              }}
            />
            <h2>{t("jobSearchDetail.jobDescription")}</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobDetail.jobDescription),
              }}
            />
            <h2>{t("jobSearchDetail.jobRequirements")}</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobDetail.jobRequirements),
              }}
            />
            <h2>{t("jobSearchDetail.whyJoinUs")}</h2>
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobDetail.whyJoinUs),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearchDetail;
