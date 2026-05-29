import "./CardJobContent.scss";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";

interface Job {
  jobReason?: string;
  jobRequirements?: string;
  whyJoinUs?: string;
  jobDescription?: string;
}

interface CardJobContentProps {
  job: Job;
}

function CardJobContent({ job }: CardJobContentProps) {
  job = job || {};
  const { t } = useTranslation("shared");
  return (
    <div className="card-job-content">
      <div className="html-preview">
        <h2>{t("jobSearchDetail.reasonToJoin")}</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.jobReason) }} // Làm sạch HTML trước khi hiển thị
        />
        <h2>{t("jobSearchDetail.jobDescription")}</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.jobRequirements) }} // Làm sạch HTML trước khi hiển thị
        />
        <h2>{t("jobSearchDetail.jobRequirements")}</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.whyJoinUs) }} // Làm sạch HTML trước khi hiển thị
        />
        <h2>{t("jobSearchDetail.whyJoinUs")}</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.jobDescription) }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
    </div>
  );
}

export default CardJobContent;
