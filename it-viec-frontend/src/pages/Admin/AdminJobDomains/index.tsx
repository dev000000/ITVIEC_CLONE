import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Modal, Select, Space, Table, Tag, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import EmployerStart from "@/components/EmployerStart";
import {
  createJobDomainAdminApi,
  deprecateJobDomainAdminApi,
  getAdminJobDomainsApi,
  restoreJobDomainAdminApi,
  updateJobDomainAdminApi,
} from "@/services/adminJobDomainApi";
import { getApiErrorMessage } from "@/utils/apiError";
import type { JobDomainAdminResponse } from "@/types/response.types";
import "./AdminJobDomains.scss";
import "../AdminCommon.scss";

type StatusFilter = "ALL" | "ACTIVE" | "DEPRECATED";

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const defaultPagination: PaginationState = { current: 1, pageSize: 20, total: 0 };

function AdminJobDomains() {
  const { t } = useTranslation(["admin", "common"]);

  const [domains, setDomains] = useState<JobDomainAdminResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");

  const [pagination, setPagination] = useState<PaginationState>(defaultPagination);
  const [reloadTick, setReloadTick] = useState(0);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [restoringId, setRestoringId] = useState<number | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch domains
  useEffect(() => {
    let cancelled = false;
    const fetchDomains = async () => {
      setIsLoading(true);
      try {
        const response = await getAdminJobDomainsApi({
          page: pagination.current - 1,
          size: pagination.pageSize,
          search: search || undefined,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        });
        if (cancelled) return;
        const r = response.data.result;
        setDomains(r.data ?? []);
        setPagination((prev) => ({ ...prev, total: r.totalElements }));
      } catch (error) {
        if (cancelled) return;
        Swal.fire({
          icon: "error",
          title: t("admin:notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchDomains();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, search, statusFilter, reloadTick]);

  const reload = useCallback((toFirstPage = false) => {
    if (toFirstPage) setPagination((prev) => ({ ...prev, current: 1 }));
    setReloadTick((tick) => tick + 1);
  }, []);

  // ---- Inline edit ----
  const handleStartEdit = (record: JobDomainAdminResponse) => {
    setEditingId(record.id);
    setEditingName(record.domainName);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleSaveEdit = async (record: JobDomainAdminResponse) => {
    const trimmed = editingName.trim();
    if (!trimmed || trimmed === record.domainName) { handleCancelEdit(); return; }
    try {
      setIsSavingEdit(true);
      await updateJobDomainAdminApi(record.id, { domainName: trimmed });
      setEditingId(null);
      setEditingName("");
      reload();
      Swal.fire({ icon: "success", title: t("admin:jobDomains.notifications.updated") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setIsSavingEdit(false);
    }
  };

  // ---- Create ----
  const handleCreate = async () => {
    const trimmed = createName.trim();
    if (!trimmed) return;
    try {
      setIsCreating(true);
      await createJobDomainAdminApi({ domainName: trimmed });
      setIsCreateOpen(false);
      setCreateName("");
      reload(true);
      Swal.fire({ icon: "success", title: t("admin:jobDomains.notifications.created") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setIsCreating(false);
    }
  };

  // ---- Deprecate ----
  const handleDeprecate = async (record: JobDomainAdminResponse) => {
    const result = await Swal.fire({
      title: t("admin:jobDomains.delete.confirmTitle", { name: record.domainName }),
      text: t("admin:jobDomains.delete.confirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: t("admin:jobDomains.delete.confirmButton"),
      cancelButtonText: t("common:buttons.cancel"),
    });
    if (!result.isConfirmed) return;
    try {
      setDeletingId(record.id);
      await deprecateJobDomainAdminApi(record.id);
      reload();
      Swal.fire({ icon: "success", title: t("admin:jobDomains.notifications.deprecated") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Restore ----
  const handleRestore = async (record: JobDomainAdminResponse) => {
    const result = await Swal.fire({
      title: t("admin:jobDomains.restore.confirmTitle"),
      text: t("admin:jobDomains.restore.confirmText", { name: record.domainName }),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      confirmButtonText: t("admin:jobDomains.restore.confirmButton"),
      cancelButtonText: t("common:buttons.cancel"),
    });
    if (!result.isConfirmed) return;
    try {
      setRestoringId(record.id);
      await restoreJobDomainAdminApi(record.id);
      reload();
      Swal.fire({ icon: "success", title: t("admin:jobDomains.notifications.restored") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setRestoringId(null);
    }
  };

  // ---- Options ----
  const statusOptions = useMemo(
    () => [
      { value: "ALL" as StatusFilter, label: t("admin:jobDomains.filters.all") },
      { value: "ACTIVE" as StatusFilter, label: t("admin:jobDomains.filters.active") },
      { value: "DEPRECATED" as StatusFilter, label: t("admin:jobDomains.filters.deprecated") },
    ],
    [t],
  );

  // ---- Table columns ----
  const columns: TableColumnsType<JobDomainAdminResponse> = [
    {
      title: t("admin:jobDomains.columns.name"),
      dataIndex: "domainName",
      key: "domainName",
      render: (value: string, record) => {
        if (editingId === record.id) {
          return (
            <Space>
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void handleSaveEdit(record);
                  if (e.key === "Escape") handleCancelEdit();
                }}
                style={{ width: 220 }}
                autoFocus
              />
              <Button
                icon={<CheckOutlined />}
                size="small"
                type="primary"
                onClick={() => void handleSaveEdit(record)}
                loading={isSavingEdit}
              />
              <Button
                icon={<CloseOutlined />}
                size="small"
                onClick={handleCancelEdit}
                disabled={isSavingEdit}
              />
            </Space>
          );
        }
        return (
          <Space className="admin-job-domains__name-cell">
            <span className={record.status === "DEPRECATED" ? "admin-job-domains__name-deprecated" : ""}>
              {value}
            </span>
            {record.status === "ACTIVE" && !editingId && (
              <Button
                icon={<EditOutlined />}
                size="small"
                type="text"
                className="admin-job-domains__edit-btn"
                onClick={() => handleStartEdit(record)}
              />
            )}
          </Space>
        );
      },
    },
    {
      title: t("admin:jobDomains.columns.status"),
      key: "status",
      width: 190,
      render: (_, record) => {
        if (record.status === "ACTIVE") {
          return <Tag color="success">{t("admin:jobDomains.status.active")}</Tag>;
        }
        return (
          <Space direction="vertical" size={2}>
            <Tag color="default">{t("admin:jobDomains.status.deprecated")}</Tag>
            {record.mergedIntoName && (
              <span className="admin-job-domains__merged-into">
                {t("admin:jobDomains.status.mergedInto", { name: record.mergedIntoName })}
              </span>
            )}
          </Space>
        );
      },
    },
    {
      title: t("admin:jobDomains.columns.usage"),
      key: "usage",
      width: 160,
      render: (_, record) => {
        if (record.jobCount === 0) {
          return <span className="admin-job-domains__usage-none">—</span>;
        }
        return (
          <Tooltip title={t("admin:jobDomains.usage.jobsTooltip")}>
            <Tag color="blue" className="admin-job-domains__usage-tag">
              {t("admin:jobDomains.usage.jobs", { count: record.jobCount })}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t("admin:jobDomains.columns.action"),
      key: "action",
      width: 120,
      render: (_, record) => {
        if (record.status === "ACTIVE") {
          return (
            <Button
              danger
              size="small"
              onClick={() => void handleDeprecate(record)}
              loading={deletingId === record.id}
            >
              {t("admin:jobDomains.actions.delete")}
            </Button>
          );
        }
        if (!record.mergedIntoId) {
          return (
            <Button
              size="small"
              onClick={() => void handleRestore(record)}
              loading={restoringId === record.id}
            >
              {t("admin:jobDomains.actions.restore")}
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="admin-page admin-job-domains">
      <EmployerStart content={t("admin:jobDomains.title")} type="search" hideSearch />

      <div className="admin-toolbar admin-job-domains__toolbar">
        <div className="admin-job-domains__filters">
          <Input
            placeholder={t("admin:jobDomains.searchPlaceholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            allowClear
            style={{ width: 260 }}
          />
          <Select
            value={statusFilter}
            options={statusOptions}
            onChange={(value: StatusFilter) => {
              setStatusFilter(value);
              setPagination((prev) => ({ ...prev, current: 1 }));
            }}
            style={{ width: 180 }}
          />
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => { setCreateName(""); setIsCreateOpen(true); }}
        >
          {t("admin:jobDomains.addButton")}
        </Button>
      </div>

      <Card className="admin-panel">
        <Table<JobDomainAdminResponse>
          rowKey="id"
          loading={isLoading}
          dataSource={domains}
          columns={columns}
          rowClassName={(record) => record.status === "DEPRECATED" ? "admin-job-domains__row-deprecated" : ""}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            onChange: (page, pageSize) => {
              setPagination((prev) => ({ ...prev, current: page, pageSize }));
            },
          }}
        />
      </Card>

      {/* Create Modal */}
      <Modal
        title={t("admin:jobDomains.create.title")}
        open={isCreateOpen}
        onOk={() => void handleCreate()}
        onCancel={() => { setIsCreateOpen(false); setCreateName(""); }}
        okText={t("admin:jobDomains.create.submit")}
        cancelText={t("common:buttons.cancel")}
        confirmLoading={isCreating}
        destroyOnClose
      >
        <div className="admin-job-domains__modal-body">
          <label className="admin-job-domains__modal-label">{t("admin:jobDomains.create.label")}</label>
          <Input
            placeholder={t("admin:jobDomains.create.placeholder")}
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") void handleCreate(); }}
            autoFocus
          />
        </div>
      </Modal>
    </div>
  );
}

export default AdminJobDomains;
