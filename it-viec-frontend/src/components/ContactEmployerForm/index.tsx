import { Col, Form, Input, Row, Select } from "antd";
import "./ContactEmployerForm.scss";
import ButtonSubmit from "@/components/Button";
import { useEffect, useState } from "react";
import AgreementCheckBox from "@/components/AgreementCheckbox";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { registerEmployerApi } from "@/services/authApi";
import { getAllCitiesApi } from "@/services/cityApi";
import { getApiErrorMessage } from "@/utils/apiError";
import Swal from "sweetalert2";
import type { CityResponse } from "@/types/response.types";

function ContactEmployerForm() {
  const { t } = useTranslation("employer");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cities, setCities] = useState<CityResponse[]>([]);

  const referralOptions = [
    { value: "Tìm kiếm Google", label: "Tìm kiếm Google" },
    { value: "Facebook", label: "Facebook" },
    { value: "Linkedin", label: "Linkedin" },
    { value: "Email", label: "Email" },
    { value: "Đội ngũ tư vấn của NHIEUviec", label: "Đội ngũ tư vấn của NHIEUviec" },
    { value: "Bạn bè giới thiệu", label: "Bạn bè giới thiệu" },
    { value: "Khác", label: "Khác" },
  ];

  useEffect(() => {
    getAllCitiesApi()
      .then((res) => setCities(res.data.result ?? []))
      .catch(() => {
        // fallback — keep empty list; user can still type
      });
  }, []);

  const cityOptions = cities.map((c) => ({ value: c.cityName, label: c.cityName }));

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const onFinish = async (values: {
    username: string;
    title: string;
    email: string;
    phoneNumber: string;
    source?: string;
    nameCompany: string;
    companyAddress: string;
    companyAddressWebsite?: string;
  }) => {
    try {
      setSubmitting(true);
      await registerEmployerApi({
        fullName: values.username,
        jobTitle: values.title,
        email: values.email,
        phoneNumber: values.phoneNumber,
        referralSource: values.source,
        companyName: values.nameCompany,
        companyAddress: values.companyAddress,
        website: values.companyAddressWebsite,
      });
      navigate("/customer/register-success");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: getApiErrorMessage(err, t),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="contact-employer-form">
        <Form form={form} onFinish={onFinish}>
          <h3 className="contact-emploter-form__title">{t("contact.customerTitle")}</h3>
          <Row gutter={20}>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: t("contact.fullNameError") },
                ]}
              >
                <Input size="large" placeholder={t("contact.fullNamePlaceholder")} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="title"
                rules={[
                  { required: true, message: t("contact.titleError") },
                ]}
              >
                <Input size="large" placeholder={t("contact.titlePlaceholder")} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: t("contact.emailError") },
                  { type: "email", message: t("contact.emailError") },
                ]}
              >
                <Input size="large" placeholder={t("contact.emailPlaceholder")} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: t("contact.phoneError") },
                ]}
              >
                <Input size="large" placeholder={t("contact.phonePlaceholder")} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="source">
                <Select
                  size="large"
                  options={referralOptions}
                  placeholder={t("contact.sourcePlaceholder")}
                />
              </Form.Item>
            </Col>
          </Row>
          <h3 className="contact-emploter-form__title">{t("contact.companyTitle")}</h3>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                name="nameCompany"
                rules={[
                  { required: true, message: t("contact.companyNameError") },
                ]}
              >
                <Input size="large" placeholder={t("contact.companyNamePlaceholder")} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="companyAddress"
                rules={[
                  { required: true, message: t("contact.companyAddressError") },
                ]}
              >
                <Select
                  size="large"
                  options={cityOptions}
                  placeholder={t("contact.companyAddressPlaceholder")}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="companyAddressWebsite">
                <Input size="large" placeholder={t("contact.websitePlaceholder")} />
              </Form.Item>
            </Col>
          </Row>
          <AgreementCheckBox
            id="agreement-employform"
            onHandleChange={onHandleChange}
          />
          <Row>
            <Col xxl={{ span: 12, order: 0 }} xl={{ span: 12, order: 0 }} lg={{ span: 24, order: 1 }} md={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
              <div className="center-item d-flex flex-column">
                <div className="register-login">
                  {t("contact.hasAccount")}
                  <span><Link to="/login">{t("contact.loginNow")}</Link></span>
                </div>
              </div>
            </Col>
            <Col
              xxl={{ span: 8, offset: 4, order: 1 }}
              xl={{ span: 8, offset: 4, order: 1 }}
              lg={{ span: 24, order: 0 }}
              md={{ span: 24, order: 0 }}
              sm={{ span: 24, order: 0 }}
              xs={{ span: 24, order: 0 }}
            >
              <Form.Item label={null}>
                <div className="center-item">
                  <ButtonSubmit
                    text={t("contact.contactBtn")}
                    disabled={!checked || submitting}
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
