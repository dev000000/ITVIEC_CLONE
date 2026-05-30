// Trang xem chi tiết một Job cụ thể của Employer
// Cho phép xem đầy đủ thông tin job, chỉnh sửa (Edit) và xóa (Delete) job đó
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./EmployerJobDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJobApi, getMyJobsApi, updateJobApi } from "@/services/jobApi";
import { getAllSkillsApi } from "@/services/skillApi";
import { getAllCitiesApi } from "@/services/cityApi";
import EmployerStart from "@/components/EmployerStart";
import { Col, DatePicker, Row, Select } from "antd";
import CardInforEmployer from "@/components/CardInforEmployer";
import CardJobHead from "@/components/CardJobDetail/CardJobHead";
import CardJobShowInfor from "@/components/CardJobDetail/CardJobShowInfor";
import CardJobContent from "@/components/CardJobDetail/CardJobContent";
import { isObjectEmpty } from "@/helpers/checkObject";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Modal from "react-modal";
import { Button, Form, Input } from "antd";
import { IoClose } from "react-icons/io5";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { clearStorage } from "@/helpers/localStorage";
import { useCompanyStore } from "@/store/companyStore";
import { useUserStore } from "@/store/userStore";
import ButtonAction from "@/components/ButtonAction";
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

function EmployerJobDetail() {
  const { t } = useTranslation();
  // Thông tin công ty từ Zustand store, hiển thị trong CardInforEmployer
  const company = useCompanyStore();
  const logout = useUserStore((state) => state.logout);
  const [form] = Form.useForm();
  // Trạng thái mở/đóng modal form chỉnh sửa job
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // ID của job lấy từ URL params (route: /employer/jobs/:id)
  const { id } = useParams<{ id: string }>();
  // Thông tin đầy đủ của job hiện tại
  const [job, setJob] = useState<Partial<JobDetailResponse>>({});
  // Danh sách skills và cities lấy từ API, dùng cho Select dropdown trong form
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [cities, setCities] = useState<CityResponse[]>([]);
  const navigate = useNavigate();
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
  // Các tùy chọn cho Select dropdown trong form chỉnh sửa job
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
      label: <span style={{ color: "#CB8E3C" }}>Draft</span>,
    },
    {
      value: "Active",
      label: <span style={{ color: "#46963E" }}>Active</span>,
    },
    {
      value: "Expired",
      label: <span style={{ color: "#040404" }}>Expired</span>,
    },
    {
      value: "Closed",
      label: <span style={{ color: "#AD3D35" }}>Closed</span>,
    },
  ];
  // Chuyển đổi skills và cities từ API sang định dạng Select options của Ant Design
  const skillList = skills.map((skill) => {
    return {
      value: skill.id,
      label: <span>{skill.skillName}</span>,
    };
  });
  const cityList = cities.map((city) => ({
    value: city.id,
    label: <span>{city.cityName}</span>,
  }));
  const handleBack = () => {
    navigate(-1);
  };
  // Fetch song song: skills, cities và danh sách job của công ty
  // Lọc job theo id từ URL và điền vào form; nếu không tìm thấy thì logout và redirect về "/"
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const [skillsResponse, citiesResponse, jobsResponse] = await Promise.all([
          getAllSkillsApi(),
          getAllCitiesApi(),
          getMyJobsApi(),
        ]);
        setSkills(skillsResponse.data.result || []);
        setCities(citiesResponse.data.result || []);
        const jobInfo = jobsResponse.data.result.find(
          (item) => String(item.id) === String(id),
        );
        console.log("jobInfo", jobInfo);
        if (!jobInfo) {
          clearStorage();
          logout();
          navigate("/");
          return;
        }
        if (!isObjectEmpty(jobInfo)) {
          setJob(jobInfo);
          form.setFieldsValue({
            id: jobInfo.id,
            companyId: company.id,
            title: jobInfo.title,
            location: jobInfo.location,
            salary: jobInfo.salary,
            jobType: jobInfo.jobType,
            experienceLevel: jobInfo.experienceLevel,
            postedAt: jobInfo.postedAt ? dayjs(jobInfo.postedAt) : null,
            expiresAt: jobInfo.expiresAt ? dayjs(jobInfo.expiresAt) : null,
            status: jobInfo.status,
            city: jobInfo.city?.id,
            skills: jobInfo.skills?.map((skill) => skill.id) || [],
            jobReason: jobInfo.jobReason || "",
            jobDescription: jobInfo.jobDescription || "",
            jobRequirements: jobInfo.jobRequirements || "",
            whyJoinUs: jobInfo.whyJoinUs || "",
          });
        } else {
          setJob({});
        }
      } catch (error) {
        console.log("Loi roi", error);
        setJob({});
      }
    };
    fetchJob();
  }, [company.id, id, logout, navigate]);
  // Hiện confirm dialog trước khi xóa job; sau khi xóa thành công thì navigate về trang trước
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteJobApi(id || "");
          Swal.fire({
            title: "Deleted!",
            text: "Your job has been deleted.",
            icon: "success",
          });
          navigate(-1);
        }
      } catch (error) {
        console.error("Lỗi khi xóa job:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to delete job: ${(error as Error).message}`,
        });
      }
    });
  };
  // Mở modal form chỉnh sửa job
  const handleEdit = () => {
    openModal();
  };
  function openModal() {
    setIsOpen(true);
  }
  // Xử lý submit form cập nhật job
  // Map giá trị form → định dạng API, cập nhật state job sau khi thành công
  const onFinish = async (values: Record<string, unknown>) => {
    const formattedValues = {
      title: String(values.title ?? ""),
      jobReason: String(values.jobReason ?? ""),
      jobDescription: String(values.jobDescription ?? ""),
      jobRequirements: String(values.jobRequirements ?? ""),
      whyJoinUs: String(values.whyJoinUs ?? ""),
      location: String(values.location ?? ""),
      city: findCityRef(values.city, cities, job.city) ?? { id: 0 },
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
      const response = await updateJobApi(String(values.id), formattedValues);
      const result = response.data.result;
      if (!isObjectEmpty(result)) {
        Swal.fire({
          title: "Update Success!",
          icon: "success",
          draggable: true,
        });
        setJob(result);
        closeModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update Fail!",
        });
      }
    } catch (error) {
      console.error("Loi cap nhat job", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Fail!",
      });
    }
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="job-form__title-wrap">
          <div className="job-form__title">{t("employer:jobs.editTitle")}</div>
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
              <Col span={12}>
                <Form.Item label={t("employer:jobs.form.jobId")} name="id">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t("employer:jobs.form.companyId")} name="companyId">
                  <Input disabled />
                </Form.Item>
              </Col>
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
      <div className="employer-job">
        <EmployerStart content={t("employer:jobs.jobDetail")} handleBack={handleBack} />
        <div className="employer-job__button-wrap">
          <ButtonAction
            text={t("employer:jobs.edit")}
            icon={<TbEdit />}
            handle={handleEdit}
          ></ButtonAction>
          <ButtonAction
            text={t("employer:jobs.delete")}
            icon={<RiDeleteBin5Line />}
            handle={handleDelete}
          ></ButtonAction>
        </div>
        <div className="employer-job__form">
          <Row gutter={[{ xxl: 20, xl: 20, lg: 10, md: 0, sm: 0, xs: 0 }, 20]}>
            <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
              <CardJobHead job={job} />
              <CardJobShowInfor job={job} />
              <CardJobContent job={job} />
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <CardInforEmployer company={company} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default EmployerJobDetail;
