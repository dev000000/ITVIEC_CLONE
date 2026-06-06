import { useEffect, useState } from "react";
import { getAllCitiesApi } from "@/services/cityApi";
import { getPopularTagsApi } from "@/services/tagApi";
import type { CityResponse, PopularTagResponse } from "@/types/response.types";

export const useSearchMetadata = () => {
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [popularTags, setPopularTags] = useState<PopularTagResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMetadata = async () => {
      try {
        const [citiesResponse, tagsResponse] = await Promise.all([
          getAllCitiesApi(),
          getPopularTagsApi(),
        ]);

        if (!isMounted) {
          return;
        }

        setCities(citiesResponse.data.result ?? []);
        setPopularTags(tagsResponse.data.result ?? []);
      } catch (error) {
        console.error("Error loading search metadata:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    cities,
    popularTags,
    isLoading,
  };
};

export default useSearchMetadata;
