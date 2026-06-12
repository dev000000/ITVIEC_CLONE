import { Checkbox, Col, Form, Row, Select, Slider } from "antd";
import { useTranslation } from "react-i18next";
import { SALARY_CURRENCY_VALUES, type SalaryCurrency } from "@/types/common.types";
import {
  formatSalaryRangeForFilter,
  SALARY_RANGE_LIMITS,
} from "@/utils/formatSalary";

const SalaryFormFields = () => {
  const { t } = useTranslation("employer");
  const form = Form.useFormInstance();

  const negotiable = Form.useWatch<boolean>("salaryNegotiable");
  const currency = (Form.useWatch<SalaryCurrency>("salaryCurrency") ?? "VND") as SalaryCurrency;
  const salaryMin = Form.useWatch<number>("salaryMin");
  const salaryMax = Form.useWatch<number>("salaryMax");

  const limits = SALARY_RANGE_LIMITS[currency];
  const effectiveMin = salaryMin ?? limits.min;
  const effectiveMax = salaryMax ?? limits.max;

  const currencyOptions = SALARY_CURRENCY_VALUES.map((value) => ({
    value,
    label: t(`jobs.form.salaryCurrency.${value}`),
  }));

  const handleNegotiableChange = (checked: boolean) => {
    if (checked) {
      form.setFieldsValue({
        salaryMin: undefined,
        salaryMax: undefined,
        salaryCurrency: undefined,
      });
    } else {
      const defaultLimits = SALARY_RANGE_LIMITS.VND;
      form.setFieldsValue({
        salaryCurrency: "VND",
        salaryMin: defaultLimits.min,
        salaryMax: defaultLimits.max,
      });
    }
  };

  const handleCurrencyChange = (newCurrency: SalaryCurrency) => {
    const newLimits = SALARY_RANGE_LIMITS[newCurrency];
    form.setFieldsValue({
      salaryMin: newLimits.min,
      salaryMax: newLimits.max,
    });
  };

  return (
    <>
      <Form.Item name="salaryNegotiable" valuePropName="checked">
        <Checkbox onChange={(e) => handleNegotiableChange(e.target.checked)}>
          {t("jobs.form.salaryNegotiable")}
        </Checkbox>
      </Form.Item>
      {!negotiable && (
        <Row gutter={12} align="middle">
          <Col span={6}>
            <Form.Item
              label={t("jobs.form.salaryCurrencyLabel")}
              name="salaryCurrency"
              rules={[{ required: true, message: t("jobs.form.salaryCurrencyRequired") }]}
            >
              <Select options={currencyOptions} onChange={handleCurrencyChange} />
            </Form.Item>
          </Col>
          <Col span={18}>
            <div style={{ textAlign: "center", fontWeight: 500, marginBottom: 4 }}>
              {formatSalaryRangeForFilter(effectiveMin, effectiveMax, currency)}
            </div>
            <Slider
              range
              min={limits.min}
              max={limits.max}
              step={limits.step}
              value={[effectiveMin, effectiveMax]}
              onChange={(values: [number, number]) => {
                form.setFieldsValue({ salaryMin: values[0], salaryMax: values[1] });
              }}
            />
            <Form.Item name="salaryMin" hidden noStyle>
              <input />
            </Form.Item>
            <Form.Item name="salaryMax" hidden noStyle>
              <input />
            </Form.Item>
          </Col>
        </Row>
      )}
    </>
  );
};

export default SalaryFormFields;
