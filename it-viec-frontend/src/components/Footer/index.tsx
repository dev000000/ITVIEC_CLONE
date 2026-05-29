import "./Footer.scss";
import { Col, Collapse, Layout, Row } from "antd";
import logo from "@/assets/images/nhieu viec (355 x 85 px).png";
const { Footer } = Layout;
import { IoPaperPlaneOutline } from "react-icons/io5";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { RxEnvelopeClosed } from "react-icons/rx";
import { LuLinkedin } from "react-icons/lu";
import { LuFacebook } from "react-icons/lu";
import { LuYoutube } from "react-icons/lu";
import { useTranslation } from "react-i18next";
function FooterComp() {
  const { t } = useTranslation("common");
  const items = [
    {
      key: "1",
      label: t("footer.aboutTitle"),
      children: (
        <ul>
          <li>
            <a href="/">{t("footer.home")}</a>
          </li>
          <li>
            <a href="/ve-itviec" target="_blank">
              {t("footer.about")}
            </a>
          </li>
          <li>
            <a href="/dich-vu-goi-y-ung-vien" target="_blank">
              {t("footer.candidateSuggestion")}
            </a>
          </li>
          <li>
            <a href="/lien-he" target="_blank">
              {t("footer.contact")}
            </a>
          </li>
          <li>
            <a href="/viec-lam-it" target="_blank">
              {t("footer.itJobs")}
            </a>
          </li>
          <li>
            <a href="/blog/faq-cac-cau-hoi-thuong-gap/" target="_blank">
              {t("footer.faq")}
            </a>
          </li>
        </ul>
      ),
    },
    {
      key: "2",
      label: t("footer.programTitle"),
      children: (
        <ul>
          <li>
            <a href="/chuyen-it" target="_blank">
              {t("footer.itStory")}
            </a>
          </li>
          <li>
            <a href="/cuoc-thi-viet" target="_blank">
              {t("footer.writingContest")}
            </a>
          </li>
          <li>
            <a
              href="/viec-lam-it-noi-bat-tai-chinh-ngan-hang-2024"
              target="_blank"
            >
              {t("footer.featuredJobs")}
            </a>
          </li>
          <li>
            <a href="/khao-sat" target="_blank">
              {t("footer.annualSurvey")}
            </a>
          </li>
        </ul>
      ),
    },
    {
      key: "3",
      label: t("footer.termsTitle"),
      children: (
        <ul>
          <li>
            <a href="/blog/quy-dinh-bao-mat/" target="_blank">
              {t("footer.privacyPolicy")}
            </a>
          </li>
          <li>
            <a href="/blog/quy-che-hoat-dong-cua-itviec/" target="_blank">
              {t("footer.operatingReg")}
            </a>
          </li>
          <li>
            <a href="/blog/chinh-sach-giai-quyet-khieu-nai/" target="_blank">
              {t("footer.complaintPolicy")}
            </a>
          </li>
          <li>
            <a href="/blog/terms-conditions-vn/" target="_blank">
              {t("footer.termsOfUse")}
            </a>
          </li>
          <li>
            <a href="/blog/press/" target="_blank">
              {t("footer.pressRelease")}
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
                  <div className="footer__slogan">{t("footer.slogan")}</div>
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
                  <h4 className="footer__header">{t("footer.aboutTitle")}</h4>
                  <li>
                    <a href="/">{t("footer.home")}</a>
                  </li>
                  <li>
                    <a href="/ve-itviec" target="_blank">
                      {t("footer.about")}
                    </a>
                  </li>
                  <li>
                    <a href="/dich-vu-goi-y-ung-vien" target="_blank">
                      {t("footer.candidateSuggestion")}
                    </a>
                  </li>
                  <li>
                    <a href="/lien-he" target="_blank">
                      {t("footer.contact")}
                    </a>
                  </li>
                  <li>
                    <a href="/viec-lam-it" target="_blank">
                      {t("footer.itJobs")}
                    </a>
                  </li>
                  <li>
                    <a href="/blog/faq-cac-cau-hoi-thuong-gap/" target="_blank">
                      {t("footer.faq")}
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
                  <h4 className="footer__header">{t("footer.programTitle")}</h4>
                  <li>
                    <a href="/chuyen-it" target="_blank">
                      {t("footer.itStory")}
                    </a>
                  </li>
                  <li>
                    <a href="/cuoc-thi-viet" target="_blank">
                      {t("footer.writingContest")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/viec-lam-it-noi-bat-tai-chinh-ngan-hang-2024"
                      target="_blank"
                    >
                      {t("footer.featuredJobs")}
                    </a>
                  </li>
                  <li>
                    <a href="/khao-sat" target="_blank">
                      {t("footer.annualSurvey")}
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
                  <h4 className="footer__header">{t("footer.termsTitle")}</h4>
                  <li>
                    <a href="/blog/quy-dinh-bao-mat/" target="_blank">
                      {t("footer.privacyPolicy")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/quy-che-hoat-dong-cua-itviec/"
                      target="_blank"
                    >
                      {t("footer.operatingReg")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blog/chinh-sach-giai-quyet-khieu-nai/"
                      target="_blank"
                    >
                      {t("footer.complaintPolicy")}
                    </a>
                  </li>
                  <li>
                    <a href="/blog/terms-conditions-vn/" target="_blank">
                      {t("footer.termsOfUse")}
                    </a>
                  </li>
                  <li>
                    <a href="/blog/press/" target="_blank">
                      {t("footer.pressRelease")}
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
                    {t("footer.contactTitle")}
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
                    <IoPaperPlaneOutline /> {t("footer.sendContact")}
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="footer__copyright">
            <p>{t("footer.copyright")}</p>
            <p> | </p>
            <p>MST: xxxxxxxxxx</p>
          </div>
        </div>
      </Footer>
    </>
  );
}
export default FooterComp;
