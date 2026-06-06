import { useMemo } from "react";
import { AutoComplete, Input } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import "./SearchKeywordInput.scss";
import type { PopularTagResponse } from "@/types/response.types";

interface SearchKeywordOption extends DefaultOptionType {
  tag?: PopularTagResponse;
}

interface SearchKeywordGroupOption extends DefaultOptionType {
  options: SearchKeywordOption[];
}

interface SearchKeywordInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  onTagSelect: (tag: PopularTagResponse) => void;
  popularTags: PopularTagResponse[];
  placeholder?: string;
  size?: "small" | "middle" | "large";
}

const CATEGORY_ORDER = ["Skill and Expertise", "Company"];

function SearchKeywordInput({
  value,
  onChange,
  onSubmit,
  onTagSelect,
  popularTags,
  placeholder,
  size = "large",
}: SearchKeywordInputProps) {
  const options = useMemo(() => {
    const normalizedValue = value?.trim().toLowerCase() ?? "";

    if (!normalizedValue) {
      return [];
    }

    return CATEGORY_ORDER.map((category) => {
      const categoryTags = popularTags.filter(
        (tag) =>
          tag.category === category &&
          tag.name.toLowerCase().includes(normalizedValue),
      );

      if (!categoryTags.length) {
        return null;
      }

      return {
        label: (
          <div className="search-keyword-input__group-title">
            {category}
          </div>
        ),
        options: categoryTags.map((tag) => ({
          value: tag.name,
          label: (
            <div className="search-keyword-input__option-label">
              {tag.name}
            </div>
          ),
          tag,
        })),
      } as SearchKeywordGroupOption;
    }).filter(Boolean) as SearchKeywordGroupOption[];
  }, [popularTags, value]);

  return (
    <AutoComplete
      className="search-keyword-input"
      value={value}
      options={options}
      onChange={onChange}
      onSearch={onChange}
      onSelect={(_, option) => {
        const selectedTag = (option as SearchKeywordOption).tag;
        if (selectedTag) {
          onTagSelect(selectedTag);
        }
      }}
    >
      <Input
        allowClear
        size={size}
        placeholder={placeholder}
        onPressEnter={onSubmit}
      />
    </AutoComplete>
  );
}

export default SearchKeywordInput;
