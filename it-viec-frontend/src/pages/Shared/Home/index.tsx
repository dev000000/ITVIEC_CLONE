import { useEffect, useState } from "react";
import CampaignHighLight from "@/components/CampaignHighLight";
import TopJob from "@/components/TopJob";
import SearchFormHome from "@/components/SearchFormHome";
import { getAllJobsApi } from "@/services_new/jobApi";
import { getAllCompaniesApi } from "@/services_new/companyApi";
import type { CompanyCardResponse, JobCardResponse } from "@/types/response.types";
import TopCompanies from "@/components/TopCompanies";

function Home() {
  const [companyList, setCompanyList] = useState<CompanyCardResponse[]>([]);
  const [jobList, setJobList] = useState<JobCardResponse[]>([]);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const [companiesResponse, jobsResponse] = await Promise.all([
          getAllCompaniesApi(),
          getAllJobsApi(0, 10),
        ]);

        setCompanyList(companiesResponse.data.result ?? []);
        setJobList(jobsResponse.data.result.data ?? []);
        setTotalJobs(jobsResponse.data.result.totalElements ?? 0);
      } catch (error) {
        console.log("Loi khi load company hoac job....", error);
      }
    };
    getData();
  }, []);
  return (
    <>
      <SearchFormHome jobList={jobList} />
      <CampaignHighLight />
      <TopCompanies companyList={companyList}/>
      <TopJob jobList={jobList} totalJobs={totalJobs} />
    </>
  );
}
export default Home;
