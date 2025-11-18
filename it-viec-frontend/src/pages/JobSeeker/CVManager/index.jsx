import React, { useRef, useState } from "react";
import "./CVManager.scss";
import { Link, useNavigate } from "react-router-dom";
import uploadImg from "../../../assets/images/uploaded-resume.svg";
import ButtonUpload from "../../../components/ButtonUpload";
import { FaRegEdit } from "react-icons/fa";
import { VIETNAM_CITIES } from "../../../constants";
import Modal from "react-modal";
import { Form, Input } from "antd";
import { Col, Row, Select } from "antd";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearSeekerInfo, setSeekerFullInfo } from "../../../actions/Seeker";
import { updateSeekerInfor } from "../../../services/SeekerServices";
import { isObjectEmpty } from "../../../helpers/checkObject"
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
const maxCountCity = 3;
function CVManager() {
  
  const [form] = Form.useForm();
  const [coverLetterForm] = Form.useForm();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("id") || "");
  const [isEditing, setIsEditing] = useState(false);
  const seeker = useSelector((state) => state.SeekerReducer);
  const [coverLetter, setCoverLetter] = useState(seeker.coverLetter || "");
  const [value, setValue] = useState(seeker.desiredLocations || []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const originalCoverLetter = useRef("");
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
  const handleCancelCoverLetter = () => {
    setCoverLetter(originalCoverLetter.current);
    coverLetterForm.setFieldsValue({
      coverLetter: originalCoverLetter.current,
    });
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
    form.setFieldsValue({
      fullName: seeker.fullName || "",
      phoneNumber: seeker.phoneNumber || "",
      desiredLocations: seeker.desiredLocations || [],
    })

  };
  const onClick = () => {
    console.log("upload");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = async (values) => {
    const currentUserId = localStorage.getItem("id");
    if (currentUserId !== userId && currentUserId) {
      clearStorage();
      dispatch(clearSeekerInfo()); 
      navigate("/login");
      return;
    }
    try {
      const result = await updateSeekerInfor(seeker.id, values);
      dispatch(setSeekerFullInfo(result));
      setCoverLetter(result.coverLetter || "");
      Swal.fire({
        title: "Update Profile Success!",
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
        text: "Update Profile Fail!",
      });
    }
  };
  const onFinish2 = async (values) => {
    const currentUserId = localStorage.getItem("id");
    if (currentUserId !== userId && currentUserId) {
      clearStorage();
      dispatch(clearSeekerInfo());
      navigate("/login");
      return;
    }
    try {
      const result = await updateSeekerInfor(seeker.id, values);
      console.log("Update cover letter result:", result);
      dispatch(setSeekerFullInfo(result));
      setCoverLetter(result.coverLetter || "");
      if (!isObjectEmpty(result)) {
        Swal.fire({
          title: "Update Letter Success!",
          icon: "success",
          draggable: true,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating cover letter:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Cập nhật thất bại!",
      });
    }
  };
  const getFieldsClassName = (value) => {
    return value
      ? `cv-manager__content`
      : `cv-manager__content cv-manager__content--default`;
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="cv-form__title-wrap">
          <div className="cv-form__title"> Thông tin cá nhân</div>
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
                  label={<label className="cv-form__label">Họ và Tên</label>}
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <label className="cv-form__label">Số điện thoại</label>
                  }
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                    {
                      pattern: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ!",
                    },
                  ]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="desiredLocations"
                  label={
                    <label className="cv-form__label">
                      Nơi làm việc mong muốn
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn địa điểm làm việc!",
                    },
                  ]}
                >
                  <Select
                    options={VIETNAM_CITIES}
                    size="large"
                    mode="multiple"
                    maxCount={3}
                    value={value}
                    onChange={setValue}
                  ></Select>
                </Form.Item>
                <div>
                  {" "}
                  {value.length}/{maxCountCity} địa điểm
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
                Hủy
              </div>
            </Col>
            <Col xxl={3} xl={3} lg={3} md={12} sm={12} xs={12}>
              <div
                className="cv-form__save-button"
                onClick={() => form.submit()}
              >
                Lưu
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      <div className="cv-manager">
        <div className="job-seeker-section">
          <h2 className="cv-manager__main-title--custom">Quản lý CV</h2>
          <p className="cv-manager__text">
            Tải CV của bạn bên dưới để có thể sử dụng xuyên suốt quá trình tìm
            việc
          </p>
          <div className="cv-manager__block">
            <h3 className="cv-manager__main-title">CV của bạn</h3>
            <div className="update-cv update-cv--2">
              <img
                src={uploadImg}
                alt="upload-resume"
                className="update-cv__img update-cv__img--2"
              />
              <div className="update-cv__main-content">
                <Link
                  to="/"
                  className="update-cv__link-file update-cv__link-file--2"
                >
                  CV.docx
                </Link>
                <div className="update-cv__file-date">
                  Cập nhật lần cuối: 24/05/2025
                </div>
              </div>
            </div>
            <ButtonUpload text="Tải CV lên" handleUpload={onClick} />
            <p className="cv-manager__text cv-manager__text--small">
              Hỗ trợ định dạng .doc, .docx hoặc .pdf, dưới 3MB và không chứa mật
              khẩu bảo vệ
            </p>
          </div>
          <div className="cv-manager__block">
            <div className="cv-manager__header">
              <h3 className="cv-manager__main-title">Thông tin cá nhân</h3>
              <FaRegEdit onClick={openModal} />
            </div>

            <div className="cv-manager__content-wrap">
              <Row gutter={[10, 20]}>
                <Col className="cv-manager__title" span={8}>
                  Họ và Tên
                </Col>
                <Col
                  className={getFieldsClassName(seeker.fullName)}
                  span={16}
                >
                  {seeker.fullName || "Chưa cập nhật"}
                </Col>
                <Col className="cv-manager__title" span={8}>
                  Số điện thoại
                </Col>
                <Col
                  className={getFieldsClassName(seeker.phoneNumber)}
                  span={16}
                >
                  {seeker.phoneNumber || "Chưa cập nhật"}
                </Col>
                <Col className="cv-manager__title" span={8}>
                  Nơi làm việc mong muốn
                </Col>
                <Col
                  className={getFieldsClassName(seeker.desiredLocations)}
                  span={16}
                >
                  {seeker.desiredLocations &&
                  seeker.desiredLocations.length > 0
                    ? seeker.desiredLocations.join(", ")
                    : "Chưa cập nhật"}
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="job-seeker-section">
          <div className="cv-manager__block cv-manager__block--main">
            <div className="cv-manager__header">
              <h3 className="cv-manager__main-title cv-manager__main-title--custom">
                Thông tin chung
              </h3>
              <FaRegEdit />
            </div>
            <div className="cv-manager__content-wrap">
              <Row gutter={[10, 20]}>
                <Col className="cv-manager__title" span={8}>
                  Tổng số năm kinh nghiệm
                </Col>
                <Col
                  className="cv-manager__content cv-manager__content--default"
                  span={16}
                >
                  Thêm thông tin
                </Col>
                <Col className="cv-manager__title" span={8}>
                  Cấp bậc hiện tại
                </Col>
                <Col
                  className="cv-manager__content cv-manager__content--default"
                  span={16}
                >
                  Thêm thông tin
                </Col>
                <Col className="cv-manager__title" span={8}>
                  Hình thức làm việc mong muốn
                </Col>
                <Col
                  className="cv-manager__content cv-manager__content--default"
                  span={16}
                >
                  Thêm thông tin
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="job-seeker-section">
          <div className="cv-manager__block cv-manager__block--main">
            <div className="cv-manager__header">
              <h3 className="cv-manager__main-title cv-manager__main-title--custom">
                Thư xin việc
              </h3>
              <FaRegEdit onClick={handleEditCoverLetter} />
            </div>
            <div className="devider"></div>
            <p
              ref={originalCoverLetter}
              className={
                isEditing
                  ? "cv-manager__mail cv-manager__mail--close"
                  : "cv-manager__mail"
              }
            >
              {seeker.coverLetter ||
                "Bạn chưa cập nhật thư xin việc. Hãy cập nhật để nhà tuyển dụng có thể hiểu rõ hơn về bạn!"}
            </p>
            <div
              className={
                isEditing
                  ? "cv-manager__edit-form"
                  : "cv-manager__edit-form cv-manager__edit-form--close"
              }
            >
              <p className="cv-manager__note">
                Gợi ý: Bắt đầu bằng việc mô tả những gì bạn có thể mang đến cho
                công việc và tại sao công việc này lại khiến bạn hứng thú
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
                    placeholder="Nhập thư xin việc của bạn tại đây..."
                    value={coverLetter}
                    size="large"
                    maxLength={500}
                    onChange={(e) => setCoverLetter(e.target.value)}
                  />
                </Form.Item>
                <div style={{ fontSize: "16px", color: "#a6a6a6" }}>
                  {coverLetter.length}/500 ký tự
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
                        Hủy
                      </div>
                    </Col>
                    <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                      <Form.Item label={null}>
                        <button
                          className="cv-form__save-button cv-form__save-button--custom"
                          htmltype="submit"
                        >
                          Lưu
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
