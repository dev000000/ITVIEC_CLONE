// Trang hồ sơ CV đầy đủ của Job Seeker
// Hiển thị: avatar, tên, chức danh, liên hệ (email, SDD, ngày sinh, giới tính, địa chỉ, link cá nhân)
// Các section có thể thêm (chưa triển khai): Giới thiệu, Học vấn, Kinh nghiệm, Kỹ năng, Dự án, Chứng chỉ, Giải thưởng
// Chỉnh sửa thông tin cá nhân qua Modal (Ant Design Form + DatePicker)
// Dữ liệu từ Zustand: useSeekerStore (thông tin seeker) + useUserStore (email)
import { useEffect, useState } from "react";
import "./CVProfile.scss";
import { FaRegEdit } from "react-icons/fa";
import avatar from "@/assets/images/unnamed.jpg";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { CiGift } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import { RiGlobalLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import outImg from "@/assets/images/outinfor.svg";
import educationImg from "@/assets/images/education.svg";
import expImg from "@/assets/images/experienceb.svg";
import skillImg from "@/assets/images/skill.svg";
import projImg from "@/assets/images/project.svg";
import certificateImg from "@/assets/images/certificate.svg";
import awardImg from "@/assets/images/award.svg";
import Modal from "react-modal";
import { Col, DatePicker, Row, Select } from "antd";
import { Form, Input } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { updateMyProfileApi } from "@/services/seekerApi";
import { getAllCitiesApi } from "@/services/cityApi";
import { GENDER_OPTIONS, VIETNAM_CITIES } from "@/constants";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useSeekerStore } from "@/store/seekerStore";
import { useUserStore } from "@/store/userStore";
import {
  findCityRef,
  findCityRefs,
  toEntityRef,
  toGender,
} from "@/utils/apiPayloadMappers";
import { useTranslation } from "react-i18next";
import type { CityResponse } from "@/types/response.types";

// Kiểu dữ liệu form chỉnh sửa thông tin cá nhân trong modal
interface CVProfileFormValues {
  fullName: string;
  jobTitle: string;
  gmail: string;
  phoneNumber: string;
  dateOfBirth: dayjs.Dayjs;
  gender: string | null;
  city: string | null;
  address: string;
  personalLink: string;
}

// Định dạng ngày tháng hiển thị trong DatePicker
const dateFormat = "DD/MM/YYYY";
// Style căn giữa màn hình cho react-modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    overflow: "hidden",
  },
};
function CVProfile() {
  const seeker = useSeekerStore();
  const setSeekerFullInfo = useSeekerStore((state) => state.setSeekerFullInfo);
  const email = useUserStore((state) => state.email);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [form] = Form.useForm();
  const { t } = useTranslation("jobseeker");

  // Tải danh sách tất cả thành phố khi component mount
  // Dùng cho Select dropdown "Địa điểm hiện tại" và map id khi gọi API cập nhật
  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await getAllCitiesApi();
        setCities(response.data.result ?? []);
      } catch (error) {
        console.error("Error fetching city options:", error);
      }
    };

    loadCities();
  }, []);

  // Mở modal và điền sẵn toàn bộ dữ liệu seeker hiện tại vào form
  const openModal = () => {
    setIsOpen(true);
    form.setFieldsValue({
      fullName: seeker.fullName || "",
      jobTitle: seeker.jobTitle || "",
      gmail: email || "",
      phoneNumber: seeker.phoneNumber || "",
      dateOfBirth: seeker.dateOfBirth
        ? dayjs(seeker.dateOfBirth)
        : dayjs("1999-01-11"),
      gender: seeker.gender || null,
      city: seeker.city?.cityName || null,
      address: seeker.address || "",
      personalLink: seeker.personalLink || "",
    });
  };
  // Đóng modal
  const closeModal = () => {
    setIsOpen(false);
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  // Submit form thông tin cá nhân: xây dựng payload đầy đủ,
  // gọi API cập nhật → lưu kết quả mới vào store và hiển thị thông báo
  const onFinish = async (values: CVProfileFormValues) => {
    const updatedSeekerInfor = {
      fullName: values.fullName,
      jobTitle: values.jobTitle,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth
        ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
        : seeker.dateOfBirth || "1999-01-01",
      gender: toGender(values.gender),
      city: findCityRef(values.city, cities, seeker.city),
      address: values.address || "",
      personalLink: values.personalLink || "",
      coverLetter: seeker.coverLetter || "",
      skills: seeker.skills
        .map((skill) => toEntityRef(skill.id))
        .filter((skill): skill is { id: number | string } => Boolean(skill)),
      desiredLocations: findCityRefs(
        seeker.desiredLocations?.map((city) => city.cityName) ?? [],
        cities,
      ),
    };
    try {
      const response = await updateMyProfileApi(updatedSeekerInfor);
      setSeekerFullInfo(response.data.result);
      Swal.fire({
        title: "Update Profile Success!",
        icon: "success",
        draggable: true,
      });
      form.resetFields();
      closeModal();
    } catch (error) {
      console.error("Error updating seeker information:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update Profile Fail!",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="cv-form__title-wrap">
          <div className="cv-form__title"> {t("cvProfile.personalInfo")}</div>
          <div className="cv-form__close-button" onClick={closeModal}>
            <IoClose />
          </div>
        </div>
        <div className="cv-form">
          <Form
            form={form}
            name="basic"
            style={{
              padding: "20px",
              width: "1000px",
              maxWidth: "95vw",
              margin: "0 auto",
              maxHeight: "70vh",
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10, 10]}>
              <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
                <div className="cv-form__img">
                  <img src={avatar} alt="" />
                </div>
                <div className="cv-form__button-wrap">
                  <div className="cv-form__button cv-form__button--fix">
                    <IoCameraOutline />
                    <span className="cv-form__button-text">{t("cvProfile.editPhoto")}</span>
                  </div>
                  <div className="cv-form__button cv-form__button--delete">
                    <FaRegTrashAlt />
                    <span className="cv-form__button-text">{t("cvProfile.deletePhoto")}</span>
                  </div>
                </div>
              </Col>
              <Col xxl={18} xl={18} lg={24} md={24} sm={24} xs={24}>
                <Row gutter={[10, 0]}>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <label className="cv-form__label">{t("cvProfile.fullName")}</label>
                      }
                      name="fullName"
                      rules={[
                        {
                          required: true,
                          message: t("cvProfile.validation.fullNameRequired"),
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={
                        <label className="cv-form__label">{t("cvProfile.jobTitle")}</label>
                      }
                      name="jobTitle"
                      rules={[
                        {
                          required: true,
                          message: t("cvProfile.validation.jobTitleRequired"),
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      label={
                        <label className="cv-form__label">{t("cvProfile.email")}</label>
                      }
                      name="gmail"
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      label={
                        <label className="cv-form__label">{t("cvProfile.phone")}</label>
                      }
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: t("cvProfile.validation.phoneRequired"),
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      label={
                        <label className="cv-form__label">{t("cvProfile.dateOfBirth")}</label>
                      }
                      name="dateOfBirth"
                      rules={[
                        {
                          required: true,
                          message: t("cvProfile.validation.dobRequired"),
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        size="large"
                        format={dateFormat}
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      name="gender"
                      label={
                        <label className="cv-form__label">{t("cvProfile.gender")}</label>
                      }
                    >
                      <Select options={GENDER_OPTIONS} size="large"></Select>
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      name="city"
                      label={
                        <label className="cv-form__label">
                          {t("cvProfile.currentCity")}
                        </label>
                      }
                    >
                      <Select
                        placeholder={t("cvProfile.currentCityPlaceholder")}
                        options={VIETNAM_CITIES}
                        size="large"
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Form.Item
                      name="address"
                      label={
                        <label className="cv-form__label">
                          {t("cvProfile.address")}
                        </label>
                      }
                    >
                      <Input
                        placeholder={t("cvProfile.addressInput")}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="personalLink"
                      label={
                        <label className="cv-form__label">{t("cvProfile.personalLink")}</label>
                      }
                    >
                      <Input
                        placeholder={t("cvProfile.personalLinkInput")}
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="cv-form__footer">
          <Row gutter={[10, 10]}>
            <Col
              xxl={{ span: 2, offset: 19 }}
              xl={{ span: 2, offset: 19 }}
              lg={{ span: 2, offset: 19 }}
              md={12}
              sm={12}
              xs={12}
            >
              <div className="cv-form__cancel-button" onClick={closeModal}>
                {t("cvProfile.cancel")}
              </div>
            </Col>
            <Col xxl={3} xl={3} lg={3} md={12} sm={12} xs={12}>
              <div
                className="cv-form__save-button"
                onClick={() => form.submit()}
              >
                {t("cvProfile.save")}
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
      <div className="cv-profile">
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header">
            <div className="cv-profile__imgtext-wrapper">
              <div className="cv-profile__avatar-wrapper">
                <img src={avatar} alt="avatar" className="cv-profile__avatar" />
              </div>
              {seeker ? (
                <div className="cv-profile__user-wrapper">
                  <div
                    className={
                      seeker.fullName
                        ? "cv-profile__user-name"
                        : "cv-profile__user-name cv-profile__user-name--default"
                    }
                  >
                    {seeker.fullName || t("cvProfile.fullNamePlaceholder")}
                  </div>
                  <h3
                    className={
                      seeker.jobTitle
                        ? "cv-profile__user-title"
                        : "cv-profile__user-title cv-profile__user-title--default"
                    }
                  >
                    {seeker.jobTitle || t("cvProfile.jobTitlePlaceholder")}
                  </h3>
                </div>
              ) : (
                <div className="cv-profile__user-wrapper">
                  <div className="cv-profile__user-name cv-profile__user-name--default">
                    {t("cvProfile.fullNamePlaceholder")}
                  </div>
                  <h3 className="cv-profile__user-title cv-profile__user-title--default">
                    {t("cvProfile.jobTitlePlaceholder")}
                  </h3>
                </div>
              )}
            </div>
            <FaRegEdit onClick={openModal} />
          </div>
          {seeker ? (
            <div className="cv-profile__main-content">
              <Row gutter={[16, 16]}>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <MdOutlineMailOutline />
                  <span
                    className={
                      email
                        ? "cv-profile__item-text"
                        : "cv-profile__item-text cv-profile__item-text--default"
                    }
                  >
                    {email || t("cvProfile.emailPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <FiPhone />
                  <span
                    className={
                      seeker.phoneNumber
                        ? "cv-profile__item-text"
                        : "cv-profile__item-text cv-profile__item-text--default"
                    }
                  >
                    {seeker.phoneNumber || t("cvProfile.phonePlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <CiGift />
                  <span
                    className={
                      seeker.dateOfBirth
                        ? "cv-profile__item-text"
                        : "cv-profile__item-text cv-profile__item-text--default"
                    }
                  >
                    {seeker.dateOfBirth
                      ? dayjs(seeker.dateOfBirth).format("DD/MM/YYYY")
                      : t("cvProfile.dobPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <LuUser />
                  <span
                    className={
                      seeker.gender
                        ? "cv-profile__item-text"
                        : "cv-profile__item-text cv-profile__item-text--default"
                    }
                  >
                    {seeker.gender || t("cvProfile.genderPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <IoLocationOutline />
                  <span
                    className={
                      seeker.address
                        ? "cv-profile__item-text"
                        : "cv-profile__item-text cv-profile__item-text--default"
                    }
                  >
                    {seeker.address || t("cvProfile.addressPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <RiGlobalLine />
                  <span
                    className={
                      seeker.personalLink
                        ? "cv-profile__item-text"
                        : "cv-profile__item-text cv-profile__item-text--default"
                    }
                  >
                    {seeker.personalLink || t("cvProfile.personalLinkPlaceholder")}
                  </span>
                </Col>
              </Row>
            </div>
          ) : (
            <div className="cv-profile__main-content">
              <Row gutter={[16, 16]}>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <MdOutlineMailOutline />
                  <span className="cv-profile__item-text cv-profile__item-text--default">
                    {t("cvProfile.emailPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <FiPhone />
                  <span className="cv-profile__item-text cv-profile__item-text--default">
                    {t("cvProfile.phonePlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <CiGift />
                  <span className="cv-profile__item-text cv-profile__item-text--default">
                    {t("cvProfile.dobPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item-text cv-profile__item-text--default"
                >
                  <LuUser />
                  <span
                    className={
                      `cv-profile__item-text` + seeker.gender
                        ? ""
                        : " cv-profile__item-text--default"
                    }
                  >
                    {t("cvProfile.genderPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <IoLocationOutline />
                  <span className="cv-profile__item-text cv-profile__item-text--default">
                    {t("cvProfile.addressPlaceholder")}
                  </span>
                </Col>
                <Col
                  xxl={12}
                  xl={12}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  className="cv-profile__item"
                >
                  <RiGlobalLine />
                  <span className="cv-profile__item-text cv-profile__item-text--default">
                    {t("cvProfile.personalLinkPlaceholder")}
                  </span>
                </Col>
              </Row>
            </div>
          )}
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.intro")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.introDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={outImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.education")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.educationDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={educationImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.experience")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.experienceDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={expImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.skills")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.skillsDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={skillImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.languages")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.languagesDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={outImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.projects")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.projectsDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={projImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.certificates")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.certificatesDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={certificateImg} alt="img" />
            </div>
          </div>
        </div>
        <div className="job-seeker-section job-seeker-section--custom">
          <div className="cv-profile__header cv-profile__header--custom">
            <h2>{t("cvProfile.awards")}</h2>
            <IoIosAddCircleOutline />
          </div>
          <div className="cv-profile__content-wrapper">
            <div className="cv-profile__description">
              {t("cvProfile.awardsDesc")}
            </div>
            <div className="cv-profile__img-wrapper">
              <img src={awardImg} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CVProfile;
