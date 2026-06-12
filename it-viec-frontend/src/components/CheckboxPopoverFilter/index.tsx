import { useState } from "react";
import { Checkbox, Popover } from "antd";
import { FiChevronDown } from "react-icons/fi";
import "./CheckboxPopoverFilter.scss";

interface CheckboxPopoverFilterProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CheckboxPopoverFilter = ({
  label,
  options,
  selectedValues,
  onChange,
}: CheckboxPopoverFilterProps) => {
  const [open, setOpen] = useState(false);

  const isActive = selectedValues.length > 0;

  const displayLabel =
    isActive ? `${label} (${selectedValues.length})` : label;

  const content = (
    <div className="checkbox-popover-filter__popover">
      <Checkbox.Group
        value={selectedValues}
        onChange={(values) => onChange(values as string[])}
      >
        {options.map((opt) => (
          <Checkbox key={opt.value} value={opt.value}>
            {opt.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomLeft"
    >
      <button
        type="button"
        className={
          isActive
            ? "checkbox-popover-filter checkbox-popover-filter--active"
            : "checkbox-popover-filter"
        }
      >
        {displayLabel}
        <FiChevronDown />
      </button>
    </Popover>
  );
};

export default CheckboxPopoverFilter;
