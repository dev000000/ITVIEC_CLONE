import { useEffect, useMemo, useState } from "react";
import { Button, Card, Descriptions, Input, Modal, Select, Space, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import EmployerStart from "@/components/EmployerStart";
import { formatJobSalary } from "@/utils/formatSalary";
import { getAllCitiesApi } from "@/services/cityApi";
import {
  deleteAdminJobApi,
  getAdminJobDetailApi,
  getAdminJobsApi,
  updateAdminJobStatusApi,
} from "@/services/jobApi";
import { getApiErrorMessage } from "@/utils/apiError";
import type { JobDetailResponse, CityResponse } from "@/types/response.types";
import type { JobStatus } from "@/types/common.types";
import { getJobStatusOptions, getJobTypeOptions } from "@/constants";
import "./AdminJobs.scss";
import "../AdminCommon.scss";

interface JobFilters {
  title: string;
  companyName: string;
  status?: JobStatus;
  jobType?: JobDetailResponse["jobType"];
  cityId?: number;
}

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

const defaultFilters: JobFilters = {
  title: "",
  companyName: "",
};

const defaultPagination: PaginationState = {
  current: 1,
  pageSize: 10,
  total: 0,
};

const formatDate = (value?: string): string => {
  if (!value) return "-";
  return dayjs(value).format("DD/MM/YYYY HH:mm");
};

function AdminJobs() {
  const { t } = useTranslation(["admin", "common"]);
  const { t: tJob } = useTranslation("job");
  const [jobs, setJobs] = useState<JobDetailResponse[]>([]);
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [filters, setFilters] = useState<JobFilters>(defaultFilters);
  const [filterInputs, setFilterInputs] = useState<JobFilters>(defaultFilters);
  const [pagination, setPagination] = useState<PaginationState>(defaultPagination);
  const [selectedJob, setSelectedJob] = useState<JobDetailResponse | null>(null);
  const [statusDraft, setStatusDraft] = useState<JobStatus | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobStatusOptions = getJobStatusOptions(t);
  const jobTypeOptions = getJobTypeOptions(t);

  const loadJobs = async (
    params: JobFilters = filters,
    currentPage: number = pagination.current,
    pageSize: number = pagination.pageSize
  ) => {
    try {
      setIsLoading(true);
      const response = await getAdminJobsApi({
        page: currentPage - 1,
        size: pageSize,
        title: params.title || undefined,
        companyName: params.companyName || undefined,
        status: params.status,
        jobType: params.jobType,
        cityId: params.cityId,
      });
      const pageResult = response.data.result;
      setJobs(pageResult.data ?? []);
      setPagination((prev) => ({
        ...prev,
        current: pageResult.page + 1,
        pageSize,
        total: pageResult.totalElements,
      }));
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
    const loadInitialData = async () => {
      try {
        const citiesResponse = await getAllCitiesApi();
        setCities(citiesResponse.data.result ?? []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("admin:notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  useEffect(() => {
    loadJobs(filters, pagination.current, pagination.pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.current, pagination.pageSize]);

  const cityOptions = useMemo(
    () => cities.map((city) => ({ value: city.id, label: city.cityName })),
    [cities]
  );

  const handleSearch = () => {
    setFilters({
      title: filterInputs.title.trim(),
      companyName: filterInputs.companyName.trim(),
      status: filterInputs.status,
      jobType: filterInputs.jobType,
      cityId: filterInputs.cityId,
    });
    setPagination((prev) => ({
      ...prev,
      current: 1,
    }));
  };

  const handleReset = () => {
    setFilterInputs(defaultFilters);
    setFilters(defaultFilters);
    setPagination(defaultPagination);
  };

  const handleViewDetail = async (jobId: number) => {
    try {
      setIsDetailLoading(true);
      setSelectedJob(null);
      setIsModalOpen(true);
      const response = await getAdminJobDetailApi(jobId);
      setSelectedJob(response.data.result);
      setStatusDraft(response.data.result.status);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
      setIsModalOpen(false);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedJob || !statusDraft) return;

    try {
      setIsUpdatingStatus(true);
      const response = await updateAdminJobStatusApi(selectedJob.id, { status: statusDraft });
      const updatedJob = response.data.result;
      setSelectedJob(updatedJob);
      await loadJobs(filters, pagination.current, pagination.pageSize);
      Swal.fire({
        icon: "success",
        title: t("admin:jobs.notifications.statusUpdated"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedJob) return;

    const result = await Swal.fire({
      title: t("admin:jobs.notifications.deleteConfirmTitle"),
      text: t("admin:jobs.notifications.deleteConfirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common:buttons.delete"),
      cancelButtonText: t("common:buttons.cancel"),
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteAdminJobApi(selectedJob.id);
      setSelectedJob((prev) => (prev ? { ...prev, status: "CLOSED" } : prev));
      await loadJobs(filters, pagination.current, pagination.pageSize);
      Swal.fire({
        icon: "success",
        title: t("admin:jobs.notifications.deleted"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    }
  };

  const columns: TableColumnsType<JobDetailResponse> = [
    {
      title: t("admin:jobs.columns.title"),
      dataIndex: "title",
      key: "title",
      width: 260,
    },
    {
      title: t("admin:jobs.columns.company"),
      dataIndex: ["company", "companyName"],
      key: "company",
      width: 220,
    },
    {
      title: t("admin:jobs.columns.city"),
      dataIndex: ["city", "cityName"],
      key: "city",
      render: (value?: string) => value || "-",
    },
    {
      title: t("admin:jobs.columns.jobType"),
      dataIndex: "jobType",
      key: "jobType",
      render: (value: JobDetailResponse["jobType"]) =>
        jobTypeOptions.find((item) => item.value === value)?.label ?? value,
    },
    {
      title: t("admin:jobs.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (value: JobStatus) => (
        <Tag color={value === "ACTIVE" ? "success" : value === "DRAFT" ? "gold" : "default"}>
          {jobStatusOptions.find((item) => item.value === value)?.label ?? value}
        </Tag>
      ),
    },
    {
      title: t("admin:jobs.columns.postedAt"),
      dataIndex: "postedAt",
      key: "postedAt",
      render: (value: string) => formatDate(value),
    },
    {
      title: t("admin:jobs.columns.expiresAt"),
      dataIndex: "expiresAt",
      key: "expiresAt",
      render: (value: string) => formatDate(value),
    },
    {
      title: t("admin:jobs.columns.action"),
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetail(record.id)}>
          {t("admin:jobs.viewDetail")}
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-page admin-jobs">
      <EmployerStart content={t("admin:jobs.title")} type="search" hideSearch />

      <div className="admin-toolbar">
        <Input
          placeholder={t("admin:jobs.filters.title")}
          value={filterInputs.title}
          onChange={(event) =>
            setFilterInputs((prev) => ({
              ...prev,
              title: event.target.value,
            }))
          }
          style={{ width: 220 }}
          allowClear
        />
        <Input
          placeholder={t("admin:jobs.filters.company")}
          value={filterInputs.companyName}
          onChange={(event) =>
            setFilterInputs((prev) => ({
              ...prev,
              companyName: event.target.value,
            }))
          }
          style={{ width: 220 }}
          allowClear
        />
        <Select
          placeholder={t("admin:jobs.filters.status")}
          value={filterInputs.status}
          onChange={(value) =>
            setFilterInputs((prev) => ({
              ...prev,
              status: value,
            }))
          }
          allowClear
          options={jobStatusOptions}
          style={{ width: 170 }}
        />
        <Select
          placeholder={t("admin:jobs.filters.jobType")}
          value={filterInputs.jobType}
          onChange={(value) =>
            setFilterInputs((prev) => ({
              ...prev,
              jobType: value,
            }))
          }
          allowClear
          options={jobTypeOptions}
          style={{ width: 170 }}
        />
        <Select
          placeholder={t("admin:jobs.filters.city")}
          value={filterInputs.cityId}
          onChange={(value) =>
            setFilterInputs((prev) => ({
              ...prev,
              cityId: value,
            }))
          }
          allowClear
          options={cityOptions}
          style={{ width: 170 }}
        />
        <Button type="primary" onClick={handleSearch}>
          {t("common:buttons.search")}
        </Button>
        <Button onClick={handleReset}>{t("admin:actions.reset")}</Button>
      </div>

      <Card className="admin-panel">
        <Table<JobDetailResponse>
          dataSource={jobs}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 1200 }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            onChange: (page, pageSize) =>
              setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize: pageSize ?? prev.pageSize,
              })),
          }}
        />
      </Card>

      <Modal
        title={selectedJob?.title || t("admin:jobs.detailTitle")}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        footer={null}
        width={920}
      >
        {selectedJob ? (
          <div className="admin-jobs__detail">
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label={t("admin:jobs.columns.company")}>
                {selectedJob.company.companyName}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.columns.city")}>
                {selectedJob.city?.cityName || "-"}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.columns.jobType")}>
                {jobTypeOptions.find((item) => item.value === selectedJob.jobType)?.label ??
                  selectedJob.jobType}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.columns.status")}>
                <Tag color="cyan">
                  {jobStatusOptions.find((item) => item.value === selectedJob.status)?.label ??
                    selectedJob.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.columns.postedAt")}>
                {formatDate(selectedJob.postedAt)}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.columns.expiresAt")}>
                {formatDate(selectedJob.expiresAt)}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.salary")} span={2}>
                {selectedJob ? formatJobSalary(selectedJob, tJob("card.negotiable")) : "--"}
              </Descriptions.Item>
              <Descriptions.Item label={t("admin:jobs.location")} span={2}>
                {selectedJob.location}
              </Descriptions.Item>
            </Descriptions>

            <div className="admin-jobs__richtext-grid">
              <Card size="small" title={t("admin:jobs.sections.reason")} loading={isDetailLoading}>
                <div
                  className="admin-richtext"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedJob.jobReason || ""),
                  }}
                />
              </Card>
              <Card
                size="small"
                title={t("admin:jobs.sections.description")}
                loading={isDetailLoading}
              >
                <div
                  className="admin-richtext"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedJob.jobDescription || ""),
                  }}
                />
              </Card>
              <Card
                size="small"
                title={t("admin:jobs.sections.requirements")}
                loading={isDetailLoading}
              >
                <div
                  className="admin-richtext"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedJob.jobRequirements || ""),
                  }}
                />
              </Card>
              <Card size="small" title={t("admin:jobs.sections.whyJoinUs")} loading={isDetailLoading}>
                <div
                  className="admin-richtext"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(selectedJob.whyJoinUs || ""),
                  }}
                />
              </Card>
            </div>

            <Space className="admin-jobs__actions" wrap>
              <Select
                value={statusDraft}
                options={jobStatusOptions}
                onChange={(value) => setStatusDraft(value)}
                style={{ width: 220 }}
              />
              <Button type="primary" onClick={handleUpdateStatus} loading={isUpdatingStatus}>
                {t("admin:jobs.saveStatus")}
              </Button>
              <Button danger onClick={handleDelete}>
                {t("admin:jobs.delete")}
              </Button>
            </Space>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

export default AdminJobs;
