// Trang quản lý đơn ứng tuyển (CV) của công ty Employer
// Hiển thị danh sách ứng viên đã apply vào các job của công ty dưới dạng bảng
import {
  Table,
  Tooltip,
  Badge,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
} from "antd";
import EmployerStart from "@/components/EmployerStart";
import ButtonAction from "@/components/ButtonAction";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getMyCompanyApplicationsApi,
  updateApplicationStatusApi,
} from "@/services/applicationApi";
import { getAllCitiesApi } from "@/services/cityApi";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import Modal from "react-modal";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import "./EmployerApplications.scss";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";
import type { TableColumnsType } from "antd";
import { getApplicationStatusOptions } from "@/constants";
import { type ApplicationStatus } from "@/types/common.types";
import { toApplicationStatus } from "@/utils/apiPayloadMappers";
import { getApiErrorMessage } from "@/utils/apiError";
import type { CityResponse } from "@/types/response.types";

// Kiểu dữ liệu cho mỗi dòng trong bảng danh sách đơn ứng tuyển
interface ApplicationRecord {
  id: string;
  job?: { id?: string | number; title?: string };
  fullName: string;
  phoneNumber: string;
  resumePreviewUrl: string;
  coverLetter: string;
  desiredLocations: string[];
  appliedAt: string;
  status: ApplicationStatus;
  employerMessage: string;
}

interface PaginationState {
  current: number;
  pageSize: number;
}

interface ApplicationFilters {
  jobTitle: string;
  status?: ApplicationStatus;
}

const defaultFilters: ApplicationFilters = {
  jobTitle: "",
};

// Style căn giữa màn hình cho react-modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-45%, -50%)",
    padding: 0,
    overflow: "hidden",
  },
};

const EmployerApplications = () => {
  const { t } = useTranslation();
  // Dữ liệu hiển thị trên bảng
  const [datasource, setDatasource] = useState<ApplicationRecord[]>([]);
  // Trạng thái phân trang server-side
  const [pagination, setPagination] = useState<PaginationState>({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState<number>(0);


  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  const [update, setUpdate] = useState<boolean>(false);

  const [cities, setCities] = useState<CityResponse[]>([]);
  const [filterInputs, setFilterInputs] = useState<ApplicationFilters>(defaultFilters);
  const [filters, setFilters] = useState<ApplicationFilters>(defaultFilters);
  const statusOptions = getApplicationStatusOptions(t);

  const getStatusLabel = (status: ApplicationStatus) =>
    statusOptions.find((option) => option.value === status)?.label ?? status;

  const columns: TableColumnsType<ApplicationRecord> = [
    {
      title: t("employer:applications.columns.stt"),
      key: "stt",
      width: 60,
      render: (_, __, index) => index + 1 + (pagination.current - 1) * pagination.pageSize,
    },
    {
      title: t("employer:applications.columns.jobTitle"),
      dataIndex: "job",
      key: "job",
      render: (job: ApplicationRecord["job"]) => (
        <Link to={`/customer/job/${job?.id || ""}`}> {job?.title || "N/A"} </Link>
      ),
      fixed: isMobile ? undefined : "left",
    },
    {
      title: t("employer:applications.columns.fullName"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("employer:applications.columns.phoneNumber"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: t("employer:applications.columns.resume"),
      dataIndex: "resumePreviewUrl",
      key: "resumePreviewUrl",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text ? t("employer:applications.columns.viewResume") : "N/A"} 
        </a>
      ),
    },
    {
      title: t("employer:applications.columns.coverLetter"),
      dataIndex: "coverLetter",
      key: "coverLetter",
      width: 200,
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}>
          <div
            style={{
              maxWidth: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Tooltip>
      ),
    },
    {
      title: t("employer:applications.columns.desiredLocations"),
      dataIndex: "desiredLocations",
      key: "desiredLocations",
      render: (text: string[]) => text.join(", "),
    },
    {
      title: t("employer:applications.columns.appliedAt"),
      dataIndex: "appliedAt",
      key: "appliedAt",
      render: (text: string) =>
        new Date(text).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
    },
    {
      title: t("employer:applications.columns.status"),
      dataIndex: "status",
      key: "status",
      render: (status: ApplicationStatus) => {
        switch (status) {
          case "REJECTED":
            return <Badge status="error" text={getStatusLabel(status)} />;
          case "ACCEPTED":
            return <Badge status="success" text={getStatusLabel(status)} />;
          case "PENDING":
            return <Badge status="processing" text={getStatusLabel(status)} />;
          default:
            return <Badge status="default" text={t("employer:applications.statusBadge.unknown")} />;
        }
      },
    },
    {
      title: t("employer:applications.columns.action"),
      key: "action",
      fixed: isMobile ? undefined : "right",
      render: (_text: unknown, record: ApplicationRecord) => (
        <div className="button--detail" onClick={() => openModal(record)}>
          {t("employer:applications.viewDetail")}
        </div>
      ),
    },
  ];


  // Xử lý submit form modal: cập nhật trạng thái và tin nhắn phản hồi cho đơn ứng tuyển
  const onFinish = async (values: Record<string, unknown>) => {
    const updatedValues = {
      status: values.status,
      employerMessage: values.employerMessage || "",
    };

    try {
      await updateApplicationStatusApi(String(values.id), {
        status: toApplicationStatus(updatedValues.status),
        employerMessage: String(updatedValues.employerMessage || ""),
      });
      Swal.fire({
        title: "Update Application Success!",
        icon: "success",
        draggable: true,
      });
      setUpdate(!update);
      closeModal();
    } catch (error) {
      console.error("Error updating application:", error);
      Swal.fire({
        icon: "error",
        title: t("employer:applications.notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    }
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    setFilters({
      jobTitle: filterInputs.jobTitle.trim(),
      status: filterInputs.status,
    });
  };
  // Mở modal và điền sẵn thông tin của đơn ứng tuyển được chọn vào form
  const openModal = (record: ApplicationRecord) => {
    form.setFieldsValue({
      id: record.id,
      title: record.job?.title || "",
      fullName: record.fullName || "",
      phoneNumber: record.phoneNumber || "",
      resumeUrl: record.resumePreviewUrl || "",
      coverLetter: record.coverLetter || "",
      desiredLocations: record.desiredLocations || [],
      appliedAt: record.appliedAt ? dayjs(record.appliedAt) : null,
      status: record.status,
      employerMessage: record.employerMessage || "",
    });
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // Lắng nghe sự kiện resize window để cập nhật isMobile (breakpoint 1200px)
  // isMobile ảnh hưởng việc “fixed” các cột đầu/cuối bảng khi responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Lấy danh sách đơn theo trang hiện tại; re-fetch khi pagination, filter hoặc update thay đổi
  useEffect(() => {
    const getApplication = async () => {
      try {
        const {data: applicationData} = await getMyCompanyApplicationsApi({
          page: pagination.current - 1,
          size: pagination.pageSize,
          status: filters.status,
          jobTitle: filters.jobTitle || undefined,
        });
        const applications = applicationData.result?.data;

        setDatasource(
          applications?.map((app) => ({
            id: app.id,
            job: app.job ? { id: app.job.id, title: app.job.title } : undefined,
            fullName: app.fullName,
            phoneNumber: app.phoneNumber,
            resumeUrl: app.resumeUrl,
            coverLetter: app.coverLetter,
            desiredLocations: app.desiredLocations.map((loc) => loc.cityName),  
            appliedAt: app.createdAt,
            status: app.status,
            employerMessage: app.employerMessage,
            resumePreviewUrl: app.resumeUrl, // Tạm thời dùng cùng URL cho preview
          })) || []
        );
        setTotal(applicationData.result?.totalElements || 0);
      } catch (error) {
        console.error("Error fetching applications:", error);
        Swal.fire({
          icon: "error",
          title: t("employer:applications.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      }
    };
    getApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, update, filters]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await getAllCitiesApi();
        setCities(response.data.result ?? []);
      } catch (error) {
        console.error("Error fetching cities:", error);
        Swal.fire({
          icon: "error",
          title: t("employer:applications.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      }
    };
    loadCities();
  }, []);

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="job-form__title-wrap">
          <div className="job-form__title">{t("employer:applications.detail.title")}</div>
          <div className="job-form__close-button" onClick={closeModal}>
            <IoClose />
          </div>
        </div>
        <div className="job-form">
          <Form
            form={form}
            name="basic"
            style={{
              padding: "20px",
              width: "600px",
              maxWidth: "88vw",
              margin: "0 auto",
              maxHeight: "70vh",
              overflow: "y",
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item label={t("employer:applications.detail.jobTitle")} name="title">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t("employer:applications.detail.fullName")} name="fullName">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t("employer:applications.detail.phoneNumber")} name="phoneNumber">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:applications.detail.resume")} name="resumeUrl">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:applications.detail.coverLetter")} name="coverLetter">
                  <TextArea rows={4} maxLength={6} disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="desiredLocations"
                  label={t("employer:applications.detail.desiredLocations")}
                  rules={[
                    {
                      required: true,
                      message: "Please select desired locations",
                      type: "array",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Please select desired locations"
                    disabled
                    options={cities.map((c) => ({ value: c.cityName, label: c.cityName }))}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="appliedAt" label={t("employer:applications.detail.appliedAt")}>
                  <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t("employer:applications.detail.status")} name="status">
                  <Select
                    placeholder="Please select status"
                    options={statusOptions}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="employerMessage" label={t("employer:applications.detail.employerMessage")}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    {t("employer:applications.detail.submit")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <div className="employer-applications">
        <EmployerStart content={t("employer:applications.title")} type="search" hideSearch />
        <div className="employer-job__button-wrap">
          <div className="employer-job__filter-group">
            <Input
              allowClear
              placeholder={t("employer:applications.filter.jobTitlePlaceholder")}
              value={filterInputs.jobTitle}
              onChange={(event) =>
                setFilterInputs((prev) => ({
                  ...prev,
                  jobTitle: event.target.value,
                }))
              }
              onPressEnter={handleSearch}
              size="large"
              style={{ width: 220 }}
            />
            <Select
              allowClear
              placeholder={t("employer:applications.filter.statusPlaceholder")}
              value={filterInputs.status}
              options={statusOptions}
              onChange={(value) =>
                setFilterInputs((prev) => ({
                  ...prev,
                  status: value as ApplicationStatus | undefined,
                }))
              }
              size="large"
              style={{ width: 180 }}
            />
            <ButtonAction
              text={t("employer:applications.filter.searchButton")}
              icon={<MdSearch />}
              handle={handleSearch}
            />
          </div>
        </div>
        <div style={{ color: "black" }}>
          <Table
            dataSource={datasource}
            columns={columns}
            scroll={{ x: "max-content" }}
            bordered
            rowKey={(record) => record.id}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setPagination((prev) => ({
                  current: page,
                  pageSize: pageSize ?? prev.pageSize,
                }));
              },
              total: total,
            }}
          />
        </div>
      </div>
    </>
  );
}
export default EmployerApplications;
