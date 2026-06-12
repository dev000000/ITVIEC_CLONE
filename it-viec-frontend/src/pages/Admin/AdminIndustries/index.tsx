import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Modal, Select, Space, Table, Tag, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import EmployerStart from "@/components/EmployerStart";
import {
  createIndustryAdminApi,
  deprecateIndustryAdminApi,
  getAdminIndustriesApi,
  restoreIndustryAdminApi,
  updateIndustryAdminApi,
} from "@/services/adminIndustryApi";
import { getApiErrorMessage } from "@/utils/apiError";
import type { IndustryAdminResponse } from "@/types/response.types";
import "./AdminIndustries.scss";
import "../AdminCommon.scss";

type StatusFilter = "ALL" | "ACTIVE" | "DEPRECATED";

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const defaultPagination: PaginationState = { current: 1, pageSize: 20, total: 0 };

function AdminIndustries() {
  const { t } = useTranslation(["admin", "common"]);

  const [industries, setIndustries] = useState<IndustryAdminResponse[]>([]);
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

  // Fetch industries
  useEffect(() => {
    let cancelled = false;
    const fetchIndustries = async () => {
      setIsLoading(true);
      try {
        const response = await getAdminIndustriesApi({
          page: pagination.current - 1,
          size: pagination.pageSize,
          search: search || undefined,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        });
        if (cancelled) return;
        const r = response.data.result;
        setIndustries(r.data ?? []);
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
    fetchIndustries();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, search, statusFilter, reloadTick]);

  const reload = useCallback((toFirstPage = false) => {
    if (toFirstPage) setPagination((prev) => ({ ...prev, current: 1 }));
    setReloadTick((tick) => tick + 1);
  }, []);

  // ---- Inline edit ----
  const handleStartEdit = (record: IndustryAdminResponse) => {
    setEditingId(record.id);
    setEditingName(record.industryName);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleSaveEdit = async (record: IndustryAdminResponse) => {
    const trimmed = editingName.trim();
    if (!trimmed || trimmed === record.industryName) { handleCancelEdit(); return; }
    try {
      setIsSavingEdit(true);
      await updateIndustryAdminApi(record.id, { industryName: trimmed });
      setEditingId(null);
      setEditingName("");
      reload();
      Swal.fire({ icon: "success", title: t("admin:industries.notifications.updated") });
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
      await createIndustryAdminApi({ industryName: trimmed });
      setIsCreateOpen(false);
      setCreateName("");
      reload(true);
      Swal.fire({ icon: "success", title: t("admin:industries.notifications.created") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setIsCreating(false);
    }
  };

  // ---- Deprecate ----
  const handleDeprecate = async (record: IndustryAdminResponse) => {
    const result = await Swal.fire({
      title: t("admin:industries.delete.confirmTitle", { name: record.industryName }),
      text: t("admin:industries.delete.confirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: t("admin:industries.delete.confirmButton"),
      cancelButtonText: t("common:buttons.cancel"),
    });
    if (!result.isConfirmed) return;
    try {
      setDeletingId(record.id);
      await deprecateIndustryAdminApi(record.id);
      reload();
      Swal.fire({ icon: "success", title: t("admin:industries.notifications.deprecated") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Restore ----
  const handleRestore = async (record: IndustryAdminResponse) => {
    const result = await Swal.fire({
      title: t("admin:industries.restore.confirmTitle"),
      text: t("admin:industries.restore.confirmText", { name: record.industryName }),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      confirmButtonText: t("admin:industries.restore.confirmButton"),
      cancelButtonText: t("common:buttons.cancel"),
    });
    if (!result.isConfirmed) return;
    try {
      setRestoringId(record.id);
      await restoreIndustryAdminApi(record.id);
      reload();
      Swal.fire({ icon: "success", title: t("admin:industries.notifications.restored") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setRestoringId(null);
    }
  };

  // ---- Options ----
  const statusOptions = useMemo(
    () => [
      { value: "ALL" as StatusFilter, label: t("admin:industries.filters.all") },
      { value: "ACTIVE" as StatusFilter, label: t("admin:industries.filters.active") },
      { value: "DEPRECATED" as StatusFilter, label: t("admin:industries.filters.deprecated") },
    ],
    [t],
  );

  // ---- Table columns ----
  const columns: TableColumnsType<IndustryAdminResponse> = [
    {
      title: t("admin:industries.columns.name"),
      dataIndex: "industryName",
      key: "industryName",
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
          <Space className="admin-industries__name-cell">
            <span className={record.status === "DEPRECATED" ? "admin-industries__name-deprecated" : ""}>
              {value}
            </span>
            {record.status === "ACTIVE" && !editingId && (
              <Button
                icon={<EditOutlined />}
                size="small"
                type="text"
                className="admin-industries__edit-btn"
                onClick={() => handleStartEdit(record)}
              />
            )}
          </Space>
        );
      },
    },
    {
      title: t("admin:industries.columns.status"),
      key: "status",
      width: 190,
      render: (_, record) => {
        if (record.status === "ACTIVE") {
          return <Tag color="success">{t("admin:industries.status.active")}</Tag>;
        }
        return (
          <Space direction="vertical" size={2}>
            <Tag color="default">{t("admin:industries.status.deprecated")}</Tag>
            {record.mergedIntoName && (
              <span className="admin-industries__merged-into">
                {t("admin:industries.status.mergedInto", { name: record.mergedIntoName })}
              </span>
            )}
          </Space>
        );
      },
    },
    {
      title: t("admin:industries.columns.usage"),
      key: "usage",
      width: 160,
      render: (_, record) => {
        if (record.companyCount === 0) {
          return <span className="admin-industries__usage-none">—</span>;
        }
        return (
          <Tooltip title={t("admin:industries.usage.companiesTooltip")}>
            <Tag color="orange" className="admin-industries__usage-tag">
              {t("admin:industries.usage.companies", { count: record.companyCount })}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: t("admin:industries.columns.action"),
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
              {t("admin:industries.actions.delete")}
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
              {t("admin:industries.actions.restore")}
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="admin-page admin-industries">
      <EmployerStart content={t("admin:industries.title")} type="search" hideSearch />

      <div className="admin-toolbar admin-industries__toolbar">
        <div className="admin-industries__filters">
          <Input
            placeholder={t("admin:industries.searchPlaceholder")}
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
          {t("admin:industries.addButton")}
        </Button>
      </div>

      <Card className="admin-panel">
        <Table<IndustryAdminResponse>
          rowKey="id"
          loading={isLoading}
          dataSource={industries}
          columns={columns}
          rowClassName={(record) => record.status === "DEPRECATED" ? "admin-industries__row-deprecated" : ""}
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
        title={t("admin:industries.create.title")}
        open={isCreateOpen}
        onOk={() => void handleCreate()}
        onCancel={() => { setIsCreateOpen(false); setCreateName(""); }}
        okText={t("admin:industries.create.submit")}
        cancelText={t("common:buttons.cancel")}
        confirmLoading={isCreating}
        destroyOnClose
      >
        <div className="admin-industries__modal-body">
          <label className="admin-industries__modal-label">{t("admin:industries.create.label")}</label>
          <Input
            placeholder={t("admin:industries.create.placeholder")}
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

export default AdminIndustries;
