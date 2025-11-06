import React from "react";
import "./CardJobShowInfor.scss";
import { Col, Row } from "antd";
import img from "../../../assets/images/preview2.svg";
import { IoLocationOutline } from "react-icons/io5";
import TagSkill from "../../TagSkill";
import { MdLocationCity } from "react-icons/md";
import { GoClock } from "react-icons/go";
import TipTap from "../../TipTapEditor/TipTap";
import { getRelativeTime } from "../../../helpers/formattedTime";
function CardJobShowInfor({job}) {
  job = job || {};
  const postedTime = getRelativeTime(job.postedAt);
  const skillList = job.requiredSkills || [];
  return (
    <div className="card-job-showinfor">
      <div className="card-job-showinfor__list-image">
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <div className="card-job-showinfor__image">
              <img src={img} alt="image-detail-company" />
            </div>
          </Col>
          <Col span={8}>
            <div className="card-job-showinfor__image">
              <img src={img} alt="image-detail-company" />
            </div>
          </Col>
          <Col span={8}>
            <div className="card-job-showinfor__image">
              <img src={img} alt="image-detail-company" />
            </div>
          </Col>
        </Row>
      </div>
      <div className="card-job-showinfor__body">
        <div className="card-job-showinfor__item">
          <IoLocationOutline />
          <span>{job.location}</span>
        </div>
        <div className="card-job-showinfor__item">
          <MdLocationCity />
          <span>{job.jobType}</span>
        </div>
        <div className="card-job-showinfor__item">
          <GoClock/>
          <span>{postedTime}</span>
        </div>
        <div className="card-job-showinfor__skill-wrap">
          <span className="card-job-showinfor__text">Kỹ năng:</span>
          <span className="card-job-showinfor__skills">
            {skillList.map((skill,index) => <TagSkill key={index} text={skill}/>)}
          </span>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

export default CardJobShowInfor;
