// Trang quản lý việc làm của Job Seeker
// Hiển thị 3 tab điều hướng: Đã ứng tuyển / Đã lưu / Xem gần đây
// Tải toàn bộ đơn ứng tuyển từ API, phân trang và sắp xếp theo ngày ở phía client
// Truyền dữ liệu xuống tab con qua React Router Outlet context (MyJobsOutletContext)
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import "./MyJobs.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getMyApplicationsApi } from "@/services/applicationApi";
import type { ApplicationResponse, JobDetailResponse } from "@/types/response.types";
import { useSavedJobsStore } from "@/store/savedJobsStore";

// Kiểu dữ liệu cho một đơn ứng tuyển sau khi đã map từ API response
interface ApplicationItem {
  appliedAt: string;
  job?: { slug?: string; title?: string; salary?: string; salaryNegotiable?: boolean; salaryMin?: number | null; salaryMax?: number | null; salaryCurrency?: string | null };
  company?: { companyName?: string; slug?: string; logoUrl?: string | null };
  fullName: string;
  phoneNumber: string;
  resumeUrl: string;
  coverLetter: string;
  desiredLocations: string[];
  status: string;
  employerMessage?: string;
}

// Trạng thái phân trang: trang hiện tại và số item trên mỗi trang
interface PaginationState {
  current: number;
  pageSize: number;
}

// Mở rộng ApplicationResponse để bao gồm thông tin job liên kết (nếu backend trả về)
type ApplicationWithRelations = ApplicationResponse & {
  job?: Pick<JobDetailResponse, "slug" | "title" | "salary" | "company">;
};

// Context được truyền xuống các Outlet con (AppliedJobs, SavedJobs, RecentlyViewed)
// thông qua React Router — dùng useOutletContext<MyJobsOutletContext>() để đọc
export interface MyJobsOutletContext {
  applicationList: ApplicationItem[];
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  setSort: Dispatch<SetStateAction<string>>;
  totalApplications: number;
  pagination: PaginationState;
  sort: string;
}

function MyJobs() {
  const [applicationList, setApplicationList] = useState<ApplicationItem[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation("jobseeker");
  const savedCount = useSavedJobsStore((s) => s.count);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 5,
  });
  const [sort, setSort] = useState("desc");

  // Tải lại danh sách đơn ứng tuyển mỗi khi trang, kích thước trang, hoặc thứ tự sắp xếp thay đổi
  // Map dữ liệu từ API → ApplicationItem, sắp xếp theo ngày, sau đó cắt theo trang hiện tại
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplicationsApi();
        const result = (response.data.result ?? []) as ApplicationWithRelations[];
        const mappedApplications = result.map((application) => ({
          appliedAt: application.createdAt || application.updatedAt,
          // TODO(service-new-migration): ApplicationResponse hien tai co the chua tra relation `job/company`.
          // Legacy call: GET `applications?seekerId=...&_expand=job&_expand=company`.
          // Muc dich: hien thi job title, salary, company name trong tab My Jobs.
          // Tam thoi map relation neu backend tra ve, nguoc lai UI hien thi fallback `???`.
          job: application.job,
          company: {
            companyName: application.job?.company?.companyName,
            slug: application.job?.company?.slug,
            logoUrl: application.job?.company?.logoUrl,
          },
          fullName: application.fullName,
          phoneNumber: application.phoneNumber,
          resumeUrl: application.resumeUrl,
          coverLetter: application.coverLetter,
          desiredLocations:
            application.desiredLocations?.map((city) => city.cityName) ?? [],
          status: application.status,
          employerMessage: application.employerMessage,
        }));

        mappedApplications.sort((a, b) => {
          const timeA = new Date(a.appliedAt).getTime();
          const timeB = new Date(b.appliedAt).getTime();
          return sort === "asc" ? timeA - timeB : timeB - timeA;
        });

        const start = (pagination.current - 1) * pagination.pageSize;
        const end = start + pagination.pageSize;
        setTotalApplications(mappedApplications.length);
        setApplicationList(mappedApplications.slice(start, end));
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, [pagination.current, pagination.pageSize, sort]);

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
              <span className="my-jobs__count">{savedCount}</span>
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
