// Trang đăng nhập dành cho Job Seeker
// Gồm: form email/mật khẩu, nút đăng nhập Google (UI chưa kết nối),
// link sang trang đăng ký, và danh sách lợi ích khi tạo tài khoản
// Sau khi đăng nhập thành công → lưu thông tin user+seeker vào Zustand store, chuyển về trang chủ
import { Col, Form, Row, Input } from "antd";
import { IoMdCheckmark } from "react-icons/io";
import "./Login.scss";
import logo from "@/assets/images/logo_nhieuviec4.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import ButtonSubmit from "@/components/Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { AuthenticationRequest } from "@/types/request.types";
import { loginApi, logoutApi } from "@/services/authApi";
import { getMyProfileApi } from "@/services/seekerApi";
import { useUserStore } from "@/store/userStore";
import { useSeekerStore } from "@/store/seekerStore";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "@/utils/apiError";
import { ROLE } from "@/types/common.types";
import { getDefaultRouteByRole } from "@/utils/roleRedirect";
import { useCompanyStore } from "@/store/companyStore";
import { isLoginRoleMatch } from "@/utils/loginRoleValidation";


function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const setLogin = useUserStore((state) => state.setLogin);
  const logout = useUserStore((state) => state.logout);
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const clearSeekerInfo = useSeekerStore((state) => state.clearSeekerInfo);
  const clearCompanyInfo = useCompanyStore((state) => state.clearCompanyInfo);

  // Xử lý submit form đăng nhập:
  // 1. Gọi loginApi → lưu thông tin user (role, email, id...) vào userStore
  // 2. Gọi getMyProfileApi → lưu đầy đủ hồ sơ seeker vào seekerStore
  // 3. Hiển thị thông báo thành công → redirect về trang chủ
  const onFinish = async (values: AuthenticationRequest) => {
    try {
      const { data: apiData } = await loginApi(values);
      const user = apiData.result;

      if (!isLoginRoleMatch(ROLE.SEEKER, user.role)) {
        await logoutApi().catch(() => undefined);
        logout();
        clearSeekerInfo();
        clearCompanyInfo();
        await Swal.fire({
          icon: "error",
          title: t("login.errorTitle"),
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

      const { data: seekerData } = await getMyProfileApi();
      const seeker = seekerData.result;
      setSeekerFullInfo({
        id: seeker.id,
        fullName: seeker.fullName,
        jobTitle: seeker.jobTitle,
        phoneNumber: seeker.phoneNumber,
        dateOfBirth: seeker.dateOfBirth,
        gender: seeker.gender,
        city: seeker.city,
        address: seeker.address,
        personalLink: seeker.personalLink,
        coverLetter: seeker.coverLetter,
        avatarUrl: seeker.avatarUrl,
        createdAt: seeker.createdAt,
        updatedAt: seeker.updatedAt,
        skills: seeker.skills,
        desiredLocations: seeker.desiredLocations,
      });

      Swal.fire({
        title: t("login.successTitle"),
        icon: "success",
        draggable: true,
      });
      navigate(getDefaultRouteByRole(user.role));

    } catch (error) {
      console.error("Lỗi khi đăng nhập: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: getApiErrorMessage(error, t),
      });
    }
  };
  const onFinishFailed = () => {

  };
  return (
    <>
      <div className="login">
        <div className="container">
          <div className="welcome">
            <h3 className="welcome__title">{t("login.welcome")}</h3>
            <div className="welcome__logo">
              <img src={logo} alt="logo_nhieu_viec"></img>
            </div>
          </div>
          <Row gutter={[10, 30]}>
            <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
              <div className="login__left">
                <div className="login__terms-policy">
                  {t("login.termsAgree")}{" "}
                  <a
                    href="/terms-conditions-vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("login.termsLinkText")}
                  </a>{" "}
                  {t("login.termsAnd")}{" "}
                  <a
                    href="/quy-dinh-bao-mat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("login.privacyLinkText")}
                  </a>{" "}
                  {t("login.termsOutro")}
                </div>
                <div className="login__google">
                  <FcGoogle className="login__google-logo" /> {t("login.loginWithGoogle")}
                </div>
                <div className="login__divide">
                  <hr className="login__divide-line"></hr>
                  <div> {t("login.or")} </div>
                  <hr className="login__divide-line"></hr>
                </div>
                <div className="login__form">
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
                          message: t("validation.required"),
                        },
                        {
                          type: "email",
                          message: t("validation.emailFormat"),
                        },
                      ]}
                    >
                      <Input
                        className="login__input"
                        placeholder="Email"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      label={t("login.password")}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: t("validation.required"),
                        },
                      ]}
                    >
                      <Input.Password
                        className="login__input"
                        placeholder={t("login.passwordPlaceholder")}
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label={null}>
                      <ButtonSubmit text={t("login.loginWithEmail")} type="max" />
                    </Form.Item>
                  </Form>
                </div>
                <div className="register-login">
                  {t("login.noAccountQuestion")}{" "}
                  <Link to="/register">{t("login.registerNow")}</Link>
                </div>
              </div>
            </Col>
            <Col
              xxl={{ span: 12, offset: 2 }}
              xl={{ span: 12, offset: 2 }}
              lg={{ span: 12, offset: 2 }}
              md={{ span: 12, offset: 2 }}
              sm={24}
              xs={24}
            >
              <div className="login__content">
                <h2 className="login__content-title">
                  {t("login.contentTitle")}
                </h2>
                <ul className="login__content-list">
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    {t("login.benefit1")}
                  </li>
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    {t("login.benefit2")}
                  </li>
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    {t("login.benefit3")}
                  </li>
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    {t("login.benefit4")}
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Login;
