import { Col, Row } from "antd";
import CardCompanyHead from "@/components/CardCompanyDetail/CardCompanyHead";
import "./EmployerDetail.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopJobItemHome from "@/components/TopJobItemHome";
import { getCompanyBySlugApi } from "@/services/companyApi";
import type { CompanyDetailResponse } from "@/types/response.types";
import { useTranslation } from "react-i18next";

const companyInforDefault: CompanyDetailResponse = {

  "id": "a1b2c3d4-e5f6-11ee-c0mp-000000000002",
  "companyName": "Scandinavian Software Park",
  "slug": "scandinavian-software-park",
  "description": "1",
  "website": "http://example.com",
  "logoUrl": "http://example.com/logo.png",
  "address": "Quận Đống Đa, Hà Nội",
  "companyModel": "PRODUCT",
  "industry": "Sản Phẩm Phần Mềm và Dịch Vụ Web",
  "companySize": "SIZE_151_300",
  "country": {
    "id": 19,
    "countryName": "Sweden"
  },
  "workingHours": "MON_FRI",
  "overtimePolicy": "NO_OVERTIME",
  "companyIntroduction": "<div class=\"company-introduction\"><div class=\"paragraph ipt-4 text-break text-contain-hyperlink\">Scandinavian Software Park is a tech hub for Scandinavia’s market leading SaaS companies.<p><span><i>Are you a passionate software developer looking to grow your career in the exciting world of SaaS? Look no further than our Scandinavian companies, leading the market with their innovative and proven products poised for global success. </i></span></p><p><span><i>Join our team and benefit not only from a great company culture, but also from the support of Monterro, the largest private equity tech fund in the Nordics, as we work together to achieve our ambitious goals. With a work-life balance and a Scandinavian culture that values your individuality, you'll collaborate with experienced software engineers from around the world to make your mark on the industry. </i></span><br><br><span><i>Don't miss out on the chance to discover your full potential and help us become global players.</i></span></p></div></div>",
  "ourExpertise": "<div class=\"our-expertise\"><div class=\"paragraph text-break text-contain-hyperlink\"><p>At Scandinavian Software Park, we leverage the latest tech stack to create innovative solutions for a wide range of industries worldwide, bringing together skilled software engineers from Scandinavia's top SaaS companies.</p></div></div>",
  "whyWorkHere": "<div class=\"why-work-here\"><h2>Tại sao bạn sẽ yêu thích làm việc tại đây?</h2><div class=\"paragraph text-break\"><ul><li class=\"ipy-1 fw-700\">Global growth with experienced engineers</li><li class=\"ipy-1 fw-700\">Innovative, balanced, creative culture</li><li class=\"ipy-1 fw-700\">Competitive salary, benefits, training</li></ul></div><div class=\"paragraph text-break text-contain-hyperlink\"><p><strong>What will you get?</strong></p><p>Join our innovative and market-leading Scandinavian SaaS company and accelerate your growth alongside experienced software engineers from around the world. We value creativity, innovation, and work-life balance in our Scandinavian work culture, and offer a competitive salary with 100% official salary during the probation period, annual reviews, and 13th month salary.</p><p>We prioritize the well-being of our employees with premium healthcare and accident insurance, as well as a wellness package to help you stay healthy and wealthy. You'll also have the chance to participate in exciting company outings, team-building activities, and on-site training opportunities in the Nordic region.</p><p>Work in a modern and supportive environment where your individuality is valued, and collaborate with a talented team on a mission to become global players in the industry.</p></div></div>",
  "createdAt": "2025-05-05T19:17:00",
  "updatedAt": "2026-05-12T14:41:34",
  "companySkills": [
    {
      "id": 104,
      "skillName": "System Admin"
    },
    {
      "id": 5,
      "skillName": "Angular"
    },
    {
      "id": 79,
      "skillName": "Product Owner"
    },
    {
      "id": 81,
      "skillName": "Python"
    },
    {
      "id": 73,
      "skillName": "OutSystems"
    },
    {
      "id": 65,
      "skillName": "Networking"
    }
  ],
  "jobs": [
    {
      "id": 6,
      "title": "Viedoc - Senior Fullstack .NET Developer (C#,SQL,Azure)",
      "slug": "viedoc-senior-fullstack-net-developer-c-sql-azure-scandinavian-software-park-6",
      "city": {
        "id": 24,
        "cityName": "Hà Nội"
      },
      "salary": "You'll love it",
      "jobType": "ONSITE",
      "postedAt": "2025-04-29T07:00:00",
      "skills": [
        {
          "id": 64,
          "skillName": ".NET"
        },
        {
          "id": 102,
          "skillName": "SQL"
        },
        {
          "id": 10,
          "skillName": "Azure"
        }
      ],
      "company": {
        "id": "a1b2c3d4-e5f6-11ee-c0mp-000000000002",
        "companyName": "Scandinavian Software Park",
        "slug": "scandinavian-software-park",
        "logoUrl": "http://example.com/logo.png"
      }
    },
    {
      "id": 7,
      "title": "Trapets - Fullstack .NET Developer (.NET, SQL, JS)",
      "slug": "trapets-fullstack-net-developer-net-sql-js-scandinavian-software-park-7",
      "city": {
        "id": 24,
        "cityName": "Hà Nội"
      },
      "salary": "You'll love it",
      "jobType": "ONSITE",
      "postedAt": "2025-04-29T07:00:00",
      "skills": [
        {
          "id": 64,
          "skillName": ".NET"
        },
        {
          "id": 102,
          "skillName": "SQL"
        },
        {
          "id": 49,
          "skillName": "JavaScript"
        }
      ],
      "company": {
        "id": "a1b2c3d4-e5f6-11ee-c0mp-000000000002",
        "companyName": "Scandinavian Software Park",
        "slug": "scandinavian-software-park",
        "logoUrl": "http://example.com/logo.png"
      }
    },
    {
      "id": 8,
      "title": "Milient - QA Automation Engineer (Python, JS, Java)",
      "slug": "milient-qa-automation-engineer-python-js-java-scandinavian-software-park-8",
      "city": {
        "id": 24,
        "cityName": "Hà Nội"
      },
      "salary": "1,500 - 2,500 USD",
      "jobType": "ONSITE",
      "postedAt": "2025-04-28T07:00:00",
      "skills": [
        {
          "id": 8,
          "skillName": "Automation Test"
        },
        {
          "id": 81,
          "skillName": "Python"
        },
        {
          "id": 48,
          "skillName": "Java"
        }
      ],
      "company": {
        "id": "a1b2c3d4-e5f6-11ee-c0mp-000000000002",
        "companyName": "Scandinavian Software Park",
        "slug": "scandinavian-software-park",
        "logoUrl": "http://example.com/logo.png"
      }
    }
  ]

}
const EmployerDetail = () => {
  const [companyInfor, setCompanyInfor] = useState<CompanyDetailResponse>(companyInforDefault);
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation("shared");

  useEffect(() => {
    const getCompanyandJobs = async () => {
      try {
        const companyBySlug = await getCompanyBySlugApi(slug!);
        setCompanyInfor(companyBySlug.data.result);

      } catch (error) {
        console.error("Error fetching company and jobs:", error);
      }
    };
    getCompanyandJobs();
  }, [slug]);
  return (
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
              <div className="employer-detail__content-tabs">
                <Outlet context={{ companyInfor }} />
              </div>
            </div>
          </Col>
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
