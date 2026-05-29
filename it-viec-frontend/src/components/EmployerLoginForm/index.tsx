import { Form, Input } from "antd";
import "./EmployerLoginForm.scss";
import logo from "@/assets/images/logo_nhieuviec4.png";
import { Link, useNavigate } from "react-router-dom";
import ButtonSubmit from "@/components/Button";
import Swal from "sweetalert2";
import AgreementCheckBox from "@/components/AgreementCheckbox";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { RxEnvelopeClosed } from "react-icons/rx";
import type { AuthenticationRequest } from "@/types/request.types";
import { loginApi } from "@/services_new/authApi";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";

function EmployerLoginForm() {
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);
  const { t } = useTranslation(["employer", "auth"]);
  const onFinish = async (values: AuthenticationRequest) => {
    try {
      const { data: apiData } = await loginApi(values);
      const user = apiData.result;
      setLogin({
        authenticated: user.authenticated,
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      Swal.fire({
        title: t("auth:login.successTitle"),
        icon: "success",
        draggable: true,
      });
      navigate("/");

    } catch (error) {
      console.error("Lỗi khi đăng nhập: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: t("auth:login.errorTitle"),
      });
    }

  };
  const onFinishFailed = () => {
    console.log("hehe bro");
  };
  return (
    <>
      <div className="employerLogin-form">
        <div className="container">
          <div className="employerLogin-form__left">
            <div className="welcome">
              <div className="welcome__logo">
                <img src={logo} alt="logo_nhieu_viec"></img>
              </div>
              <div className="welcome__title-employer">
                {" "}
                {t("employer:loginCustomer.customerAdminSite")}{" "}
              </div>
            </div>
            <h1 className="employerLogin-form__title">
              {" "}
              {t("employer:loginCustomer.title")}{" "}
            </h1>

            <div className="employerLogin-form__form">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t("auth:validation.required"),
                    },
                    {
                      type: "email",
                      message: t("auth:validation.emailFormat"),
                    },
                  ]}
                >
                  <Input
                    className="employerLogin-form__input"
                    placeholder="Email"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label={t("auth:login.password")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t("auth:validation.required"),
                    },
                  ]}
                >
                  <Input.Password
                    className="employerLogin-form__input"
                    placeholder={t("auth:login.password")}
                    size="large"
                  />
                </Form.Item>
                <div className="employerLogin-form__remember-forget">
                  <AgreementCheckBox
                    id="remember-employerLoginForm"
                    text={t("employer:loginCustomer.rememberLogin")}
                    onHandleChange={() => { }}
                  />
                  <div>
                    <a href="">{t("auth:login.forgotPassword")}</a>
                  </div>
                </div>
                <div className="employerLogin-form__terms-policy">
                  {t("auth:login.termsAgree")}{" "}
                  <a href="/terms-conditions-vn" target="_blank" rel="noopener noreferrer">
                    {t("auth:login.termsLinkText")}
                  </a>{" "}
                  {t("auth:login.termsAnd")}{" "}
                  <a href="/quy-dinh-bao-mat" target="_blank" rel="noopener noreferrer">
                    {t("auth:login.privacyLinkText")}
                  </a>{" "}
                  {t("auth:login.termsOutro")}
                </div>
                <Form.Item label={null}>
                  <ButtonSubmit text={t("auth:login.submit")} type="max" />
                </Form.Item>
              </Form>
            </div>

            <div className="register-login">
              {t("employer:loginCustomer.noAccount")}{" "}
              <Link to="/customer/register">{t("auth:login.register")}</Link>
            </div>
            <div className="employerLogin-form__contact">
              <div className="employerLogin-form__contact-title">
                {t("employer:loginCustomer.contactTitle")}
              </div>
              <div className="employerLogin-form__contact-list">
                <ul>
                  <li>
                    <LiaPhoneVolumeSolid /> Hồ Chí Minh: (+84) XXX XXX XXX
                  </li>
                  <li>
                    <LiaPhoneVolumeSolid /> Hà Nội: (+84) XXX XXX XXX
                  </li>
                  <li>
                    <RxEnvelopeClosed /> Email: vuongdachaivang@gmail.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmployerLoginForm;
