import { useEffect, useState } from "react";
import { Col, Row, Select, Form, Input, Button } from "antd";
import "./SearchFormHome.scss";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAllCitiesApi } from "@/services/cityApi";
import type { CityResponse } from "@/types/response.types";

interface SearchFormValues {
  city?: string;
  keyword?: string;
}

interface SearchFormHomeProps {
  jobList: unknown[];
}

function SearchFormHome({ jobList }: SearchFormHomeProps) {
  const navigate = useNavigate();
  const { t } = useTranslation("shared");
  const [cities, setCities] = useState<CityResponse[]>([]);
  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await getAllCitiesApi();
        setCities(response.data.result ?? []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    loadCities();
  }, []);
  const onFinish = (values: SearchFormValues) => {
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
  };
  const onFinishFail = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="search-form-home">
        <div className="search-form__container">
          <h1>{t("jobSearch.totalJobsSearch", { count: jobList.length })}</h1>
          <Form
            className="search-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFail}
          >
            <Row gutter={[{ xxl: 16, xl: 16, lg: 0, md: 0, sm: 0, xs: 0 }, 10]}>
              <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                <Form.Item name="city" initialValue="all">
                  <Select
                    showSearch
                    optionFilterProp="label"
                    size="large"
                    options={[
                      { value: "all", label: "Tất cả thành phố" },
                      ...cities.map((c) => ({ value: c.cityName, label: c.cityName })),
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
                  <Input
                    placeholder={t("jobSearch.placeholder")}
                    allowClear
                    size="large"
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
          <div className="search-form__suggest">
            <span>{t("jobSearch.suggestions")}</span>
            <div className="search-form__list-tag">
              <div className="search-form__tag"> ReactJS </div>
              <div className="search-form__tag"> HTML5 </div>
              <div className="search-form__tag"> CSS </div>
              <div className="search-form__tag"> Js </div>
              <div className="search-form__tag"> Antd </div>
              <div className="search-form__tag"> TipTap </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchFormHome;
