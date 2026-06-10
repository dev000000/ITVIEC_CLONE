import "./TopJobItemHome.scss"
import { Tooltip } from "antd";
import { ImCoinDollar } from "react-icons/im";
import { MdLocationCity } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import TagSkill from "@/components/TagSkill";
import { getRelativeTime } from "@/helpers/formattedTime";
import { getJobTypeOptions, getCityLabel } from "@/constants";
import { useIsSeekerLoggedIn } from "@/hooks/use-is-seeker-logged-in";
import { Link } from "react-router-dom";
import { getLoginRouteByRole } from "@/utils/roleRedirect";
import { ROLE } from "@/types/common.types";
import type { JobCardResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";
import { useVisibleTagCount } from "@/hooks/use-visible-tag-count";

interface TopJobItemProps {
  job: JobCardResponse;
  isNotNavigate?: boolean; // Thêm prop để kiểm soát việc điều hướng khi click vào item
}
// Component hiển thị một item việc làm trong phần Top Job trên trang chủ
const TopJobItemHome = ({ job, isNotNavigate = false }: TopJobItemProps) => {
  console.log("job in TopJobItemHome component:", job);

  const isSeekerLoggedIn = useIsSeekerLoggedIn();
  const seekerLoginPath = getLoginRouteByRole(ROLE.SEEKER);

  const { t } = useTranslation("job");

  // Lấy nhãn loại công việc từ giá trị jobType (i18n)
  const jobTypeOptions = getJobTypeOptions(t);
  const jobTypeLabel = jobTypeOptions.find((opt) => opt.value === job.jobType)?.label || job.jobType;

  // Lấy nhãn thành phố từ tên thành phố (i18n)
  const cityLabel = getCityLabel(job.city?.cityName, t);

  // Sắp xếp kỹ năng theo độ dài tên để ưu tiên hiển thị những kỹ năng có tên ngắn hơn
  const sortedSkills = [...job.skills].sort(
    (a, b) => a.skillName.length - b.skillName.length
  );
  const { tagListRef, visibleTagsCount } = useVisibleTagCount(sortedSkills);

  // Hàm xử lý khi người dùng click vào item việc làm, mở trang chi tiết việc làm trong tab mới
  const handleNavigate = () => {
    if(isNotNavigate) return; 
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
          {isSeekerLoggedIn ? (
            job.salary
          ) : (
            <Link to={seekerLoginPath} onClick={(e) => e.stopPropagation()}>
              {t("loginToSeeSalary")}
            </Link>
          )}{" "}
        </span>
      </div>
      <div className="job__location">
        <MdLocationCity className="job__location-icon" />
        {/* Hiển thị loại công việc */}
        <span>{jobTypeLabel || "--"}</span>
      </div>
      <div className="job__city">
        {/* Hiển thị thành phố */}
        <CiLocationOn className="job__city-icon" />
        <span>{cityLabel || "--"}</span>
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
