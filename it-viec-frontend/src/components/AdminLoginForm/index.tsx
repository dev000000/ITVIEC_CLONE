import { Form, Input } from "antd";
import "./AdminLoginForm.scss";
import logo from "@/assets/images/logo_nhieuviec4.png";
import { useNavigate } from "react-router-dom";
import ButtonSubmit from "@/components/Button";
import Swal from "sweetalert2";
import AgreementCheckBox from "@/components/AgreementCheckbox";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { RxEnvelopeClosed } from "react-icons/rx";
import type { AuthenticationRequest } from "@/types/request.types";
import { loginApi, logoutApi } from "@/services/authApi";
import { useUserStore } from "@/store/userStore";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "@/utils/apiError";
import { getDefaultRouteByRole } from "@/utils/roleRedirect";
import { ROLE } from "@/types/common.types";
import { useSeekerStore } from "@/store/seekerStore";
import { useCompanyStore } from "@/store/companyStore";
import { isLoginRoleMatch } from "@/utils/loginRoleValidation";

function AdminLoginForm() {
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);
  const logout = useUserStore((state) => state.logout);
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);
  const { t } = useTranslation(["admin", "auth"]);

  const onFinish = async (values: AuthenticationRequest) => {
    try {
      const { data: apiData } = await loginApi(values);
      const user = apiData.result;

      if (!isLoginRoleMatch(ROLE.ADMIN, user.role)) {
        await logoutApi().catch(() => undefined);
        logout();
        clearSeekerInfo();
        clearCompanyInfo();
        await Swal.fire({
          icon: "error",
          title: t("auth:login.errorTitle"),
        });
        return;
      }

      clearSeekerInfo();
      clearCompanyInfo();
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

      navigate(getDefaultRouteByRole(user.role));
    } catch (error) {
      console.error("Admin login failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getApiErrorMessage(error, t),
      });
    }
  };

  return (
    <div className="admin-login-form">
      <div className="container">
        <div className="admin-login-form__left">
          <div className="welcome">
            <div className="welcome__logo">
              <img src={logo} alt="logo_nhieu_viec" />
            </div>
            <div className="welcome__title-employer">{t("admin:login.badge")}</div>
          </div>

          <h1 className="admin-login-form__title">{t("admin:login.title")}</h1>
          <p className="admin-login-form__subtitle">{t("admin:login.subtitle")}</p>

          <div className="admin-login-form__form">
            <Form name="admin-login" onFinish={onFinish} autoComplete="off" layout="vertical">
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
                  className="admin-login-form__input"
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
                  className="admin-login-form__input"
                  placeholder={t("auth:login.password")}
                  size="large"
                />
              </Form.Item>

              <div className="admin-login-form__remember-forget">
                <AgreementCheckBox
                  id="remember-admin-login"
                  text={t("admin:login.remember")}
                  onHandleChange={() => {}}
                />
              </div>

              <div className="admin-login-form__terms-policy">
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
                <ButtonSubmit text={t("admin:login.submit")} type="max" />
              </Form.Item>
            </Form>
          </div>

          <div className="admin-login-form__contact">
            <div className="admin-login-form__contact-title">{t("admin:login.supportTitle")}</div>
            <div className="admin-login-form__contact-list">
              <ul>
                <li>
                  <LiaPhoneVolumeSolid /> Hồ Chí Minh: (+84) XXX XXX XXX
                </li>
                <li>
                  <LiaPhoneVolumeSolid /> Hà Nội: (+84) XXX XXX XXX
                </li>
                <li>
                  <RxEnvelopeClosed /> Email: support@nhieuviec.vn
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginForm;
