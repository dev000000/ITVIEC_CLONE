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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getMyCompanyApplicationsApi,
  updateApplicationStatusApi,
} from "@/services_new/applicationApi";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import "./EmployerApplications.scss";
import dayjs from "dayjs";
import { VIETNAM_CITIES } from "@/constants/index";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";
import type { TableColumnsType } from "antd";
import { toApplicationStatus } from "@/utils/apiPayloadMappers";
import type { ApplicationResponse, JobDetailResponse } from "@/types/response.types";

interface ApplicationRecord {
  id: string;
  job?: { id?: string | number; title?: string };
  fullName: string;
  phoneNumber: string;
  resumeUrl: string;
  coverLetter: string;
  desiredLocations: string[];
  appliedAt: string;
  status: string;
  employerMessage: string;
}

interface PaginationState {
  current: number;
  pageSize: number;
}

type ApplicationWithRelations = ApplicationResponse & {
  job?: Pick<JobDetailResponse, "id" | "title">;
};

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
const statusList = [
  {
    value: "PENDING",
    label: <Badge status="processing" text="Pending" />,
  },
  {
    value: "ACCEPTED",
    label: <Badge status="success" text="Accepted" />,
  },
  {
    value: "REJECTED",
    label: <Badge status="error" text="Rejected" />,
  },
];
function EmployerApplications() {
  const { t } = useTranslation();
  const [datasource, setDatasource] = useState<ApplicationRecord[]>([]);
  const [Pagination, setPagination] = useState<PaginationState>({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [update, setUpdate] = useState<boolean>(false);
  const columns: TableColumnsType<ApplicationRecord> = [
    {
      title: t("employer:applications.columns.id"),
      dataIndex: "id",
      key: "id",
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
      dataIndex: "resumeUrl",
      key: "resumeUrl",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
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
      render: (status: string) => {
        switch (status) {
          case "REJECTED":
          case "Rejected":
            return <Badge status="error" text={t("employer:applications.statusBadge.rejected")} />;
          case "ACCEPTED":
          case "Accepted":
            return <Badge status="success" text={t("employer:applications.statusBadge.accepted")} />;
          case "PENDING":
          case "Pending":
            return <Badge status="processing" text={t("employer:applications.statusBadge.pending")} />;
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

  const onFinish = async (values: Record<string, unknown>) => {
    const updatedValues = {
      status: values.status,
      employerMessage: values.employerMessage || "",
    };
    console.log("valuesid", values.id);

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
      return;
    }
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  const openModal = (record: ApplicationRecord) => {
    form.setFieldsValue({
      id: record.id,
      title: record.job?.title || "",
      fullName: record.fullName || "",
      phoneNumber: record.phoneNumber || "",
      resumeUrl: record.resumeUrl || "",
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
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [isMobile]);

  useEffect(() => {
    const getApplication = async () => {
      const response = await getMyCompanyApplicationsApi();
      setTotal(response.data.result?.length || 0);
    };
    getApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getApplication = async () => {
      const response = await getMyCompanyApplicationsApi();
      const applicationList = ((response.data.result ?? []) as ApplicationWithRelations[]).map(
        (application) => ({
          id: application.id,
          // TODO(service-new-migration): ApplicationResponse hien tai co the chua tra relation `job`.
          // Legacy call: GET `applications?companyId=...&_expand=job`.
          // Muc dich: hien thi job title va link job trong bang Employer Applications.
          // Tam thoi map relation neu backend tra ve, nguoc lai UI hien thi `N/A`.
          job: application.job,
          fullName: application.fullName,
          phoneNumber: application.phoneNumber,
          resumeUrl: application.resumeUrl,
          coverLetter: application.coverLetter,
          desiredLocations:
            application.desiredLocations?.map((city) => city.cityName) ?? [],
          appliedAt: application.createdAt || application.updatedAt,
          status: application.status,
          employerMessage: application.employerMessage,
        }),
      );
      const start = (Pagination.current - 1) * Pagination.pageSize;
      const end = start + Pagination.pageSize;
      setTotal(applicationList.length);
      setDatasource(applicationList.slice(start, end));
    };
    getApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Pagination, update]);
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
                <Form.Item label="ID" name="id">
                  <Input disabled />
                </Form.Item>
              </Col>
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
                    options={VIETNAM_CITIES}
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
                    options={statusList}
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
      <div className="dashboard-employer">
        <EmployerStart content={t("employer:applications.title")} type="search" />
        <div style={{ color: "black" }}>
          <Table
            dataSource={datasource}
            columns={columns}
            scroll={{ x: "max-content" }}
            bordered
            rowKey={(record) => record.id}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: (page, pageSize) => {
                setPagination({ current: page, pageSize: pageSize });
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
