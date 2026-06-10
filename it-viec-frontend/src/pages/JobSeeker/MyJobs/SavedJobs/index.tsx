import "./SavedJobs.scss";
import { useState, useEffect, useCallback } from "react";
import { Row, Col, Select, Pagination } from "antd";
import { ImNotification } from "react-icons/im";
import { useTranslation } from "react-i18next";
import EmptyJobState from "../EmptyJobState";
import CardSavedJob from "@/components/CardSavedJob";
import { getMySavedJobsApi } from "@/services/savedJobApi";
import { getMyApplicationsApi } from "@/services/applicationApi";
import type { SavedJobItemResponse, SavedJobResponse } from "@/types/response.types";

interface PaginationState {
  current: number;
  pageSize: number;
}

function SavedJobs() {
  const { t } = useTranslation("jobseeker");
  const [savedList, setSavedList] = useState<SavedJobItemResponse[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 5,
  });
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [isLoading, setIsLoading] = useState(true);
  const [appliedJobIds, setAppliedJobIds] = useState<Set<number>>(new Set());

  const { current, pageSize } = pagination;
  const fetchSavedJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMySavedJobsApi({
        page: current - 1,
        size: pageSize,
        sort: sort === "asc" ? "expiresAt,asc" : "expiresAt,desc",
      });
      const pageResult = res.data.result;
      setSavedList(pageResult.data.map((r: SavedJobResponse) => r.job));
      setTotalSaved(pageResult.totalElements);
    } catch {
      // nếu fetch thất bại giữ trạng thái cũ
    } finally {
      setIsLoading(false);
    }
  }, [current, pageSize, sort]);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  useEffect(() => {
    getMyApplicationsApi()
      .then((res) => {
        const ids = (res.data.result ?? [])
          .map((a: { job?: { id?: number } }) => a.job?.id)
          .filter((id): id is number => id !== undefined);
        setAppliedJobIds(new Set(ids));
      })
      .catch(() => {/* im lặng */});
  }, []);

  const handleRemoved = (jobId: number) => {
    setSavedList((prev) => prev.filter((j) => j.id !== jobId));
    setTotalSaved((prev) => prev - 1);
  };

  const handleRestored = (snapshot: SavedJobItemResponse) => {
    setSavedList((prev) => {
      if (prev.find((j) => j.id === snapshot.id)) return prev;
      return [snapshot, ...prev];
    });
    setTotalSaved((prev) => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="saved-jobs">
        <p>{t("myJobs.loading")}</p>
      </div>
    );
  }

  if (totalSaved === 0 && savedList.length === 0) {
    return (
      <div className="saved-jobs">
        <EmptyJobState
          notificationText={t("savedJobs.notification", { count: 0, max: 20 })}
          emptyMessage={t("savedJobs.emptyMessage")}
          buttonText={t("savedJobs.findJob")}
          buttonLink="/"
        />
      </div>
    );
  }

  return (
    <>
      <div className="saved-jobs">
        <div className="job-empty-state__notification-wrapper">
          <div className="job-empty-state__notification">
            <ImNotification className="job-empty-state__icon" />
            <span className="job-empty-state__text">
              {t("savedJobs.notification", { count: totalSaved, max: 20 })}
            </span>
          </div>
          <div className="job-empty-state__select">
            <span>{t("savedJobs.sortBy")}</span>
            <Select
              value={sort}
              style={{ width: 240 }}
              options={[
                { value: "asc", label: t("savedJobs.sortExpireAsc") },
                { value: "desc", label: t("savedJobs.sortExpireDesc") },
              ]}
              onChange={(val) => {
                setSort(val);
                setPagination((prev) => ({ ...prev, current: 1 }));
              }}
            />
          </div>
        </div>
        <Row className="saved-jobs__row">
          {savedList.map((job) => (
            <Col key={job.id} span={24}>
              <CardSavedJob
                item={job}
                appliedJobIds={appliedJobIds}
                onRemoved={handleRemoved}
                onRestored={handleRestored}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className="applied-jobs__pagination">
        <Pagination
          defaultCurrent={1}
          total={totalSaved}
          align="center"
          current={pagination.current}
          pageSize={pagination.pageSize}
          onChange={(page, pageSize) => {
            setPagination({ current: page, pageSize });
          }}
        />
      </div>
    </>
  );
}

export default SavedJobs;
