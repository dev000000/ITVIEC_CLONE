import { Col, Form, Row, Input } from "antd";
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

function EmployerLoginForm() {
  const navigate = useNavigate();
  const setLogin = useUserStore((state) => state.setLogin);
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
            title: "Đăng nhập thành công!",
            icon: "success",
            draggable: true,
          });
          navigate("/");
    
        } catch (error) {
          console.error("Lỗi khi đăng nhập: ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Đăng nhập không thành công!",
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
                CUSTOMER ADMIN SITE{" "}
              </div>
            </div>
            <h1 className="employerLogin-form__title">
              {" "}
              Đăng nhập NHIEUviec Customer{" "}
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
                      message: "Thông tin bắt buộc",
                    },
                    {
                      type: "email",
                      message: "Email không đúng định dạng",
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
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin bắt buộc",
                    },
                  ]}
                >
                  <Input.Password
                    className="employerLogin-form__input"
                    placeholder="Mật khẩu"
                    size="large"
                  />
                </Form.Item>
                <div className="employerLogin-form__remember-forget">
                  <AgreementCheckBox
                    id="remember-employerLoginForm"
                    text="Ghi nhớ đăng nhập"
                    onHandleChange={() => { }}
                  />
                  <div>
                    <a href="">Quên mật khẩu?</a>
                  </div>
                </div>
                <div className="employerLogin-form__terms-policy">
                  Bằng việc đăng nhập, bạn đồng ý với các{" "}
                  <a
                    href="/terms-conditions-vn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a
                    href="/quy-dinh-bao-mat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chính sách quyền riêng tư
                  </a>{" "}
                  của ITviec liên quan đến thông tin riêng tư của bạn.
                </div>
                <Form.Item label={null}>
                  <ButtonSubmit text="Đăng nhập" type="max" />
                </Form.Item>
              </Form>
            </div>

            <div className="register-login">
              Bạn chưa có tài khoản?{" "}
              <Link to="/customer/register">Đăng ký ngay</Link>
            </div>
            <div className="employerLogin-form__contact">
              <div className="employerLogin-form__contact-title">
                Bạn chưa có tài khoản khách hàng? Liên hệ chúng tôi:
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
