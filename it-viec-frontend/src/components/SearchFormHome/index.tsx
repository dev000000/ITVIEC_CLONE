import { useEffect, useState } from "react";
import { Col, Row, Select, Form, Button } from "antd";
import "./SearchFormHome.scss";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchKeywordInput from "@/components/SearchKeywordInput";
import type {
  CityResponse,
  JobDomainResponse,
  PopularTagResponse,
} from "@/types/response.types";
import { buildJobSearchPath } from "@/utils/jobSearch";
import { getAllCitiesApi } from "@/services/cityApi";
import { getPopularTagsApi } from "@/services/tagApi";
import { getTopJobDomainsApi } from "@/services/jobDomainApi";
import { getCityLabel, getJobDomainLabel } from "@/constants";

interface SearchFormValues {
  city?: string;
  keyword?: string;
}

interface SearchFormHomeProps {
  totalJobs: number;
}
// Component SearchFormHome hiển thị form tìm kiếm việc làm trên trang chủ
const SearchFormHome = ({ totalJobs }: SearchFormHomeProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation("shared");

  // State lưu danh sách thành phố để hiển thị trong dropdown
  const [cities, setCities] = useState<CityResponse[]>([]);
  // State lưu danh sách tag phổ biến để hiển thị gợi ý trong ô input tìm kiếm
  const [popularTags, setPopularTags] = useState<PopularTagResponse[]>([]);
  // State lưu danh sách job domain hot (nhiều job nhất) để hiển thị gợi ý tag bên dưới form
  const [topJobDomains, setTopJobDomains] = useState<JobDomainResponse[]>([]);

  // Sử dụng Ant Design Form để quản lý form tìm kiếm
  const [form] = Form.useForm<SearchFormValues>();

  // Số lượng job domain hot hiển thị làm gợi ý
  const TOP_JOB_DOMAIN_LIMIT = 6;

  // Khi component được mount lên thì sẽ gọi API để lấy danh sách thành phố, tag phổ biến và job domain hot
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const [citiesResponse, tagsResponse, topDomainsResponse] =
          await Promise.all([
            getAllCitiesApi(),
            getPopularTagsApi(),
            getTopJobDomainsApi(TOP_JOB_DOMAIN_LIMIT),
          ]);

        setCities(citiesResponse.data.result ?? []);
        setPopularTags(tagsResponse.data.result ?? []);
        setTopJobDomains(topDomainsResponse.data.result ?? []);
      } catch (error) {
        console.error("Error loading search metadata:", error);
      }
    };
    loadMetadata();
  }, []);

  // Hàm xử lý khi người dùng submit form tìm kiếm
  const handleSearchNavigation = (values: SearchFormValues) => {
    navigate(
      buildJobSearchPath({
        keyword: values.keyword,
        city: values.city,
      }),
    );
  };

  // Hàm xử lý khi người dùng click vào một tag gợi ý trong ô input tìm kiếm (PopularTag)
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

  // Khi click vào tag job domain thì điều hướng sang trang tìm kiếm việc làm và truyền jobDomainId qua query string
  const handleJobDomainTagClick = (domain: JobDomainResponse) => {
    navigate(`${buildJobSearchPath({})}?jobDomainId=${domain.id}`);
  };

  return (
    <div className="search-form-home">
      <div className="search-form__container">
        <h1>{t("jobSearch.totalJobsSearch", { count: totalJobs })}</h1>
        {/* Hiển thị form tìm kiếm việc làm ( ô select thành phố, ô input keyword và nút search) */}
        <Form
          className="search-form"
          form={form}
          initialValues={{ city: "", keyword: "" }}
          onFinish={handleSearchNavigation}
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
                  loading={false}
                >
                  {t("jobSearch.searchButton")}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* Hiển thị danh sách job domain hot làm gợi ý — click sẽ điều hướng tới trang tìm việc kèm bộ lọc jobDomainId */}
        {topJobDomains.length > 0 && (
          <div className="search-form__suggest">
            <span>{t("jobSearch.suggestions")}</span>
            <div className="search-form__list-tag">
              {topJobDomains.map((domain) => (
                <button
                  type="button"
                  className="search-form__tag"
                  key={domain.id}
                  onClick={() => handleJobDomainTagClick(domain)}
                >
                  {getJobDomainLabel(domain.domainName, t)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFormHome;
