// Trang đăng ký tài khoản mới cho Job Seeker
// Gồm: form họ tên / email / mật khẩu, kiểm tra độ mạnh mật khẩu real-time,
// checkbox đồng ý điều khoản, nút đăng ký Google (UI chưa kết nối),
// link chuyển sang trang đăng nhập
// Sau khi đăng ký thành công → chuyển về trang đăng nhập
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo_nhieuviec4.png";
import "./Register.scss";
import { Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { LuCircle } from "react-icons/lu";
import ButtonSubmit from "@/components/Button";
import AgreementCheckBox from "@/components/AgreementCheckbox";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registerSeekerApi } from "@/services/authApi";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "@/utils/apiError";

// Kiểu dữ liệu form đăng ký tài khoản
interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
}

// Kiểu dữ liệu cho một quy tắc kiểm tra mật khẩu
interface PasswordRule {
  key: string;
  text: string;
  regex: RegExp;
}

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation("auth");
  const [checkedGG, setCheckedGG] = useState(false);
  const [checked, setChecked] = useState(false);
  const [_passWord, _setPassWord] = useState<Record<string, string>>({});
  const [validate, setValidate] = useState<Record<string, boolean>>({});

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "agreement-registerform") {
      setChecked(e.target.checked);
    } else {
      setCheckedGG(e.target.checked);
    }
  };

  // Danh sách 5 quy tắc kiểm tra độ mạnh mật khẩu
  // Mỗi quy tắc có: key (định danh), text (nội dung hiển thị), regex (pattern kiểm tra)
  const passwordRules: PasswordRule[] = [
    { key: "length", text: t("register.passwordRules.length"), regex: /.{12,}/ },
    {
      key: "special",
      text: t("register.passwordRules.special"),
      regex: /[!@#$%^&*]/,
    },
    { key: "number", text: t("register.passwordRules.number"), regex: /\d/ },
    { key: "uppercase", text: t("register.passwordRules.uppercase"), regex: /[A-Z]/ },
    { key: "lowercase", text: t("register.passwordRules.lowercase"), regex: /[a-z]/ },
  ];

  // Kiểm tra mật khẩu real-time theo từng quy tắc
  // Cập nhật state `validate` → UI hiển thị tick xanh/đỏ cho từng điều kiện
  const validationPassword = (values: string) => {
    const newValidate = passwordRules.reduce<Record<string, boolean>>(
      (acc, rule) => {
        acc[rule.key] = rule.regex.test(values);
        return acc;
      },
      {}
    );
    setValidate(newValidate);
  };

  // Xử lý submit form đăng ký:
  // Gọi registerSeekerApi → hiển thị thông báo thành công → chuyển về trang đăng nhập
  // Thất bại → lấy message + code lỗi từ response rồi hiển thị Swal
  const onFinish = async (values: RegisterFormValues) => {
    try {
      await registerSeekerApi({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      });
      Swal.fire({
        title: t("register.successTitle"),
        icon: "success",
        draggable: true,
      });
      navigate("/login");
    } catch (error) {
      console.log('Lỗi khi đăng ký: ', error);
      Swal.fire({
        icon: "error",
        title: t("register.errorTitle"),
        text: getApiErrorMessage(error, t),
      });
    }
  };

  const onFinishFailed = () => { };

  return (
    <>
      <div className="register">
        <div className="i-container">
          <div className="welcome">
            <h3 className="welcome__title">{t("register.welcome")}</h3>
            <div className="welcome__logo">
              <img src={logo} alt="logo_nhieu_viec"></img>
            </div>
          </div>
          <h1>{t("register.titleMain")}</h1>
          <AgreementCheckBox
            id="agreement-registerform-gg"
            onHandleChange={onHandleChange}
          />
          <button className="register__google" disabled={!checkedGG}>
            <FcGoogle className="register__google-logo" /> {t("register.loginWithGoogle")}
          </button>
          <div className="register__divide">
            <div className="register__divide-line"></div>
            <div className="register__divide-or"> {t("register.or")} </div>
            <div className="register__divide-line"></div>
          </div>
          <div className="register__form">
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label={t("register.fullNameLabel")}
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: t("validation.required"),
                  },
                ]}
              >
                <Input
                  className="login__input"
                  placeholder={t("register.fullNameInputPlaceholder")}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                label={t("register.emailLabel")}
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
                  placeholder={t("register.emailInputPlaceholder")}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label={t("register.passwordLabel")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: t("validation.required"),
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/,
                    message: t("validation.passwordFormat"),
                  },
                ]}
              >
                <Input.Password
                  className="login__input"
                  placeholder={t("register.passwordInputPlaceholder")}
                  size="large"
                  onChange={(e) => validationPassword(e.target.value)}
                />
              </Form.Item>
              <div className="register__checkpass">
                <ul>
                  {passwordRules.map((item) => (
                    <li
                      className={`${Object.prototype.hasOwnProperty.call(validate, item.key)
                        ? validate[item.key]
                          ? "register__checkpass-li--true"
                          : "register__checkpass-li--false"
                        : ""
                        }`}
                      key={item.key}
                    >
                      <LuCircle
                        className={`register__checkpass-icon ${Object.prototype.hasOwnProperty.call(validate, item.key)
                          ? validate[item.key]
                            ? "register__checkpass-icon--true"
                            : "register__checkpass-icon--false"
                          : ""
                          }`}
                      />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <AgreementCheckBox
                id="agreement-registerform"
                onHandleChange={onHandleChange}
              />
              <Form.Item label={null}>
                <ButtonSubmit
                  text={t("register.loginWithEmail")}
                  disabled={!checked}
                  type="max"
                />
              </Form.Item>
            </Form>
          </div>
          <div className="register-login">
            {t("register.hasAccountQuestion")} <Link to="/login">{t("register.loginNowLink")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
