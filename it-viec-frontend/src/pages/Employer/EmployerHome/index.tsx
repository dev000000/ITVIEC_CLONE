// Trang landing page của Employer (trang chủ dành cho nhà tuyển dụng)
// Các section: Hero, Số liệu nổi bật, Dịch vụ (Job Posting / AI Match / Employer Branding),
// Top Employers, Form liên hệ tư vấn, Video giới thiệu
import { Col, Row } from "antd";
import "./EmployerHome.scss";
import { useTranslation } from "react-i18next";

import img from "@/assets/images/hire-the-best-it.webp";
import ButtonSubmit from "@/components/Button";
import firstHand from "@/assets/images/first-hand.svg";
import secondHand from "@/assets/images/second-hand.svg";
import thirdHand from "@/assets/images/third-hand.svg";
import jobPostingImg from "@/assets/images/job-posting.webp";
import OpporTunitiesImg from "@/assets/images/opportunities.svg";
import rightSkillImg from "@/assets/images/right-skill.svg";
import aiMatchImg from "@/assets/images/ai-match.webp";
import secondCandidateImg from "@/assets/images/second-candidate.svg";
import firstCandidateImg from "@/assets/images/first-candidate.svg";
import firstEmployerImg from "@/assets/images/first-employer.svg";
import secondEmployerImg from "@/assets/images/second-employer.svg";
import employerBrandingImg from "@/assets/images/employer-branding.webp";
import { FiPhone } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

// @ts-expect-error — swiper/css is a CSS side-effect import handled by Vite
import "swiper/css";
import SwiperFeedback from "@/components/SwiperFeedback";
import ContactEmployerForm from "@/components/ContactEmployerForm";
import { useEffect, useRef, useState } from "react";
interface LogoItem {
  id: number;
  name: string;
  path: string;
}

function Employer() {
  const { t } = useTranslation();
  // Ref trọi tới form liên hệ ở cuối trang, dùng để scroll tới khi nhấn nút CTA
  const formRef = useRef<HTMLDivElement>(null);
  // Scroll mượt xuống form liên hệ khi người dùng nhấn nút “Liên hệ ngay”
  const focusForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // Lắng nghe sự kiện resize window để cập nhật isMobile (breakpoint 1200px) — ảnh hưởng kiểu nút CTA
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

  // Danh sách logo công ty đối tác hiển thị trong section Top Employers
  const dataLogo: LogoItem[] = [
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
      {/* === Section 1: Hero === Tiêu đề chính, mô tả dịch vụ và nút CTA */}
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
                <h1>{t("employer:home.hero.title")}</h1>
                <p>{t("employer:home.hero.description")}</p>
                <ButtonSubmit
                  text={t("employer:home.hero.contactBtn")}
                  type={isMobile ? "max" : "min"}
                  handleClick={focusForm}
                />
                <div className="hire-it__login">
                  <span>{t("employer:home.hero.loginText")}</span>
                  <a
                    href="/customer/login"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("employer:home.hero.loginBtn")}
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
      {/* === Section 2: Số liệu nổi bật === 10,000+ IT jobs, 1.5M+ IT professionals, 300,000+ placements */}
      <div className="itviec-different">
        <div className="container">
          <div className="itviec-different__content">
            <div className="itviec-different__content-title">
              {t("employer:home.different.title")}
            </div>
            <p>{t("employer:home.different.desc")}</p>
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
                    {t("employer:home.different.stat1")}
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
                    {t("employer:home.different.stat2")}
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
                    {t("employer:home.different.stat3")}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      {/* === Section 3: Dịch vụ cao cấp === Job Posting, AI Matching, Employer Branding */}
      <div className="high-services">
        <div className="container">
          <div className="high-services__title">
            {t("employer:home.services.title")}
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
                      {t("employer:home.services.jobPosting.title")}
                    </div>
                    <p className="high-services__item-content">
                      {t("employer:home.services.jobPosting.desc")}
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
                              {t("employer:home.services.jobPosting.feature1")}
                            </p>
                          </div>
                        </Col>
                        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                          <div className="high-services__item-feature">
                            <div className="">
                              <img src={rightSkillImg} alt="right_skill"></img>
                            </div>
                            <p>
                              {t("employer:home.services.jobPosting.feature2")}
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
                      {t("employer:home.services.aiMatch.title")}
                    </div>
                    <p className="high-services__item-content">
                      {t("employer:home.services.aiMatch.desc")}
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
                              {t("employer:home.services.aiMatch.feature1")}
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
                              {t("employer:home.services.aiMatch.feature2")}
                            </p>
                          </div>
                        </Col>
                        <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
                          <ButtonSubmit
                            text={t("employer:home.services.aiMatch.learnMore")}
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
                      {t("employer:home.services.branding.title")}
                    </div>
                    <p className="high-services__item-content">
                      {t("employer:home.services.branding.desc")}
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
                                {t("employer:home.services.branding.topEmployer.title")}
                              </p>
                              <p>
                                {t("employer:home.services.branding.topEmployer.desc")}
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
                                {t("employer:home.services.branding.featuredEmployer.title")}
                              </p>
                              <p>
                                {t("employer:home.services.branding.featuredEmployer.desc")}
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
            {t("employer:home.services.ctaText")}
          </h3>
          <ButtonSubmit
            text={t("employer:home.services.ctaBtn")}
            type={isMobile ? "max" : "min"}
            handleClick={focusForm}
          />
        </div>
      </div>
      {/* === Section 4: Top Employers === Logo công ty đối tác + testimonial (SwiperFeedback) */}
      <div className="top-employers">
        <div className="container">
          <div className="top-employers__title">
            {t("employer:home.topEmployers.title")}
          </div>
          <p className="top-employers__content">
            {t("employer:home.topEmployers.desc")}
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
            {t("employer:home.topEmployers.feedback")}
          </div>
          <SwiperFeedback />
        </div>
      </div>
      {/* === Section 5: Liên hệ === Form tư vấn + số hotline HCM/HN + giờ làm việc */}
      <div className="contact-employers">
        <div className="container">
          <div className="contact-employers__title" ref={formRef}>
            {t("employer:home.contact.title")}
          </div>
          <p className="contact-employers__desc">
            {t("employer:home.contact.desc")}
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
                    <p>{t("employer:home.contact.hotlineHCM")}</p>
                    <h3>0977 460 519</h3>
                  </div>
                </div>
                <div className="contact-employers__item">
                  <div className="contact-employers__item-icon">
                    <FiPhone />
                  </div>
                  <div className="contact-employers__item-content">
                    <p>{t("employer:home.contact.hotlineHN")}</p>
                    <h3>0983 131 531</h3>
                  </div>
                </div>
                <div className="contact-employers__item">
                  <div className="contact-employers__item-icon">
                    <FaRegClock />
                  </div>
                  <div className="contact-employers__item-content">
                    <p>{t("employer:home.contact.workingHours")}</p>
                    <h3>{t("employer:home.contact.workingHoursValue")}</h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* === Section 6: Video === Embedded YouTube video giới thiệu ITviec cho nhà tuyển dụng */}
      <div className="excite-it">
        <div className="container">
          <Row>
            <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
              <div className="excite-it__content">
                <div className="excite-it__title">
                  {t("employer:home.excite.title")}
                </div>
                <p className="excite-it__desc">
                  {t("employer:home.excite.desc")}
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
