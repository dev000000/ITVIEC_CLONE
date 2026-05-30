import { useEffect, useRef, useState } from "react";
import React from "react";
import "./CVManager.scss";
import { Link, useNavigate } from "react-router-dom";
import uploadImg from "@/assets/images/uploaded-resume.svg";
import ButtonUpload from "@/components/ButtonUpload";
import { FaRegEdit } from "react-icons/fa";
import { VIETNAM_CITIES } from "@/constants";
import Modal from "react-modal";
import { Form, Input } from "antd";
import { Col, Row, Select } from "antd";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { updateMyProfileApi } from "@/services_new/seekerApi";
import { getAllCitiesApi } from "@/services_new/cityApi";
import { useSeekerStore } from "@/store/seekerStore";
import {
  findCityRef,
  findCityRefs,
  toEntityRef,
} from "@/utils/apiPayloadMappers";
import { clearStorage } from "@/helpers/localStorage";
import { useTranslation } from "react-i18next";
import type { CityResponse } from "@/types/response.types";

interface CVManagerFormValues {
  fullName: string;
  phoneNumber: string;
  desiredLocations: string[];
}

interface CoverLetterFormValues {
  coverLetter: string;
}
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
const maxCountCity = 3;
function CVManager() {
  const [form] = Form.useForm();
  const [coverLetterForm] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userId] = useState(localStorage.getItem("id") || "");
  const [isEditing, setIsEditing] = useState(false);
  const seeker = useSeekerStore();
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const [coverLetter, setCoverLetter] = useState(seeker.coverLetter || "");
  const [value, setValue] = useState<string[]>(
    seeker.desiredLocations?.map((city) => city.cityName) || [],
  );
  const [cities, setCities] = useState<CityResponse[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation("jobseeker");

  const originalCoverLetter = useRef("");
  const handleEditCoverLetter = () => {
    if (!isEditing) {
      originalCoverLetter.current = seeker.coverLetter || "";
      setCoverLetter(seeker.coverLetter || "");
      coverLetterForm.setFieldsValue({
        coverLetter: seeker.coverLetter || "",
      });
    }
    setIsEditing(!isEditing);
  };
  const handleCancelCoverLetter = () => {
    setCoverLetter(originalCoverLetter.current);
    coverLetterForm.setFieldsValue({
      coverLetter: originalCoverLetter.current,
    });
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
    form.setFieldsValue({
      fullName: seeker.fullName || "",
      phoneNumber: seeker.phoneNumber || "",
      desiredLocations:
        seeker.desiredLocations?.map((city) => city.cityName) || [],
    });
  };
  const onClick = () => {
    console.log("upload");
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const buildSeekerUpdatePayload = (
    values: Partial<CVManagerFormValues & CoverLetterFormValues>,
  ) => ({
    fullName: values.fullName ?? seeker.fullName ?? "",
    jobTitle: seeker.jobTitle ?? "",
    phoneNumber: values.phoneNumber ?? seeker.phoneNumber ?? "",
    dateOfBirth: seeker.dateOfBirth ?? "1999-01-01",
    gender: seeker.gender ?? "OTHERS",
    city: findCityRef(seeker.city?.id, cities, seeker.city),
    address: seeker.address ?? "",
    personalLink: seeker.personalLink ?? "",
    coverLetter: values.coverLetter ?? seeker.coverLetter ?? "",
    skills: seeker.skills
      .map((skill) => toEntityRef(skill.id))
      .filter((skill): skill is { id: number | string } => Boolean(skill)),
    desiredLocations: findCityRefs(
      values.desiredLocations ??
        seeker.desiredLocations?.map((city) => city.cityName) ??
        [],
      cities,
    ),
  });

  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await getAllCitiesApi();
        setCities(response.data.result ?? []);
      } catch (error) {
        console.error("Error fetching city options:", error);
      }
    };

    loadCities();
  }, []);

  const onFinish = async (values: CVManagerFormValues) => {
    const currentUserId = localStorage.getItem("id");
    if (currentUserId !== userId && currentUserId) {
      clearStorage();
      clearSeekerInfo();
      navigate("/login");
      return;
    }
    try {
      const response = await updateMyProfileApi(buildSeekerUpdatePayload(values));
      const result = response.data.result;
      setSeekerFullInfo(result);
      setCoverLetter(result.coverLetter || "");
      Swal.fire({
        title: t("cvManager.success.updateProfile"),
        icon: "success",
        draggable: true,
      });
      form.resetFields();
      closeModal();
    } catch (error) {
      console.error("Error updating seeker information:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("cvManager.error.updateFailed"),
      });
    }
  };
  const onFinish2 = async (values: CoverLetterFormValues) => {
    const currentUserId = localStorage.getItem("id");
    if (currentUserId !== userId && currentUserId) {
      clearStorage();
      clearSeekerInfo();
      navigate("/login");
      return;
    }
    try {
      const response = await updateMyProfileApi(buildSeekerUpdatePayload(values));
      const result = response.data.result;
      console.log("Update cover letter result:", result);
      setSeekerFullInfo(result);
      setCoverLetter(result.coverLetter || "");
      Swal.fire({
        title: t("cvManager.success.updateLetter"),
        icon: "success",
        draggable: true,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating cover letter:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("cvManager.error.updateFailed"),
      });
    }
  };
  const getFieldsClassName = (value: unknown) => {
    return value
      ? `cv-manager__content`
      : `cv-manager__content cv-manager__content--default`;
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="cv-form__title-wrap">
          <div className="cv-form__title"> {t("cvManager.personalInfo")}</div>
          <div className="cv-form__close-button" onClick={closeModal}>
            <IoClose />
          </div>
        </div>
        <div className="cv-form">
          <Form
            form={form}
            name="basic"
            style={{
              padding: "20px",
              width: "1000px",
              maxWidth: "95vw",
              margin: "0 auto",
              maxHeight: "70vh",
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item
                  label={<label className="cv-form__label">{t("cvManager.fullName")}</label>}
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: t("cvManager.validation.fullNameRequired"),
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <label className="cv-form__label">{t("cvManager.phoneNumber")}</label>
                  }
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: t("cvManager.validation.phoneRequired"),
                    },
                    {
                      pattern: /^[0-9]{10,11}$/,
                      message: t("cvManager.validation.phoneFormat"),
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="desiredLocations"
                  label={
                    <label className="cv-form__label">
                      {t("cvManager.desiredLocations")}
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: t("cvManager.validation.locationsRequired"),
                    },
                  ]}
                >
                  <Select
                    options={VIETNAM_CITIES}
                    size="large"
                    mode="multiple"
                    maxCount={3}
                    value={value}
                    onChange={setValue}
                  ></Select>
                </Form.Item>
                <div>
                  {" "}
                  {t("cvManager.locationCount", { count: value.length, max: maxCountCity })}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="cv-form__footer">
          <Row gutter={[10, 10]}>
            <Col
              xxl={{ span: 2, offset: 19 }}
              xl={{ span: 2, offset: 19 }}
              lg={{ span: 2, offset: 19 }}
              md={12}
              sm={12}
              xs={12}
            >
              <div className="cv-form__cancel-button" onClick={closeModal}>
                {t("cvManager.cancel")}
              </div>
            </Col>
            <Col xxl={3} xl={3} lg={3} md={12} sm={12} xs={12}>
              <div
                className="cv-form__save-button"
                onClick={() => form.submit()}
              >
                {t("cvManager.save")}
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      <div className="cv-manager">
        <div className="job-seeker-section">
          <h2 className="cv-manager__main-title--custom">{t("cvManager.title")}</h2>
          <p className="cv-manager__text">
            {t("cvManager.uploadDesc")}
          </p>
          <div className="cv-manager__block">
            <h3 className="cv-manager__main-title">{t("cvManager.yourCV")}</h3>
            <div className="update-cv update-cv--2">
              <img
                src={uploadImg}
                alt="upload-resume"
                className="update-cv__img update-cv__img--2"
              />
              <div className="update-cv__main-content">
                <Link
                  to="/"
                  className="update-cv__link-file update-cv__link-file--2"
                >
                  CV.docx
                </Link>
                <div className="update-cv__file-date">
                  {t("cvManager.yourCV")}
                </div>
              </div>
            </div>
            <ButtonUpload text={t("cvManager.uploadCV")} handleUpload={onClick} />
            <p className="cv-manager__text cv-manager__text--small">
              {t("cvManager.supportedFormats")}
            </p>
          </div>
          <div className="cv-manager__block">
            <div className="cv-manager__header">
              <h3 className="cv-manager__main-title">{t("cvManager.personalInfo")}</h3>
              <FaRegEdit onClick={openModal} />
            </div>

            <div className="cv-manager__content-wrap">
              <Row gutter={[10, 20]}>
                <Col className="cv-manager__title" span={8}>
                  {t("cvManager.fullName")}
                </Col>
                <Col className={getFieldsClassName(seeker.fullName)} span={16}>
                  {seeker.fullName || t("cvManager.notUpdated")}
                </Col>
                <Col className="cv-manager__title" span={8}>
                  {t("cvManager.phoneNumber")}
                </Col>
                <Col
                  className={getFieldsClassName(seeker.phoneNumber)}
                  span={16}
                >
                  {seeker.phoneNumber || t("cvManager.notUpdated")}
                </Col>
                <Col className="cv-manager__title" span={8}>
                  {t("cvManager.desiredLocations")}
                </Col>
                <Col
                  className={getFieldsClassName(seeker.desiredLocations)}
                  span={16}
                >
                  {seeker.desiredLocations && seeker.desiredLocations.length > 0
                    ? seeker.desiredLocations.map((city) => city.cityName).join(", ")
                    : t("cvManager.notUpdated")}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="job-seeker-section">
          <div className="cv-manager__block cv-manager__block--main">
            <div className="cv-manager__header">
              <h3 className="cv-manager__main-title cv-manager__main-title--custom">
                {t("cvManager.generalInfo")}
              </h3>
              <FaRegEdit />
            </div>
            <div className="cv-manager__content-wrap">
              <Row gutter={[10, 20]}>
                <Col className="cv-manager__title" span={8}>
                  {t("cvManager.totalExperience")}
                </Col>
                <Col
                  className="cv-manager__content cv-manager__content--default"
                  span={16}
                >
                  {t("cvManager.addInfo")}
                </Col>
                <Col className="cv-manager__title" span={8}>
                  {t("cvManager.currentLevel")}
                </Col>
                <Col
                  className="cv-manager__content cv-manager__content--default"
                  span={16}
                >
                  {t("cvManager.addInfo")}
                </Col>
                <Col className="cv-manager__title" span={8}>
                  {t("cvManager.workType")}
                </Col>
                <Col
                  className="cv-manager__content cv-manager__content--default"
                  span={16}
                >
                  {t("cvManager.addInfo")}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="job-seeker-section">
          <div className="cv-manager__block cv-manager__block--main">
            <div className="cv-manager__header">
              <h3 className="cv-manager__main-title cv-manager__main-title--custom">
                {t("cvManager.coverLetter")}
              </h3>
              <FaRegEdit onClick={handleEditCoverLetter} />
            </div>
            <div className="devider"></div>
            <p
              ref={originalCoverLetter as unknown as React.RefObject<HTMLParagraphElement>}
              className={
                isEditing
                  ? "cv-manager__mail cv-manager__mail--close"
                  : "cv-manager__mail"
              }
            >
              {seeker.coverLetter || t("cvManager.coverLetterEmpty")}
            </p>
            <div
              className={
                isEditing
                  ? "cv-manager__edit-form"
                  : "cv-manager__edit-form cv-manager__edit-form--close"
              }
            >
              <p className="cv-manager__note">
                {t("cvManager.coverLetterHint")}
              </p>
              <Form
                onFinish={onFinish2}
                layout="vertical"
                onFinishFailed={onFinishFailed}
                form={coverLetterForm}
                style={{
                  margin: "20px 0",
                }}
              >
                <Form.Item name="coverLetter" style={{ marginBottom: "5px" }}>
                  <Input.TextArea
                    rows={6}
                    placeholder={t("cvManager.coverLetterPlaceholder")}
                    value={coverLetter}
                    size="large"
                    maxLength={500}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </Form.Item>
                <div style={{ fontSize: "16px", color: "#a6a6a6" }}>
                  {t("cvManager.charCount", { count: coverLetter.length })}
                </div>
                <div className="cv-form__footer cv-form__footer--custom">
                  <Row gutter={[10, 10]}>
                    <Col
                      xxl={{ span: 3, offset: 16 }}
                      xl={{ span: 3, offset: 16 }}
                      lg={{ span: 3, offset: 16 }}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <div
                        className="cv-form__cancel-button"
                        onClick={handleCancelCoverLetter}
                      >
                        {t("cvManager.cancel")}
                      </div>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                      <Form.Item label={null}>
                        <button
                          className="cv-form__save-button cv-form__save-button--custom"
                          type="submit"
                        >
                          {t("cvManager.save")}
                        </button>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVManager;
