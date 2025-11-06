import { Col, Form, Row, Button, Checkbox, Input } from "antd";
import "./EmployerHome.scss";

import img from "../../../assets/images/hire-the-best-it.webp";
import ButtonSubmit from "../../../components/Button";
import firstHand from "../../../assets/images/first-hand.svg";
import secondHand from "../../../assets/images/second-hand.svg";
import thirdHand from "../../../assets/images/third-hand.svg";
import jobPostingImg from "../../../assets/images/job-posting.webp";
import OpporTunitiesImg from "../../../assets/images/opportunities.svg";
import rightSkillImg from "../../../assets/images/right-skill.svg";
import aiMatchImg from "../../../assets/images/ai-match.webp";
import secondCandidateImg from "../../../assets/images/second-candidate.svg";
import firstCandidateImg from "../../../assets/images/first-candidate.svg";
import firstEmployerImg from "../../../assets/images/first-employer.svg";
import secondEmployerImg from "../../../assets/images/second-employer.svg";
import employerBrandingImg from "../../../assets/images/employer-branding.webp";
import { FiPhone } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

import "swiper/css";
import SwiperFeedback from "../../../components/SwiperFeedback";
import ContactEmployerForm from "../../../components/ContactEmployerForm";
import { useEffect, useRef, useState } from "react";
function Employer() {
  const formRef = useRef(null);
  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const dataLogo = [
    {
      id: 1,
      name: "Atomidigital",
      path: "/logocompany/atomidigital.webp",
    },
    {
      id: 2,
      name: "Capgemini",
      path: "/logocompany/capemini.webp",
    },
    {
      id: 3,
      name: "CBTW",
      path: "/logocompany/cbtw.webp",
    },
    {
      id: 4,
      name: "Crossian",
      path: "/logocompany/crossian.webp",
    },
    {
      id: 5,
      name: "HDBank",
      path: "/logocompany/hdbank.webp",
    },
    {
      id: 6,
      name: "LG",
      path: "/logocompany/lg.webp",
    },
    {
      id: 7,
      name: "MB Bank",
      path: "/logocompany/MB.webp",
    },
    {
      id: 8,
      name: "Modec",
      path: "/logocompany/modec.webp",
    },
    {
      id: 9,
      name: "MoneyForward",
      path: "/logocompany/moneyforward.webp",
    },
    {
      id: 10,
      name: "Motorola",
      path: "/logocompany/motorola.webp",
    },
    {
      id: 11,
      name: "NAB",
      path: "/logocompany/nab.webp",
    },
    {
      id: 12,
      name: "Paltech",
      path: "/logocompany/paltech.webp",
    },
    {
      id: 13,
      name: "Techcombank",
      path: "/logocompany/techcombank.webp",
    },
    {
      id: 14,
      name: "TrustingSocial",
      path: "/logocompany/trustingsocial.webp",
    },
    {
      id: 15,
      name: "Tyme",
      path: "/logocompany/tyme.webp",
    },
    {
      id: 16,
      name: "Viettel",
      path: "/logocompany/Viettel.webp",
    },
  ];

  return (
    <>
      <div className="hire-it">
        <div className="container">
          <Row>
            <Col
              xxl={{ span: 11, order: 1 }}
              xl={{ span: 11, order: 1 }}
              lg={{ span: 24, order: 2 }}
              md={{ span: 24, order: 2 }}
              sm={{ span: 24, order: 2 }}
              xs={{ span: 24, order: 2 }}
            >
              <div className="hire-it__content">
                <h1>Tuyển dụng Nhân tài IT tại Việt Nam cùng NHIEUviec</h1>
                <p>
                  Với hiểu biết sâu sắc về lĩnh vực IT và các kỹ năng chuyên
                  môn, chúng tôi có thể giúp bạn tiếp cận và tuyển dụng những
                  ứng viên IT tốt nhất.
                </p>
                <ButtonSubmit
                  text="Liên hệ ngay"
                  type={isMobile ? "max" : "min"}
                  handleClick={focusForm}
                />
                <div className="hire-it__login">
                  <span>Đăng nhập để đăng tin tuyển dụng</span>
                  <a
                    href="/customer/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Đăng nhập
                  </a>
                </div>
              </div>
            </Col>
            <Col
              xxl={{ span: 11, offset: 2, order: 2 }}
              xl={{ span: 11, offset: 2, order: 2 }}
              lg={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              <div className="hire-it__image">
                <img src={img} alt="hire-the-best-it"></img>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="itviec-different">
        <div className="container">
          <div className="itviec-different__content">
            <div className="itviec-different__content-title">
              Điều gì tạo nên sự khác biệt ở NHIEUviec?
            </div>
            <p>
              NHIEUviec là trang tuyển dụng và cơ sở dữ liệu hàng đầu về các
              chuyên gia IT tại Việt Nam.
            </p>
          </div>
          <div className="itviec-different__list">
            <Row gutter={[20, 50]}>
              <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="itviec-different__item">
                  <div className="itviec-different__image">
                    {" "}
                    <img src={firstHand} alt="img_first_hand"></img>
                  </div>
                  <div className="itviec-different__number">10,000+</div>
                  <div className="itviec-different__name">
                    Công ty và Doanh nghiệp IT
                  </div>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="itviec-different__item">
                  <div className="itviec-different__image">
                    {" "}
                    <img src={secondHand} alt="img_second_hand"></img>
                  </div>
                  <div className="itviec-different__number">1,500,000+</div>
                  <div className="itviec-different__name">
                    Hồ sơ đã gửi đến Nhà tuyển dụng
                  </div>
                </div>
              </Col>
              <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                <div className="itviec-different__item">
                  <div className="itviec-different__image">
                    {" "}
                    <img src={thirdHand} alt="img_third_hand"></img>
                  </div>
                  <div className="itviec-different__number">300,000+</div>
                  <div className="itviec-different__name">
                    Hồ sơ Ứng viên kinh nghiệm cao
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="high-services">
        <div className="container">
          <div className="high-services__title">
            Dịch vụ chất lượng cao dành cho Nhà tuyển dụng IT
          </div>
          <div className="high-services__list">
            <div className="high-services__item">
              <Row>
                <Col
                  xxl={{ span: 12, order: 0 }}
                  xl={{ span: 12, order: 0 }}
                  lg={{ span: 24, order: 1 }}
                  md={{ span: 24, order: 1 }}
                  sm={{ span: 24, order: 1 }}
                  xs={{ span: 24, order: 1 }}
                >
                  <div className="high-services__item-sideContent">
                    <div className="high-services__item-title">
                      Đăng tin tuyển dụng
                    </div>
                    <p className="high-services__item-content">
                      Đăng tuyển vị trí công việc IT, dễ dàng quản lý hồ sơ ứng
                      viên với giao diện trực quan, đội ngũ hỗ trợ, và công cụ
                      mạnh mẽ từ NHIEUviec
                    </p>
                    <div className="high-services__item-listFeature">
                      <Row gutter={[10, 20]}>
                        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img
                                src={OpporTunitiesImg}
                                alt="opportunities"
                              ></img>
                            </div>
                            <p>
                              Gia tăng cơ hội để tiếp cận ứng viên IT chất lượng
                              từ ITviec
                            </p>
                          </div>
                        </Col>
                        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img src={rightSkillImg} alt="right_skill"></img>
                            </div>
                            <p>
                              Thu hút ứng viên phù hợp với yêu cầu về kỹ năng IT
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={{ span: 24, order: 0 }}
                  md={{ span: 24, order: 0 }}
                  sm={{ span: 24, order: 0 }}
                  xs={{ span: 24, order: 0 }}
                >
                  <div className="high-services__item-sideImage">
                    <img src={jobPostingImg} alt="job__posting" />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="high-services__item">
              <Row>
                <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                  <div className="high-services__item-sideImage">
                    <img src={aiMatchImg} alt="ai-match" />
                  </div>
                </Col>
                <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                  <div className="high-services__item-sideContent">
                    <div className="high-services__item-title">
                      Gợi ý ứng viên AI Match
                    </div>
                    <p className="high-services__item-content">
                      Kết nối với nguồn hồ sơ ứng viên IT đa dạng, hoạt động
                      tích cực. Dễ dàng tiếp cận ứng viên với thao tác đơn giản.
                      Mở khóa để giúp tìm kiếm ứng viên phù hợp.
                    </p>
                    <div className="high-services__item-listFeature">
                      <Row gutter={[10, 20]}>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img
                                src={secondCandidateImg}
                                alt="second-candidate"
                              ></img>
                            </div>
                            <p>
                              Các ứng viên phù hợp nhất được lựa chọn dựa trên
                              kỹ năng, kinh nghiệm, nhu cầu công việc và hơn thế
                              nữa
                            </p>
                          </div>
                        </Col>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img
                                src={firstCandidateImg}
                                alt="first-candidate"
                              ></img>
                            </div>
                            <p>
                              Chỉ kết nối nhà tuyển dụng với những nhân tài IT
                              đang có ý định chuyển việc
                            </p>
                          </div>
                        </Col>
                        <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
                          <ButtonSubmit
                            text="Xem thêm về AI Match"
                            type="max"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="high-services__item">
              <Row>
                <Col
                  xxl={{ span: 12, order: 0 }}
                  xl={{ span: 12, order: 0 }}
                  lg={{ span: 24, order: 1 }}
                  md={{ span: 24, order: 1 }}
                  sm={{ span: 24, order: 1 }}
                  xs={{ span: 24, order: 1 }}
                >
                  <div className="high-services__item-sideContent">
                    <div className="high-services__item-title">
                      Thương hiệu tuyển dụng
                    </div>
                    <p className="high-services__item-content">
                      Nâng cao nhận diện thương hiệu của Nhà tuyển dụng, tiếp
                      cận các chuyên gia IT trên NHIEUviec qua các điểm chạm đặc
                      biệt, và kết nối với các ứng viên IT hàng đầu tại Việt Nam
                    </p>
                    <div className="high-services__item-listFeature">
                      <Row gutter={[10, 20]}>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img
                                src={firstEmployerImg}
                                alt="first-employer"
                              ></img>
                            </div>
                            <div>
                              <p className="high-services__item-feature-title">
                                Nhà tuyển dụng hàng đầu
                              </p>
                              <p>
                                Các ứng viên phù hợp nhất được lựa chọn dựa trên
                                kỹ năng, kinh nghiệm, nhu cầu công việc và hơn
                                thế nữa
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img
                                src={secondEmployerImg}
                                alt="second-employer"
                              ></img>
                            </div>
                            <div>
                              <p className="high-services__item-feature-title">
                                Nhà tuyển dụng nổi bật
                              </p>
                              <p>
                                Chỉ kết nối nhà tuyển dụng với những nhân tài IT
                                đang có ý định chuyển việc
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={{ span: 24, order: 0 }}
                  md={{ span: 24, order: 0 }}
                  sm={{ span: 24, order: 0 }}
                  xs={{ span: 24, order: 0 }}
                >
                  <div className="high-services__item-sideImage">
                    <img src={employerBrandingImg} alt="employer-branding" />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <h3 className="high-services__cta-text">
            Trải nghiệm dịch vụ của ITviec ngay hôm nay
          </h3>
          <ButtonSubmit
            text="Liên hệ ngay"
            type={isMobile ? "max" : "min"}
            handleClick={focusForm}
          />
        </div>
      </div>
      <div className="top-employers">
        <div className="container">
          <div className="top-employers__title">
            Top Công ty hàng đầu tại ITviec
          </div>
          <p className="top-employers__content">
            Nhà tuyển dụng và đối tác của chúng tôi bao gồm các công ty IT hàng
            đầu, và các công ty khởi nghiệp sáng tạo
          </p>
          <div className="top-employers__list">
            <Row gutter={[20, 20]}>
              {dataLogo.map((item) => (
                <Col xxl={3} xl={3} lg={6} md={6} sm={6} xs={6} key={item.id}>
                  <div className="top-employers__item" key={item.id}>
                    <img src={item.path} alt={item.name} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="top-employers__feedback">
            Khách hàng nói gì về chúng tôi?
          </div>
          <SwiperFeedback />
        </div>
      </div>
      <div className="contact-employers">
        <div className="container">
          <div className="contact-employers__title" ref={formRef}>
            Tìm kiếm Nhân tài IT phù hợp
          </div>
          <p className="contact-employers__desc">
            Để lại thông tin liên hệ để nhận tư vấn từ Phòng Chăm sóc Khách hàng
            của ITviec.
          </p>
          <Row gutter={[20, 20]}>
            <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
              <ContactEmployerForm />
            </Col>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="contact-employers__list">
                <div className="contact-employers__item">
                  <div className="contact-employers__item-icon">
                    <FiPhone />
                  </div>
                  <div className="contact-employers__item-content">
                    <p>Hotline Hồ Chí Minh</p>
                    <h3>0977 460 519</h3>
                  </div>
                </div>
                <div className="contact-employers__item">
                  <div className="contact-employers__item-icon">
                    <FiPhone />
                  </div>
                  <div className="contact-employers__item-content">
                    <p>Hotline Hà Nội</p>
                    <h3>0983 131 531</h3>
                  </div>
                </div>
                <div className="contact-employers__item">
                  <div className="contact-employers__item-icon">
                    <FaRegClock />
                  </div>
                  <div className="contact-employers__item-content">
                    <p>Thời gian làm việc</p>
                    <h3>Thứ 2 - Thứ 6 | 8:30 - 17:00</h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="excite-it">
        <div className="container">
          <Row>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="excite-it__content">
                <div className="excite-it__title">
                  Sẵn sàng Hứng Khởi ngành IT tại Việt Nam với Tuyển Dụng "Chất"
                </div>
                <p className="excite-it__desc">
                  Khởi đầu từ năm 2013, sứ mệnh của ITviec chính là luôn hướng
                  đến tuyển dụng "chất" ngành IT. Chúng tôi giúp nhân sự ngành
                  IT thăng tiến sự nghiệp, giúp doanh nghiệp tìm được những ứng
                  viên tuyệt vời. Hãy cùng chúng tôi hứng khởi ngành IT tại Việt
                  Nam với tuyển dụng "Chất"!
                </p>
              </div>
            </Col>
            <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
              <div className="excite-it__video">
                <iframe
                  src="https://www.youtube.com/embed/iRL0gIHFAgQ?si=gsY1KhAsntmF8SO8"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Employer;
