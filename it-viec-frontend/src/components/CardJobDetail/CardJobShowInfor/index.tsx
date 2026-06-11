import "./CardJobShowInfor.scss";
import { Col, Row } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import TagSkill from "@/components/TagSkill";
import { MdLocationCity } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { getRelativeTime } from "@/helpers/formattedTime";
import { useTranslation } from "react-i18next";
import type { JobDetailResponse } from "@/types/response.types";
import IMAGE_NOT_FOUND from "@/assets/images/Image-not-found.png";
import { getJobTypeOptions } from "@/constants";


interface CardJobShowInforProps {
  job: JobDetailResponse;
}
// Phần hiển thị một số thông tin chi tiết của công việc 
const CardJobShowInfor = ({ job }: CardJobShowInforProps) => {
  const { t } = useTranslation("shared");
    const jobTypeOptions = getJobTypeOptions(t);
    const jobTypeLabel = jobTypeOptions.find((opt) => opt.value === job.jobType)?.label || job.jobType;
  return (
    <div className="card-job-showinfor">
      <div className="card-job-showinfor__list-image">
        <Row gutter={[20, 20]}>
          {[0, 1, 2].map((index) => (
            <Col span={8} key={index}>
            <div className="card-job-showinfor__image">
              <img src={IMAGE_NOT_FOUND} alt="image-detail-company" />
            </div>
          </Col>
          ))}
        </Row>
      </div>
      <div className="card-job-showinfor__body">
        {/* Hiển thị địa điểm công việc */}
        <div className="card-job-showinfor__item">
          <IoLocationOutline />
          <span>{job.location || "--"}</span>
        </div>
        {/* Hiển thị loại công việc */}
        <div className="card-job-showinfor__item">
          <MdLocationCity />
          <span>{jobTypeLabel || "--"}</span>
        </div>
        {/* Hiển thị thời gian đăng tuyển */}
        <div className="card-job-showinfor__item">
          <GoClock />
          <span>{getRelativeTime(job.postedAt, t)}</span>
        </div>
        {/* Hiển thị kỹ năng yêu cầu */}
        <div className="card-job-showinfor__skill-wrap">
          <span className="card-job-showinfor__text">{t("jobSearchDetail.skills")}</span>
          <span className="card-job-showinfor__skills">
            {job.skills?.map((skill) => <TagSkill key={skill.id} text={skill.skillName} />)}
          </span>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default CardJobShowInfor;
