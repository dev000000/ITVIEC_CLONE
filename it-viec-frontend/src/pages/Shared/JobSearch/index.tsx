import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Select } from "antd";
import "./JobSearch.scss";
import { FiSearch } from "react-icons/fi";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { getAllSearchJobsApi } from "@/services/jobApi";
import imgNoJob from "@/assets/images/robby-oops.svg";
import TopJobItemHome from "@/components/TopJobItemHome";
import { useTranslation } from "react-i18next";
import SearchKeywordInput from "@/components/SearchKeywordInput";
import useSearchMetadata from "@/hooks/useSearchMetadata";
import type { ExperienceLevel, JobType } from "@/types/common.types";
import type {
  CityResponse,
  JobCardResponse,
  PopularTagResponse,
} from "@/types/response.types";
import {
  buildJobSearchPath,
  deslugifySearchSegment,
  findCityBySegment,
} from "@/utils/jobSearch";
import { getExperienceLevelOptions, getJobTypeOptions } from "@/constants";

interface JobSearchProps {
  keywordSegment?: string;
  citySegment?: string;
}

interface SearchFormValues {
  city?: string;
  keyword?: string;
}

interface SearchFilters {
  experienceLevel?: ExperienceLevel;
  jobType?: JobType;
}

const defaultFilters: SearchFilters = {};

function JobSearch({ keywordSegment, citySegment }: JobSearchProps) {
  const { t } = useTranslation("shared");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedJobSlug = searchParams.get("job_selected");
  const [listJob, setListJob] = useState<JobCardResponse[]>([]);
  const [jobSelected, setJobSelected] = useState<JobCardResponse | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const { cities, popularTags, isLoading: isMetadataLoading } = useSearchMetadata();
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 1199;
  const [form] = Form.useForm<SearchFormValues>();

  const jobTypeOptions = useMemo(() => getJobTypeOptions(t), [t]);
  const experienceLevelOptions = useMemo(
    () => getExperienceLevelOptions(t),
    [t],
  );

  const resolvedSearch = useMemo(() => {
    const cityFromSecondSegment = findCityBySegment(citySegment, cities);
    if (cityFromSecondSegment) {
      return {
        keyword: deslugifySearchSegment(keywordSegment),
        city: cityFromSecondSegment,
      };
    }

    const cityFromFirstSegment = !citySegment
      ? findCityBySegment(keywordSegment, cities)
      : null;

    if (cityFromFirstSegment) {
      return {
        keyword: "",
        city: cityFromFirstSegment,
      };
    }

    return {
      keyword: deslugifySearchSegment(keywordSegment),
      city: null as CityResponse | null,
    };
  }, [cities, citySegment, keywordSegment]);

  useEffect(() => {
    form.setFieldsValue({
      keyword: resolvedSearch.keyword,
      city: resolvedSearch.city?.cityName ?? "all",
    });
  }, [form, resolvedSearch.city?.cityName, resolvedSearch.keyword]);

  useEffect(() => {
    setFilters(defaultFilters);
  }, [citySegment, keywordSegment]);

  useEffect(() => {
    if (isMetadataLoading) {
      return;
    }

    const loadJobs = async () => {
      try {
        setIsLoading(true);
        const jobs = await getAllSearchJobsApi({
          keyword: resolvedSearch.keyword || undefined,
          cityId: resolvedSearch.city?.id,
          experienceLevel: filters.experienceLevel,
          jobType: filters.jobType,
        });

        setListJob(jobs);
        setTotalJobs(jobs.length);

        if (!jobs.length) {
          setJobSelected(null);
          if (selectedJobSlug) {
            setSearchParams({}, { replace: true });
          }
          return;
        }

        const matchedSelectedJob =
          jobs.find((job) => job.slug === selectedJobSlug) ?? jobs[0];

        setJobSelected(matchedSelectedJob);

        if (matchedSelectedJob.slug !== selectedJobSlug) {
          setSearchParams(
            { job_selected: matchedSelectedJob.slug },
            { replace: true },
          );
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
        setListJob([]);
        setJobSelected(null);
        setTotalJobs(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobs();
  }, [
    filters.experienceLevel,
    filters.jobType,
    isMetadataLoading,
    resolvedSearch.city?.id,
    resolvedSearch.keyword,
    selectedJobSlug,
    setSearchParams,
  ]);

  const handleFinish = (values: SearchFormValues) => {
    setFilters(defaultFilters);
    navigate(
      buildJobSearchPath({
        keyword: values.keyword,
        city: values.city === "all" ? "" : values.city,
      }),
    );
  };

  const handlePopularTagSelect = (tag: PopularTagResponse) => {
    const selectedCity = form.getFieldValue("city");

    if (tag.category === "Company" && tag.companySlug) {
      navigate(`/nha-tuyen-dung/${tag.companySlug}`);
      return;
    }

    setFilters(defaultFilters);
    navigate(
      buildJobSearchPath({
        keyword: tag.name,
        city: selectedCity === "all" ? "" : selectedCity,
      }),
    );
  };

  const handleSelectJob = (job: JobCardResponse) => {
    setJobSelected(job);
    setSearchParams({ job_selected: job.slug });
  };

  const headingKeyword =
    resolvedSearch.keyword || resolvedSearch.city?.cityName || t("jobSearch.allJobs");

  return (
    <div className="job-search">
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
                      { value: "all", label: t("jobSearch.allCities") },
                      ...cities.map((city) => ({
                        value: city.cityName,
                        label: city.cityName,
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
                    onTagSelect={handlePopularTagSelect}
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
          ) : listJob.length > 0 ? (
            <>
              <h2 className="job-search__total-jobs">
                {totalJobs} <span>{headingKeyword}</span> {t("jobSearch.jobsInVietnam")}
              </h2>
              <div className="job-search__filter-wrap">
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
                            <TopJobItemHome job={job} />
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
