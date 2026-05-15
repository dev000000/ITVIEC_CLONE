import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { useParams as UseParamsType } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import JobDetail from '@/pages/Shared/JobDetail';
import JobSearch from '@/pages/Shared/JobSearch';
// import { getJobBySlugApi } from '@/services/jobApi';

interface RouteDeciderParams {
  param1?: string;
  param2?: string;
}

/**
 * RouteDecider - Dynamic route resolver
 * Checks if param1 is a job slug or a search keyword
 */
const RouteDecider: FC = () => {
  const { param1, param2 } = useParams<RouteDeciderParams>();
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isSlug, setIsSlug] = useState<boolean>(false);

  useEffect(() => {
    const checkSlug = async (): Promise<void> => {
      if (!param1) {
        setIsChecking(false);
        return;
      }

      try {
//         const result = await getJobBySlugApi(param1);
        if (result?.data) {
          console.log('Slug exists:', result);
          setIsSlug(true);
        } else {
          setIsSlug(false);
        }
      } catch (error) {
        console.error('Error checking slug:', error);
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
    return <JobDetail slug={param1 || ''} />;
  }

  if (param2) {
    return <JobSearch keyword={param1 || ''} city={param2} />;
  }

  return <JobSearch keyword={param1 || ''} />;
};

RouteDecider.displayName = 'RouteDecider';

export default RouteDecider;
