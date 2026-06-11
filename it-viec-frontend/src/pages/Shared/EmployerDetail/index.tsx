import { Col, Row } from "antd";
import CardCompanyHead from "@/components/CardCompanyDetail/CardCompanyHead";
import "./EmployerDetail.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopJobItemHome from "@/components/TopJobItemHome";
import { getCompanyBySlugApi } from "@/services/companyApi";
import type { CompanyDetailResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";
// 1.5 Trang hiển thị chi tiết nhà tuyển dụng
const EmployerDetail = () => {
  // State để lưu thông tin chi tiết công ty 
  const [companyInfor, setCompanyInfor] = useState<CompanyDetailResponse>(null);
  // Lấy slug từ URL để gọi API lấy thông tin công ty
  const { slug } = useParams<{ slug: string }>();
  // State để quản lý trạng thái loading khi gọi API
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { t } = useTranslation("shared");

  useEffect(() => {
    const getCompanyandJobs = async () => {
      try {
        const companyBySlug = await getCompanyBySlugApi(slug!);
        console.log("Company by slug response:", companyBySlug);
        setCompanyInfor(companyBySlug.data.result);

      } catch (error) {
        console.error("Error fetching company and jobs:", error);
        // Nếu không tìm thấy công ty từ URL, điều hướng về trang chủ
        navigate('/')
      } finally {
        setIsLoading(false);
      }
    };
    getCompanyandJobs();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="employer-detail">
      {/* Hiển thị thông tin tổng quan về công ty */}
      <CardCompanyHead companyInfor={companyInfor} />
      {/* Hiển thị phần body của công ty */}
      <div className="container">
        <Row>
          {/* Hiển thị thông tin chi tiết của công ty đó*/}
          <Col xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            <div className="employer-detail__infor">
              <ul className="employer-detail__tabs">
                {/* Hiển thị các tab thông tin chi tiết của công ty */}
                <li className="employer-detail__item-wrapper">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "employer-detail__item employer-detail__item--active"
                        : "employer-detail__item"
                    }
                    to={`/nha-tuyen-dung/${slug}`}
                    end
                  >
                    <span className="employer-detail__text">{t("employerDetail.intro")}</span>
                  </NavLink>
                </li>
                <li className="employer-detail__item-wrapper">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "employer-detail__item employer-detail__item--active"
                        : "employer-detail__item"
                    }
                    to={`/nha-tuyen-dung/${slug}/danh-gia`}
                  >
                    <span className="employer-detail__text">{t("employerDetail.review")}</span>
                    <span className="employer-detail__count">80</span>
                  </NavLink>
                </li>
                <li className="employer-detail__item-wrapper">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "employer-detail__item employer-detail__item--active"
                        : "employer-detail__item"
                    }
                    to={`/nha-tuyen-dung/${slug}/bai-viet`}
                  >
                    <span className="employer-detail__text">{t("employerDetail.blog")}</span>
                    <span className="employer-detail__count">4</span>
                  </NavLink>
                </li>
              </ul>
              {/* Hiển thị nội dung của tab được chọn */}
              <div className="employer-detail__content-tabs">
                <Outlet context={{ companyInfor }} />
              </div>
            </div>
          </Col>
          {/* Hiển thị danh sách công việc của công ty đó */}
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <div className="employer-detail__jobs">
              <h2>{t("employerDetail.jobsHiring", { count: companyInfor?.jobs.length || 0 })}</h2>
              <div className="employer-detail__job-wrap">
                {companyInfor?.jobs.map((job) => (
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
  );
}

export default EmployerDetail;
