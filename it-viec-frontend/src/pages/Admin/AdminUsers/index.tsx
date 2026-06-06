import { useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Select, Space, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import EmployerStart from "@/components/EmployerStart";
import { getUsersApi, updateUserStatusApi } from "@/services/userApi";
import { getApiErrorMessage } from "@/utils/apiError";
import Swal from "sweetalert2";
import type { UserResponse } from "@/types/response.types";
import type { UserStatus } from "@/types/common.types";
import { getRoleOptions, getUserStatusOptions } from "@/constants";
import "./AdminUsers.scss";
import "../AdminCommon.scss";

interface UserFilters {
  email: string;
  role?: UserResponse["role"];
  status?: UserStatus;
}

const defaultFilters: UserFilters = {
  email: "",
};

function AdminUsers() {
  const { t } = useTranslation(["admin", "common"]);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);
  const [filterInputs, setFilterInputs] = useState<UserFilters>(defaultFilters);
  const [statusDrafts, setStatusDrafts] = useState<Record<string, UserStatus>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const userStatusOptions = getUserStatusOptions(t);
  const roleOptions = getRoleOptions(t);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await getUsersApi();
        setUsers(response.data.result ?? []);
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

    loadUsers();
  }, [t]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const emailMatched =
          !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase().trim());
        const roleMatched = !filters.role || user.role === filters.role;
        const statusMatched = !filters.status || user.status === filters.status;
        return emailMatched && roleMatched && statusMatched;
      }),
    [filters, users]
  );

  const handleSearch = () => {
    setFilters({
      email: filterInputs.email.trim(),
      role: filterInputs.role,
      status: filterInputs.status,
    });
  };

  const handleReset = () => {
    setFilterInputs(defaultFilters);
    setFilters(defaultFilters);
  };

  const handleUpdateStatus = async (record: UserResponse) => {
    const nextStatus = statusDrafts[record.id] ?? record.status;
    if (nextStatus === record.status) {
      return;
    }

    try {
      setUpdatingUserId(record.id);
      const response = await updateUserStatusApi(record.id, { status: nextStatus });
      const updatedUser = response.data.result;
      setUsers((prev) => prev.map((item) => (item.id === updatedUser.id ? updatedUser : item)));
      Swal.fire({
        icon: "success",
        title: t("admin:users.notifications.updateSuccess"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const columns: TableColumnsType<UserResponse> = [
    {
      title: t("admin:users.columns.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("admin:users.columns.role"),
      dataIndex: "role",
      key: "role",
      render: (role: UserResponse["role"]) => (
        <Tag color={role === "ADMIN" ? "cyan" : role === "EMPLOYER" ? "geekblue" : "purple"}>
          {t(`common:roles.${role.toLowerCase()}`)}
        </Tag>
      ),
    },
    {
      title: t("admin:users.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (status: UserStatus) => (
        <Tag color={status === "ACTIVE" ? "success" : status === "DISABLED" ? "error" : "gold"}>
          {userStatusOptions.find((item) => item.value === status)?.label ?? status}
        </Tag>
      ),
    },
    {
      title: t("admin:users.columns.action"),
      key: "action",
      render: (_, record) =>
        record.role === "ADMIN" ? (
          <Tag color="default">{t("admin:users.protectedAdmin")}</Tag>
        ) : (
          <Space wrap>
            <Select
              value={statusDrafts[record.id] ?? record.status}
              options={userStatusOptions}
              style={{ width: 180 }}
              onChange={(value) =>
                setStatusDrafts((prev) => ({
                  ...prev,
                  [record.id]: value,
                }))
              }
            />
            <Button
              type="primary"
              onClick={() => handleUpdateStatus(record)}
              loading={updatingUserId === record.id}
            >
              {t("admin:users.save")}
            </Button>
          </Space>
        ),
    },
  ];

  return (
    <div className="admin-page admin-users">
      <EmployerStart content={t("admin:users.title")} type="search" hideSearch />

      <div className="admin-toolbar">
        <Input
          placeholder={t("admin:users.filters.email")}
          value={filterInputs.email}
          onChange={(event) =>
            setFilterInputs((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
          style={{ width: 240 }}
          allowClear
        />
        <Select
          placeholder={t("admin:users.filters.role")}
          value={filterInputs.role}
          onChange={(value) =>
            setFilterInputs((prev) => ({
              ...prev,
              role: value,
            }))
          }
          allowClear
          options={roleOptions}
          style={{ width: 180 }}
        />
        <Select
          placeholder={t("admin:users.filters.status")}
          value={filterInputs.status}
          onChange={(value) =>
            setFilterInputs((prev) => ({
              ...prev,
              status: value,
            }))
          }
          allowClear
          options={userStatusOptions}
          style={{ width: 180 }}
        />
        <Button type="primary" onClick={handleSearch}>
          {t("common:buttons.search")}
        </Button>
        <Button onClick={handleReset}>{t("admin:actions.reset")}</Button>
      </div>

      <Card className="admin-panel">
        <Table<UserResponse>
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}

export default AdminUsers;
