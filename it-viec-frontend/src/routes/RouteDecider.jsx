import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetail from "../pages/Shared/JobDetail";
import JobSearch from "../pages/Shared/JobSearch";
import { getJobBySlug } from "../services/Shared";

function RouteDecider() {
  const { param1, param2 } = useParams();
  const [isChecking, setIsChecking] = useState(true);
  const [isSlug, setIsSlug] = useState(false);
  useEffect(() => {
    const checkSlug = async () => {
      try {
        const result = await getJobBySlug(param1);
        if (result && result.length > 0) {
          setIsSlug(true);
        } else {
          setIsSlug(false);
        }
      } catch (error) {
        console.error("Error checking slug:", error);
        setIsSlug(false);
      } finally {
        setIsChecking(false);
      }
    };
    checkSlug();
  }, [param1]);
  if (isChecking) {
    return <div>Loading...</div>;
  }
  if (isSlug) {
    return <JobDetail slug={param1} />;
  }
  if (param2) {
    return <JobSearch keyword={param1} city={param2} />;
  }
  return <JobSearch keyword={param1} />
}

export default RouteDecider;
