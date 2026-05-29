import { useState } from "react";
import "./CardApplication.scss";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import MB from "@/assets/images/mb-bank.webp";
import SCANDINAVIAN from "@/assets/images/scandinavian-software-park.webp";
import OTSV from "@/assets/images/one-tech-stop-vietnam-company-ltd.webp";
import MCREDIT from "@/assets/images/mcredit-cong-ty-tai-chinh-tnhh-mb-shinsei.webp";
import TYMEX from "@/assets/images/tymex.webp";
import ANDPAD from "@/assets/images/andpad-vietnam-co-ltd.webp";
import EMPLOYMENTHERO from "@/assets/images/employment-hero.webp";
import BOSCH from "@/assets/images/bosch-global-software-technologies-company-limited.webp";
import SSI from "@/assets/images/ssi-securities-corporation.webp";
import { Badge, Form, Popover } from "antd";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Input, Select, DatePicker, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { VIETNAM_CITIES } from "@/constants";
import DOMPurify from "dompurify";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useTranslation } from "react-i18next";

interface ApplicationJob {
  slug?: string;
  title?: string;
  salary?: string;
}

interface ApplicationCompany {
  companyName?: string;
  slug?: string;
}

interface Application {
  appliedAt: string;
  job?: ApplicationJob;
  company?: ApplicationCompany;
  fullName: string;
  phoneNumber: string;
  resumeUrl: string;
  coverLetter: string;
  desiredLocations: string[];
  status: string;
  employerMessage?: string;
}

interface CardApplicationProps {
  application: Application;
}

const logoMap: Record<string, string> = {
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
function CardApplication({ application }: CardApplicationProps) {
  const { t } = useTranslation("employer");
  const content = <div>{t("cardApplication.openNewTab")}</div>;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const date = dayjs(application.appliedAt).format("DD/MM/YYYY");
  const _navigate = useNavigate();
  const handleNavigate = () => {
    if (!application.job?.slug) {
      return;
    }
    return window.open(`/viec-lam-it/${application.job?.slug}`, "_blank");;
  };
  const status = () => {
    switch (application.status) {
      case "Rejected":
        return <Badge status="error" text={t("applications.statusBadge.rejected")} />;
      case "Accepted":
        return <Badge status="success" text={t("applications.statusBadge.accepted")} />;
      case "Pending":
        return <Badge status="processing" text={t("applications.statusBadge.pending")} />;
      default:
        return <Badge status="default" text={t("applications.statusBadge.unknown")} />;
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
          <div className="job-form__title">{t("cardApplication.detailTitle")}</div>
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
                <Form.Item label={t("applications.detail.jobTitle")} name="title">
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.companyName")} name="companyName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.salary")} name="salary">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.fullName")} name="fullName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.phoneNumber")} name="phoneNumber">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.resume")} name="resumeUrl">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.coverLetter")} name="coverLetter">
                  <TextArea rows={4} maxLength={6} />
                </Form.Item>
              </Col>
              <Col span={10} xl={10} lg={10} md={24} sm={24} xs={24}>
                <Form.Item
                  name="desiredLocations"
                  label={t("applications.detail.desiredLocations")}
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
                <Form.Item name="appliedAt" label={t("applications.detail.appliedAt")}>
                  <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={7} xl={7} lg={7} md={12} sm={24} xs={24}>
                <Form.Item label={t("applications.detail.status")} name="status">
                  <Select
                    placeholder="Please select status"
                    options={statusList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("applications.detail.employerMessage")} name="employerMessage">
                  <div className="html-preview card-application__employer-message">
                    <div
                      className="preview-content"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          application.employerMessage ||
                          t("cardApplication.noReply")
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
      <div className="card-application__date card-application__date--top">{t("cardApplication.appliedOn", { date })}</div>
      <div className="card-application__wrapper">
        <div className="card-application__left">
          <div className="card-application__img-wrap">
            <img src={logoMap[application.company?.slug]} alt="Company Logo" />
          </div>
          <div className="card-application__content-wrap">
            <h4 className="card-application__title">
              {application.job?.title || "???"}{" "}
              <Popover content={content} placement="top">
                <LuSquareArrowOutUpRight onClick={handleNavigate} />
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
          <div className="card-application__date">{t("cardApplication.appliedOn", { date })}</div>
          <div className="card-application__status">{status()}</div>
          <div className="card-application__details" onClick={openModal}>
            {" "}
            {t("cardApplication.viewDetail")}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardApplication;
