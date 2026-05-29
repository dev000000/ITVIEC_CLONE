import { useEffect, useState } from "react";
import "./MyJobs.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getApplicationsBySeekerId,
  getApplicationsBySeekerIdWithPagination,
} from "@/services/SeekerServices";

interface ApplicationItem {
  appliedAt: string;
  job?: { slug?: string; title?: string; salary?: string };
  company?: { companyName?: string; slug?: string };
  fullName: string;
  phoneNumber: string;
  resumeUrl: string;
  coverLetter: string;
  desiredLocations: string[];
  status: string;
  employerMessage?: string;
}

interface PaginationState {
  current: number;
  pageSize: number;
}

interface RootState {
  SeekerReducer: { id: number | string };
}

export interface MyJobsOutletContext {
  applicationList: ApplicationItem[];
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  totalApplications: number;
  pagination: PaginationState;
  sort: string;
}

function MyJobs() {
  const [applicationList, setApplicationList] = useState<ApplicationItem[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const seeker = useSelector((state: RootState) => state.SeekerReducer);
  const { t } = useTranslation("jobseeker");
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 5,
  });
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await getApplicationsBySeekerId(seeker.id);
        setTotalApplications(result.length || 0);
        console.log("Applications fetched successfully:", result);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, [seeker.id]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const result = await getApplicationsBySeekerIdWithPagination({
          id: seeker.id,
          start: (pagination.current - 1) * pagination.pageSize,
          limit: pagination.pageSize,
          sort: sort,
        });
        setApplicationList(result || []);
        console.log("Applications fetched successfully:", result);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, [seeker.id, pagination.current, pagination.pageSize, sort]);

  return (
    <div className="my-jobs">
      <div className="job-seeker-section job-seeker-section--custom2">
        <h2 className="my-jobs__main-title">{t("myJobs.title")}</h2>
        <ul className="my-jobs__list">
          <li className="my-jobs__item-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "my-jobs__item my-jobs__item--active"
                  : "my-jobs__item"
              }
              to="/viec-lam-cua-toi/ung-tuyen"
            >
              <span className="my-jobs__text">{t("myJobs.applied")}</span>
              <span className="my-jobs__count">{totalApplications}</span>
            </NavLink>
          </li>
          <li className="my-jobs__item-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "my-jobs__item my-jobs__item--active"
                  : "my-jobs__item"
              }
              to="/viec-lam-cua-toi"
              end
            >
              <span className="my-jobs__text">{t("myJobs.saved")}</span>
              <span className="my-jobs__count">0</span>
            </NavLink>
          </li>
          <li className="my-jobs__item-wrapper">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "my-jobs__item my-jobs__item--active"
                  : "my-jobs__item"
              }
              to="/viec-lam-cua-toi/xem-gan-day"
            >
              <span className="my-jobs__text">{t("myJobs.recentlyViewed")}</span>
              <span className="my-jobs__count">0</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {isLoading ? (
        <div className="my-jobs__loading">
          <p>{t("myJobs.loading")}</p>
        </div>
      ) : (
        <div className="job-seeker-section job-seeker-section--custom4">
          <Outlet
            context={{
              applicationList,
              setPagination,
              setSort,
              totalApplications,
              pagination,
              sort,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MyJobs;
