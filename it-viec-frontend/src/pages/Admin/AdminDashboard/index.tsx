import { useEffect, useMemo, useState } from "react";
import { Card, Col, Row, Statistic, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import EmployerStart from "@/components/EmployerStart";
import { getUsersApi } from "@/services/userApi";
import { getAllApplicationsApi } from "@/services/applicationApi";
import { getAllAdminJobsApi } from "@/services/jobApi";
import { getApiErrorMessage } from "@/utils/apiError";
import Swal from "sweetalert2";
import type { UserResponse, ApplicationResponse, JobDetailResponse } from "@/types/response.types";
import { getUserStatusOptions, getJobStatusOptions } from "@/constants";
import "./AdminDashboard.scss";
import "../AdminCommon.scss";

interface StatItem {
  key: string;
  label: string;
  value: number;
}

const formatDate = (value?: string): string => {
  if (!value) return "-";
  return dayjs(value).format("DD/MM/YYYY HH:mm");
};

function AdminDashboard() {
  const { t } = useTranslation(["admin", "common"]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [jobs, setJobs] = useState<JobDetailResponse[]>([]);
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userStatusOptions = getUserStatusOptions(t);
  const jobStatusOptions = getJobStatusOptions(t);

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

  const stats = useMemo<StatItem[]>(
    () => [
      { key: "users", label: t("admin:dashboard.stats.totalUsers"), value: users.length },
      {
        key: "activeUsers",
        label: t("admin:dashboard.stats.activeUsers"),
        value: users.filter((item) => item.status === "ACTIVE").length,
      },
      {
        key: "inactiveUsers",
        label: t("admin:dashboard.stats.inactiveUsers"),
        value: users.filter((item) => item.status !== "ACTIVE").length,
      },
      { key: "jobs", label: t("admin:dashboard.stats.totalJobs"), value: jobs.length },
      {
        key: "activeJobs",
        label: t("admin:dashboard.stats.activeJobs"),
        value: jobs.filter((item) => item.status === "ACTIVE").length,
      },
      {
        key: "pendingApplications",
        label: t("admin:dashboard.stats.pendingApplications"),
        value: applications.filter((item) => item.status === "PENDING").length,
      },
    ],
    [applications, jobs, t, users]
  );

  const pendingUsers = useMemo(
    () => users.filter((item) => item.status === "PENDING_ACTIVATION").slice(0, 5),
    [users]
  );

  const attentionJobs = useMemo(
    () =>
      jobs
        .filter((item) => {
          if (item.status !== "ACTIVE") return true;
          return dayjs(item.expiresAt).isBefore(dayjs().add(7, "day"));
        })
        .slice(0, 5),
    [jobs]
  );

  const userColumns: TableColumnsType<UserResponse> = [
    {
      title: t("admin:users.columns.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("admin:users.columns.role"),
      dataIndex: "role",
      key: "role",
      render: (role: UserResponse["role"]) => <Tag color="geekblue">{t(`common:roles.${role.toLowerCase()}`)}</Tag>,
    },
    {
      title: t("admin:users.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (status: UserResponse["status"]) => (
        <Tag color="gold">
          {userStatusOptions.find((item) => item.value === status)?.label ?? status}
        </Tag>
      ),
    },
  ];

  const jobColumns: TableColumnsType<JobDetailResponse> = [
    {
      title: t("admin:jobs.columns.title"),
      dataIndex: "title",
      key: "title",
    },
    {
      title: t("admin:jobs.columns.company"),
      dataIndex: ["company", "companyName"],
      key: "company",
    },
    {
      title: t("admin:jobs.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (status: JobDetailResponse["status"]) => (
        <Tag color="cyan">
          {jobStatusOptions.find((item) => item.value === status)?.label ?? status}
        </Tag>
      ),
    },
    {
      title: t("admin:jobs.columns.expiresAt"),
      dataIndex: "expiresAt",
      key: "expiresAt",
      render: (value: string) => formatDate(value),
    },
  ];

  return (
    <div className="admin-page admin-dashboard">
      <EmployerStart content={t("admin:dashboard.title")} type="search" hideSearch />

      <Row gutter={[20, 20]}>
        {stats.map((item) => (
          <Col xxl={8} xl={8} lg={12} md={12} sm={24} xs={24} key={item.key}>
            <Card className="admin-stat-card" loading={isLoading}>
              <Statistic title={item.label} value={item.value} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} className="admin-dashboard__tables">
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card className="admin-panel" loading={isLoading}>
            <div className="admin-panel-header">
              <div>
                <h3>{t("admin:dashboard.pendingUsers.title")}</h3>
                <p>{t("admin:dashboard.pendingUsers.subtitle")}</p>
              </div>
            </div>
            <Table<UserResponse>
              dataSource={pendingUsers}
              columns={userColumns}
              rowKey="id"
              pagination={false}
              locale={{ emptyText: t("admin:empty.pendingUsers") }}
            />
          </Card>
        </Col>

        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <Card className="admin-panel" loading={isLoading}>
            <div className="admin-panel-header">
              <div>
                <h3>{t("admin:dashboard.attentionJobs.title")}</h3>
                <p>{t("admin:dashboard.attentionJobs.subtitle")}</p>
              </div>
            </div>
            <Table<JobDetailResponse>
              dataSource={attentionJobs}
              columns={jobColumns}
              rowKey="id"
              pagination={false}
              locale={{ emptyText: t("admin:empty.attentionJobs") }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
