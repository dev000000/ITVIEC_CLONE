import EmployerStart from "../../../components/EmployerStart";
import { useEffect, useState } from "react";
import {
  getJobs,
  getSkills,
  postJob,
} from "../../../services/EmployerServices";
import "./EmployerJobs.scss";
import ButtonAction from "../../../components/ButtonAction";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { Col, DatePicker, Row, Select } from "antd";
import { Button, Form, Input } from "antd";
import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";
import dayjs from "dayjs";
import { isObjectEmpty } from "../../../helpers/checkObject";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import TopJobItem from "../../../components/TopJobItem";

function EmployerJobs() {
  const company = useSelector((state) => state.CompanyReducer);
  const [jobs, setJobs] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [skills, setSkills] = useState([]);
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
  const skillList = skills.map((skill) => {
    return { value: skill.skillName, label: <span>{skill.skillName}</span> };
  });
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
  useEffect(() => {
    const getCompany = async () => {
      try {
        const result = await getSkills();
        const jobList = await getJobs(company.id);
        setSkills(result || []);
        setJobs(jobList || []);
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
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      companyId: company.id,
      postedAt: values.postedAt ? dayjs(values.postedAt).toISOString() : null,
      expiresAt: values.expiresAt
        ? dayjs(values.expiresAt).toISOString()
        : null,
    };
    try {
      const resultAdd = await postJob(formattedValues);
      if (!isObjectEmpty(resultAdd)) {
        Swal.fire({
          title: "Add job Success!",
          icon: "success",
          draggable: true,
        });
        setIsOpen(false);
        const jobList = await getJobs(company.id);
        setJobs(jobList || []);
      }
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
          <div className="job-form__title">Add job</div>
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
                <Form.Item label="Tiêu đề" name="title">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa điểm" name="location">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mức lương" name="salary">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Hình thức làm việc" name="jobType">
                  <Select
                    placeholder="Please select a job type"
                    options={jobTypeList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Trình độ chuyên môn" name="experienceLevel">
                  <Select
                    placeholder="Please select a level"
                    options={experienceLevelList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="postedAt" label="Thời gian bắt đầu">
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="expiresAt" label="Thời gian kết thúc">
                  <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Trạng thái" name="status">
                  <Select
                    placeholder="Please select status"
                    options={statusList}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="requiredSkills"
                  label="Kỹ năng yêu cầu"
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
                <Form.Item name="jobReason" label="Lý do để gia nhập công ty">
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobDescription" label="Mô tả công việc">
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="jobRequirements" label="Yêu cầu công việc">
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="whyJoinUs" label="Tại sao bạn nên gia nhập">
                  <SimpleEditor />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label={null}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <div className="employer-jobs">
        <EmployerStart content="Jobs" type="search" />
        <div className="employer-job__button-wrap">
          <ButtonAction
            text="Add"
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
                  <TopJobItem job={job} type="employer"/>
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
