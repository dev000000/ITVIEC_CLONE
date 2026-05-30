import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import "./JobSearch.scss";
import { FiSearch } from "react-icons/fi";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getAllJobsApi } from "@/services_new/jobApi";
import imgNoJob from "@/assets/images/robby-oops.svg";
import { isObjectEmpty } from "@/helpers/checkObject";
import { VIETNAM_CITIES } from "@/constants";
import TopJobItemHome from "@/components/TopJobItemHome";
import { useTranslation } from "react-i18next";
import type { JobCardResponse } from "@/types/response.types";

interface JobSearchProps {
  keyword?: string;
  city?: string;
}

function JobSearch({ keyword, city }: JobSearchProps) {
  if (!city) {
    const decodedKeyword = decodeURIComponent(keyword || "");
    const result = VIETNAM_CITIES.find((item) => item.value === decodedKeyword);
    if (result) {
      city = decodedKeyword;
      keyword = "";
    }
  }
  if (!keyword) {
    keyword = "";
  }
  const { t } = useTranslation("shared");
  const [searchParams] = useSearchParams();
  const jobSelectedSlug = searchParams.get("job_selected");
  const [listJob, setListJob] = useState<JobCardResponse[]>([]);
  const [jobSelected, setJobSelected] = useState<JobCardResponse | Record<string, never>>({});
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 1199;
  const [form] = Form.useForm();
  form.setFieldsValue({
    keyword: keyword,
    city: city || VIETNAM_CITIES[0].value,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO(service-new-migration): Chua co service_new thay the cho legacy API `getJobsSearch`.
        // Legacy call: GET `jobs?status=Active&_expand=company&title_like=...&city_like=...`.
        // Muc dich: tim job active theo keyword/city cho trang JobSearch.
        // Tam thoi lay danh sach job active tu service_new roi filter client-side de khong phu thuoc `src/services`.
        const response = await getAllJobsApi(0, 100);
        const jobs = response.data.result.data ?? [];
        const normalizedKeyword = keyword.trim().toLowerCase();
        const normalizedCity = (city || "").trim().toLowerCase();
        const result = jobs.filter((job) => {
          const matchKeyword =
            !normalizedKeyword ||
            job.title.toLowerCase().includes(normalizedKeyword);
          const matchCity =
            !normalizedCity ||
            normalizedCity === "all" ||
            job.city?.cityName.toLowerCase().includes(normalizedCity);

          return matchKeyword && matchCity;
        });

        setListJob(result || []);
        if (result && result.length > 0) {
          const selectedJob = result.find(
            (job) => job.slug === jobSelectedSlug,
          );
          if (selectedJob) {
            setJobSelected(selectedJob);
          } else if (!jobSelectedSlug) {
            navigate(`?job_selected=${result[0].slug}`);
            setJobSelected(result[0]);
          }
        } else {
          setListJob([]);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        setListJob([]);
        setJobSelected({});
      }
    };
    fetchData();
  }, [keyword, city]);
  const handleFinish = (values: { keyword?: string; city?: string }) => {
    if (values.city === "all") {
      values.city = "";
    }
    if (values.city && values.keyword) {
      return navigate(`/viec-lam-it/${values.keyword}/${values.city}`);
    }
    if (values.city && !values.keyword) {
      return navigate(`/viec-lam-it/${values.city}`);
    }
    if (!values.city && values.keyword) {
      return navigate(`/viec-lam-it/${values.keyword}`);
    }
    return navigate(`/viec-lam-it`);
  };
  const handleFinishFail = (errorInfo: unknown) => {
    console.log("Form failed:", errorInfo);
  };
  return (
    <div className="job-search">
      <div className="job-search__section-search">
        <div className="search-form__container">
          <Form
            className="search-form"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFail}
            form={form}
          >
            <Row gutter={[{ xxl: 16, xl: 16, lg: 0, md: 0, sm: 0, xs: 0 }, 10]}>
              <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                <Form.Item name="city">
                  <Select
                    showSearch
                    optionFilterProp="label"
                    size="large"
                    options={VIETNAM_CITIES}
                    value={city}
                  />
                </Form.Item>
              </Col>
              <Col
                xxl={14}
                xl={14}
                lg={{ flex: "auto" }}
                md={{ flex: "auto" }}
                sm={{ flex: "auto" }}
                xs={{ flex: "auto" }}
              >
                <Form.Item name="keyword">
                  <Input
                    placeholder={t("jobSearch.placeholder")}
                    allowClear
                    size="large"
                    value={keyword}
                  />
                </Form.Item>
              </Col>
              <Col
                xxl={5}
                xl={5}
                lg={{ flex: "56px" }}
                md={{ flex: "56px" }}
                sm={{ flex: "56px" }}
                xs={{ flex: "56px" }}
              >
                <Form.Item>
                  <Button
                    icon={<FiSearch />}
                    type="primary"
                    htmlType="submit"
                    size="large"
                  >
                    {t("jobSearch.searchButton")}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div className="job-search__section-content">
        <div className="container">
          {/* <div className="job-search__company-spotlight">
            <div className="job-search__img-wrap">
              <img src={img} alt="background_company" />
            </div>
            <div className="job-search__content-wrap">
              <div className="job-search__logo-wrap">
                <img src={logo} alt="logo_company" />
              </div>
              <div className="job-search__content">
                <h4 className="job-search__name">Thoughtworks Vietnam</h4>
                <div className="job-search__city">
                  <CiLocationOn />
                  <span>TP Hồ Chí Minh</span>
                </div>
                <p className="job-search__description">
                  A global tech consultancy that integrates strategy, design &
                  engineering to drive digital innovation
                </p>
                <Link to="#" className="job-search__link">
                  Xem công ty <MdOutlineKeyboardArrowRight />
                </Link>
              </div>
            </div>
          </div> */}
          {listJob.length > 0 ? (
            <>
              <h2 className="job-search__total-jobs">
                {listJob.length > 0 ? listJob.length : 0} <span>{keyword}</span>{" "}
                {t("jobSearch.jobsInVietnam")}
              </h2>
              <div className="job-search__filter-wrap"></div>
              <div className="job-search__main-content">
                <Row gutter={[20, 20]}>
                  <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
                    <div className="job-search__list-job">
                      {listJob.length > 0 &&
                        listJob.map((job) =>
                          isMobile ? (
                            <TopJobItemHome
                              job={job}
                              key={job.id}
                            />
                          ) : (
                            <div
                              className={
                                jobSelected.slug == job.slug
                                  ? "job-search__item job-search__item--active"
                                  : "job-search__item"
                              }
                              key={job.id}
                              onClick={() => {
                                navigate(`?job_selected=${job.slug}`);
                                setJobSelected(job);
                              }}
                            >
                              <TopJobItemHome
                                job={job}
                              />
                            </div>
                          ),
                        )}
                    </div>
                  </Col>
                  <Col xxl={14} xl={14} lg={24} md={24} sm={24} xs={24}>
                    <div className="job-search__detail-job">
                      {isObjectEmpty(jobSelected) ? (
                        <div></div>
                      ) : (
                        <Outlet
                          context={{
                            jobSelected: jobSelected,
                          }}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <>
              <div className="job-search__no-results">
                <div className="job-search__noImg-wrap">
                  <div className="job-search__noImg">
                    <img src={imgNoJob} alt="No job found" />
                  </div>
                </div>
                <h2>{t("jobSearch.noResults")}</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
