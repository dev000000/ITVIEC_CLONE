import { Col, Form, Row, Input } from "antd";
import { IoMdCheckmark } from "react-icons/io";
import "./Login.scss";
import logo from "../../../assets/images/logo_nhieuviec4.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import ButtonSubmit from "../../../components/Button";
import { checkLogin } from "../../../services/UserServices";
import { useNavigate } from "react-router-dom";
import { setLocalStorageUser } from "../../../helpers/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../actions/User";
import Swal from "sweetalert2";
import { getSeekerInforByUserId } from "../../../services/SeekerServices";
import { clearSeekerInfo, setSeekerFullInfo } from "../../../actions/Seeker";

function Login() {
  const seeker = useSelector((state) => state.SeekerReducer);
  console.log("Login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const newValues = { ...values, userType: "jobSeeker" };
    const result = await checkLogin(newValues);
    if (result.length > 0) {
      setLocalStorageUser(result[0]);
      const resultSeeker = await getSeekerInforByUserId(result[0].id);
      dispatch(
        setLogin({
          id: result[0].id,
          ok: true,
          userType: "jobSeeker",
        })
      );
      if (resultSeeker && resultSeeker[0]) {
        if (seeker.isLoaded === true) {
          dispatch(clearSeekerInfo());
        } else {
          dispatch(setSeekerFullInfo(resultSeeker[0]));
        }
      }
      Swal.fire({
        title: "Đăng nhập thành công!",
        icon: "success",
        draggable: true,
      });
      navigate("/");
    } else {
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
      <div className="login">
        <div className="container">
          <div className="welcome">
            <h3 className="welcome__title">Chào mừng bạn đến với</h3>
            <div className="welcome__logo">
              <img src={logo} alt="logo_nhieu_viec"></img>
            </div>
          </div>
          <Row gutter={[10, 30]}>
            <Col xxl={10} xl={10} lg={10} md={10} sm={24} xs={24}>
              <div className="login__left">
                <div className="login__terms-policy">
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
                <div className="login__google">
                  <FcGoogle className="login__google-logo" /> Đăng nhập bằng
                  Google
                </div>
                <div className="login__divide">
                  <hr className="login__divide-line"></hr>
                  <div> hoặc </div>
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
                          message: "Thông tin bắt buộc",
                        },
                        {
                          type: "email",
                          message: "Email không đúng định dạng",
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
                        className="login__input"
                        placeholder="Mật khẩu"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item label={null}>
                      <ButtonSubmit text="Đăng nhập bằng Email" type="max" />
                    </Form.Item>
                  </Form>
                </div>
                <div className="register-login">
                  Bạn chưa có tài khoản?{" "}
                  <Link to="/register">Đăng ký ngay</Link>
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
                  Đăng nhập để truy cập ngay vào hàng ngàn đánh giá và dữ liệu
                  lương thị trường IT
                </h2>
                <ul className="login__content-list">
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    Xem trước mức lương để có thể lợi thế khi thoả thuận lương
                  </li>
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    Tìm hiểu về phúc lợi, con người, văn hóa công ty qua các
                    đánh giá chân thật
                  </li>
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    Dễ dàng ứng tuyển chỉ với một thao tác
                  </li>
                  <li>
                    <IoMdCheckmark className="login__content-icon" />
                    Quản lý hồ sơ và quyền riêng tư của bạn
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
