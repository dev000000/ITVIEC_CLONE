// Trang quản lý danh sách Jobs của Employer
// Hiển thị toàn bộ job của công ty và cho phép tạo job mới qua modal
import EmployerStart from "@/components/EmployerStart";
import emptyImage from "@/assets/images/everything-empty.svg";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createJobApi, getMyJobsApi } from "@/services/jobApi";
import { getAllSkillsApi } from "@/services/skillApi";
import { getAllCitiesApi } from "@/services/cityApi";
import "./EmployerJobs.scss";
import ButtonAction from "@/components/ButtonAction";
import { MdAdd } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Col, DatePicker, Row, Select } from "antd";
import { Button, Form, Input } from "antd";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import TopJobItemEmployer from "@/components/TopJobItemEmployer";
import type {
  CityResponse,
  JobDetailResponse,
  SkillResponse,
} from "@/types/response.types";
import {
  getExperienceLevelOptions,
  getJobStatusOptions,
  getJobTypeOptions,
} from "@/constants";
import type { JobCreateRequest } from "@/types/request.types";
import type { SalaryCurrency } from "@/types/common.types";
import SalaryFormFields from "@/components/SalaryFormFields";
import { getApiErrorMessage } from "@/utils/apiError";

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

interface JobsFormValues extends Omit<JobCreateRequest, "city" | "skills"> {
  city: number;
  skills: number[];
  salaryNegotiable?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
}

const EmployerJobs = () => {
  const { t } = useTranslation();
  // Danh sách job của công ty hiển thị trên trang
  const [jobs, setJobs] = useState<JobDetailResponse[]>([]);

  // Trạng thái mở/đóng modal form tạo job mới
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const [form] = Form.useForm();

  // Danh sách skills và cities từ API, dùng cho Select dropdown trong form tạo job
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [cities, setCities] = useState<CityResponse[]>([]);

  // Giá trị filter tìm kiếm job
  const [filterTitle, setFilterTitle] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const [filterJobType, setFilterJobType] = useState<string | undefined>(undefined);
  const [filterCityId, setFilterCityId] = useState<number | undefined>(undefined);

  // Các tùy chọn cho Select dropdown lấy từ constants + i18n (đồng bộ với backend enum)
  const jobTypeOptions = getJobTypeOptions(t);
  const experienceLevelOptions = getExperienceLevelOptions(t);
  const jobStatusOptions = getJobStatusOptions(t);

  // Form chỉ cho phép chọn ACTIVE hoặc DRAFT khi tạo job mới
  const activeAndDraftStatusOptions = jobStatusOptions.filter(
    (o) => o.value === "ACTIVE" || o.value === "DRAFT"
  );

  // Theo dõi giá trị postedAt để dùng cho validate expiresAt
  const postedAtValue = Form.useWatch("postedAt", form);


  // Chuyển đổi skills và cities từ API sang định dạng Select options của Ant Design
  const skillList = skills.map((skill) => ({
    value: skill.id,
    label: <span>{skill.skillName}</span>,
  }));
  const cityList = cities.map((city) => ({
    value: city.id,
    label: <span>{city.cityName}</span>,
  }));


  // Fetch song song skills, cities và danh sách job của công ty khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, citiesResponse, jobsResponse] = await Promise.all([
          getAllSkillsApi(),
          getAllCitiesApi(),
          getMyJobsApi(),
        ]);
        setSkills(skillsResponse.data.result || []);
        setCities(citiesResponse.data.result || []);
        setJobs(jobsResponse.data.result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: t("employer:jobs.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      }
    };
    fetchData();
  }, []);

  // Tìm kiếm / lọc danh sách job theo các filter đang chọn
  const handleSearch = async () => {
    try {
      const jobsResponse = await getMyJobsApi({
        title: filterTitle || undefined,
        status: filterStatus,
        jobType: filterJobType,
        cityId: filterCityId,
      });
      setJobs(jobsResponse.data.result || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("employer:jobs.notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    }
  };

  // Xử lý mở modal form tạo job mới
  const handleAdd = () => {
    openModal();
  };
  // Hàm mở/đóng modal
  const openModal = () => {
    setIsOpen(true);
  };
  // Đóng modal và reset form 
  const closeModal = () => {
    setIsOpen(false);
  };

  // Xử lý khi submit form thất bại (validate không pass)
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  // Xử lý submit form tạo job mới
  // Map giá trị form → định dạng API, gọi API tạo job, sau đó refresh lại danh sách
  const onFinish = async (values: JobsFormValues) => {
    const { salaryNegotiable: _neg, ...rest } = values;
    const data: JobCreateRequest = {
      ...rest,
      city: cities.find((city) => city.id === values.city) || null!,
      skills: skills.filter((skill) => values.skills.includes(skill.id)),
      postedAt: values.postedAt ? dayjs(values.postedAt).format("YYYY-MM-DDTHH:mm:ss") : undefined!,
      expiresAt: values.expiresAt ? dayjs(values.expiresAt).format("YYYY-MM-DDTHH:mm:ss") : undefined!,
      salaryMin: _neg ? undefined : values.salaryMin,
      salaryMax: _neg ? undefined : values.salaryMax,
      salaryCurrency: _neg ? undefined : values.salaryCurrency,
    };
    try {
      await createJobApi(data);
      Swal.fire({
        title: t("employer:jobs.notifications.addSuccess"),
        icon: "success",
        draggable: true,
      });
      setIsOpen(false);
      // Refresh lại danh sách job sau khi tạo thành công
      const jobList = await getMyJobsApi();
      setJobs(jobList.data.result || []);

    } catch (error) {
      console.error("Error adding job:", error);
      Swal.fire({
        icon: "error",
        title: t("employer:jobs.notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    }
  };
  return (
    <>
      {/* Modal form tạo job mới */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={t("employer:jobs.addTitle")}
      >
        <div className="job-form__title-wrap">
          <div className="job-form__title">{t("employer:jobs.addTitle")}</div>
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
            initialValues={{
              remember: true,
              salaryNegotiable: true,
              salaryCurrency: "VND",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.title")}
                  name="title"
                  rules={[{ required: true, message: t("employer:jobs.form.titleRequired") }]}
                >
                  <Input placeholder={t("employer:jobs.form.titlePlaceholder")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.location")}
                  name="location"
                  rules={[{ required: true, message: t("employer:jobs.form.locationRequired") }]}
                >
                  <Input placeholder={t("employer:jobs.form.locationPlaceholder")} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.city")}
                  name="city"
                  rules={[{ required: true, message: t("employer:jobs.form.cityRequired") }]}
                >
                  <Select
                    placeholder={t("employer:jobs.form.selectCityPlaceholder")}
                    options={cityList}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <SalaryFormFields />
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.jobType")}
                  name="jobType"
                  rules={[{ required: true, message: t("employer:jobs.form.jobTypeRequired") }]}
                >
                  <Select
                    placeholder={t("employer:jobs.form.selectJobTypePlaceholder")}
                    options={jobTypeOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.experienceLevel")}
                  name="experienceLevel"
                  rules={[{ required: true, message: t("employer:jobs.form.levelRequired") }]}
                >
                  <Select
                    placeholder={t("employer:jobs.form.selectLevelPlaceholder")}
                    options={experienceLevelOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="postedAt"
                  label={t("employer:jobs.form.postedAt")}
                  rules={[
                    { required: true, message: t("employer:jobs.form.postedAtRequired") },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        if (value.isBefore(dayjs().startOf("day"))) {
                          return Promise.reject(new Error(t("employer:jobs.form.dateNotPast")));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={t("employer:jobs.form.datePickerPlaceholder")}
                    disabledDate={(current) => current && current < dayjs().startOf("day")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="expiresAt"
                  label={t("employer:jobs.form.expiresAt")}
                  rules={[
                    { required: true, message: t("employer:jobs.form.expiresAtRequired") },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.resolve();
                        if (value.isBefore(dayjs().startOf("day"))) {
                          return Promise.reject(new Error(t("employer:jobs.form.dateNotPast")));
                        }
                        if (postedAtValue && value.isBefore(postedAtValue)) {
                          return Promise.reject(
                            new Error(t("employer:jobs.form.expiresBeforePosted"))
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={t("employer:jobs.form.datePickerPlaceholder")}
                    disabledDate={(current) => {
                      if (current && current < dayjs().startOf("day")) return true;
                      if (postedAtValue && current && current < dayjs(postedAtValue).startOf("day"))
                        return true;
                      return false;
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.status")}
                  name="status"
                  rules={[{ required: true, message: t("employer:jobs.form.statusRequired") }]}
                >
                  <Select
                    placeholder={t("employer:jobs.form.selectStatusPlaceholder")}
                    options={activeAndDraftStatusOptions}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="skills"
                  label={t("employer:jobs.form.requiredSkills")}
                  rules={[
                    {
                      required: true,
                      message: t("employer:jobs.form.selectSkillsRequired"),
                      type: "array",
                    },
                    {
                      validator: (_, value: number[]) => {
                        if (!value || value.length < 3) {
                          return Promise.reject(
                            new Error(t("employer:jobs.form.skillsMinRequired"))
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder={t("employer:jobs.form.selectSkillsPlaceholder")}
                    options={skillList}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobReason" label={t("employer:jobs.form.jobReason")} required={true}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobDescription" label={t("employer:jobs.form.jobDescription")} required={true}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobRequirements" label={t("employer:jobs.form.jobRequirements")} required={true}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="whyJoinUs" label={t("employer:jobs.form.whyJoinUs")} required={true}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    {t("employer:jobs.form.submit")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      {/* Phần header với title và nút tạo job mới */}
      <div className="employer-jobs">
        <EmployerStart content={t("employer:jobs.title")} type="search" hideSearch />
        {/* Thanh filter + nút tạo mới */}
        <div className="employer-job__button-wrap">
          <ButtonAction
            text={t("employer:jobs.create")}
            icon={<MdAdd />}
            handle={handleAdd}
          />
          <div className="employer-job__filter-group">
            <Input
              placeholder={t("employer:jobs.filter.titlePlaceholder")}
              value={filterTitle}
              onChange={(e) => setFilterTitle(e.target.value)}
              onPressEnter={handleSearch}
              size="large"
              style={{ width: 200 }}
              allowClear
            />
            <Select
              placeholder={t("employer:jobs.filter.statusPlaceholder")}
              options={jobStatusOptions}
              value={filterStatus}
              onChange={(v) => setFilterStatus(v)}
              allowClear
              size="large"
              style={{ width: 160 }}
            />
            <Select
              placeholder={t("employer:jobs.filter.jobTypePlaceholder")}
              options={jobTypeOptions}
              value={filterJobType}
              onChange={(v) => setFilterJobType(v)}
              allowClear
              size="large"
              style={{ width: 180 }}
            />
            <Select
              placeholder={t("employer:jobs.filter.cityPlaceholder")}
              options={cityList}
              value={filterCityId}
              onChange={(v) => setFilterCityId(v)}
              allowClear
              size="large"
              style={{ width: 160 }}
            />
            <ButtonAction
              text={t("employer:jobs.filter.searchButton")}
              icon={<MdSearch />}
              handle={handleSearch}
            />
          </div>
        </div>
        {/* Danh sách job hiển thị dạng grid */}
        <div className="employer-jobs__list">
          {jobs.length === 0 ? (
            <div className="employer-jobs__empty">
              <img src={emptyImage} alt="No jobs" />
              <p>{t("employer:jobs.noJobs")}</p>
            </div>
          ) : (
            <Row gutter={[20, 20]}>
              {jobs.map((job) => (
                <Col
                  xxl={6}
                  xl={8}
                  lg={12}
                  md={24}
                  sm={24}
                  xs={24}
                  key={job.id}
                >
                  <TopJobItemEmployer job={job} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
}
export default EmployerJobs;
