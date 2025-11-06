import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import EmployerStart from "../../../components/EmployerStart";
import CardCompanyHead from "../../../components/CardCompanyDetail/CardCompanyHead";
import { NavLink, Outlet } from "react-router-dom";
import TopJobItem from "../../../components/TopJobItem";
import { useDispatch, useSelector } from "react-redux";
import { TbEdit } from "react-icons/tb";
import ButtonAction from "../../../components/ButtonAction";
import "./EmployerProfile.scss";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { SimpleEditor } from "../../../components/tiptap-templates/simple/simple-editor";
import { getSkills, updateCompany } from "../../../services/EmployerServices";
import Swal from "sweetalert2";
import { setCompanyFullInfo } from "../../../actions/Company";
import { isObjectEmpty } from "../../../helpers/checkObject";

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
const companySizeOptions = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-100", label: "51-100" },
  { value: "101-500", label: "101-500" },
  { value: "501-1000", label: "501-1000" },
  { value: "1001+", label: "1001+" },
];
const overTimePolicyOptions = [
  { value: "Optional", label: "Optional" },
  { value: "No OT", label: "No OT" },
  { value: "Extra salary for OT", label: "Extra salary for OT" },
  { value: "OT", label: "OT" },
]
const workingHoursOptions = [
  { value: "Thứ 2 - Thứ 6", label: "Thứ 2 - Thứ 6" },
  { value: "Thứ 2 - Thứ 7", label: "Thứ 2 - Thứ 7" },
  { value: "Thứ 2 - CN", label: "Thứ 2 - CN" },
  { value: "Shift", label: "Shift" },
  { value: "Weekend", label: "Weekend" },
  { value: "Flexible", label: "Flexible" },
  { value: "Remote", label: "Remote" }
]
function EmployerProfile() {
  const [form] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const companyInfor = useSelector((state) => state.CompanyReducer);
  const [skills, setSkills] = useState([]);
  const dispatch = useDispatch();
  const skillList = skills.map((skill) => {
    return { value: skill.skillName, label: <span>{skill.skillName}</span> };
  });
  const handleEdit = () => {
    openModal();
  };
  const openModal = () => {
    setIsOpen(true);
    form.setFieldsValue({
      companyName: companyInfor.companyName,
      description: companyInfor.description,
      address: companyInfor.address,
      companyModel: companyInfor.companyModel,
      industry: companyInfor.industry,
      companySize: companyInfor.companySize,
      country: companyInfor.country,
      workingHours: companyInfor.workingHours,
      overtimePolicy: companyInfor.overtimePolicy,
      skills: companyInfor.skills,
      companyIntroduction: companyInfor.companyIntroduction,
      ourExpertise: companyInfor.ourExpertise,
      whyWorkHere: companyInfor.whyWorkHere,
    });

  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onFinish = async (values) => {
    try {
          const result = await updateCompany(companyInfor.id, values);
          if (!isObjectEmpty(result)) {
            Swal.fire({
              title: "Update Success!",
              icon: "success",
              draggable: true,
            });
            dispatch(setCompanyFullInfo(result));
            closeModal();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Update Fail!",
            });
          }
        } catch (error) {
          console.error("Loi cap nhat update company", error);
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
  useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await getSkills();
          setSkills(result || []);
        } catch (error) {
          console.error("Error fetching data:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to load company or job data!",
          });
        }
      };
      fetchData();
    }, []);
  return (
    <>
      <div className="employer-profile">
        <EmployerStart content="Profile" type="search" />
        <div className="employer-job__button-wrap">
          <ButtonAction
            text="Edit"
            icon={<TbEdit />}
            handle={handleEdit}
          ></ButtonAction>
        </div>
        <div className="employer-profile__preview">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="job-form__title-wrap">
              <div className="job-form__title">Sửa thông tin</div>
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
                    <Form.Item label="Tên công ty" name="companyName">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Mô tả" name="description">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Địa chỉ" name="address">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Mô hình công ty" name="companyModel">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Lĩnh vực công ty" name="industry">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Quy mô công ty" name="companySize">
                      <Select
                        placeholder="Please select company size"
                        options={companySizeOptions}
                        
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Quốc gia" name="country">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Thời gian làm việc" name="workingHours">
                      <Select
                        placeholder="Please select working hours"
                        options={workingHoursOptions}
                        
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Chính sách làm thêm giờ" name="overtimePolicy">
                      <Select
                        placeholder="Please select overtime policy"
                        options={overTimePolicyOptions}
                        
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="skills"
                      label="Kỹ năng chính"
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
                    <Form.Item name="companyIntroduction" label="Giới thiệu công ty">
                      <SimpleEditor />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="ourExpertise" label="Chuyên môn của chúng tôi">
                      <SimpleEditor />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="whyWorkHere" label="Tại sao bạn sẽ yêu thích làm việc tại đây?">
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
          <div className="employer-detail">
            <CardCompanyHead companyInfor={companyInfor} />
            <div className="container">
              <Row>
                <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
                  <div className="employer-detail__infor">
                    <ul className="employer-detail__tabs">
                      <li className="employer-detail__item-wrapper">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "employer-detail__item employer-detail__item--active"
                              : "employer-detail__item"
                          }
                          to={`/customer/profile`}
                          end
                        >
                          <span className="employer-detail__text">
                            Giới thiệu
                          </span>
                        </NavLink>
                      </li>
                      <li className="employer-detail__item-wrapper">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "employer-detail__item employer-detail__item--active"
                              : "employer-detail__item"
                          }
                          to={`/customer/profile/danh-gia`}
                        >
                          <span className="employer-detail__text">
                            Đánh giá
                          </span>
                          <span className="employer-detail__count">80</span>
                        </NavLink>
                      </li>
                      <li className="employer-detail__item-wrapper">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "employer-detail__item employer-detail__item--active"
                              : "employer-detail__item"
                          }
                          to={`/customer/profile/bai-viet`}
                        >
                          <span className="employer-detail__text">
                            Bài viết
                          </span>
                          <span className="employer-detail__count">4</span>
                        </NavLink>
                      </li>
                    </ul>
                    <div className="employer-detail__content-tabs">
                      <Outlet context={{ companyInfor }} />
                    </div>
                  </div>
                </Col>
                <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                  <div className="employer-detail__jobs">
                    <h2>
                      {companyInfor.jobs.length || 0} việc làm đang tuyển dụng
                    </h2>
                    <div className="employer-detail__job-wrap">
                      {companyInfor.jobs.map((job) => (
                        <div className="employer-detail__job" key={job.id}>
                          <TopJobItem
                            job={job}
                            type="home"
                            companyInfoAdd={{
                              companyName: companyInfor.companyName,
                              slug: companyInfor.slug,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmployerProfile;
