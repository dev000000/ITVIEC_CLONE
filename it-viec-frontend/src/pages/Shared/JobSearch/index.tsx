import { useEffect, useMemo, useState, type FC } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import "./JobSearch.scss";
import { FiSearch } from "react-icons/fi";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import imgNoJob from "@/assets/images/robby-oops.svg";
import TopJobItemHome from "@/components/TopJobItemHome";
import { useTranslation } from "react-i18next";
import SearchKeywordInput from "@/components/SearchKeywordInput";
import type { ExperienceLevel, JobType } from "@/types/common.types";
import type {
  CityResponse,
  JobCardResponse,
  PopularTagResponse,
} from "@/types/response.types";
import {
  buildJobSearchPath,
} from "@/utils/jobSearch";
import { getCityLabel, getExperienceLevelOptions, getJobTypeOptions } from "@/constants";
import { getAllCitiesApi } from "@/services/cityApi";
import { getPopularTagsApi } from "@/services/tagApi";
import { getApiErrorMessage } from "@/utils/apiError";
import Swal from "sweetalert2";
import { searchJobsApi } from "@/services/jobApi";
import SalaryRangeFilter, {
  type SalaryRangeFilterValue,
} from "@/components/SalaryRangeFilter";

// Định nghĩa các interface cho props và state của component JobSearch
interface JobSearchProps {
  keywordSegment?: string;
  citySegment?: string;
}

// Định nghĩa interface cho giá trị của form tìm kiếm
interface SearchFormValues {
  city?: string;
  keyword?: string;
}

// Định nghĩa interface cho các filter khi tìm kiếm việc làm
interface SearchFilters extends SalaryRangeFilterValue {
  experienceLevel?: ExperienceLevel;
  jobType?: JobType;
}

const defaultFilters: SearchFilters = {};
// 1.4.1 Trang tìm kiếm việc làm sẽ có các thành phần sau:
// - Search form: bao gồm input tìm kiếm theo từ khóa và select để chọn thành phố
// - Job list: hiển thị danh sách việc làm dựa trên từ khóa và thành phố đã chọn, có phân trang nếu cần
// - Job detail: khi click vào một việc làm trong danh sách thì sẽ hiển thị chi tiết việc làm đó ở phần bên phải ( chỉ hiển thị trên desktop, mobile sẽ không có phần này )
// - Filter: có thể filter thêm theo kinh nghiệm và loại hình công việc ( full-time, part-time, internship )
const JobSearch: FC<JobSearchProps> = ({ keywordSegment, citySegment }) => {
  const { t } = useTranslation("shared");
  const navigate = useNavigate();
  // State để kiểm tra xem có đang ở trên thiết bị mobile 
  const isMobile = window.innerWidth <= 1199;

  // Lấy param job_selected từ URL để xác định việc làm nào đang được chọn để hiển thị chi tiết
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJobSlug = searchParams.get("job_selected");

  // State để lưu danh sách việc làm lấy được từ API
  const [listJob, setListJob] = useState<JobCardResponse[]>([]);

  // State để lưu tổng số việc làm tìm được ( dùng để hiển thị ở phần heading )
  const [totalJobs, setTotalJobs] = useState(0);

  // State để lưu việc làm đang được chọn để hiển thị chi tiết
  const [jobSelected, setJobSelected] = useState<JobCardResponse | null>(null);

  // State để lưu các filter được chọn ( kinh nghiệm, loại hình công việc )
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  // State để kiểm tra xem đang trong quá trình load dữ liệu việc làm hay không
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);

  // State để lưu danh sách thành phố và tag phổ biến để hiển thị trong form tìm kiếm
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [popularTags, setPopularTags] = useState<PopularTagResponse[]>([]);

  // State để lưu form tìm kiếm
  const [form] = Form.useForm<SearchFormValues>();

  // Lấy danh sách kiểu công việc và cấp độ kinh nghiệm để hiển thị select chọn trong filter
  const jobTypeOptions = useMemo(() => getJobTypeOptions(t), [t]);
  const experienceLevelOptions = useMemo(
    () => getExperienceLevelOptions(t),
    [t],
  );

  // Fill dữ liệu vào form tìm kiếm 
  useEffect(() => {
    form.setFieldsValue({
      keyword: keywordSegment || "",
      city: citySegment || "",
    });
  }, [form, keywordSegment, citySegment]);

  // Fill dữ liệu default filters khi có sự thay đổi của keywordSegment hoặc citySegment 
  useEffect(() => {
    setFilters(defaultFilters);
  }, [keywordSegment, citySegment]);

  // Hàm xử lý khi component được mount lên sẽ gọi API để lấy danh sách thành phố và tag phổ biến để hiển thị trong form tìm kiếm
  useEffect(() => {
    const loadMetadata = async () => {
      setIsLoadingMetadata(true);
      try {
        const [citiesResponse, tagsResponse] = await Promise.all([
          getAllCitiesApi(),
          getPopularTagsApi(),
        ]);

        setCities(citiesResponse.data.result ?? []);
        setPopularTags(tagsResponse.data.result ?? []);
      } catch (error) {
        console.error("Error loading search metadata:", error);
      } finally {
        setIsLoadingMetadata(false);
      }

    };
    loadMetadata();
  }, []);

  // Hàm xử lý khi component được mount hoặc filter thay đổi => call API để lấy danh sách việc làm dựa trên từ khóa, thành phố và filter đã chọn
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        if(isLoadingMetadata) return;
        const response = await searchJobsApi({
          keyword: keywordSegment || undefined,
          cityId: citySegment ? cities.find((city) => city.slug === citySegment)?.id : undefined,
          experienceLevel: filters.experienceLevel,
          jobType: filters.jobType,
          salaryMin: filters.salaryMin,
          salaryMax: filters.salaryMax,
          salaryCurrency: filters.salaryCurrency,
        });

        setListJob(response.data.result?.data ?? []);
        console.log("Fetched jobs:", response.data.result?.data);
        setTotalJobs(response.data.result?.totalElements ?? 0);

        // Nếu có slug của việc làm được chọn trong URL thì sẽ tìm việc làm đó trong danh sách việc làm nhận được từ API để hiển thị chi tiết
        if (selectedJobSlug) {
          const selectedJob = response.data.result?.data?.find(
            (job) => job.slug === selectedJobSlug,
          );
          setJobSelected(selectedJob);
        } else {
          setJobSelected(response.data.result?.data?.[0]);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("jobSearch.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [filters, t, keywordSegment, citySegment, isLoadingMetadata, cities]);
  
  // Hàm xử lý khi submit form tìm kiếm
  const handleFinish = (values: SearchFormValues) => {
    setFilters(defaultFilters);
    navigate(
      buildJobSearchPath({
        keyword: values.keyword,
        city: values.city,
      }),
    );
  };

  // Hàm xử lý khi người dùng click vào một tag gợi ý
  const handleTagNavigation = (tag: PopularTagResponse) => {
    switch (tag.category) {
      // Nếu ấn tag liên quan đến công ty thì sẽ điều hướng đến trang chi tiết công ty đó
      case "Company":
        navigate(`/nha-tuyen-dung/${tag.companySlug}`);
        return;
      // Nếu ấn tag lien quan đến kỹ năng thì sẽ điều hướng đến trang tìm kiếm việc làm với từ khóa là tên tag đó
      case "Skill and Expertise":
        navigate(
          buildJobSearchPath({
            keyword: tag.name,
          }),
        );
        return;
      default:
        break;
    }
  };

  // Hàm xử lý khi click vào một việc làm trong danh sách để hiển thị chi tiết
  const handleSelectJob = (job: JobCardResponse) => {
    setJobSelected(job);
    setSearchParams({ job_selected: job.slug });
  };

  return (
    <div className="job-search">
      {/* Form tìm kiếm */}
      <div className="job-search__section-search">
        <div className="search-form__container">
          <Form
            className="search-form"
            onFinish={handleFinish}
            form={form}
          >
            <Row gutter={[{ xxl: 16, xl: 16, lg: 0, md: 0, sm: 0, xs: 0 }, 10]}>
              {/* Ô select thành phố */}
              <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                <Form.Item name="city">
                  <Select
                    showSearch
                    optionFilterProp="label"
                    size="large"
                    options={[
                      { value: "", label: t("jobSearch.allCities") },
                      ...cities.map((city) => ({
                        value: city.slug,
                        label: getCityLabel(city.cityName, t),
                      })),
                    ]}
                  />
                </Form.Item>
              </Col>
              {/* Ô input từ khóa */}
              <Col
                xxl={14}
                xl={14}
                lg={{ flex: "auto" }}
                md={{ flex: "auto" }}
                sm={{ flex: "auto" }}
                xs={{ flex: "auto" }}
              >
                <Form.Item name="keyword">
                  <SearchKeywordInput
                    placeholder={t("jobSearch.placeholder")}
                    popularTags={popularTags}
                    onTagSelect={handleTagNavigation}
                    onSubmit={() => form.submit()}
                  />
                </Form.Item>
              </Col>
              {/* Nút tìm kiếm */}
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
      {/* Hiển thị danh sách việc làm, công việc đang được chọn, filter lọc công việc */}
      <div className="job-search__section-content">
        <div className="container">
          {isLoading ? (
            <div className="job-search__state job-search__state--loading">
              {t("jobSearch.loading")}
            </div>
          ) : listJob.length > 0 ? (
            <>
              {/* Hiển thị tổng số việc làm */}
              <h2 className="job-search__total-jobs">
                {totalJobs} <span></span> {t("jobSearch.jobsInVietnam")}
              </h2>
              <div className="job-search__filter-wrap">
                <SalaryRangeFilter
                  value={filters}
                  onChange={(salaryFilter) =>
                    setFilters((prev) => ({
                      ...prev,
                      ...salaryFilter,
                    }))
                  }
                />
                <Select
                  allowClear
                  className="job-search__filter"
                  placeholder={t("jobSearch.filters.experienceLevel")}
                  options={experienceLevelOptions}
                  value={filters.experienceLevel}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      experienceLevel: value,
                    }))
                  }
                />
                <Select
                  allowClear
                  className="job-search__filter"
                  placeholder={t("jobSearch.filters.jobType")}
                  options={jobTypeOptions}
                  value={filters.jobType}
                  onChange={(value) =>
                    setFilters((prev) => ({
                      ...prev,
                      jobType: value,
                    }))
                  }
                />
              </div>
              {/* Hiển thị danh sách việc làm + việc làm đang được chọn */}
              <div className="job-search__main-content">
                <Row gutter={[20, 20]}>
                  {/* Hiển thị danh sách việc làm bên trái */}
                  <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
                    <div className="job-search__list-job">
                      {listJob.map((job) =>
                        isMobile ? (
                          <TopJobItemHome job={job} key={job.id} />
                        ) : (
                          <div
                            className={
                              jobSelected?.slug === job.slug
                                ? "job-search__item job-search__item--active"
                                : "job-search__item"
                            }
                            key={job.id}
                            onClick={() => handleSelectJob(job)}
                          >
                            <TopJobItemHome job={job} isNotNavigate={true} />
                          </div>
                        ),
                      )}
                    </div>
                  </Col>
                  {/* Hiển thị chi tiết việc làm bên phải */}
                  <Col xxl={14} xl={14} lg={24} md={24} sm={24} xs={24}>
                    <div className="job-search__detail-job">
                      {jobSelected ? (
                        <Outlet
                          context={{
                            jobSelected,
                          }}
                        />
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <div className="job-search__no-results">
              <div className="job-search__noImg-wrap">
                <div className="job-search__noImg">
                  <img src={imgNoJob} alt="No job found" />
                </div>
              </div>
              <h2>{t("jobSearch.noResults")}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobSearch;
