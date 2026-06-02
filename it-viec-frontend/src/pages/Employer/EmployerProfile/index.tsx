// Trang hồ sơ công ty của Employer (Company Profile)
// Hiển thị thông tin công ty với 3 tabs: About / Reviews / Articles
// Cột phải hiển thị danh sách job đang mở; Employer có thể chỉnh sửa thông tin công ty qua modal
import { Button, Col, Form, Image, Input, Popconfirm, Row, Select, Upload } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import EmployerStart from "@/components/EmployerStart";
import { useTranslation } from "react-i18next";
import CardCompanyHead from "@/components/CardCompanyDetail/CardCompanyHead";
import { NavLink, Outlet } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import ButtonAction from "@/components/ButtonAction";
import "./EmployerProfile.scss";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { deleteMyCompanyLogoApi, updateMyCompanyApi, uploadMyCompanyLogoApi } from "@/services/companyApi";
import { getAllSkillsApi } from "@/services/skillApi";
import { getAllCountriesApi } from "@/services/countryApi";
import Swal from "sweetalert2";
import { isObjectEmpty } from "@/helpers/checkObject";
import type { CountryResponse, SkillResponse } from "@/types/response.types";
import TopJobItemHome from "@/components/TopJobItemHome";
import { useCompanyStore } from "@/store/companyStore";
import {
  getCompanyModelOptions,
  getCompanySizeOptions,
  getWorkingHoursOptions,
  getOvertimePolicyOptions,
} from "@/constants";
import type { CompanyUpdateRequest } from "@/types/request.types";
import { getApiErrorMessage } from "@/utils/apiError";

interface CompanyFormValues extends Omit<CompanyUpdateRequest, "country" | "companySkills"> {
  country: number;
  companySkills: number[];
}


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-45%, -50%)",
    padding: 0,
    overflow: "hidden",
  },
};

const MockData = {
  reviewCount: 80,
  articleCount: 4,
}

const EmployerProfile = () => {
  const { t } = useTranslation();
  // Trạng thái mở/đóng modal form chỉnh sửa thông tin công ty
  const [form] = Form.useForm<CompanyFormValues>();
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // Thông tin công ty đầy đủ từ Zustand companyStore
  const companyInfor = useCompanyStore();

  // Hàm cập nhật toàn bộ thông tin công ty trong Zustand store
  const setCompanyFullInfo = useCompanyStore((state) => state.setCompanyFullInfo);
  const updateCompanyField = useCompanyStore((state) => state.updateCompanyField);

  // Danh sách skills và countries từ API, dùng cho Select dropdown trong form
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [countries, setCountries] = useState<CountryResponse[]>([]);

  // Logo pending: file mới chờ upload, flag xóa, và preview URL tạm thời
  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null);
  const [pendingLogoDelete, setPendingLogoDelete] = useState<boolean>(false);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  // URL logo hiển thị trong preview: ưu tiên file mới chọn → nếu đánh dấu xóa thì dùng cỗi rỗng → logo hiện tại
  const displayLogoUrl = pendingLogoFile
    ? logoPreviewUrl
    : pendingLogoDelete
      ? ""
      : (companyInfor.logoUrl ?? null);

  const handleLogoSelect = (file: File) => {
    setPendingLogoFile(file);
    setPendingLogoDelete(false);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  const handleLogoMarkDelete = () => {
    setPendingLogoFile(null);
    setPendingLogoDelete(true);
    if (logoPreviewUrl) {
      URL.revokeObjectURL(logoPreviewUrl);
      setLogoPreviewUrl(null);
    }
  };

  const resetPendingLogo = () => {
    if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    setPendingLogoFile(null);
    setPendingLogoDelete(false);
    setLogoPreviewUrl(null);
  };

  const skillList = skills.map((skill) => {
    return { value: skill.id, label: <span>{skill.skillName}</span> };
  });

  const countryOptions = countries.map((country) => {
    return { value: country.id, label: <span>{country.countryName}</span> };
  });

  // Kích hoạt modal chỉnh sửa khi người dùng nhấn nút Edit
  const handleEdit = () => {
    openModal();
  };
  // Mở modal và điền sẵn thông tin công ty hiện tại vào tất cả các trường form
  const openModal = () => {
    setIsOpen(true);
    form.setFieldsValue({
      companyName: companyInfor.companyName,
      description: companyInfor.description,
      address: companyInfor.address,
      companyModel: companyInfor.companyModel,
      industry: companyInfor.industry,
      companySize: companyInfor.companySize,
      country: companyInfor.country?.id,
      workingHours: companyInfor.workingHours,
      overtimePolicy: companyInfor.overtimePolicy,
      companySkills: companyInfor.companySkills?.map((s) => s.id),
      companyIntroduction: companyInfor.companyIntroduction,
      ourExpertise: companyInfor.ourExpertise,
      whyWorkHere: companyInfor.whyWorkHere,
    });
  };
  const closeModal = () => {
    resetPendingLogo();
    setIsOpen(false);
  };
  // Xử lý submit form cập nhật thông tin công ty
  // 1. Nếu có file logo mới → upload trước
  // 2. Nếu đánh dấu xóa logo → xóa trước
  // 3. Gọi updateMyCompany với toàn bộ thông tin
  const onFinish = async (values: CompanyFormValues) => {
    try {
      // Xử lý logo pending trước khi update
      if (pendingLogoFile) {
        await uploadMyCompanyLogoApi(pendingLogoFile);

      } else if (pendingLogoDelete) {
        await deleteMyCompanyLogoApi();
      }

      const fullCountry = countries.find((c) => c.id === values.country);
      const fullSkills = (values.companySkills ?? []).map((id) => skills.find((s) => s.id === id)).filter((s): s is SkillResponse => s !== undefined);
      const requestData: CompanyUpdateRequest = {
        ...values,
        country: fullCountry!,
        companySkills: fullSkills,
      };
      const { data: companyData } = await updateMyCompanyApi(requestData);
      const company = companyData.result;
      if (!isObjectEmpty(company)) {
        Swal.fire({
          title: t("employer:profile.notifications.updateSuccess"),
          icon: "success",
          draggable: true,
        });
        setCompanyFullInfo(company);
        // Bust browser cache nếu có thao tác logo: URL logo không đổi nên browser sẽ dùng cache cũ
        // → append timestamp để force React re-render và browser fetch lại ảnh mới
        if (pendingLogoFile && company.logoUrl) {
          updateCompanyField("logoUrl", `${company.logoUrl}?t=${Date.now()}`);
        } else if (pendingLogoDelete) {
          updateCompanyField("logoUrl", "");
        }
        resetPendingLogo();
        closeModal();
      } else {
        Swal.fire({
          icon: "error",
          title: t("employer:profile.notifications.oops"),
          text: t("employer:profile.notifications.updateFail"),
        });
      }
    } catch (error) {
      console.error("Loi cap nhat update company", error);
      Swal.fire({
        icon: "error",
        title: t("employer:profile.notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    }
  };
  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  // Fetch song song danh sách skills và countries khi mount, cần thiết cho Select dropdown trong modal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, countriesResponse] = await Promise.all([
          getAllSkillsApi(),
          getAllCountriesApi(),
        ]);
        setSkills(skillsResponse.data.result || []);
        setCountries(countriesResponse.data.result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: t("employer:profile.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="employer-profile">
        {/* Phần header với title và nút Edit */}
        <EmployerStart content={t("employer:profile.title")} type="search" />
        <div className="employer-job__button-wrap">
          <ButtonAction
            text={t("employer:profile.edit")}
            icon={<TbEdit />}
            handle={handleEdit}
          ></ButtonAction>
        </div>
        {/*  */}
        <div className="employer-profile__preview">
          {/* Modal edit company infor */}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="job-form__title-wrap">
              <div className="job-form__title">{t("employer:profile.editTitle")}</div>
              <div className="job-form__close-button" onClick={closeModal}>
                <IoClose />
              </div>
            </div>
            <div className="job-form">
              <Form
                form={form}
                name="basic"
                style={{
                  padding: "20px",
                  width: "600px",
                  maxWidth: "88vw",
                  margin: "0 auto",
                  maxHeight: "70vh",
                  overflow: "y",
                }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <Form.Item label={t("employer:profile.form.logo")}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {(displayLogoUrl !== null) && (
                          <Image
                            width={72}
                            height={72}
                            src={displayLogoUrl ?? ""}
                            style={{ objectFit: "contain", border: "1px solid #d9d9d9", borderRadius: 6 }}
                          />
                        )}
                        <Upload
                          showUploadList={false}
                          accept="image/*"
                          beforeUpload={(file) => {
                            handleLogoSelect(file);
                            return false;
                          }}
                        >
                          <Button icon={<UploadOutlined />}>
                            {displayLogoUrl
                              ? t("employer:profile.form.changeLogo")
                              : t("employer:profile.form.uploadLogo")}
                          </Button>
                        </Upload>
                        {displayLogoUrl && (
                          <Popconfirm
                            title={t("employer:profile.form.confirmDeleteLogo")}
                            onConfirm={handleLogoMarkDelete}
                            okText={t("employer:profile.form.confirmDeleteLogoOk")}
                            cancelText={t("employer:profile.form.confirmDeleteLogoCancel")}
                            okButtonProps={{ danger: true }}
                          >
                            <Button danger icon={<DeleteOutlined />}>
                              {t("employer:profile.form.deleteLogo")}
                            </Button>
                          </Popconfirm>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={t("employer:profile.form.companyName")} name="companyName">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={t("employer:profile.form.description")} name="description">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label={t("employer:profile.form.address")} name="address">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t("employer:profile.form.companyModel")} name="companyModel">
                      <Select
                        placeholder="Please select company model"
                        options={getCompanyModelOptions(t)}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t("employer:profile.form.industry")} name="industry">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t("employer:profile.form.companySize")} name="companySize">
                      <Select
                        placeholder="Please select company size"
                        options={getCompanySizeOptions(t)}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t("employer:profile.form.country")} name="country">
                      <Select
                        placeholder="Please select country"
                        options={countryOptions}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={t("employer:profile.form.workingHours")} name="workingHours">
                      <Select
                        placeholder="Please select working hours"
                        options={getWorkingHoursOptions(t)}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={t("employer:profile.form.overtimePolicy")}
                      name="overtimePolicy"
                    >
                      <Select
                        placeholder="Please select overtime policy"
                        options={getOvertimePolicyOptions(t)}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="companySkills"
                      label={t("employer:profile.form.skills")}
                      rules={[
                        {
                          required: true,
                          message: "Please select required skills",
                          type: "array",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select required skills"
                        options={skillList}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="companyIntroduction"
                      label={t("employer:profile.form.companyIntroduction")}
                    >
                      {/* @ts-expect-error - value/onChange injected by Form.Item */}
                      <SimpleEditor />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="ourExpertise"
                      label={t("employer:profile.form.ourExpertise")}
                    >
                      {/* @ts-expect-error - value/onChange injected by Form.Item */}
                      <SimpleEditor />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="whyWorkHere"
                      label={t("employer:profile.form.whyWorkHere")}
                    >
                      {/* @ts-expect-error - value/onChange injected by Form.Item */}
                      <SimpleEditor />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item label={null}>
                      <Button type="primary" htmlType="submit">
                        {t("employer:profile.form.submit")}
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </Modal>
          {/* Phần xem review hiển thị */}
          <div className="employer-detail">
            <CardCompanyHead companyInfor={companyInfor} />
            <div className="container">
              <Row>
                <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
                  <div className="employer-detail__infor">
                    <ul className="employer-detail__tabs">
                      <li className="employer-detail__item-wrapper">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "employer-detail__item employer-detail__item--active"
                              : "employer-detail__item"
                          }
                          to={`/customer/profile`}
                          end
                        >
                          <span className="employer-detail__text">
                            {t("employer:profile.tabs.about")}
                          </span>
                        </NavLink>
                      </li>
                      <li className="employer-detail__item-wrapper">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "employer-detail__item employer-detail__item--active"
                              : "employer-detail__item"
                          }
                          to={`/customer/profile/danh-gia`}
                        >
                          <span className="employer-detail__text">
                            {t("employer:profile.tabs.reviews")}
                          </span>
                          <span className="employer-detail__count">{MockData.reviewCount}</span>
                        </NavLink>
                      </li>
                      <li className="employer-detail__item-wrapper">
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "employer-detail__item employer-detail__item--active"
                              : "employer-detail__item"
                          }
                          to={`/customer/profile/bai-viet`}
                        >
                          <span className="employer-detail__text">
                            {t("employer:profile.tabs.articles")}
                          </span>
                          <span className="employer-detail__count">{MockData.articleCount}</span>
                        </NavLink>
                      </li>
                    </ul>
                    <div className="employer-detail__content-tabs">
                      <Outlet context={{ companyInfor }} />
                    </div>
                  </div>
                </Col>
                <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
                  <div className="employer-detail__jobs">
                    <h2>
                      {t("employer:profile.openJobs", { count: companyInfor.jobs.length || 0 })}
                    </h2>
                    <div className="employer-detail__job-wrap">
                      {companyInfor.jobs.map((job) => (
                        <div className="employer-detail__job" key={job.id}>
                          <TopJobItemHome
                            job={job}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmployerProfile;
