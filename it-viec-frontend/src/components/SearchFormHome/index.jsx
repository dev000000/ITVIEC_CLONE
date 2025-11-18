import { Col, Row, Select, Form, Input, Button } from "antd";
import "./SearchFormHome.scss";
import { VIETNAM_CITIES } from "../../constants";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SearchFormHome({ jobList }) {
  const navigate = useNavigate();
  const onFinish = (values) => {
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
  const onFinishFail = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="search-form-home">
        <div className="search-form__container">
          <h1>{jobList.length} Việc làm cho Developer "Chất"</h1>
          <Form
            className="search-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFail}
          >
            <Row gutter={[{ xxl: 16, xl: 16, lg: 0, md: 0, sm: 0, xs: 0 }, 10]}>
              <Col xxl={5} xl={5} lg={24} md={24} sm={24} xs={24}>
                <Form.Item name="city" initialValue={VIETNAM_CITIES[0].value}>
                  <Select
                    showSearch
                    optionFilterProp="label"
                    size="large"
                    options={VIETNAM_CITIES}
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
          <div className="search-form__suggest">
            <span> Gợi ý cho bạn: </span>
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
