import React, { useContext, useEffect, useState } from "react";
import "./AppliedJobs.scss";
import EmptyJobState from "../EmptyJobState";
import CardApplication from "../../../../components/CardApplication";
import { Row, Col, Select } from "antd";
import { useSelector } from "react-redux";
import {
  getApplicationsBySeekerId,
  getApplicationsBySeekerIdWithPagination,
} from "../../../../services/SeekerServices";
import { useOutletContext } from "react-router-dom";
import { Pagination } from "antd";
import { ImNotification } from "react-icons/im";

function AppliedJobs() {
  const seeker = useSelector((state) => state.SeekerReducer);
  const { applicationList, setPagination, setSort, totalApplications, pagination, sort } =
    useOutletContext();

  return totalApplications === 0 ? (
    <div className="applied-jobs">
      <EmptyJobState
        notificationText="Các công việc bạn đã ứng tuyển được lưu trữ trong 12 tháng gần đây."
        emptyMessage="Bạn chưa ứng tuyển vào công việc nào trong 12 tháng qua."
        buttonText="Tìm việc ngay"
        buttonLink="/"
      />
    </div>
  ) : (
    <>
      <div className="applied-jobs">
        <div className="job-empty-state__notification-wrapper">
            <div className="job-empty-state__notification">
              <ImNotification className="job-empty-state__icon" />
              <span className="job-empty-state__text">
                Các công việc bạn đã ứng tuyển được lưu trữ trong 12 tháng gần đây.
              </span>
            </div>
            <div className="job-empty-state__select">
              <span>Sắp xếp theo: </span>
              <Select
                defaultValue="desc"
                value={sort}
                style={{ width: 240 }}
                options={[{ value: "desc", label: "Ngày ứng tuyển gần nhất" },{ value: "asc", label: "Ngày ứng tuyển xa nhất" }]}
                onChange={(value) => {
                  setSort(value);
                  setPagination((prev) => ({ ...prev, current: 1 }));
                }}
              />
            </div>
          </div>
        <Row className="applied-jobs__row">
          {applicationList.map((application, index) => (
            <Col key={index} span={24}>
              <CardApplication application={application} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="applied-jobs__pagination">
        <Pagination
          defaultCurrent={1}
          total={totalApplications}
          align="center"
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={(page, pageSize) => {
            setPagination({ current: page, pageSize: pageSize });
          }}
        />
      </div>
    </>
  );
}
export default AppliedJobs;
