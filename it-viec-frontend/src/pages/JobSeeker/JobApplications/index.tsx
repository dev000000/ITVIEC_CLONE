import { useEffect, useRef, useState } from "react";
import "./JobApplications.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { Form, Input, Select, Spin } from "antd";
import logo from "@/assets/images/nhieu viec (355 x 85 px).png";
import ButtonSubmit from "@/components/Button";
import { getJobBySlugApi } from "@/services/jobApi";
import { getMyProfileApi } from "@/services/seekerApi";
import {
  applyToJobApi,
  checkMyApplicationExistsApi,
} from "@/services/applicationApi";
import { getAllCitiesApi } from "@/services/cityApi";
import {
  getCvPreviewUrl,
  getMyCvsMetadataApi,
} from "@/services/seekerCvApi";
import { PHONE_NUMBER_REGEX } from "@/constants";
import { useSeekerStore } from "@/store/seekerStore";
import { findCityRefs } from "@/utils/apiPayloadMappers";
import Swal from "sweetalert2";
import type { ApplicationRequest } from "@/types/request.types";
import type { CityResponse } from "@/types/response.types";
import type { SeekerCvMetadataResponse } from "@/types/seekerCv.types";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "@/utils/apiError";

interface JobApplicationFormValues {
  fullName: string;
  phoneNumber: string;
  desiredLocations: string[];
  coverLetter?: string;
}

type CvMode = "current" | "upload";

const MAX_COUNT_CITY = 3;
const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const JobApplications = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { t, i18n } = useTranslation("jobseeker");
  const seeker = useSeekerStore();
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const [form] = Form.useForm<JobApplicationFormValues>();
  const desiredLocations = Form.useWatch("desiredLocations", form) ?? [];
  const coverLetter = Form.useWatch("coverLetter", form) ?? "";

  const [jobId, setJobId] = useState<number | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [hasApplied, setHasApplied] = useState(false);
  const [appliedAt, setAppliedAt] = useState<string | null>(null);
  const [cvList, setCvList] = useState<SeekerCvMetadataResponse[]>([]);
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null);
  const [isCvMetadataLoading, setIsCvMetadataLoading] = useState(true);
  const [cvMode, setCvMode] = useState<CvMode>("upload");
  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isValidJob = jobId !== null;

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

  useEffect(() => {
    const validateJobSlug = async () => {
      try {
        if (!slug) {
          navigate("/");
          return;
        }

        const response = await getJobBySlugApi(slug);
        const jobDetails = response.data.result;

        if (jobDetails?.id) {
          setJobId(jobDetails.id);
          setJobTitle(jobDetails.title || "");
          return;
        }

        Swal.fire({
          icon: "error",
          title: t("jobApplications.invalidJob"),
          text: t("jobApplications.jobNotFound"),
        });
        navigate("/");
      } catch (error) {
        console.error("Error validating job slug:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: getApiErrorMessage(error, t),
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    validateJobSlug();
  }, [slug, navigate, t]);

  useEffect(() => {
    if (isLoading || !jobId) {
      return;
    }

    let isMounted = true;

    const loadApplicationContext = async () => {
      setIsCvMetadataLoading(true);

      try {
        const [profileResponse, applicationCheckResponse] = await Promise.all([
          getMyProfileApi(),
          checkMyApplicationExistsApi(jobId),
        ]);

        if (!isMounted) {
          return;
        }

        setSeekerFullInfo(profileResponse.data.result);

        const appliedResult = applicationCheckResponse.data.result;
        if (appliedResult?.applied) {
          setHasApplied(true);
          setAppliedAt(appliedResult.createdAt ?? null);

          await Swal.fire({
            icon: "warning",
            title: t("jobApplications.alreadyAppliedTitle"),
            text: t("jobApplications.alreadyApplied"),
          });

          navigate("/");
          return;
        }

        try {
          const cvResponse = await getMyCvsMetadataApi();
          if (!isMounted) {
            return;
          }

          const list = cvResponse.result ?? [];
          setCvList(list);
          if (list.length > 0) {
            const primary = list.find((cv) => cv.isPrimary) ?? list[0];
            setSelectedCvId(primary.id);
            setCvMode("current");
          } else {
            setCvMode("upload");
          }
        } catch (error) {
          if (!isMounted) {
            return;
          }
          console.error("Error fetching CV list:", error);
        }
      } catch (error) {
        console.error("Error loading application context:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: getApiErrorMessage(error, t),
        });
      } finally {
        if (isMounted) {
          setIsCvMetadataLoading(false);
        }
      }
    };

    loadApplicationContext();

    return () => {
      isMounted = false;
    };
  }, [isLoading, jobId, navigate, setSeekerFullInfo, t]);

  useEffect(() => {
    if (!seeker.isLoaded) {
      return;
    }

    form.setFieldsValue({
      fullName: seeker.fullName || "",
      phoneNumber: seeker.phoneNumber || "",
      desiredLocations: seeker.desiredLocations?.map((city) => city.cityName) || [],
      coverLetter: seeker.coverLetter || "",
    });
  }, [form, seeker]);

  const formatUpdatedAt = (updatedAt: string) => {
    const locale = i18n.language?.startsWith("vi") ? "vi-VN" : "en-US";
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(updatedAt));
  };

  const getFileExtension = (fileName: string) =>
    fileName.split(".").pop()?.toLowerCase() ?? "";

  const isValidCvFile = (file: File) => {
    if (ACCEPTED_CV_TYPES.includes(file.type)) {
      return true;
    }

    return ["pdf", "doc", "docx"].includes(getFileExtension(file.name));
  };

  const handleCvPreview = (cvId: string) => {
    window.open(getCvPreviewUrl(cvId), "_blank", "noopener,noreferrer");
  };

  const handleSelectCvMode = (mode: CvMode) => {
    if (mode === "current" && cvList.length === 0) {
      return;
    }
    setCvMode(mode);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!isValidCvFile(file)) {
      Swal.fire({
        icon: "error",
        title: t("cvManager.error.invalidFileType"),
      });
      return;
    }

    if (file.size > MAX_CV_SIZE_BYTES) {
      Swal.fire({
        icon: "error",
        title: t("cvManager.error.fileTooLarge"),
      });
      return;
    }

    setSelectedCvFile(file);
    setCvMode("upload");
  };

  const onFinishFailed = () => {
    console.log("Failed");
  };

  const onFinish = async (values: JobApplicationFormValues) => {
    if (!jobId || !isValidJob) {
      Swal.fire({
        icon: "error",
        title: t("jobApplications.invalidJob"),
        text: t("jobApplications.invalidJobSubmit"),
      });
      return;
    }

    if (hasApplied) {
      Swal.fire({
        icon: "warning",
        title: t("jobApplications.alreadyAppliedTitle"),
        text: appliedAt
          ? `${t("jobApplications.alreadyApplied")} (${appliedAt})`
          : t("jobApplications.alreadyApplied"),
      });
      return;
    }

    if (cvMode === "upload" && !selectedCvFile) {
      Swal.fire({ icon: "error", title: t("jobApplications.cvRequired") });
      return;
    }

    if (cvMode === "current" && !selectedCvId) {
      Swal.fire({ icon: "error", title: t("jobApplications.cvRequired") });
      return;
    }

    setIsSubmitting(true);

    try {
      const applicationData: ApplicationRequest = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        coverLetter: values.coverLetter || "",
        desiredLocations: findCityRefs(values.desiredLocations, cities),
      };

      const response = await applyToJobApi(
        jobId,
        applicationData,
        cvMode === "upload"
          ? { cvFile: selectedCvFile }
          : { cvId: selectedCvId },
      );

      const refreshedProfile = await getMyProfileApi();
      setSeekerFullInfo(refreshedProfile.data.result);
      setHasApplied(true);
      setAppliedAt(response.data.result?.createdAt ?? null);
      setSelectedCvFile(null);

      Swal.fire({
        title: t("jobApplications.successTitle"),
        text: t("jobApplications.successText"),
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>{t("jobApplications.loading")}</div>;
  }

  if (!isValidJob) {
    return (
      <div>
        <h2>{t("jobApplications.notFound")}</h2>
        <Link to="/">{t("jobApplications.backToHome")}</Link>
      </div>
    );
  }

  return (
    <div className="job-applications">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="job-applications__hidden-input"
        onChange={handleFileChange}
      />

      <div className="job-applications__background"></div>
      <div className="job-applications__content">
        <div className="icontainer-sm">
          <div className="job-applications__header">
            <Link
              to="#"
              className="job-applications__header-back"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack /> <span>{t("jobApplications.back")}</span>
            </Link>
            <div className="job-applications__header-logo">
              <img src={logo} alt="logo_nhieu_viec" />
            </div>
          </div>

          <div className="job-applications__form">
            <Form
              form={form}
              name="job-application"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <h2 className="job-applications__name-job">{jobTitle || "--"}</h2>

              <h3 className="job-applications__title">
                {t("jobApplications.cvTitle")} *
              </h3>

              <div className="job-applications__cv-options">
                {/* Option 1: chọn CV có sẵn */}
                <div
                  className={`job-applications__cv-option ${
                    cvMode === "current" ? "job-applications__cv-option--active" : ""
                  } ${cvList.length === 0 ? "job-applications__cv-option--disabled" : ""}`}
                >
                  <button
                    type="button"
                    className="job-applications__cv-option-trigger"
                    onClick={() => handleSelectCvMode("current")}
                    disabled={cvList.length === 0}
                  >
                    <span
                      className={`job-applications__cv-radio ${
                        cvMode === "current" ? "job-applications__cv-radio--active" : ""
                      }`}
                    />
                    <span className="job-applications__cv-option-title">
                      {t("jobApplications.useExistingCv")}
                    </span>
                  </button>

                  <div className="job-applications__cv-option-body">
                    {isCvMetadataLoading ? (
                      <div className="job-applications__cv-loading">
                        <Spin size="small" />
                        <span>{t("jobApplications.loadingCv")}</span>
                      </div>
                    ) : cvList.length > 0 ? (
                      <div className="job-applications__cv-select-list">
                        {cvList.map((cv) => (
                          <label key={cv.id} className="job-applications__cv-select-item">
                            <input
                              type="radio"
                              name="selectedCv"
                              value={cv.id}
                              checked={selectedCvId === cv.id}
                              onChange={() => setSelectedCvId(cv.id)}
                              className="job-applications__cv-select-radio"
                            />
                            <div className="job-applications__cv-file-row">
                              <IoDocumentTextOutline />
                              <span className="job-applications__cv-link">{cv.fileName}</span>
                              {cv.isPrimary && (
                                <span className="job-applications__cv-primary-badge">
                                  {t("cvManager.primaryCV")}
                                </span>
                              )}
                              <button
                                type="button"
                                className="job-applications__cv-preview"
                                onClick={() => handleCvPreview(cv.id)}
                                title={t("jobApplications.previewCurrentCv")}
                              >
                                <IoEyeOutline />
                              </button>
                            </div>
                            <div className="job-applications__cv-meta">
                              {t("jobApplications.currentCvUpdatedAt", {
                                date: formatUpdatedAt(cv.updatedAt),
                              })}
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="job-applications__cv-meta job-applications__cv-meta--empty">
                        {t("jobApplications.noCurrentCv")}
                      </div>
                    )}
                  </div>
                </div>

                {/* Option 2: upload CV mới */}
                <div
                  className={`job-applications__cv-option ${
                    cvMode === "upload" ? "job-applications__cv-option--active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="job-applications__cv-option-trigger"
                    onClick={() => handleSelectCvMode("upload")}
                  >
                    <span
                      className={`job-applications__cv-radio ${
                        cvMode === "upload" ? "job-applications__cv-radio--active" : ""
                      }`}
                    />
                    <span className="job-applications__cv-option-title">
                      {t("jobApplications.uploadNewCv")}
                    </span>
                  </button>

                  <div className="job-applications__cv-option-body">
                    <div className="job-applications__upload-row">
                      <button
                        type="button"
                        className="job-applications__upload-button"
                        onClick={handleChooseFile}
                      >
                        <IoCloudUploadOutline />
                        <span>{t("jobApplications.chooseFile")}</span>
                      </button>
                      <span className="job-applications__upload-file-name">
                        {selectedCvFile?.name || t("jobApplications.noFileSelected")}
                      </span>
                    </div>
                    <div className="job-applications__upload-help">
                      {t("jobApplications.supportedFormats")}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="job-applications__title">
                {t("jobApplications.basicInfo")}
              </h3>

              <Form.Item
                label={<label className="job-applications__form-label">{t("jobApplications.fullName")}</label>}
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: t("jobApplications.validation.fullNameRequired"),
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label={
                  <label className="job-applications__form-label">
                    {t("jobApplications.phoneNumber")}
                  </label>
                }
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t("jobApplications.validation.phoneRequired"),
                  },
                  {
                    pattern: PHONE_NUMBER_REGEX,
                    message: t("jobApplications.validation.phoneFormat"),
                  },
                ]}
              >
                <Input size="large" maxLength={10} />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: "5px" }}
                name="desiredLocations"
                label={
                  <label className="job-applications__form-label">
                    {t("jobApplications.desiredLocations")}
                  </label>
                }
                rules={[
                  {
                    validator: async (_rule, value: string[] | undefined) => {
                      if (Array.isArray(value) && value.length === MAX_COUNT_CITY) {
                        return;
                      }

                      throw new Error(t("jobApplications.validation.locationsRequired"));
                    },
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder={t("jobApplications.desiredLocations")}
                  options={cities.map((city) => ({
                    value: city.cityName,
                    label: city.cityName,
                  }))}
                  maxCount={MAX_COUNT_CITY}
                  size="large"
                />
              </Form.Item>

              <div className="job-applications__helper-text">
                {desiredLocations.length}/{MAX_COUNT_CITY} {t("jobApplications.locationCount")}
              </div>

              <h3 className="job-applications__title">
                {t("jobApplications.coverLetterTitle")}
              </h3>

              <Form.Item
                name="coverLetter"
                label={
                  <label className="job-applications__form-label">
                    {t("jobApplications.coverLetterLabel")}
                  </label>
                }
                style={{ marginBottom: "5px" }}
              >
                <Input.TextArea
                  maxLength={500}
                  rows={6}
                  placeholder={t("jobApplications.coverLetterPlaceholder")}
                  size="large"
                />
              </Form.Item>

              <div className="job-applications__helper-text">
                {t("jobApplications.charsRemaining", { count: 500 - coverLetter.length })}
              </div>

              <Form.Item label={null}>
                <ButtonSubmit
                  text={t("jobApplications.submitButton")}
                  type="max"
                  disabled={isSubmitting || isCvMetadataLoading}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplications;
