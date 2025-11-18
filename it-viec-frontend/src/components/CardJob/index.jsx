import React from "react";
import "./CardJob.scss";
import { useNavigate } from "react-router-dom";
import { getRelativeTime } from "../../helpers/formattedTime";
function CardJob({job}) {
  const navigate = useNavigate();
  const postedTime = getRelativeTime(job.postedAt);
  const handleClick = () => {
    navigate(`${job.id}`);
  }
  return (
    <div className="card-job">
      <div className="card-job__head">
        <div className="card-job__title">{job.title}</div>
        <div className="card-job__status">{job.status}</div>
        <div className="card-job__time-created">Created: {job.postedAt}</div>
      </div>
      <div className="card-job__body">
        <div className="card-job__item">
          <div className="card-job__title-item">Salary:</div>
          <div className="card-job__content-item">{job.salary}</div>
        </div>
        <div className="card-job__item">
          <div className="card-job__title-item">Job type:</div>
          <div className="card-job__content-item">{job.jobType}</div>
        </div>
        <div className="card-job__item">
          <div className="card-job__title-item">Experience level:</div>
          <div className="card-job__content-item">{job.experienceLevel}</div>
        </div>
        <div className="card-job__item">
          <div className="card-job__title-item">Posted</div>
          <div className="card-job__content-item">{postedTime}</div>
        </div>
        <div className="card-job__skills">
          {job.requiredSkills.map((skill,index) => {
              return <div className="card-job__skill" key={index}>{skill}</div>;
          })}
        </div>
        <div className="card-job__button">
          <button onClick={handleClick}>View details</button>
        </div>
      </div>
    </div>

    
  );
}

export default CardJob;
