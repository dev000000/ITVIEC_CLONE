import { useState } from "react";
import "./CardApplication.scss";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import MB from "../../assets/images/mb-bank.webp";
import SCANDINAVIAN from "../../assets/images/scandinavian-software-park.webp";
import OTSV from "../../assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "../../assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "../../assets/images/tymex.webp";
import ANDPAD from "../../assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "../../assets/images/employment-hero.webp";
import BOSCH from "../../assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "../../assets/images/ssi-securities-corporation.webp";
import { Badge, Form, Popover } from "antd";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Input, Select, DatePicker, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { VIETNAM_CITIES } from "../../constants";
import DOMPurify from "dompurify";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
const logoMap = {
  "mb-bank": MB,
  "scandinavian-software-park": SCANDINAVIAN,
  "one-tech-stop-vietnam-company-ltd": OTSV,
  "mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei": MCREDIT,
  tymex: TYMEX,
  "andpad-vietnam-co-ltd": ANDPAD,
  "employment-hero": EMPLOYMENTHERO,
  "bosch-global-software-technologies-company-limited": BOSCH,
  "ssi-securities-corporation": SSI,
};
const content = <div> Mở trong tab mới </div>;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
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
function CardApplication({ application }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const date = dayjs(application.appliedAt).format("DD/MM/YYYY");
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (!application.job?.slug) {
      return;
    }
      return window.open(`/viec-lam-it/${application.job?.slug}`, "_blank");;
  };
  const status = () => {
    switch (application.status) {
      case "Rejected":
        return <Badge status="error" text="Rejected" />;
      case "Accepted":
        return <Badge status="success" text="Accepted" />;
      case "Pending":
        return <Badge status="processing" text="Pending" />;
      default:
        return <Badge status="default" text="Không xác định" />;
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    form.setFieldsValue({
      title: application.job?.title || "",
      salary: application.job?.salary || "",
      companyName: application.company?.companyName || "",
      fullName: application.fullName || "",
      phoneNumber: application.phoneNumber || "",
      resumeUrl: application.resumeUrl || "",
      coverLetter: application.coverLetter || "",
      desiredLocations: application.desiredLocations || [],
      appliedAt: application.appliedAt ? dayjs(application.appliedAt) : null,
      status: application.status,
      employerMessage: application.employerMessage || "",
    });
    setIsOpen(true);
  };

  return (
    <div className="card-application">
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
              width: "1000px",
              maxWidth: "95vw",
              margin: "0 auto",
              maxHeight: "70vh",
              overflow: "y",
            }}
            initialValues={{ remember: true }}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10, 10]}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Tên công việc" name="title">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Tên Công Ty" name="companyName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item label="Mức Lương" name="salary">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Họ Và Tên" name="fullName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Số điện thoại" name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item label="Hồ sơ" name="resumeUrl">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item label="Thư xin việc" name="coverLetter">
                  <TextArea rows={4} maxLength={6} />
                </Form.Item>
              </Col>
              <Col span={10} xl={10} lg={10} md={24} sm={24} xs={24}>
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
                    options={VIETNAM_CITIES}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={7} xl={7} lg={7} md={12} sm={24} xs={24}>
                <Form.Item name="appliedAt" label="Thời gian nộp">
                  <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" style={{width: "100%"}} />
                </Form.Item>
              </Col>
              <Col span={7} xl={7} lg={7} md={12} sm={24} xs={24}>
                <Form.Item label="Trạng thái" name="status">
                  <Select
                    placeholder="Please select status"
                    options={statusList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Thư phản hồi" name="employerMessage">
                  <div className="html-preview card-application__employer-message">
                    <div
                      className="preview-content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          application.employerMessage ||
                            "Chưa có phản hồi từ nhà tuyển dụng."
                        ),
                      }}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <div className="card-application__date card-application__date--top">Ứng tuyển vào {date}</div>
      <div className="card-application__wrapper">
        <div className="card-application__left">
          <div className="card-application__img-wrap">
            <img src={logoMap[application.company?.slug]} alt="Company Logo" />
          </div>
          <div className="card-application__content-wrap">
            <h4 className="card-application__title">
              {application.job?.title || "???"}{" "}
              <Popover content={content} placement="top">
                <LuSquareArrowOutUpRight onClick={handleNavigate}/>
              </Popover>
            </h4>
            <Link className="card-application__company">
              {application.company?.companyName || "???"}
            </Link>
            <div className="card-application__salary">
              <AiOutlineDollarCircle />
              <span> {application.job?.salary || "???"} </span>
            </div>
          </div>
        </div>
        <div className="card-application__right">
          <div className="card-application__date">Ứng tuyển vào {date}</div>
          <div className="card-application__status">{status()}</div>
          <div className="card-application__details" onClick={openModal}>
            {" "}
            Xem chi tiết{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardApplication;
