// Trang quản lý danh sách Jobs của Employer
// Hiển thị toàn bộ job của công ty và cho phép tạo job mới qua modal formimport EmployerStart from "@/components/EmployerStart";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createJobApi, getMyJobsApi } from "@/services/jobApi";
import { getAllSkillsApi } from "@/services/skillApi";
import { getAllCitiesApi } from "@/services/cityApi";
import "./EmployerJobs.scss";
import ButtonAction from "@/components/ButtonAction";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Col, DatePicker, Row, Select } from "antd";
import { Button, Form, Input } from "antd";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import TopJobItemEmployer from "@/components/TopJobItemEmployer";
import { useCompanyStore } from "@/store/companyStore";
import {
  findCityRef,
  findSkillRefs,
  toExperienceLevel,
  toJobStatus,
  toJobType,
} from "@/utils/apiPayloadMappers";
import type {
  CityResponse,
  JobDetailResponse,
  SkillResponse,
} from "@/types/response.types";

function EmployerJobs() {
  const { t } = useTranslation();
  // companyId từ Zustand store, đính kèm vào payload khi tạo job mới
  const companyId = useCompanyStore((state) => state.id);
  // Danh sách job của công ty hiển thị trên trang
  const [jobs, setJobs] = useState<JobDetailResponse[]>([]);
  // Trạng thái mở/đóng modal form tạo job mới
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  // Danh sách skills và cities từ API, dùng cho Select dropdown trong form tạo job
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [cities, setCities] = useState<CityResponse[]>([]);
  // Các tùy chọn cho Select dropdown trong form tạo job
  const jobTypeList = [
    { value: "Tại văn phòng", label: <span>Tại văn phòng</span> },
    { value: "Làm Từ Xa", label: <span>Làm Từ Xa</span> },
    { value: "Linh Hoạt", label: <span>Linh Hoạt</span> },
  ];
  const experienceLevelList = [
    { value: "Intern", label: <span>Intern</span> },
    { value: "Fresher", label: <span>Fresher</span> },
    { value: "Junior", label: <span>Junior</span> },
    { value: "Middle", label: <span>Middle</span> },
    { value: "Senior", label: <span>Senior</span> },
    { value: "Lead", label: <span>Lead</span> },
    { value: "Manager", label: <span>Manager</span> },
    { value: "Expert", label: <span>Expert</span> },
    { value: "Principal", label: <span>Principal</span> },
  ];
  const statusList = [
    {
      value: "Draft",
      label: (
        <span style={{ color: "#CB8E3C", fontWeight: "bold" }}>Draft</span>
      ),
    },
    {
      value: "Active",
      label: (
        <span style={{ color: "#46963E", fontWeight: "bold" }}>Active</span>
      ),
    },
    {
      value: "Expired",
      label: (
        <span style={{ color: "#040404", fontWeight: "bold" }}>Expired</span>
      ),
    },
    {
      value: "Closed",
      label: (
        <span style={{ color: "#AD3D35", fontWeight: "bold" }}>Closed</span>
      ),
    },
  ];
  // Chuyển đổi skills và cities từ API sang định dạng Select options của Ant Design
  const skillList = skills.map((skill) => ({
    value: skill.id,
    label: <span>{skill.skillName}</span>,
  }));
  const cityList = cities.map((city) => ({
    value: city.id,
    label: <span>{city.cityName}</span>,
  }));
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
  // Fetch song song skills, cities và danh sách job của công ty khi component mount
  useEffect(() => {
    const getCompany = async () => {
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
        console.error("Error fetching company or job data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load company or job data!",
        });
      }
    };
    getCompany();
  }, []);
  const handleAdd = () => {
    openModal();
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  // Xử lý submit form tạo job mới
  // Map giá trị form → định dạng API, gọi API tạo job, sau đó refresh lại danh sách
  const onFinish = async (values: Record<string, unknown>) => {
    const formattedValues = {
      companyId: String(companyId ?? ""),
      title: String(values.title ?? ""),
      jobReason: String(values.jobReason ?? ""),
      jobDescription: String(values.jobDescription ?? ""),
      jobRequirements: String(values.jobRequirements ?? ""),
      whyJoinUs: String(values.whyJoinUs ?? ""),
      location: String(values.location ?? ""),
      city: findCityRef(values.city, cities, cities[0]) ?? { id: 0 },
      salary: String(values.salary ?? ""),
      jobType: toJobType(values.jobType),
      experienceLevel: toExperienceLevel(values.experienceLevel),
      postedAt: values.postedAt
        ? dayjs(values.postedAt as string).toISOString()
        : dayjs().toISOString(),
      expiresAt: values.expiresAt
        ? dayjs(values.expiresAt as string).toISOString()
        : dayjs().add(30, "day").toISOString(),
      status: toJobStatus(values.status),
      skills: findSkillRefs(values.skills, skills),
    };
    try {
      await createJobApi(formattedValues);
      Swal.fire({
        title: "Add job Success!",
        icon: "success",
        draggable: true,
      });
      setIsOpen(false);
      const jobList = await getMyJobsApi();
      setJobs(jobList.data.result || []);
    } catch (error) {
      console.error("Error adding job:", error);
      setJobs([]);
      Swal.fire({
        title: "Add job Failed!",
        text: "Please try again later.",
        icon: "error",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
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
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10, 10]}>
              <Col span={24}>
                <Form.Item label={t("employer:jobs.form.title")} name="title">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:jobs.form.location")} name="location">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="City" name="city">
                  <Select
                    placeholder="Please select a city"
                    options={cityList}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:jobs.form.salary")} name="salary">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:jobs.form.jobType")} name="jobType">
                  <Select
                    placeholder="Please select a job type"
                    options={jobTypeList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:jobs.form.experienceLevel")} name="experienceLevel">
                  <Select
                    placeholder="Please select a level"
                    options={experienceLevelList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="postedAt" label={t("employer:jobs.form.postedAt")}>
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="expiresAt" label={t("employer:jobs.form.expiresAt")}>
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={t("employer:jobs.form.status")} name="status">
                  <Select
                    placeholder="Please select status"
                    options={statusList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="skills"
                  label={t("employer:jobs.form.requiredSkills")}
                  rules={[
                    {
                      required: true,
                      message: "Please select required skills",
                      type: "array",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Please select required skills"
                    options={skillList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobReason" label={t("employer:jobs.form.jobReason")}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobDescription" label={t("employer:jobs.form.jobDescription")}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobRequirements" label={t("employer:jobs.form.jobRequirements")}>
                  {/* @ts-expect-error — value/onChange injected by Form.Item */}
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="whyJoinUs" label={t("employer:jobs.form.whyJoinUs")}>
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
      <div className="employer-jobs">
        <EmployerStart content={t("employer:jobs.title")} type="search" />
        <div className="employer-job__button-wrap">
          <ButtonAction
            text={t("employer:jobs.create")}
            icon={<MdAdd />}
            handle={handleAdd}
          ></ButtonAction>
        </div>
        <div className="employer-jobs__list">
          <Row gutter={[20, 20]}>
            {jobs.map((job) => {
              return (
                <Col
                  xxl={6}
                  xl={8}
                  lg={12}
                  md={24}
                  sm={24}
                  xs={24}
                  key={job.id}
                >
                  {/* <CardJob job={job} /> */}
                  <TopJobItemEmployer job={job} />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
}
export default EmployerJobs;
