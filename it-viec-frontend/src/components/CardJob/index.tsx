import "./CardJob.scss";
import { useNavigate } from "react-router-dom";
import { getRelativeTime } from "@/helpers/formattedTime";
import { useTranslation } from "react-i18next";

interface Job {
  id: number;
  title: string;
  status: string;
  postedAt: string;
  salary: string;
  jobType: string;
  experienceLevel: string;
  requiredSkills: string[];
}

interface CardJobProps {
  job: Job;
}

function CardJob({ job }: CardJobProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("job");
  const postedTime = getRelativeTime(job.postedAt);
  const handleClick = () => {
    navigate(`${job.id}`);
  }
  return (
    <div className="card-job">
      <div className="card-job__head">
        <div className="card-job__title">{job.title}</div>
        <div className="card-job__status">{job.status}</div>
        <div className="card-job__time-created">{t("card.created")}: {job.postedAt}</div>
      </div>
      <div className="card-job__body">
        <div className="card-job__item">
          <div className="card-job__title-item">{t("card.salary")}:</div>
          <div className="card-job__content-item">{job.salary}</div>
        </div>
        <div className="card-job__item">
          <div className="card-job__title-item">{t("card.jobType")}:</div>
          <div className="card-job__content-item">{job.jobType}</div>
        </div>
        <div className="card-job__item">
          <div className="card-job__title-item">{t("card.experienceLevel")}:</div>
          <div className="card-job__content-item">{job.experienceLevel}</div>
        </div>
        <div className="card-job__item">
          <div className="card-job__title-item">{t("card.postedTime")}</div>
          <div className="card-job__content-item">{postedTime}</div>
        </div>
        <div className="card-job__skills">
          {job.requiredSkills.map((skill, index) => {
            return <div className="card-job__skill" key={index}>{skill}</div>;
          })}
        </div>
        <div className="card-job__button">
          <button onClick={handleClick}>{t("card.viewDetails")}</button>
        </div>
      </div>
    </div>


  );
}

export default CardJob;
