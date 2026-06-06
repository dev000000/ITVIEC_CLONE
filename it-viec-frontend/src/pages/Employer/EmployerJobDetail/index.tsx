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
import { getApiErrorMessage } from "@/utils/apiError";
import {
  getExperienceLevelOptions,
  getJobStatusOptions,
  getJobTypeOptions,
} from "@/constants";
import type {
  CityResponse,
  JobDetailResponse,
  SkillResponse,
} from "@/types/response.types";
import type { JobUpdateRequest } from "@/types/request.types";

interface JobsFormValues extends Omit<JobUpdateRequest, "city" | "skills"> {
  city: number;
  skills: number[];
}

const EmployerJobDetail = () => {
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
  const postedAtValue = Form.useWatch("postedAt", form);
  const jobTypeOptions = getJobTypeOptions(t);
  const experienceLevelOptions = getExperienceLevelOptions(t);
  const jobStatusOptions = getJobStatusOptions(t);
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
        Swal.fire({
          icon: "error",
          title: t("employer:jobs.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
        setJob({});
      }
    };
    fetchJob();
  }, [company.id, id, logout, navigate]);


  // Hiện confirm dialog trước khi xóa job; sau khi xóa thành công thì navigate về trang trước ( Hiện tại chưa xử lí API xóa )
  const handleDelete = () => {
    Swal.fire({
      title: t("employer:jobs.notifications.deleteConfirmTitle"),
      text: t("employer:jobs.notifications.deleteConfirmText"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("employer:jobs.notifications.deleteConfirmButton"),
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await deleteJobApi(id || "");
          Swal.fire({
            title: t("employer:jobs.notifications.deleteSuccess"),
            text: t("employer:jobs.notifications.deleteSuccessText"),
            icon: "success",
          });
          navigate(-1);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("employer:jobs.notifications.oops"),
          text: getApiErrorMessage(error, t),
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
  const onFinish = async (values: JobsFormValues) => {
    const data = {
          ...values,
          city: cities.find((city) => city.id === values.city) || null,
          skills: skills.filter((skill) => values.skills.includes(skill.id)),
          postedAt: values.postedAt ? dayjs(values.postedAt).format("YYYY-MM-DDTHH:mm:ss") : undefined,
          expiresAt: values.expiresAt ? dayjs(values.expiresAt).format("YYYY-MM-DDTHH:mm:ss") : undefined,
        }
    try {
      const {data: jobData} = await updateJobApi(String(id), data);
      const result = jobData.result;

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
          title: t("employer:jobs.notifications.oops"),
          text: t("employer:jobs.notifications.updateFail"),
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("employer:jobs.notifications.oops"),
        text: getApiErrorMessage(error, t),
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
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.title")}
                  name="title"
                  rules={[{ required: true, message: t("employer:jobs.form.titleRequired") }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={t("employer:jobs.form.location")}
                  name="location"
                  rules={[{ required: true, message: t("employer:jobs.form.locationRequired") }]}
                >
                  <Input />
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
                <Form.Item
                  label={t("employer:jobs.form.salary")}
                  name="salary"
                  rules={[{ required: true, message: t("employer:jobs.form.salaryRequired") }]}
                >
                  <Input />
                </Form.Item>
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
                  ></Select>
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
                  ></Select>
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
                    options={jobStatusOptions}
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
                  ></Select>
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
