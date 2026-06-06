import { useMemo } from "react";
import { Col, Row, Select, Form, Button } from "antd";
import "./SearchFormHome.scss";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchKeywordInput from "@/components/SearchKeywordInput";
import useSearchMetadata from "@/hooks/useSearchMetadata";
import type { PopularTagResponse } from "@/types/response.types";
import { buildJobSearchPath } from "@/utils/jobSearch";

interface SearchFormValues {
  city?: string;
  keyword?: string;
}

interface SearchFormHomeProps {
  totalJobs: number;
}

function SearchFormHome({ totalJobs }: SearchFormHomeProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("shared");
  const { cities, popularTags } = useSearchMetadata();
  const [form] = Form.useForm<SearchFormValues>();

  const suggestedTags = useMemo(() => {
    const skillTags = popularTags
      .filter((tag) => tag.category === "Skill and Expertise")
      .slice(0, 4);
    const companyTags = popularTags
      .filter((tag) => tag.category === "Company")
      .slice(0, 2);
    return [...skillTags, ...companyTags];
  }, [popularTags]);

  const handleSearchNavigation = (values: SearchFormValues) => {
    navigate(
      buildJobSearchPath({
        keyword: values.keyword,
        city: values.city === "all" ? "" : values.city,
      }),
    );
  };

  const handleTagNavigation = (tag: PopularTagResponse) => {
    const selectedCity = form.getFieldValue("city");

    if (tag.category === "Company" && tag.companySlug) {
      navigate(`/nha-tuyen-dung/${tag.companySlug}`);
      return;
    }

    navigate(
      buildJobSearchPath({
        keyword: tag.name,
        city: selectedCity === "all" ? "" : selectedCity,
      }),
    );
  };

  return (
    <div className="search-form-home">
      <div className="search-form__container">
        <h1>{t("jobSearch.totalJobsSearch", { count: totalJobs })}</h1>
        <Form
          className="search-form"
          form={form}
          initialValues={{ city: "all", keyword: "" }}
          onFinish={handleSearchNavigation}
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
                  loading={false}
                >
                  {t("jobSearch.searchButton")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className="search-form__suggest">
          <span>{t("jobSearch.suggestions")}</span>
          <div className="search-form__list-tag">
            {suggestedTags.map((tag) => (
              <button
                type="button"
                className="search-form__tag"
                key={`${tag.category}-${tag.sourceId}`}
                onClick={() => handleTagNavigation(tag)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFormHome;
