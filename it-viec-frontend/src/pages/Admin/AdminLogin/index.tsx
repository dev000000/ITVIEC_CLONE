import AdminLoginForm from "@/components/AdminLoginForm";
import { useTranslation } from "react-i18next";
import "./AdminLogin.scss";

function AdminLogin() {
  const { t } = useTranslation("admin");

  return (
    <div className="admin-login">
      <div className="admin-login__left">
        <div className="admin-login__left-overlay" />
        <div className="admin-login__left-content">
          <span className="admin-login__eyebrow">{t("login.heroEyebrow")}</span>
          <h2>{t("login.heroTitle")}</h2>
          <p>{t("login.heroDescription")}</p>
        </div>
      </div>
      <div className="admin-login__right">
        <AdminLoginForm />
      </div>
    </div>
  );
}

export default AdminLogin;
