import type { FC } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetail from "@/pages/Shared/JobDetail";
import JobSearch from "@/pages/Shared/JobSearch";
import { getJobBySlugApi } from "@/services/jobApi";

const RouteDecider: FC = () => {
  const { param1, param2 } = useParams<"param1" | "param2">();
  const [isChecking, setIsChecking] = useState(true);
  const [isSlug, setIsSlug] = useState(false);

  useEffect(() => {
    const checkSlug = async () => {
      if (!param1) {
        setIsChecking(false);
        setIsSlug(false);
        return;
      }

      try {
        const result = await getJobBySlugApi(param1);
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

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (isSlug) {
    return <JobDetail slug={param1 || ""} />;
  }

  return <JobSearch keywordSegment={param1} citySegment={param2} />;
};

RouteDecider.displayName = "RouteDecider";

export default RouteDecider;
