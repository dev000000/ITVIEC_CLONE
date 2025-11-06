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
import EmployerStart from "../../../components/EmployerStart";
import { useEffect, useState } from "react";
import {
  getApplicationsWithJob,
  getApplicationsWithJobPagination,
  updateApplication,
} from "../../../services/EmployerServices";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";
import "./EmployerApplications.scss";
import dayjs from "dayjs";
import { VIETNAM_CITIES } from "../../../constants/index";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";

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
    value: "Pending",
    label: <Badge status="processing" text="Pending" />,
  },
  {
    value: "Accepted",
    label: <Badge status="success" text="Accepted" />,
  },
  {
    value: "Rejected",
    label: <Badge status="error" text="Rejected" />,
  },
];
function EmployerApplications() {
  const company = useSelector((state) => state.CompanyReducer);
  const [datasource, setDatasource] = useState([]);
  const [Pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [total, setTotal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [update, setUpdate] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên công việc",
      dataIndex: "job",
      key: "job",
      render: (job) => (
        <Link to={`/customer/job/${job.id}`}> {job?.title || "N/A"} </Link>
      ),
      fixed: isMobile ? "" : "left",
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Hồ sơ",
      dataIndex: "resumeUrl",
      key: "resumeUrl",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Thư xin việc",
      dataIndex: "coverLetter",
      key: "coverLetter",
      width: 200,
      render: (text) => (
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
      title: "Nơi làm việc mong muốn",
      dataIndex: "desiredLocations",
      key: "desiredLocations",
      render: (text) => text.join(", "),
    },
    {
      title: "Thời gian nộp",
      dataIndex: "appliedAt",
      key: "appliedAt",
      render: (text) =>
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case "Rejected":
            return <Badge status="error" text="Rejected" />;
          case "Accepted":
            return <Badge status="success" text="Accepted" />;
          case "Pending":
            return <Badge status="processing" text="Pending" />;
          default:
            return <Badge status="default" text="Không xác định" />;
        }
      },
    },
    {
      title: "Hành động",
      key: "action",
      fixed: isMobile ? "" : "right",
      render: (text, record) => (
        <div className="button--detail" onClick={() => openModal(record)}>
          Xem chi tiết
        </div>
      ),
    },
  ];

  const onFinish = async (values) => {
    const updatedValues = {
      status: values.status,
      employerMessage: values.employerMessage || "",
    };
    console.log("valuesid", values.id);

    try {
      const result = await updateApplication(values.id, updatedValues);
      if (result) {
        Swal.fire({
          title: "Update Application Success!",
          icon: "success",
          draggable: true,
        });
        setUpdate(!update);
        closeModal();
      } else {
        Swal.fire({
          title: "Update Application Failed!",
          text: "Please try again later.",
          icon: "error",
        });

        closeModal();
      }
    } catch (error) {
      console.error("Error updating application:", error);
      return;
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const openModal = (record) => {
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
      const applicationList = await getApplicationsWithJob(company.id);
      console.log(applicationList);
      setTotal(applicationList.length);
    };
    getApplication();
  }, []);

  useEffect(() => {
    const getApplication = async () => {
      const applicationList = await getApplicationsWithJobPagination(
        company.id,
        (Pagination.current - 1) * Pagination.pageSize,
        Pagination.pageSize
      );
      console.log(applicationList);
      setDatasource(applicationList || []);
    };
    getApplication();
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
          <div className="job-form__title">Chi tiết</div>
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
                <Form.Item label="Tên công việc" name="title">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Họ Và Tên" name="fullName">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Hồ sơ" name="resumeUrl">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Thư xin việc" name="coverLetter">
                  <TextArea rows={4} maxLength={6} disabled />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="desiredLocations"
                  label="Nơi làm việc mong muốn"
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
                <Form.Item name="appliedAt" label="Thời gian nộp">
                  <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Trạng thái" name="status">
                  <Select
                    placeholder="Please select status"
                    options={statusList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="employerMessage" label="Thông báo phỏng vấn">
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <div className="dashboard-employer">
        <EmployerStart content="Applications" type="search" />
        <div styles={{ color: "black" }}>
          <Table
            dataSource={datasource}
            columns={columns}
            scroll={{ x: "max-content" }}
            bordered
            rowKey={record => record.id}
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
