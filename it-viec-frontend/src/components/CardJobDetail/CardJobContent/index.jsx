
import "./CardJobContent.scss";
import DOMPurify from "dompurify"
function CardJobContent({job}) {
  job = job || {};  
  return (
    <div className="card-job-content">
      <div className="html-preview">
        <h2>3 Lý do để gia nhập công ty</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.jobReason) }} // Làm sạch HTML trước khi hiển thị
        />
        <h2>Mô tả công việc</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.jobRequirements) }} // Làm sạch HTML trước khi hiển thị
        />
        <h2>Yêu cầu công việc</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.whyJoinUs) }} // Làm sạch HTML trước khi hiển thị
        />
        <h2>Tại sao bạn sẽ yêu thích làm việc tại đây</h2>
        <div
          className="preview-content"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.jobDescription) }} // Làm sạch HTML trước khi hiển thị
        />
      </div>
    </div>
  );
}

export default CardJobContent;
