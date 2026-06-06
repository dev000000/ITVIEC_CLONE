import { useEffect, useMemo, useState } from "react";
import { Button, Card, Popconfirm, Select, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import EmployerStart from "@/components/EmployerStart";
import { getAdminCompanyOptionsApi } from "@/services/companyApi";
import { getAllSkillsApi } from "@/services/skillApi";
import {
  createPopularTagApi,
  deletePopularTagApi,
  getPopularTagsApi,
} from "@/services/tagApi";
import { getApiErrorMessage } from "@/utils/apiError";
import type {
  CompanyOptionResponse,
  PopularTagResponse,
  SkillResponse,
} from "@/types/response.types";
import "./AdminPopularTags.scss";
import "../AdminCommon.scss";

type PopularTagCategoryValue = "Skill and Expertise" | "Company";

function AdminPopularTags() {
  const { t } = useTranslation(["admin", "common"]);
  const [popularTags, setPopularTags] = useState<PopularTagResponse[]>([]);
  const [skills, setSkills] = useState<SkillResponse[]>([]);
  const [companies, setCompanies] = useState<CompanyOptionResponse[]>([]);
  const [category, setCategory] = useState<PopularTagCategoryValue | undefined>();
  const [sourceId, setSourceId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const categoryOptions = useMemo(
    () => [
      {
        value: "Skill and Expertise" as PopularTagCategoryValue,
        label: t("admin:popularTags.categories.skill"),
      },
      {
        value: "Company" as PopularTagCategoryValue,
        label: t("admin:popularTags.categories.company"),
      },
    ],
    [t],
  );

  const sourceOptions = useMemo(() => {
    if (!category) {
      return [];
    }

    if (category === "Company") {
      return companies.map((company) => ({
        value: company.id,
        label: company.companyName,
      }));
    }

    return skills.map((skill) => ({
      value: String(skill.id),
      label: skill.skillName,
    }));
  }, [category, companies, skills]);

  const loadPopularTags = async () => {
    const response = await getPopularTagsApi();
    setPopularTags(response.data.result ?? []);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tagsResponse, skillsResponse, companiesResponse] = await Promise.all([
          getPopularTagsApi(),
          getAllSkillsApi(),
          getAdminCompanyOptionsApi(),
        ]);

        setPopularTags(tagsResponse.data.result ?? []);
        setSkills(skillsResponse.data.result ?? []);
        setCompanies(companiesResponse.data.result ?? []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("admin:notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [t]);

  const handleCreateTag = async () => {
    if (!category || !sourceId) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createPopularTagApi({ category, sourceId });
      await loadPopularTags();
      setSourceId(undefined);
      Swal.fire({
        icon: "success",
        title: t("admin:popularTags.notifications.created"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTag = async (id: number) => {
    try {
      setDeletingId(id);
      await deletePopularTagApi(id);
      await loadPopularTags();
      Swal.fire({
        icon: "success",
        title: t("admin:popularTags.notifications.deleted"),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("admin:notifications.oops"),
        text: getApiErrorMessage(error, t),
      });
    } finally {
      setDeletingId(null);
    }
  };

  const columns: TableColumnsType<PopularTagResponse> = [
    {
      title: t("admin:popularTags.columns.category"),
      dataIndex: "category",
      key: "category",
      width: 220,
      render: (value: PopularTagResponse["category"]) => (
        <Tag color={value === "Company" ? "geekblue" : "purple"}>{value}</Tag>
      ),
    },
    {
      title: t("admin:popularTags.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("admin:popularTags.columns.action"),
      key: "action",
      width: 160,
      render: (_, record) => (
        <Popconfirm
          title={t("admin:popularTags.notifications.deleteConfirmTitle")}
          okText={t("common:buttons.delete")}
          cancelText={t("common:buttons.cancel")}
          onConfirm={() => handleDeleteTag(record.id)}
        >
          <Button
            danger
            loading={deletingId === record.id}
          >
            {t("common:buttons.delete")}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="admin-page admin-popular-tags">
      <EmployerStart content={t("admin:popularTags.title")} type="search" hideSearch />

      <div className="admin-toolbar">
        <Select
          placeholder={t("admin:popularTags.filters.category")}
          value={category}
          options={categoryOptions}
          onChange={(value) => {
            setCategory(value);
            setSourceId(undefined);
          }}
          style={{ width: 220 }}
        />
        <Select
          showSearch
          optionFilterProp="label"
          placeholder={t("admin:popularTags.filters.name")}
          value={sourceId}
          options={sourceOptions}
          onChange={(value) => setSourceId(value)}
          disabled={!category}
          style={{ minWidth: 320 }}
        />
        <Button
          type="primary"
          onClick={handleCreateTag}
          disabled={!category || !sourceId}
          loading={isSubmitting}
        >
          {t("admin:popularTags.actions.add")}
        </Button>
      </div>

      <Card className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h3>{t("admin:popularTags.listTitle")}</h3>
            <p>{t("admin:popularTags.listDescription")}</p>
          </div>
        </div>
        <Table<PopularTagResponse>
          rowKey="id"
          loading={isLoading}
          dataSource={popularTags}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
}

export default AdminPopularTags;
