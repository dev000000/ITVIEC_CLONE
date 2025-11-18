import React, { useEffect, useState } from "react";
import "./MyJobs.scss";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getApplicationsBySeekerId,
  getApplicationsBySeekerIdWithPagination,
} from "../../../services/SeekerServices";
function MyJobs() {
  const [applicationList, setApplicationList] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const seeker = useSelector((state) => state.SeekerReducer);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  const [sort , setSort] = useState("desc");
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
        <h2 className="my-jobs__main-title">Việc làm của tôi</h2>
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
              <span className="my-jobs__text">Đã ứng tuyển</span>
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
              <span className="my-jobs__text">Đã lưu</span>
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
              <span className="my-jobs__text">Đã xem gần đây</span>
              <span className="my-jobs__count">0</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {isLoading ? (
        <div className="my-jobs__loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="job-seeker-section job-seeker-section--custom4">
          <Outlet context={{ applicationList, setPagination, setSort, totalApplications, pagination , sort}} />
        </div>
      )}
    </div>
  );
}

export default MyJobs;
