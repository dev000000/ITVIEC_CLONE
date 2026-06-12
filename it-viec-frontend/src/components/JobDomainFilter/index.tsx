import { useEffect, useState } from "react";
import { Checkbox, Input, Popover } from "antd";
import { FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { getAllJobDomainsApi } from "@/services/jobDomainApi";
import { getJobDomainLabel } from "@/constants";
import type { JobDomainResponse } from "@/types/response.types";
import "./JobDomainFilter.scss";

interface JobDomainFilterProps {
  selectedDomainId?: number;
  onChange: (domainId: number | undefined) => void;
}

const JobDomainFilter = ({ selectedDomainId, onChange }: JobDomainFilterProps) => {
  const { t } = useTranslation("shared");
  const [open, setOpen] = useState(false);
  const [domains, setDomains] = useState<JobDomainResponse[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllJobDomainsApi()
      .then((res) => setDomains(res.data.result ?? []))
      .catch(() => setDomains([]));
  }, []);

  const isActive = selectedDomainId !== undefined;

  const selectedDomain = domains.find((d) => d.id === selectedDomainId);
  const displayLabel = isActive && selectedDomain
    ? getJobDomainLabel(selectedDomain.domainName, t)
    : t("jobSearch.filters.jobDomain");

  const filteredDomains = domains.filter((d) =>
    getJobDomainLabel(d.domainName, t)
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleToggle = (domainId: number) => {
    if (selectedDomainId === domainId) {
      onChange(undefined);
    } else {
      onChange(domainId);
    }
  };

  const content = (
    <div className="job-domain-filter__popover">
      <Input
        className="job-domain-filter__search"
        placeholder={t("jobSearch.filters.searchDomain")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
      />
      <div className="job-domain-filter__list">
        {filteredDomains.map((domain) => (
          <Checkbox
            key={domain.id}
            checked={selectedDomainId === domain.id}
            onChange={() => handleToggle(domain.id)}
          >
            {getJobDomainLabel(domain.domainName, t)}
          </Checkbox>
        ))}
      </div>
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
            ? "job-domain-filter job-domain-filter--active"
            : "job-domain-filter"
        }
      >
        {displayLabel}
        <FiChevronDown />
      </button>
    </Popover>
  );
};

export default JobDomainFilter;
