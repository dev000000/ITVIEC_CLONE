// Trang quản lý CV của Job Seeker
// Gồm 2 phần chính:
//   1. Upload CV file (PDF/Word) — kết nối API thật, hiển thị metadata, preview, xóa
//   2. Thông tin chung (cover letter, kỹ năng) — inline-edit trực tiếp
// Dữ liệu đọc từ Zustand seekerStore; sau khi cập nhật thành công → gọi setSeekerFullInfo
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import "./CVManager.scss";
import uploadImg from "@/assets/images/uploaded-resume.svg";
import ButtonUpload from "@/components/ButtonUpload";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import Modal from "react-modal";
import { Form, Input, Spin } from "antd";
import { Col, Row, Select } from "antd";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { updateMyCoverLetterApi, updateMyBasicInfoApi } from "@/services/seekerApi";
import {
  deleteMyCvApi,
  getCvPreviewUrl,
  getMyCvsMetadataApi,
  setPrimaryCvApi,
  uploadMyCvApi,
} from "@/services/seekerCvApi";
import { PHONE_NUMBER_REGEX } from "@/constants";
import { getAllCitiesApi } from "@/services/cityApi";
import { useSeekerStore } from "@/store/seekerStore";
import {
  findCityRefs,
} from "@/utils/apiPayloadMappers";
import { useTranslation } from "react-i18next";
import type { CityResponse } from "@/types/response.types";
import type { SeekerCvMetadataResponse } from "@/types/seekerCv.types";
import { getApiErrorMessage } from "@/utils/apiError";

// Kiểu dữ liệu form thông tin cá nhân trong modal chỉnh sửa
interface CVManagerFormValues {
  fullName: string;
  phoneNumber: string;
  desiredLocations: string[];
}

// Kiểu dữ liệu form chỉnh sửa cover letter (giới thiệu bản thân)
interface CoverLetterFormValues {
  coverLetter: string;
}

// Loại file CV được chấp nhận
const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_CV_SIZE_MB = 5;
const MAX_CV_SIZE_BYTES = MAX_CV_SIZE_MB * 1024 * 1024;

// Style căn giữa màn hình cho react-modal
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
// Số lượng tối đa địa điểm mong muốn mà seeker có thể chọn
const maxCountCity = 3;

function CVManager() {
  const [form] = Form.useForm();
  const [coverLetterForm] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const seeker = useSeekerStore();
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const [coverLetter, setCoverLetter] = useState(seeker.coverLetter || "");
  const [value, setValue] = useState<string[]>(
    seeker.desiredLocations?.map((city) => city.cityName) || [],
  );
  const [cities, setCities] = useState<CityResponse[]>([]);
  const { t, i18n } = useTranslation("jobseeker");

  // CV state — list of up to 3 CVs
  const [cvs, setCvs] = useState<SeekerCvMetadataResponse[]>([]);
  const [isCvLoading, setIsCvLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const originalCoverLetter = useRef("");

  // Fetch full CV list
  const fetchCvList = useCallback(async () => {
    setIsCvLoading(true);
    try {
      const data = await getMyCvsMetadataApi();
      setCvs(data.result ?? []);
    } catch (error) {
      console.error("Failed to load CV list:", error);
      setCvs([]);
    } finally {
      setIsCvLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCvList();
  }, [fetchCvList]);

  // Format ngày cập nhật CV
  const formatUpdatedAt = (updatedAt: string) => {
    const locale = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(updatedAt));
  };

  // Toggle chế độ chỉnh sửa cover letter
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

  // Huỷ chỉnh sửa cover letter
  const handleCancelCoverLetter = () => {
    setCoverLetter(originalCoverLetter.current);
    coverLetterForm.setFieldsValue({
      coverLetter: originalCoverLetter.current,
    });
    setIsEditing(false);
  };

  const closeModal = () => setIsOpen(false);

  const openModal = () => {
    setIsOpen(true);
    form.setFieldsValue({
      fullName: seeker.fullName || "",
      phoneNumber: seeker.phoneNumber || "",
      desiredLocations:
        seeker.desiredLocations?.map((city) => city.cityName) || [],
    });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  // Tải danh sách thành phố khi component mount
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

  // Form 2: Submit thông tin cơ bản (fullName, phoneNumber, desiredLocations)
  const onFinish = async (values: CVManagerFormValues) => {
    try {
      const payload = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        desiredLocations: findCityRefs(values.desiredLocations, cities),
      };
      const response = await updateMyBasicInfoApi(payload);
      const result = response.data.result;
      setSeekerFullInfo(result);
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
        text: getApiErrorMessage(error, t),
      });
    }
  };

  // Form 1: Submit cover letter
  const onFinish2 = async (values: CoverLetterFormValues) => {
    try {
      const response = await updateMyCoverLetterApi({ coverLetter: values.coverLetter });
      const result = response.data.result;
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
        text: getApiErrorMessage(error, t),
      });
    }
  };

  // ================== CV HANDLERS ==================

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase() ?? "";

  const isValidCvFile = (file: File): boolean => {
    if (ACCEPTED_CV_TYPES.includes(file.type)) return true;
    const ext = getFileExtension(file.name);
    return ["pdf", "doc", "docx"].includes(ext);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    if (!isValidCvFile(file)) {
      Swal.fire({ icon: "error", title: t("cvManager.error.invalidFileType") });
      return;
    }
    if (file.size > MAX_CV_SIZE_BYTES) {
      Swal.fire({ icon: "error", title: t("cvManager.error.fileTooLarge") });
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadMyCvApi(file);
      if (result.result) {
        setSeekerFullInfo(result.result);
      }
      await fetchCvList();
      Swal.fire({ title: t("cvManager.success.uploadCV"), icon: "success", draggable: true });
    } catch (error) {
      console.error("CV upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getApiErrorMessage(error, t) || t("cvManager.error.uploadFailed"),
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreviewCv = (cvId: string) => {
    window.open(getCvPreviewUrl(cvId), "_blank", "noopener,noreferrer");
  };

  const handleDeleteCv = async (cvId: string) => {
    const result = await Swal.fire({
      title: t("cvManager.deleteConfirm"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: t("cvManager.deleteCV"),
      cancelButtonText: t("cvManager.cancel"),
    });
    if (!result.isConfirmed) return;

    try {
      await deleteMyCvApi(cvId);
      await fetchCvList();
      Swal.fire({ title: t("cvManager.success.deleteCV"), icon: "success", draggable: true });
    } catch (error) {
      console.error("CV delete error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getApiErrorMessage(error, t) || t("cvManager.error.deleteFailed"),
      });
    }
  };

  const handleSetPrimary = async (cvId: string) => {
    try {
      await setPrimaryCvApi(cvId);
      await fetchCvList();
      Swal.fire({ title: t("cvManager.success.setPrimary"), icon: "success", draggable: true });
    } catch (error) {
      console.error("Set primary CV error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getApiErrorMessage(error, t),
      });
    }
  };

  // ================== CSS helpers ==================
  const getFieldsClassName = (val: unknown) =>
    val
      ? `cv-manager__content`
      : `cv-manager__content cv-manager__content--default`;

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

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
                      pattern: PHONE_NUMBER_REGEX,
                      message: t("cvManager.validation.phoneFormat"),
                    },
                  ]}
                >
                  <Input size="large" maxLength={10} />
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
                    options={cities.map((c) => ({ value: c.cityName, label: c.cityName }))}
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
        {/* ============ PHẦN 1: CV FILE ============ */}
        <div className="job-seeker-section">
          <h2 className="cv-manager__main-title--custom">{t("cvManager.title")}</h2>
          <p className="cv-manager__text">
            {t("cvManager.uploadDesc")}
          </p>
          <div className="cv-manager__block">
            <h3 className="cv-manager__main-title">{t("cvManager.yourCV")}</h3>

            {/* Đếm số CV */}
            <div className="cv-manager__cv-count">
              {t("cvManager.cvCount", { count: cvs.length })}
            </div>

            {/* Danh sách CV */}
            {isCvLoading ? (
              <div className="cv-manager__cv-loading">
                <Spin size="small" />
                <span>{t("cvManager.uploading")}</span>
              </div>
            ) : cvs.length === 0 ? (
              <div className="update-cv__file-date update-cv__file-date--empty">
                {t("cvManager.noCV")}
              </div>
            ) : (
              <div className="cv-manager__cv-list">
                {cvs.map((cv) => (
                  <div key={cv.id} className="cv-manager__cv-card">
                    <img
                      src={uploadImg}
                      alt="upload-resume"
                      className="cv-manager__cv-card-img"
                    />
                    <div className="cv-manager__cv-card-info">
                      <div className="cv-manager__cv-card-header">
                        <button
                          className="update-cv__link-file update-cv__link-file--clickable"
                          onClick={() => handlePreviewCv(cv.id)}
                          title={t("cvManager.previewCV")}
                          type="button"
                        >
                          {cv.fileName}
                        </button>
                        {cv.isPrimary && (
                          <span className="cv-manager__cv-primary-badge">
                            {t("cvManager.primaryCV")}
                          </span>
                        )}
                      </div>
                      <div className="update-cv__file-date">
                        {`${t("cvManager.lastUpdated")}: ${formatUpdatedAt(cv.updatedAt)}`}
                      </div>
                      <div className="cv-manager__cv-card-actions">
                        {!cv.isPrimary && (
                          <button
                            className="cv-manager__set-primary-btn"
                            onClick={() => handleSetPrimary(cv.id)}
                            type="button"
                          >
                            {t("cvManager.setPrimary")}
                          </button>
                        )}
                        <button
                          className="cv-manager__delete-btn"
                          onClick={() => handleDeleteCv(cv.id)}
                          type="button"
                          title={t("cvManager.deleteCV")}
                        >
                          <FaRegTrashAlt />
                          <span>{t("cvManager.deleteCV")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload — spinner khi đang tải, disabled khi đã có 3 CV */}
            {isUploading ? (
              <div className="cv-manager__uploading">
                <Spin size="small" />
                <span>{t("cvManager.uploading")}</span>
              </div>
            ) : cvs.length >= 3 ? (
              <div className="cv-manager__limit-msg">
                {t("cvManager.limitReached")}
              </div>
            ) : (
              <ButtonUpload
                text={t("cvManager.uploadCV")}
                handleUpload={handleUploadClick}
              />
            )}

            <p className="cv-manager__text cv-manager__text--small">
              {t("cvManager.supportedFormats")}
            </p>
          </div>

          {/* ============ PHẦN 1b: THÔNG TIN CÁ NHÂN ============ */}
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

        {/* ============ PHẦN 2: THÔNG TIN CHUNG ============ */}
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

        {/* ============ PHẦN 3: THƯ XIN VIỆC ============ */}
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
