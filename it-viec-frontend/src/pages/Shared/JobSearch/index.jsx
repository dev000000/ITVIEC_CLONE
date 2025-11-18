import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import "./JobSearch.scss";
import { FiSearch } from "react-icons/fi";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getJobsSearch } from "../../../services/Shared";
import TopJobItem from "../../../components/TopJobItem";
import imgNoJob from "../../../assets/images/robby-oops.svg";
import { isObjectEmpty } from "../../../helpers/checkObject";
import { VIETNAM_CITIES } from "../../../constants";
function JobSearch({ keyword, city }) {
  if (!city) {
    const decodedKeyword = decodeURIComponent(keyword);
    const result = VIETNAM_CITIES.find(
      (item) => item.value === decodedKeyword
    );
    if (result) {
      city = decodedKeyword;
      keyword = "";
    }
  }
  if (!keyword) {
    keyword = "";
  }
  const [searchParams] = useSearchParams();
  const jobSelectedSlug = searchParams.get("job_selected");
  const [listJob, setListJob] = useState([]);
  const [jobSelected, setJobSelected] = useState({});
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
        const result = await getJobsSearch({ keyword: keyword, city: city });
        console.log(result);
        setListJob(result || []);
        if (result && result.length > 0) {
          const selectedJob = result.find(
            (job) => job.slug === jobSelectedSlug
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
  const handleFinish = (values) => {
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
  const handleFinishFail = (errorInfo) => {
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
                <Form.Item name="city" >
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
                    placeholder="Nhập từ khoá theo kỹ năng, chức vụ, công ty..."
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
                    Tìm kiếm
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
                jobs in Vietnam
              </h2>
              <div className="job-search__filter-wrap"></div>
              <div className="job-search__main-content">
                <Row gutter={[20, 20]}>
                  <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
                    <div className="job-search__list-job">
                      {listJob.length > 0 &&
                        listJob.map((job) =>
                          isMobile ? (
                            <TopJobItem
                              job={job}
                              type="home"
                              key={job.id}
                              companyInfoAdd={{
                                companyName: job.company.companyName,
                                slug: job.company.slug,
                              }}
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
                              <TopJobItem
                                job={job}
                                type="search"
                                companyInfoAdd={{
                                  companyName: job.company.companyName,
                                  slug: job.company.slug,
                                }}
                              />
                            </div>
                          )
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
                <h2>Xin lỗi! Việc làm bạn đang tìm kiếm không tồn tại.</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
