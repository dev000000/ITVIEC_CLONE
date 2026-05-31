
// Trang đăng nhập dành cho Employer
// Layout chia 2 cột: bên trái hiển thị ảnh branding, bên phải là form đăng nhập (EmployerLoginForm)
import EmployerLoginForm from "@/components/EmployerLoginForm";
import "./EmployerLogin.scss"
function EmployerLogin() {
  return (
    <>
      <div className="employer-login">
        <div className="employer-login__left">
          <div className="employer-login__left-img">
            <img src="/logoNhieuViecLogin.webp" alt="img" />
          </div>
        </div>
        <div className="employer-login__right">
          <EmployerLoginForm />
        </div>
      </div>
    </>
  )
}
export default EmployerLogin;