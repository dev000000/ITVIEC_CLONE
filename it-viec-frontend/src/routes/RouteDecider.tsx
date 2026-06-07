import type { FC } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetail from "@/pages/Shared/JobDetail";
import JobSearch from "@/pages/Shared/JobSearch";
import { getJobBySlugApi } from "@/services/jobApi";
import type { CityResponse } from "@/types/response.types";
import { getAllCitiesApi } from "@/services/cityApi";
import { fromSlug, getCityBySegment } from "@/utils/jobSearch";

// 1.4.2 & 1.4.3 Sử dụng để điều hướng thông minh giữa trang JobSearch và JobDetail dựa trên param trong URL
const RouteDecider: FC = () => {
  console.log("RouteDecider rendered with params:", useParams());

  // Lấy param1 và param2 từ URL (ví dụ: /viec-lam-it/:param1/:param2)
  const { param1, param2 } = useParams<"param1" | "param2">();

  // State để theo dõi quá trình kiểm tra slug và kết quả có phải là slug hợp lệ hay không
  const [isChecking, setIsChecking] = useState(true);
  const [isSlug, setIsSlug] = useState(false);

  // State để lưu danh sách cities để kiểm tra param có phải là city segment hay không
  const [cities, setCities] = useState<CityResponse[]>([]);

  // Hàm check slug sẽ được gọi khi component mount hoặc khi param1 thay đổi
  useEffect(() => {
    const checkSlug = async () => {
      if (!param1) {
        setIsChecking(false);
        setIsSlug(false);
        return;
      }

      try {
        const result = await getJobBySlugApi(param1);
        console.log("Slug check result:", result);
        setIsSlug(Boolean(result.data.result));
      } catch (error) {
        console.error("Error checking slug:", error);
        setIsSlug(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkSlug();
  }, [param1]);

  // Hàm lấy về danh sách cities để kiểm tra param có phải là city segment hay không
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data: citiesData } = await getAllCitiesApi();
        // console.log("Fetched cities:", citiesData);
        setCities(citiesData.result || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);



  // Early return nếu đang kiểm tra slug
  if (isChecking) {
    return <div>Loading...</div>;
  }
  // Check xem param1 có phải là city segment không
  const city = getCityBySegment(param1, cities);

  // Check xem hiện tại có những param nào và điều hướng tương ứng
  const isParam1 = Boolean(param1);
  const isParam2 = Boolean(param2);

  switch (true) {
    case !isParam1 && !isParam2:
      return <JobSearch />;
    case isParam1 && !isParam2:
      // Nếu chỉ có 1 param1, có 3 trường hợp: slug hợp lệ, city segment, hoặc keyword segment
      if (isSlug) {
        return <JobDetail slug={param1} />;
      }
      if (city) {
        return <JobSearch citySegment={city.slug} />;
      }
      return <JobSearch keywordSegment={fromSlug(param1)} />;
    case isParam1 && isParam2:
      return <JobSearch keywordSegment={fromSlug(param1)} citySegment={param2} />;
    default:
      return <JobSearch />;
  }
};

export default RouteDecider;
