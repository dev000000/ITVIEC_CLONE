// Trang form ứng tuyển việc làm
// Flow:
//   1. Đọc slug từ URL → gọi API kiểm tra job có tồn tại không
//   2. Nếu seeker chưa được load → gọi API lấy profile seeker
//   3. Pre-fill form bằng dữ liệu seeker (tên, SĐT, địa điểm, cover letter)
//   4. Submit → gọi applyToJobApi, hiển thị thông báo thành công rồi redirect về trang chủ
// Nếu job không hợp lệ hoặc slug không tìm thấy → redirect về "/"
import { useEffect, useState } from "react";
import "./JobApplications.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import logo from "@/assets/images/nhieu viec (355 x 85 px).png";
import { Form, Input, Select } from "antd";
import ButtonSubmit from "@/components/Button";

import { getJobBySlugApi } from "@/services/jobApi";
import { getMyProfileApi } from "@/services/seekerApi";
import { applyToJobApi } from "@/services/applicationApi";
import { getAllCitiesApi } from "@/services/cityApi";
import Swal from "sweetalert2";
import { useSeekerStore } from "@/store/seekerStore";
import { useUserStore } from "@/store/userStore";
import { findCityRefs } from "@/utils/apiPayloadMappers";
import type { CityResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "@/utils/apiError";

// Kiểu dữ liệu form ứng tuyển việc làm
interface JobApplicationFormValues {
  fullName: string;
  phoneNumber: string;
  desiredLocations: string[];
  coverLetter: string;
}
// Số lượng tối đa địa điểm mong muốn có thể chọn
const maxCountCity = 3;
function JobApplications() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams();
  const seeker = useSeekerStore();
  const authenticated = useUserStore((state) => state.authenticated);
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const { t } = useTranslation("jobseeker");
  const [desiredLocations, setDesiredLocations] = useState<string[]>(
    seeker.desiredLocations?.map((city) => city.cityName) || [],
  );
  const [coverLetter, setCoverLetter] = useState<string>(seeker.coverLetter || "");
  const [jobId, setJobId] = useState<number | null>(null);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [isValidJob, setIsValidJob] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cities, setCities] = useState<CityResponse[]>([]);

  // Tải danh sách tất cả thành phố khi component mount
  // Dùng để map tên thành phố → id khi gọi applyToJobApi
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

  // Kiểm tra job slug có hợp lệ không ngay khi trang load
  // Nếu job không tồn tại → hiển thị lỗi và redirect về trang chủ
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
          setIsValidJob(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Job Not Found",
            text: t("jobApplications.jobNotFound"),
          });
          navigate("/");
          return;
        }
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

  // Tải thông tin seeker từ API nếu chưa có trong store (isLoaded = false)
  // Chỉ chạy sau khi đã xác nhận job hợp lệ (isLoading = false) và user đã đăng nhập
  useEffect(() => {
    const loadSeekerInfo = async () => {
      if (!seeker.isLoaded) {
        try {
          const response = await getMyProfileApi();
          setSeekerFullInfo(response.data.result);
        } catch (error) {
          console.error("Error fetching seeker info:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: getApiErrorMessage(error, t),
          });
        }
      }
    };
    if (authenticated && !isLoading) {
      loadSeekerInfo();
    }
  }, [authenticated, isLoading, seeker.isLoaded, setSeekerFullInfo, t]);

  // Khi seeker đã load xong → điền sẵn dữ liệu cá nhân vào form ứng tuyển
  useEffect(() => {
    if (seeker.isLoaded) {
      const formData = {
        fullName: seeker.fullName || "",
        phoneNumber: seeker.phoneNumber || "",
        desiredLocations:
          seeker.desiredLocations?.map((city) => city.cityName) || [],
        coverLetter: seeker.coverLetter || "",
      };

      form.setFieldsValue(formData);
      setDesiredLocations(
        seeker.desiredLocations?.map((city) => city.cityName) || [],
      );
      setCoverLetter(seeker.coverLetter || "");
    }
  }, [seeker, form]);
  const onFinishFailed = () => {
    console.log("Failed");
  };
  // Submit đơn ứng tuyển:
  // Kiểm tra jobId hợp lệ → gọi applyToJobApi với dữ liệu form
  // Thành công → hiển thị thông báo và redirect về trang chủ
  // Thất bại → hiển thị lỗi Swal
  const onFinish = async (values: JobApplicationFormValues) => {
    if (!jobId || !isValidJob) {
      Swal.fire({
        icon: "error",
        title: "Invalid Job",
        text: "Không thể gửi đơn ứng tuyển cho công việc không hợp lệ!",
      });
      return;
    }
    try {
      // TODO(service-new-migration): Chua co service_new thay the cho legacy API `checkApplicationExist`.
      // Legacy call: GET `applications?jobId=...&seekerId=...`.
      // Muc dich: chan seeker nop trung don ung tuyen cho cung mot job.
      // Tam thoi bo qua pre-check va de backend xu ly trung lap neu co rule tuong ung.
      const applicationData = {
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        coverLetter: values.coverLetter || "",
        desiredLocations: findCityRefs(values.desiredLocations, cities),
      };
      await applyToJobApi(jobId, applicationData);
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
      return;
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
    <>
      <div className="job-applications">
        <div className="job-applications__background"></div>
        <div className="job-applications__content">
          <div className="icontainer-sm">
            <div className="job-applications__header">
              <Link
                to="#"
                className="job-applications__header-back"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <IoIosArrowBack /> <span>{t("jobApplications.back")}</span>{" "}
              </Link>
              <div className="job-applications__header-logo">
                <img src={logo} alt="logo_nhieu_viec" />
              </div>
            </div>
            <div className="job-applications__form">
              <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <h2 className="job-applications__name-job">
                  {jobTitle ? jobTitle : "Công việc không hợp lệ"}
                </h2>
                <h3 className="job-applications__title">{t("jobApplications.basicInfo")}</h3>
                <Form.Item
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      {t("jobApplications.fullName")}
                    </label>
                  }
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Please input yourname!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      {t("jobApplications.phoneNumber")}
                    </label>
                  }
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input phonenumber!",
                      pattern: /^[0-9]+$/,
                    },
                    {
                      message: "Please input number!",
                      pattern: /^[0-9]+$/,
                    },
                  ]}
                >
                  <Input size="large" maxLength={10} />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "5px" }}
                  name="desiredLocations"
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      {t("jobApplications.desiredLocations")}
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please select city!",
                      type: "array",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Please select city"
                    value={desiredLocations}
                    onChange={setDesiredLocations}
                    options={cities.map((c) => ({ value: c.cityName, label: c.cityName }))}
                    maxCount={3}
                    size="large"
                  ></Select>
                </Form.Item>
                <div>
                  {" "}
                  {desiredLocations.length}/{maxCountCity} {t("jobApplications.locationCount")}
                </div>
                <h3>{t("jobApplications.coverLetterTitle")}</h3>
                <Form.Item
                  name="coverLetter"
                  label={
                    <label style={{ fontSize: "16px", color: "#a6a6a6" }}>
                      {t("jobApplications.coverLetterLabel")}
                    </label>
                  }
                  rules={[
                    {
                      required: false,
                      message: "Please input cover letter!",
                    },
                  ]}
                  style={{ marginBottom: "5px" }}
                >
                  <Input.TextArea
                    onChange={(e) => {
                      setCoverLetter(e.target.value);
                    }}
                    maxLength={500}
                    rows={6}
                    placeholder={t("jobApplications.coverLetterPlaceholder")}
                    size="large"
                  />
                </Form.Item>
                <div style={{ fontSize: "16px", color: "#a6a6a6" }}>
                  {t("jobApplications.charsRemaining", { count: 500 - coverLetter.length })}
                </div>
                <Form.Item label={null}>
                  <ButtonSubmit text={t("jobApplications.submitButton")} type="max" />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobApplications;
