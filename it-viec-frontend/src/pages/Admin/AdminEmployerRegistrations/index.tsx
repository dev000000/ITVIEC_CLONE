import { useEffect, useState } from "react";
import { Button, Card, Space, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import EmployerStart from "@/components/EmployerStart";
import {
  approveEmployerRegistrationApi,
  getPendingEmployerRegistrationsApi,
  rejectEmployerRegistrationApi,
} from "@/services/adminEmployerRegistrationApi";
import { getApiErrorMessage } from "@/utils/apiError";
import Swal from "sweetalert2";
import type { EmployerRegistrationResponse } from "@/types/response.types";
import "../AdminCommon.scss";
import "./AdminEmployerRegistrations.scss";

function AdminEmployerRegistrations() {
  const { t } = useTranslation(["admin", "common"]);
  const [registrations, setRegistrations] = useState<EmployerRegistrationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionUserId, setActionUserId] = useState<string | null>(null);

  const loadRegistrations = async () => {
    try {
      setIsLoading(true);
      const response = await getPendingEmployerRegistrationsApi();
      setRegistrations(response.data.result ?? []);
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

  useEffect(() => {
    loadRegistrations();
  }, [t]);

  const handleApprove = async (record: EmployerRegistrationResponse) => {
    const result = await Swal.fire({
      title: t("admin:employerRegistrations.approveConfirmTitle"),
      text: t("admin:employerRegistrations.approveConfirmText", { email: record.email }),
      icon: "question",
      showCancelButton: true,
      confirmButtonText: t("admin:employerRegistrations.approve"),
      cancelButtonText: t("common:buttons.cancel"),
    });

    if (!result.isConfirmed) return;

    try {
      setActionUserId(record.userId);
      await approveEmployerRegistrationApi(record.userId);
      setRegistrations((prev) => prev.filter((item) => item.userId !== record.userId));
      Swal.fire({
        icon: "success",
        title: t("admin:employerRegistrations.approveSuccess"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setActionUserId(null);
    }
  };

  const handleReject = async (record: EmployerRegistrationResponse) => {
    const result = await Swal.fire({
      title: t("admin:employerRegistrations.rejectConfirmTitle"),
      text: t("admin:employerRegistrations.rejectConfirmText", { email: record.email }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("admin:employerRegistrations.reject"),
      cancelButtonText: t("common:buttons.cancel"),
    });

    if (!result.isConfirmed) return;

    try {
      setActionUserId(record.userId);
      await rejectEmployerRegistrationApi(record.userId);
      setRegistrations((prev) => prev.filter((item) => item.userId !== record.userId));
      Swal.fire({
        icon: "success",
        title: t("admin:employerRegistrations.rejectSuccess"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setActionUserId(null);
    }
  };

  const columns: TableColumnsType<EmployerRegistrationResponse> = [
    {
      title: t("admin:employerRegistrations.columns.fullName"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("admin:employerRegistrations.columns.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("admin:employerRegistrations.columns.jobTitle"),
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: t("admin:employerRegistrations.columns.phone"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("admin:employerRegistrations.columns.company"),
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: t("admin:employerRegistrations.columns.address"),
      dataIndex: "companyAddress",
      key: "companyAddress",
    },
    {
      title: t("admin:employerRegistrations.columns.website"),
      dataIndex: "website",
      key: "website",
      render: (value?: string) => value || "—",
    },
    {
      title: t("admin:employerRegistrations.columns.referral"),
      dataIndex: "referralSource",
      key: "referralSource",
      render: (value?: string) => value || "—",
    },
    {
      title: t("admin:employerRegistrations.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (status: EmployerRegistrationResponse["status"]) => (
        <Tag color="gold">{status}</Tag>
      ),
    },
    {
      title: t("admin:employerRegistrations.columns.action"),
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Button
            type="primary"
            onClick={() => handleApprove(record)}
            loading={actionUserId === record.userId}
          >
            {t("admin:employerRegistrations.approve")}
          </Button>
          <Button danger onClick={() => handleReject(record)} loading={actionUserId === record.userId}>
            {t("admin:employerRegistrations.reject")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-page admin-employer-registrations">
      <EmployerStart content={t("admin:employerRegistrations.title")} type="search" hideSearch />

      <Card className="admin-panel">
        <Table<EmployerRegistrationResponse>
          dataSource={registrations}
          columns={columns}
          rowKey="userId"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: t("admin:employerRegistrations.empty") }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
}

export default AdminEmployerRegistrations;
