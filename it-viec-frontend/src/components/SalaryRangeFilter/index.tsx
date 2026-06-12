import { useMemo, useState } from "react";
import { Button, Popover, Slider } from "antd";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import type { SalaryCurrency } from "@/types/common.types";
import {
  formatSalaryAmount,
  formatSalaryRangeForFilter,
  getSalaryCurrencyByLocale,
  SALARY_RANGE_LIMITS,
} from "@/utils/formatSalary";
import "./SalaryRangeFilter.scss";

export interface SalaryRangeFilterValue {
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: SalaryCurrency;
}

interface SalaryRangeFilterProps {
  value?: SalaryRangeFilterValue;
  onChange?: (value: SalaryRangeFilterValue) => void;
}

const SalaryRangeFilter = ({ value, onChange }: SalaryRangeFilterProps) => {
  const { t, i18n } = useTranslation("shared");
  const currency = getSalaryCurrencyByLocale(i18n.language);
  const limits = SALARY_RANGE_LIMITS[currency];

  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<[number, number]>([
    value?.salaryMin ?? limits.min,
    value?.salaryMax ?? limits.max,
  ]);

  const isActive =
    value?.salaryCurrency === currency &&
    value.salaryMin != null &&
    value.salaryMax != null;

  const displayLabel = useMemo(() => {
    if (!isActive || value?.salaryMin == null || value?.salaryMax == null) {
      return t("jobSearch.filters.salary");
    }
    return formatSalaryRangeForFilter(value.salaryMin, value.salaryMax, currency);
  }, [currency, isActive, t, value?.salaryMax, value?.salaryMin]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraftRange([
        value?.salaryMin ?? limits.min,
        value?.salaryMax ?? limits.max,
      ]);
    }
    setOpen(nextOpen);
  };

  const handleApply = () => {
    onChange?.({
      salaryMin: draftRange[0],
      salaryMax: draftRange[1],
      salaryCurrency: currency,
    });
    setOpen(false);
  };

  const handleClear = () => {
    onChange?.({});
    setOpen(false);
  };

  const content = (
    <div className="salary-range-filter__popover">
      <div className="salary-range-filter__value">
        {formatSalaryRangeForFilter(draftRange[0], draftRange[1], currency)}
      </div>
      <Slider
        range
        min={limits.min}
        max={limits.max}
        step={limits.step}
        value={draftRange}
        onChange={(next) => setDraftRange(next as [number, number])}
        tooltip={{
          formatter: (val) =>
            val != null ? formatSalaryAmount(val, currency) : "",
        }}
      />
      <div className="salary-range-filter__actions">
        {isActive && (
          <Button type="link" onClick={handleClear}>
            {t("jobSearch.filters.clearSalary")}
          </Button>
        )}
        <Button type="primary" danger ghost onClick={handleApply}>
          {t("jobSearch.filters.applySalary")}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomLeft"
    >
      <button
        type="button"
        className={
          isActive
            ? "salary-range-filter salary-range-filter--active"
            : "salary-range-filter"
        }
      >
        {displayLabel}
        <FiChevronDown />
      </button>
    </Popover>
  );
};

export default SalaryRangeFilter;
