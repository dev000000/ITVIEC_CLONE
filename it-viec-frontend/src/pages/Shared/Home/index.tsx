import { useEffect, useState } from "react";
import CampaignHighLight from "@/components/CampaignHighLight";
import TopJob from "@/components/TopJob";
import SearchFormHome from "@/components/SearchFormHome";
import { getAllJobsApi } from "@/services/jobApi";
import { getAllCompaniesApi } from "@/services/companyApi";
import type { CompanyCardResponse, JobCardResponse } from "@/types/response.types";
import TopCompanies from "@/components/TopCompanies";
import { getApiErrorMessage } from "@/utils/apiError";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

// 1.1 Home page sẽ hiển thị các thành phần sau:
// - SearchFormHome: form tìm kiếm việc làm ở phần đầu trang
// - CampaignHighLight: phần highlight các chiến dịch tuyển dụng nổi bật
// - TopCompanies: phần hiển thị các công ty hàng đầu
// - TopJob: phần hiển thị các việc làm hàng đầu
function Home() {
  console.log("1.1.Home component rendered");
  
  const { t } = useTranslation("shared");
  // State lưu danh sách công ty
  const [companyList, setCompanyList] = useState<CompanyCardResponse[]>([]);

  // State lưu danh sách việc làm
  const [jobList, setJobList] = useState<JobCardResponse[]>([]);

  // State lưu tổng số việc làm
  const [totalJobs, setTotalJobs] = useState<number>(0);

  // Khi component được mount lên thì sẽ gọi API để lấy danh sách công ty và việc làm
  useEffect(() => {
    const getData = async () => {
      try {
        const [companiesResponse, jobsResponse] = await Promise.all([
          // Lấy 9 công ty đầu tiên để hiển thị trên trang chủ
          getAllCompaniesApi(0, 9),
          // Lấy 8 việc làm đầu tiên để hiển thị trên trang chủ
          getAllJobsApi(0, 8),
        ]);
        // console.log("Companies API response:", companiesResponse);
        // console.log("Jobs API response:", jobsResponse);

        // Cập nhật state với dữ liệu nhận được từ API
        setCompanyList(companiesResponse.data.result.data ?? []);
        setJobList(jobsResponse.data.result.data ?? []);
        setTotalJobs(jobsResponse.data.result.totalElements ?? 0);
      } catch (error) {
        // Hiển thị thông báo lỗi nếu có lỗi xảy ra khi gọi API
        Swal.fire({
          icon: "error",
          title: t("home.notifications.oops"),
          text: getApiErrorMessage(error, t),
        });
        // Log lỗi chi tiết ra console để dễ dàng debug
        console.error("Error fetching data for Home page:", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {/* Hiển thị form tìm kiếm việc làm */}
      <SearchFormHome totalJobs={totalJobs} />
      {/* Hiển thị các chiến dịch tuyển dụng nổi bật */}
      <CampaignHighLight />
      {/* Hiển thị các công ty hàng đầu */}
      <TopCompanies companyList={companyList} />
      {/* Hiển thị các việc làm hàng đầu */}
      <TopJob jobList={jobList} totalJobs={totalJobs} />
    </>
  );
}
export default Home;
