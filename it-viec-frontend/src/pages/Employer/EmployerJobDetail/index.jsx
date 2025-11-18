import { useEffect, useState } from "react";
import "./EmployerJobDetail.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteJob,
  getJobWithCompany,
  getSkills,
  updateJob,
} from "../../../services/EmployerServices";
import EmployerStart from "../../../components/EmployerStart";
import { Col, DatePicker, Row, Select } from "antd";
import CardInforEmployer from "../../../components/CardInforEmployer";
import CardJobHead from "../../../components/CardJobDetail/CardJobHead";
import CardJobShowInfor from "../../../components/CardJobDetail/CardJobShowInfor";
import CardJobContent from "../../../components/CardJobDetail/CardJobContent";
import { isObjectEmpty } from "../../../helpers/checkObject";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import Modal from "react-modal";
import { Button, Form, Input } from "antd";
import { IoClose } from "react-icons/io5";
import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { clearStorage } from "../../../helpers/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../actions/User";
import ButtonAction from "../../../components/ButtonAction";
function EmployerJobDetail() {
  const company = useSelector((state) => state.CompanyReducer);
  const [form] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <span style={{ color: "#CB8E3C" }}>Draft</span>
      ),
    },
    {
      value: "Active",
      label: (
        <span style={{ color: "#46963E" }}>Active</span>
      ),
    },
    {
      value: "Expired",
      label: (
        <span style={{ color: "#040404" }}>Expired</span>
      ),
    },
    {
      value: "Closed",
      label: (
        <span style={{ color: "#AD3D35" }}>Closed</span>
      ),
    },
  ];
  const skillList = skills.map((skill) => {
    return { value: { id : skill.id , skillName : skill.skillName }, label: <span>{skill.skillName}</span> };
  });
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const skillList = await getSkills();
        setSkills(skillList || []);
        const jobInfo = await getJobWithCompany(id);
        console.log("jobInfo", jobInfo);
        if (jobInfo.companyId != company.id) {
          clearStorage();
          dispatch(
            setLogin({
              id: 0,
              ok: false,
              role: "none",
            })
          );
          navigate("/");
        }
        if (!isObjectEmpty(jobInfo)) {
          setJob(jobInfo);
          form.setFieldsValue({
            id: jobInfo.id,
            companyId: jobInfo.companyId,
            title: jobInfo.title,
            location: jobInfo.location,
            salary: jobInfo.salary,
            jobType: jobInfo.jobType,
            experienceLevel: jobInfo.experienceLevel,
            postedAt: jobInfo.postedAt ? dayjs(jobInfo.postedAt) : null,
            expiresAt: jobInfo.expiresAt ? dayjs(jobInfo.expiresAt) : null,
            status: jobInfo.status,
            requiredSkills: jobInfo.requiredSkills,
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
  }, [id]);
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
        if(result.isConfirmed) {
          await deleteJob(id);
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
          text: `Failed to delete job: ${error.message}`,
        });
      }
    });
  };
  const handleEdit = () => {
    openModal();
  };
  function openModal() {
    setIsOpen(true);
  }
  const onFinish = async (values) => {
    try {
      const result = await updateJob(values.id, values);
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
  const onFinishFailed = (errorInfo) => {
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
          <div className="job-form__title">Edit Jobs</div>
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
                <Form.Item label="Job id" name="id">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Company id" name="companyId">
                  <Input disabled />
                </Form.Item>
              </Col>
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
      <div className="employer-job">
        <EmployerStart content="Job Detail" handleBack={handleBack} />
        <div className="employer-job__button-wrap">
          <ButtonAction
            text="Edit"
            icon={<TbEdit />}
            handle={handleEdit}
          ></ButtonAction>
          <ButtonAction
            text="Delete"
            icon={<RiDeleteBin5Line />}
            handle={handleDelete}
          ></ButtonAction>
        </div>
        <div className="employer-job__form">
          <Row gutter={[{xxl: 20, xl: 20 , lg: 10 , md: 0 , sm: 0 , xs : 0},20]}>
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
