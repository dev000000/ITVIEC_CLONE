import "./Footer.scss";
import { Col, Collapse, Layout, Row } from "antd";
import logo from "../../assets/images/nhieu viec (355 x 85 px).png";
const { Footer } = Layout;
import { IoPaperPlaneOutline } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { RxEnvelopeClosed } from "react-icons/rx";
import { LuLinkedin } from "react-icons/lu";
import { LuFacebook } from "react-icons/lu";
import { LuYoutube } from "react-icons/lu";
function FooterComp() {
  const items = [
    {
      key: "1",
      label: "Về ITviec",
      children: (
        <ul>
          <li>
            <a href="/">Trang Chủ</a>
          </li>
          <li>
            <a href="/ve-itviec" target="_blank">
              Về NHIEUviec.com
            </a>
          </li>
          <li>
            <a href="/dich-vu-goi-y-ung-vien" target="_blank">
              Dịch vụ gợi ý ứng viên
            </a>
          </li>
          <li>
            <a href="/lien-he" target="_blank">
              Liên Hệ
            </a>
          </li>
          <li>
            <a href="/viec-lam-it" target="_blank">
              Việc Làm IT
            </a>
          </li>
          <li>
            <a href="/blog/faq-cac-cau-hoi-thuong-gap/" target="_blank">
              Câu hỏi thường gặp
            </a>
          </li>
        </ul>
      ),
    },
    {
      key: "2",
      label: "Chương trình",
      children: (
        <ul>
          <li>
            <a href="/chuyen-it" target="_blank">
              Chuyện IT
            </a>
          </li>
          <li>
            <a href="/cuoc-thi-viet" target="_blank">
              Cuộc thi viết
            </a>
          </li>
          <li>
            <a
              href="/viec-lam-it-noi-bat-tai-chinh-ngan-hang-2024"
              target="_blank"
            >
              Việc làm IT nổi bật
            </a>
          </li>
          <li>
            <a href="/khao-sat" target="_blank">
              Khảo sát thường niên
            </a>
          </li>
        </ul>
      ),
    },
    {
      key: "3",
      label: "Điều khoản chung",
      children: (
        <ul>
          <li>
            <a href="/blog/quy-dinh-bao-mat/" target="_blank">
              Quy định bảo mật
            </a>
          </li>
          <li>
            <a href="/blog/quy-che-hoat-dong-cua-itviec/" target="_blank">
              Quy chế hoạt động
            </a>
          </li>
          <li>
            <a href="/blog/chinh-sach-giai-quyet-khieu-nai/" target="_blank">
              Giải quyết khiếu nại
            </a>
          </li>
          <li>
            <a href="/blog/terms-conditions-vn/" target="_blank">
              Thoả thuận sử dụng
            </a>
          </li>
          <li>
            <a href="/blog/press/" target="_blank">
              Thông cáo báo chí
            </a>
          </li>
        </ul>
      ),
    },
  ];
  return (
    <>
      <Footer className="footer">
        <div className="container">
          <div className="footer__content">
            <Row>
              <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
                <div className="footer__left">
                  <div className="footer__image">
                    <img src={logo} alt="logo nhieu viec"></img>
                  </div>
                  <div className="footer__slogan">Nhiều nhưng mà ít</div>
                  <div className="footer__button">
                    <div className="footer__button-icon">
                      <a href="https://www.linkedin.com" target="_blank"><LuLinkedin /></a>
                    </div>
                    <div className="footer__button-icon">
                      <a href="https://www.facebook.com" target="_blank"><LuFacebook /></a>
                    </div>
                    <div className="footer__button-icon">
                      <a href="https://www.youtube.com" target="_blank"><LuYoutube /></a>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={24} className="footer__collapse">
                <Collapse accordion items={items} expandIconPosition="end" />
              </Col>
              <Col
                xxl={4}
                xl={4}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="footer__list"
              >
                <ul>
                  <h4 className="footer__header">Về ITviec</h4>
                  <li>
                    <a href="/">Trang Chủ</a>
                  </li>
                  <li>
                    <a href="/ve-itviec" target="_blank">
                      Về NHIEUviec.com
                    </a>
                  </li>
                  <li>
                    <a href="/dich-vu-goi-y-ung-vien" target="_blank">
                      Dịch vụ gợi ý ứng viên
                    </a>
                  </li>
                  <li>
                    <a href="/lien-he" target="_blank">
                      Liên Hệ
                    </a>
                  </li>
                  <li>
                    <a href="/viec-lam-it" target="_blank">
                      Việc Làm IT
                    </a>
                  </li>
                  <li>
                    <a href="/blog/faq-cac-cau-hoi-thuong-gap/" target="_blank">
                      Câu hỏi thường gặp
                    </a>
                  </li>
                </ul>
              </Col>
              <Col
                xxl={4}
                xl={4}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="footer__list"
              >
                <ul>
                  <h4 className="footer__header">Chương trình</h4>
                  <li>
                    <a href="/chuyen-it" target="_blank">
                      Chuyện IT
                    </a>
                  </li>
                  <li>
                    <a href="/cuoc-thi-viet" target="_blank">
                      Cuộc thi viết
                    </a>
                  </li>
                  <li>
                    <a
                      href="/viec-lam-it-noi-bat-tai-chinh-ngan-hang-2024"
                      target="_blank"
                    >
                      Việc làm IT nổi bật
                    </a>
                  </li>
                  <li>
                    <a href="/khao-sat" target="_blank">
                      Khảo sát thường niên
                    </a>
                  </li>
                </ul>
              </Col>
              <Col
                xxl={4}
                xl={4}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="footer__list"
              >
                <ul>
                  <h4 className="footer__header">Điều khoản chung</h4>
                  <li>
                    <a href="/blog/quy-dinh-bao-mat/" target="_blank">
                      Quy định bảo mật
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/quy-che-hoat-dong-cua-itviec/"
                      target="_blank"
                    >
                      Quy chế hoạt động
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/chinh-sach-giai-quyet-khieu-nai/"
                      target="_blank"
                    >
                      Giải quyết khiếu nại
                    </a>
                  </li>
                  <li>
                    <a href="/blog/terms-conditions-vn/" target="_blank">
                      Thoả thuận sử dụng
                    </a>
                  </li>
                  <li>
                    <a href="/blog/press/" target="_blank">
                      Thông cáo báo chí
                    </a>
                  </li>
                </ul>
              </Col>
              <Col
                xxl={6}
                xl={6}
                lg={24}
                md={24}
                sm={24}
                xs={24}
                className="footer__list"
              >
                <ul>
                  <h4 className="footer__header">
                    Liên hệ để đăng tin tuyển dụng tại:
                  </h4>
                  <li className="footer__contact">
                    <LiaPhoneVolumeSolid /> Hồ Chí Minh: (+84) XXX XXX XXX
                  </li>
                  <li className="footer__contact">
                    <LiaPhoneVolumeSolid /> Hà Nội: (+84) XXX XXX XXX
                  </li>
                  <li className="footer__contact">
                    <RxEnvelopeClosed /> Email: vuongdachaivang@gmail.com
                  </li>
                  <li className="footer__contact">
                    <IoPaperPlaneOutline /> Gửi thông tin liên hệ
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="footer__copyright">
            <p>Copyright © NHIEU VIEC JSC</p>
            <p> | </p>
            <p>MST: xxxxxxxxxx</p>
          </div>
        </div>
      </Footer>
    </>
  );
}
export default FooterComp;
