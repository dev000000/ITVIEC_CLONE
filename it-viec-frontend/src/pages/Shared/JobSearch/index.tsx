import { useEffect, useMemo, useState, type FC } from "react";
import { Button, Col, Form, Pagination, Row, Select } from "antd";
import "./JobSearch.scss";
import { FiFilter, FiSearch } from "react-icons/fi";
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
import CheckboxPopoverFilter from "@/components/CheckboxPopoverFilter";
import JobDomainFilter from "@/components/JobDomainFilter";

interface JobSearchProps {
  keywordSegment?: string;
  citySegment?: string;
}

interface SearchFormValues {
  city?: string;
  keyword?: string;
}

interface SearchFilters extends SalaryRangeFilterValue {
  experienceLevels: ExperienceLevel[];
  jobTypes: JobType[];
  jobDomainId?: number;
}

const defaultFilters: SearchFilters = {
  experienceLevels: [],
  jobTypes: [],
};

const PAGE_SIZE = 10;

const JobSearch: FC<JobSearchProps> = ({ keywordSegment, citySegment }) => {
  const { t } = useTranslation("shared");
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 1199;

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJobSlug = searchParams.get("job_selected");

  const [listJob, setListJob] = useState<JobCardResponse[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [jobSelected, setJobSelected] = useState<JobCardResponse | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(true);
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [popularTags, setPopularTags] = useState<PopularTagResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm<SearchFormValues>();

  const jobTypeOptions = useMemo(() => getJobTypeOptions(t), [t]);
  const experienceLevelOptions = useMemo(
    () => getExperienceLevelOptions(t),
    [t],
  );

  useEffect(() => {
    form.setFieldsValue({
      keyword: keywordSegment || "",
      city: citySegment || "",
    });
  }, [form, keywordSegment, citySegment]);

  useEffect(() => {
    setFilters(defaultFilters);
  }, [keywordSegment, citySegment]);

  // Reset to page 1 when filters or search segments change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, keywordSegment, citySegment]);

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

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        if (isLoadingMetadata) return;
        const response = await searchJobsApi({
          page: currentPage - 1,
          size: PAGE_SIZE,
          keyword: keywordSegment || undefined,
          cityId: citySegment ? cities.find((city) => city.slug === citySegment)?.id : undefined,
          experienceLevel: filters.experienceLevels.length > 0 ? filters.experienceLevels : undefined,
          jobType: filters.jobTypes.length > 0 ? filters.jobTypes : undefined,
          jobDomainId: filters.jobDomainId,
          salaryMin: filters.salaryMin,
          salaryMax: filters.salaryMax,
          salaryCurrency: filters.salaryCurrency,
        });

        setListJob(response.data.result?.data ?? []);
        setTotalJobs(response.data.result?.totalElements ?? 0);

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
  }, [filters, t, keywordSegment, citySegment, isLoadingMetadata, cities, currentPage]);

  const handleFinish = (values: SearchFormValues) => {
    setFilters(defaultFilters);
    navigate(
      buildJobSearchPath({
        keyword: values.keyword,
        city: values.city,
      }),
    );
  };

  const handleTagNavigation = (tag: PopularTagResponse) => {
    switch (tag.category) {
      case "Company":
        navigate(`/nha-tuyen-dung/${tag.companySlug}`);
        return;
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
          {isLoading ? (
            <div className="job-search__state job-search__state--loading">
              {t("jobSearch.loading")}
            </div>
          ) : (
            <>
              <h2 className="job-search__total-jobs">
                {totalJobs} <span></span> {t("jobSearch.jobsInVietnam")}
              </h2>
              <div className="job-search__filter-wrap">
                <div className="job-search__filter-group">
                  <CheckboxPopoverFilter
                    label={t("jobSearch.filters.experienceLevel")}
                    options={experienceLevelOptions}
                    selectedValues={filters.experienceLevels}
                    onChange={(values) =>
                      setFilters((prev) => ({ ...prev, experienceLevels: values as ExperienceLevel[] }))
                    }
                  />
                  <CheckboxPopoverFilter
                    label={t("jobSearch.filters.jobType")}
                    options={jobTypeOptions}
                    selectedValues={filters.jobTypes}
                    onChange={(values) =>
                      setFilters((prev) => ({ ...prev, jobTypes: values as JobType[] }))
                    }
                  />
                  <SalaryRangeFilter
                    value={filters}
                    onChange={(salaryFilter) =>
                      setFilters((prev) => ({ ...prev, ...salaryFilter }))
                    }
                  />
                  <JobDomainFilter
                    selectedDomainId={filters.jobDomainId}
                    onChange={(domainId) =>
                      setFilters((prev) => ({ ...prev, jobDomainId: domainId }))
                    }
                  />
                </div>
                <div className="job-search__filter-actions">
                  <button type="button" className="job-search__filter-btn">
                    <FiFilter />
                    {t("jobSearch.filters.filterButton")}
                  </button>
                </div>
              </div>
              {listJob.length > 0 ? (
                <div className="job-search__main-content">
                  <Row gutter={[20, 20]}>
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
                  {totalJobs > PAGE_SIZE && (
                    <div className="job-search__pagination">
                      <Pagination
                        current={currentPage}
                        total={totalJobs}
                        pageSize={PAGE_SIZE}
                        align="center"
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                      />
                    </div>
                  )}
                </div>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
