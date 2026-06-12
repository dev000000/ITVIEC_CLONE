import { Checkbox, Col, Form, InputNumber, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import { SALARY_CURRENCY_VALUES, type SalaryCurrency } from "@/types/common.types";
import { SALARY_RANGE_LIMITS } from "@/utils/formatSalary";

const SalaryFormFields = () => {
  const { t } = useTranslation("employer");
  const salaryNegotiable = Form.useWatch<boolean>("salaryNegotiable");

  const currencyOptions = SALARY_CURRENCY_VALUES.map((value) => ({
    value,
    label: t(`jobs.form.salaryCurrency.${value}`),
  }));

  const renderRangeInputs = (currency: SalaryCurrency) => {
    const limits = SALARY_RANGE_LIMITS[currency];
    return (
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label={t("jobs.form.salaryMin")}
            name="salaryMin"
            rules={[
              {
                required: !salaryNegotiable,
                message: t("jobs.form.salaryMinRequired"),
              },
            ]}
          >
            <InputNumber
              min={limits.min}
              max={limits.max}
              step={limits.step}
              style={{ width: "100%" }}
              placeholder={t("jobs.form.salaryMinPlaceholder")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t("jobs.form.salaryMax")}
            name="salaryMax"
            rules={[
              {
                required: !salaryNegotiable,
                message: t("jobs.form.salaryMaxRequired"),
              },
            ]}
          >
            <InputNumber
              min={limits.min}
              max={limits.max}
              step={limits.step}
              style={{ width: "100%" }}
              placeholder={t("jobs.form.salaryMaxPlaceholder")}
            />
          </Form.Item>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Form.Item name="salaryNegotiable" valuePropName="checked">
        <Checkbox>{t("jobs.form.salaryNegotiable")}</Checkbox>
      </Form.Item>
      {!salaryNegotiable && (
        <>
          <Form.Item
            label={t("jobs.form.salaryCurrencyLabel")}
            name="salaryCurrency"
            rules={[
              {
                required: !salaryNegotiable,
                message: t("jobs.form.salaryCurrencyRequired"),
              },
            ]}
          >
            <Select options={currencyOptions} />
          </Form.Item>
          <Form.Item noStyle shouldUpdate={(prev, curr) => prev.salaryCurrency !== curr.salaryCurrency}>
            {({ getFieldValue }) =>
              renderRangeInputs(getFieldValue("salaryCurrency") || "VND")
            }
          </Form.Item>
        </>
      )}
    </>
  );
};

export default SalaryFormFields;
