import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, Input, Modal, Select, Space, Table, Tag, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { AxiosError } from "axios";
import Swal from "sweetalert2";
import EmployerStart from "@/components/EmployerStart";
import {
  createSkillAdminApi,
  deprecateSkillAdminApi,
  getAdminSkillsApi,
  mergeSkillAdminApi,
  restoreSkillAdminApi,
  updateSkillAdminApi,
} from "@/services/adminSkillApi";
import { getAllSkillsApi } from "@/services/skillApi";
import { getApiErrorMessage } from "@/utils/apiError";
import type {
  APIResponse,
  MergeSkillResponse,
  SkillAdminResponse,
  SkillResponse,
  SkillUsageCountResponse,
} from "@/types/response.types";
import "./AdminSkills.scss";
import "../AdminCommon.scss";

type SkillStatusFilter = "ALL" | "ACTIVE" | "DEPRECATED";

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const defaultPagination: PaginationState = { current: 1, pageSize: 20, total: 0 };

// ── Usage badges ─────────────────────────────────────────────────────────────
interface UsageBadgesProps {
  usageCount: SkillUsageCountResponse;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

function UsageBadges({ usageCount, t }: UsageBadgesProps) {
  const { jobs, seekers, companies } = usageCount;
  if (jobs === 0 && seekers === 0 && companies === 0) {
    return <span className="admin-skills__usage-none">—</span>;
  }
  return (
    <Space wrap size={4}>
      {jobs > 0 && (
        <Tooltip title={t("admin:skills.usage.jobsTooltip")}>
          <Tag color="blue" className="admin-skills__usage-tag">
            {t("admin:skills.usage.jobs", { count: jobs })}
          </Tag>
        </Tooltip>
      )}
      {seekers > 0 && (
        <Tooltip title={t("admin:skills.usage.seekersTooltip")}>
          <Tag color="purple" className="admin-skills__usage-tag">
            {t("admin:skills.usage.seekers", { count: seekers })}
          </Tag>
        </Tooltip>
      )}
      {companies > 0 && (
        <Tooltip title={t("admin:skills.usage.companiesTooltip")}>
          <Tag color="orange" className="admin-skills__usage-tag">
            {t("admin:skills.usage.companies", { count: companies })}
          </Tag>
        </Tooltip>
      )}
    </Space>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function AdminSkills() {
  const { t } = useTranslation(["admin", "common"]);

  const [skills, setSkills] = useState<SkillAdminResponse[]>([]);
  const [allActiveSkills, setAllActiveSkills] = useState<SkillResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SkillStatusFilter>("ALL");

  const [pagination, setPagination] = useState<PaginationState>(defaultPagination);
  const [reloadTick, setReloadTick] = useState(0);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [mergeSource, setMergeSource] = useState<SkillAdminResponse | null>(null);
  const [mergeUsageCount, setMergeUsageCount] = useState<SkillUsageCountResponse | null>(null);
  const [mergeTargetId, setMergeTargetId] = useState<number | null>(null);
  const [isMerging, setIsMerging] = useState(false);

  const [restoringId, setRestoringId] = useState<number | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch skills
  useEffect(() => {
    let cancelled = false;
    const fetchSkills = async () => {
      setIsLoading(true);
      try {
        const response = await getAdminSkillsApi({
          page: pagination.current - 1,
          size: pagination.pageSize,
          search: search || undefined,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        });
        if (cancelled) return;
        const r = response.data.result;
        setSkills(r.data ?? []);
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
    fetchSkills();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, search, statusFilter, reloadTick]);

  const refreshActiveSkills = useCallback(() => {
    getAllSkillsApi()
      .then((res) => setAllActiveSkills(res.data.result ?? []))
      .catch(() => {});
  }, []);

  useEffect(() => { refreshActiveSkills(); }, [refreshActiveSkills]);

  const reload = (toFirstPage = false) => {
    if (toFirstPage) setPagination((prev) => ({ ...prev, current: 1 }));
    setReloadTick((tick) => tick + 1);
  };

  // ---- Inline edit ----
  const handleStartEdit = (record: SkillAdminResponse) => {
    setEditingId(record.id);
    setEditingName(record.skillName);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleSaveEdit = async (record: SkillAdminResponse) => {
    const trimmed = editingName.trim();
    if (!trimmed || trimmed === record.skillName) { handleCancelEdit(); return; }
    try {
      setIsSavingEdit(true);
      await updateSkillAdminApi(record.id, { skillName: trimmed });
      setEditingId(null);
      setEditingName("");
      reload();
      Swal.fire({ icon: "success", title: t("admin:skills.notifications.updated") });
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
      await createSkillAdminApi({ skillName: trimmed });
      setIsCreateOpen(false);
      setCreateName("");
      refreshActiveSkills();
      reload(true);
      Swal.fire({ icon: "success", title: t("admin:skills.notifications.created") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setIsCreating(false);
    }
  };

  // ---- Deprecate ----
  const handleDeprecate = async (record: SkillAdminResponse) => {
    const result = await Swal.fire({
      title: t("admin:skills.delete.confirmTitle", { name: record.skillName }),
      text: t("admin:skills.delete.confirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: t("admin:skills.delete.confirmButton"),
      cancelButtonText: t("common:buttons.cancel"),
    });
    if (!result.isConfirmed) return;
    try {
      setDeletingId(record.id);
      await deprecateSkillAdminApi(record.id);
      refreshActiveSkills();
      reload();
      Swal.fire({ icon: "success", title: t("admin:skills.notifications.deprecated") });
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse<SkillUsageCountResponse>>;
      if (axiosError.response?.data?.code === 1119) {
        setMergeSource(record);
        setMergeUsageCount(axiosError.response.data.result ?? null);
        setMergeTargetId(null);
      } else {
        Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
      }
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Merge ----
  const handleMerge = async () => {
    if (!mergeSource || !mergeTargetId) return;
    try {
      setIsMerging(true);
      const response = await mergeSkillAdminApi(mergeSource.id, { targetSkillId: mergeTargetId });
      const mergeResult = response.data.result as MergeSkillResponse;
      setMergeSource(null);
      setMergeUsageCount(null);
      setMergeTargetId(null);
      refreshActiveSkills();
      reload();
      Swal.fire({ icon: "success", title: t("admin:skills.notifications.merged"), text: mergeResult.message });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setIsMerging(false);
    }
  };

  // ---- Restore ----
  const handleRestore = async (record: SkillAdminResponse) => {
    const result = await Swal.fire({
      title: t("admin:skills.restore.confirmTitle"),
      text: t("admin:skills.restore.confirmText", { name: record.skillName }),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      confirmButtonText: t("admin:skills.restore.confirmButton"),
      cancelButtonText: t("common:buttons.cancel"),
    });
    if (!result.isConfirmed) return;
    try {
      setRestoringId(record.id);
      await restoreSkillAdminApi(record.id);
      refreshActiveSkills();
      reload();
      Swal.fire({ icon: "success", title: t("admin:skills.notifications.restored") });
    } catch (error) {
      Swal.fire({ icon: "error", title: t("admin:notifications.oops"), text: getApiErrorMessage(error, t) });
    } finally {
      setRestoringId(null);
    }
  };

  // ---- Options ----
  const statusOptions = useMemo(
    () => [
      { value: "ALL" as SkillStatusFilter, label: t("admin:skills.filters.all") },
      { value: "ACTIVE" as SkillStatusFilter, label: t("admin:skills.filters.active") },
      { value: "DEPRECATED" as SkillStatusFilter, label: t("admin:skills.filters.deprecated") },
    ],
    [t],
  );

  const mergeTargetOptions = useMemo(
    () =>
      allActiveSkills
        .filter((s) => s.id !== mergeSource?.id)
        .map((s) => ({ value: s.id, label: s.skillName })),
    [allActiveSkills, mergeSource],
  );

  // ---- Table columns ----
  const columns: TableColumnsType<SkillAdminResponse> = [
    {
      title: t("admin:skills.columns.name"),
      dataIndex: "skillName",
      key: "skillName",
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
          <Space className="admin-skills__name-cell">
            <span className={record.status === "DEPRECATED" ? "admin-skills__name-deprecated" : ""}>
              {value}
            </span>
            {record.status === "ACTIVE" && !editingId && (
              <Button
                icon={<EditOutlined />}
                size="small"
                type="text"
                className="admin-skills__edit-btn"
                onClick={() => handleStartEdit(record)}
              />
            )}
          </Space>
        );
      },
    },
    {
      title: t("admin:skills.columns.status"),
      key: "status",
      width: 190,
      render: (_, record) => {
        if (record.status === "ACTIVE") {
          return <Tag color="success">{t("admin:skills.status.active")}</Tag>;
        }
        return (
          <Space direction="vertical" size={2}>
            <Tag color="default">{t("admin:skills.status.deprecated")}</Tag>
            {record.mergedIntoName && (
              <span className="admin-skills__merged-into">
                {t("admin:skills.status.mergedInto", { name: record.mergedIntoName })}
              </span>
            )}
          </Space>
        );
      },
    },
    {
      title: t("admin:skills.columns.usage"),
      key: "usage",
      width: 280,
      render: (_, record) => <UsageBadges usageCount={record.usageCount} t={t} />,
    },
    {
      title: t("admin:skills.columns.action"),
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
              {t("admin:skills.actions.delete")}
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
              {t("admin:skills.actions.restore")}
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="admin-page admin-skills">
      <EmployerStart content={t("admin:skills.title")} type="search" hideSearch />

      {/* Toolbar: filters left, action right */}
      <div className="admin-toolbar admin-skills__toolbar">
        <div className="admin-skills__filters">
          <Input
            placeholder={t("admin:skills.searchPlaceholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            allowClear
            style={{ width: 260 }}
          />
          <Select
            value={statusFilter}
            options={statusOptions}
            onChange={(value: SkillStatusFilter) => {
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
          {t("admin:skills.addButton")}
        </Button>
      </div>

      <Card className="admin-panel">
        <Table<SkillAdminResponse>
          rowKey="id"
          loading={isLoading}
          dataSource={skills}
          columns={columns}
          rowClassName={(record) => record.status === "DEPRECATED" ? "admin-skills__row-deprecated" : ""}
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

      {/* Create Skill Modal */}
      <Modal
        title={t("admin:skills.create.title")}
        open={isCreateOpen}
        onOk={() => void handleCreate()}
        onCancel={() => { setIsCreateOpen(false); setCreateName(""); }}
        okText={t("admin:skills.create.submit")}
        cancelText={t("common:buttons.cancel")}
        confirmLoading={isCreating}
        destroyOnClose
      >
        <div className="admin-skills__modal-body">
          <label className="admin-skills__modal-label">{t("admin:skills.create.label")}</label>
          <Input
            placeholder={t("admin:skills.create.placeholder")}
            value={createName}
            onChange={(e) => setCreateName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") void handleCreate(); }}
            autoFocus
          />
        </div>
      </Modal>

      {/* Merge Dialog */}
      <Modal
        title={t("admin:skills.merge.title")}
        open={!!mergeSource}
        onOk={() => void handleMerge()}
        onCancel={() => { setMergeSource(null); setMergeUsageCount(null); setMergeTargetId(null); }}
        okText={t("admin:skills.merge.confirmButton")}
        cancelText={t("common:buttons.cancel")}
        confirmLoading={isMerging}
        okButtonProps={{ disabled: !mergeTargetId, danger: true }}
        destroyOnClose
      >
        {mergeSource && (
          <div className="admin-skills__merge-dialog">
            <p className="admin-skills__merge-info">
              {t("admin:skills.merge.inUseText", { name: mergeSource.skillName })}
            </p>
            {mergeUsageCount && (
              <div className="admin-skills__usage-detail">
                <UsageBadges usageCount={mergeUsageCount} t={t} />
              </div>
            )}
            <div className="admin-skills__merge-select-wrap">
              <label className="admin-skills__modal-label">
                {t("admin:skills.merge.selectLabel")}
              </label>
              <Select
                showSearch
                optionFilterProp="label"
                placeholder={t("admin:skills.merge.selectPlaceholder")}
                value={mergeTargetId}
                options={mergeTargetOptions}
                onChange={(value: number) => setMergeTargetId(value)}
                style={{ width: "100%" }}
              />
            </div>
            {mergeUsageCount && mergeTargetId && (
              <p className="admin-skills__merge-preview">
                {t("admin:skills.merge.preview", {
                  jobs: mergeUsageCount.jobs,
                  seekers: mergeUsageCount.seekers,
                  companies: mergeUsageCount.companies,
                })}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminSkills;
