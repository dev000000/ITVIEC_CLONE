import { useEffect, useState } from "react";
import CampaignHighLight from "@/components/CampaignHighLight";
import TopJob from "@/components/TopJob";
import { getJobDetails } from "@/services/Shared";
import SearchFormHome from "@/components/SearchFormHome";

function Home() {
  // const [companyList , setCompanyList] = useState([]);
  const [jobList, setJobList] = useState<unknown[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        // const companies = await getCompanyDetails();
        const jobs = await getJobDetails();
        console.log("job", jobs);

        // setCompanyList(companies || []);
        setJobList((jobs.data?.result as unknown[]) || []);
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
      {/* <TopCompanies companyList={companyList}/> */}
      <TopJob jobList={jobList} />
    </>
  );
}
export default Home;
