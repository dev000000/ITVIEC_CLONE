// Tab "Đã ứng tuyển" trong trang MyJobs
// Nhận dữ liệu (applicationList, pagination, sort...) từ component cha MyJobs
// thông qua React Router Outlet context (useOutletContext)
// Nếu không có đơn nào → hiển thị EmptyJobState với nút "Tìm việc"
// Nếu có đơn → hiển thị danh sách CardApplication kèm phân trang và lựa chọn sắp xếp
import "./AppliedJobs.scss";
import EmptyJobState from "../EmptyJobState";
import CardApplication from "@/components/CardApplication";
import { Row, Col, Select } from "antd";
import { useOutletContext } from "react-router-dom";
import { Pagination } from "antd";
import { ImNotification } from "react-icons/im";
import type { MyJobsOutletContext } from "../index";
import { useTranslation } from "react-i18next";

function AppliedJobs() {
  const {
    applicationList,
    setPagination,
    setSort,
    totalApplications,
    pagination,
    sort,
  } = useOutletContext<MyJobsOutletContext>();
  const { t } = useTranslation("jobseeker");

  return totalApplications === 0 ? (
    <div className="applied-jobs">
      <EmptyJobState
        notificationText={t("appliedJobs.notification")}
        emptyMessage={t("appliedJobs.emptyMessage")}
        buttonText={t("appliedJobs.findJob")}
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
              {t("appliedJobs.notification")}
            </span>
          </div>
          <div className="job-empty-state__select">
            <span>{t("appliedJobs.sortBy")}</span>
            <Select
              defaultValue="desc"
              value={sort}
              style={{ width: 240 }}
              options={[
                { value: "desc", label: t("appliedJobs.sortNewest") },
                { value: "asc", label: t("appliedJobs.sortOldest") },
              ]}
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
