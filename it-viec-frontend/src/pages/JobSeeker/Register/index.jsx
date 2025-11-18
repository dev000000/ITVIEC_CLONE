import { Link, Navigate } from "react-router-dom";
import logo from "../../../assets/images/logo_nhieuviec4.png";
import "./Register.scss";
import { Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { LuCircle } from "react-icons/lu";
import ButtonSubmit from "../../../components/Button";
import AgreementCheckBox from "../../../components/AgreementCheckbox";
import { checkExist, register } from "../../../services/UserServices";
import Swal from "sweetalert2";
import generateToken from "../../../helpers/generateToken";
import { useNavigate } from "react-router-dom";
import { createSeekerDetail } from "../../../services/SeekerServices";

function Register() {
  const navigate = useNavigate();
  const [checkedGG, setCheckedGG] = useState(false);
  const [checked, setChecked] = useState(false);
  const [passWord, setPassWord] = useState({});
  const [validate, setValidate] = useState({});
  const onHandleChange = (e) => {
    if (e.target.id === "agreement-registerform") {
      setChecked(e.target.checked);
    } else {
      setCheckedGG(e.target.checked);
    }
  };
  const passwordRules = [
    { key: "length", text: "Ít nhất 12 ký tự", regex: /.{12,}/ },
    {
      key: "special",
      text: "Ít nhất 1 ký tự đặc biệt (! @ # $ ...)",
      regex: /[!@#$%^&*]/,
    },
    { key: "number", text: "Ít nhất 1 số", regex: /\d/ },
    { key: "uppercase", text: "Ít nhất 1 chữ viết HOA", regex: /[A-Z]/ },
    { key: "lowercase", text: "Ít nhất 1 chữ viết thường", regex: /[a-z]/ },
  ];
  const validationPassword = (values) => {
    let check = true;
    const newValidate = passwordRules.reduce((acc, rule) => {
      acc[rule.key] = rule.regex.test(values);
      return acc;
    }, {});

    setValidate(newValidate);
  };
  const onFinish = async (values) => {
    console.log(values);
    const result = await checkExist(values);
    if (result.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email đã tồn tại rồi bro!",
      });
    } else {
      const valueRegister = {
        email: values.email,
        userType: "jobSeeker",
        passwordHash: values.password,
        createdAt: new Date().toISOString(),
        token: generateToken(),
      };
      const resultRegister = await register(valueRegister);
      if (resultRegister) {
        const resultSeeker = await createSeekerDetail({
          userId: resultRegister.id,
          fullName: values.fullName,
          gmail: resultRegister.email,
          jobTitle: "",
          phoneNumber: "",
          skills: [],
          dateOfBirth: "",
          gender: "",
          city: "",
          address: "",
          personalLink: "",
          coverLetter: "",
          desiredLocations: [],
        });
        if (resultSeeker) {
          Swal.fire({
            title: "Đăng ký thành công!",
            icon: "success",
            draggable: true,
          });
        }
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đã có lỗi xảy ra trong quá trình đăng kí!",
        });
      }
    }
    // const result = await register(values);
  };
  const onFinishFailed = () => {};
  return (
    <>
      <div className="register">
        <div className="i-container">
          <div className="welcome">
            <h3 className="welcome__title">Chào mừng bạn đến với</h3>
            <div className="welcome__logo">
              <img src={logo} alt="logo_nhieu_viec"></img>
            </div>
          </div>
          <h1>Đăng ký tài khoản</h1>
          <AgreementCheckBox
            id="agreement-registerform-gg"
            onHandleChange={onHandleChange}
          />
          <button className="register__google" disabled={!checkedGG}>
            <FcGoogle className="register__google-logo" /> Đăng nhập bằng Google
          </button>
          <div className="register__divide">
            <div className="register__divide-line"></div>
            <div className="register__divide-or"> HOẶC </div>
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
                label="Họ và Tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Thông tin bắt buộc",
                  },
                ]}
              >
                <Input
                  className="login__input"
                  placeholder="Nhập Họ và Tên"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Thông tin bắt buộc",
                  },
                  {
                    type: "email",
                    message: "Địa chỉ email không hợp lệ",
                  },
                ]}
              >
                <Input
                  className="login__input"
                  placeholder="Nhập Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Thông tin bắt buộc",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/,
                    // pattern: /[a-z]/,
                    // pattern: /[A-Z]/,
                    // pattern: /\d/,
                    // pattern: /[!@#$%^&*]/,
                    // pattern: /.{12,}/,
                    message: "Chưa đúng định dạng",
                  },
                ]}
              >
                <Input.Password
                  className="login__input"
                  placeholder="Nhập Mật khẩu"
                  size="large"
                  onChange={(e) => validationPassword(e.target.value)}
                />
              </Form.Item>
              <div className="register__checkpass">
                <ul>
                  {passwordRules.map((item) => (
                    <li
                      className={`${
                        validate.hasOwnProperty(item.key)
                          ? validate[item.key]
                            ? "register__checkpass-li--true"
                            : "register__checkpass-li--false"
                          : ""
                      }`}
                      key={item.key}
                    >
                      <LuCircle
                        className={`register__checkpass-icon ${
                          validate.hasOwnProperty(item.key)
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
                  text="Đăng ký bằng Email"
                  disabled={!checked}
                  type="max"
                />
              </Form.Item>
            </Form>
          </div>
          <div className="register-login">
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
