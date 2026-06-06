import { useEffect, useMemo, useState } from "react";
import { Card, Col, Row, Statistic, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import EmployerStart from "@/components/EmployerStart";
import { getUsersApi } from "@/services/userApi";
import { getAllApplicationsApi } from "@/services/applicationApi";
import { getAllAdminJobsApi } from "@/services/jobApi";
import { getApiErrorMessage } from "@/utils/apiError";
import type { ApplicationResponse, JobDetailResponse, UserResponse } from "@/types/response.types";
import "../AdminCommon.scss";

interface BreakdownRow {
  key: string;
  label: string;
  count: number;
}

const countItems = <T,>(items: T[], labels: Array<{ key: string; label: string }>, getKey: (item: T) => string) =>
  labels.map((item) => ({
    key: item.key,
    label: item.label,
    count: items.filter((row) => getKey(row) === item.key).length,
  }));

function AdminReport() {
  const { t } = useTranslation(["admin", "common"]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [jobs, setJobs] = useState<JobDetailResponse[]>([]);
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersResponse, jobs, applicationsResponse] = await Promise.all([
          getUsersApi(),
          getAllAdminJobsApi(),
          getAllApplicationsApi(),
        ]);
        setUsers(usersResponse.data.result ?? []);
        setJobs(jobs);
        setApplications(applicationsResponse.data.result ?? []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("admin:notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [t]);

  const userRoleBreakdown = useMemo(
    () =>
      countItems(
        users,
        [
          { key: "ADMIN", label: t("common:roles.admin") },
          { key: "EMPLOYER", label: t("common:roles.employer") },
          { key: "SEEKER", label: t("common:roles.seeker") },
        ],
        (item) => item.role
      ),
    [t, users]
  );

  const userStatusBreakdown = useMemo(
    () =>
      countItems(
        users,
        [
          { key: "ACTIVE", label: t("common:userStatus.active") },
          { key: "PENDING_ACTIVATION", label: t("common:userStatus.pendingActivation") },
          { key: "DISABLED", label: t("common:userStatus.disabled") },
        ],
        (item) => item.status
      ),
    [t, users]
  );

  const jobStatusBreakdown = useMemo(
    () =>
      countItems(
        jobs,
        [
          { key: "ACTIVE", label: t("common:jobStatus.active") },
          { key: "DRAFT", label: t("common:jobStatus.draft") },
          { key: "CLOSED", label: t("common:jobStatus.closed") },
          { key: "EXPIRED", label: t("common:jobStatus.expired") },
        ],
        (item) => item.status
      ),
    [jobs, t]
  );

  const jobTypeBreakdown = useMemo(
    () =>
      countItems(
        jobs,
        [
          { key: "ONSITE", label: t("common:jobType.onsite") },
          { key: "HYBRID", label: t("common:jobType.hybrid") },
          { key: "REMOTE", label: t("common:jobType.remote") },
          { key: "FLEXIBLE", label: t("common:jobType.flexible") },
        ],
        (item) => item.jobType
      ),
    [jobs, t]
  );

  const applicationBreakdown = useMemo(
    () =>
      countItems(
        applications,
        [
          { key: "PENDING", label: t("common:applicationStatus.pending") },
          { key: "ACCEPTED", label: t("common:applicationStatus.accepted") },
          { key: "REJECTED", label: t("common:applicationStatus.rejected") },
        ],
        (item) => item.status
      ),
    [applications, t]
  );

  const breakdownColumns: TableColumnsType<BreakdownRow> = [
    {
      title: t("admin:report.columns.label"),
      dataIndex: "label",
      key: "label",
    },
    {
      title: t("admin:report.columns.count"),
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div className="admin-page">
      <EmployerStart content={t("admin:report.title")} type="search" hideSearch />

      <Row gutter={[20, 20]}>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card className="admin-stat-card" loading={isLoading}>
            <Statistic title={t("admin:report.stats.totalUsers")} value={users.length} />
          </Card>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card className="admin-stat-card" loading={isLoading}>
            <Statistic title={t("admin:report.stats.totalJobs")} value={jobs.length} />
          </Card>
        </Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
          <Card className="admin-stat-card" loading={isLoading}>
            <Statistic
              title={t("admin:report.stats.totalApplications")}
              value={applications.length}
            />
          </Card>
        </Col>
      </Row>

      <div className="admin-report-grid" style={{ marginTop: 20 }}>
        <Card className="admin-panel" loading={isLoading} title={t("admin:report.sections.userRoles")}>
          <Table<BreakdownRow>
            dataSource={userRoleBreakdown}
            columns={breakdownColumns}
            rowKey="key"
            pagination={false}
          />
        </Card>
        <Card
          className="admin-panel"
          loading={isLoading}
          title={t("admin:report.sections.userStatuses")}
        >
          <Table<BreakdownRow>
            dataSource={userStatusBreakdown}
            columns={breakdownColumns}
            rowKey="key"
            pagination={false}
          />
        </Card>
        <Card className="admin-panel" loading={isLoading} title={t("admin:report.sections.jobStatuses")}>
          <Table<BreakdownRow>
            dataSource={jobStatusBreakdown}
            columns={breakdownColumns}
            rowKey="key"
            pagination={false}
          />
        </Card>
        <Card className="admin-panel" loading={isLoading} title={t("admin:report.sections.jobTypes")}>
          <Table<BreakdownRow>
            dataSource={jobTypeBreakdown}
            columns={breakdownColumns}
            rowKey="key"
            pagination={false}
          />
        </Card>
        <Card
          className="admin-panel"
          loading={isLoading}
          title={t("admin:report.sections.applicationStatuses")}
        >
          <Table<BreakdownRow>
            dataSource={applicationBreakdown}
            columns={breakdownColumns}
            rowKey="key"
            pagination={false}
          />
        </Card>
      </div>
    </div>
  );
}

export default AdminReport;
