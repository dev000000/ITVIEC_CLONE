import { useEffect, useState } from "react";
import CampaignHighLight from "../../../components/CampaignHighLight";
import TopCompanies from "../../../components/TopCompanies";
import TopJob from "../../../components/TopJob";
import { getCompanyDetails, getJobDetails } from "../../../services/Shared";
import SearchFormHome from "../../../components/SearchFormHome";

function Home() {
  const [companyList , setCompanyList] = useState([]);
  const [jobList , setJobList] = useState([]);
  useEffect( () => {
      const getData = async () => {
        try {
          const companies = await getCompanyDetails();
          const jobs = await getJobDetails();
          
          setCompanyList(companies || []);
          setJobList(jobs || []);
        } catch (error) {
          console.log("Loi khi load company hoac job...." , error);
        }
      }
      getData();
    },[])
  return (
    <>
      <SearchFormHome jobList={jobList} />
      <CampaignHighLight />
      <TopCompanies companyList={companyList}/>
      <TopJob jobList={jobList}/>
    </>
  );
}
export default Home;
