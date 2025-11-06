import { Col, Form, Input, Row, Select } from "antd";
import "./ContactEmployerForm.scss";
import { FaCheck } from "react-icons/fa6";
import ButtonSubmit from "../Button";
import { useState } from "react";
import AgreementCheckBox from "../AgreementCheckbox";
import { Link } from "react-router-dom";
function ContactEmployerForm() {
  const [checked, setChecked] = useState(false);
  const listItem = [
    { value: "Tìm kiếm Google", label: "Tìm kiếm Google" },
    { value: "Facebook", label: "Facebook" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Email", label: "Email" },
    { value: "Đội ngũ tư vấn của ITviec", label: "Đội ngũ tư vấn của ITviec" },
    { value: "Bạn bè giới thiệu", label: "Bạn bè giới thiệu" },
    { value: "Khác", label: "Khác" },
  ];
  const listItem2 = [
    { value: "Ho Chi Minh", label: "Ho Chi Minh" },
    { value: "Ha Noi", label: "Ha Noi" },
    { value: "Da Nang", label: "Da Nang" },
    { value: "Others", label: "Others" },
  ];
  const onHandleChange = (e) => {
    setChecked(e.target.checked);
  };
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="contact-employer-form">
        <Form onFinish={onFinish}>
          <h3 className="contact-emploter-form__title">Thông tin Quý khách</h3>
          <Row gutter={20}>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Vui lòng điền tên của bạn!" },
                ]}
              >
                <Input size="large" placeholder="Họ và tên" />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: "Vui lòng điền chức vụ của bạn!" },
                ]}
              >
                <Input size="large" placeholder="Chức vụ " />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp email công ty của bạn!",
                  },
                ]}
              >
                <Input size="large" placeholder="Email làm việc" />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng cung cấp số điện thoại!",
                  },
                ]}
              >
                <Input size="large" placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="source">
                <Select
                  size="large"
                  options={listItem}
                  placeholder="Bạn biết đến ITviec từ đâu?"
                />
              </Form.Item>
            </Col>
          </Row>
          <h3 className="contact-emploter-form__title">Thông tin công ty</h3>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="nameCompany"
                rules={[
                  { required: true, message: "Vui lòng điền tên công ty!" },
                ]}
              >
                <Input size="large" placeholder="Tên công ty" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="companyAddress"
                rules={[
                  { required: true, message: "Vui lòng chọn địa chỉ công ty!" },
                ]}
              >
                <Select
                  size="large"
                  options={listItem2}
                  placeholder="Địa chỉ công ty"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="companyAddressWebsite">
                <Input size="large" placeholder="Địa chỉ website" />
                {/* <span>
                  URL bao gồm đầy đủ giao thức (https), ví dụ:
                  https://itviec.com
                </span> */}
              </Form.Item>
            </Col>
          </Row>
          <AgreementCheckBox
            id="agreement-employform"
            onHandleChange={onHandleChange}
          />
          <Row>
            <Col xxl={{span: 12, order: 0}} xl={{span: 12, order: 0}} lg={{span: 24, order: 1}} md={{span: 24, order: 1}} sm={{span: 24, order: 1}} xs={{span: 24, order: 1}}>
              <div className="center-item d-flex flex-column">
                <div className="register-login">
                  Bạn đã có tài khoản? 
                  <span><Link to="/login">Đăng nhập ngay</Link></span>
                </div>
              </div>
            </Col>
            <Col
              xxl={{ span: 8, offset: 4, order: 1 }}
              xl={{ span: 8, offset: 4, order: 1 }}
              lg={{span: 24, order: 0}}
              md={{span: 24, order: 0}}
              sm={{span: 24, order: 0}}
              xs={{span: 24, order: 0}}
            >
              <Form.Item label={null}>
                <div className="center-item">
                  <ButtonSubmit
                    text="Liên hệ tôi"
                    disabled={!checked}
                    type="max"
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
export default ContactEmployerForm;
