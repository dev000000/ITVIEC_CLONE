import { useLayoutEffect, useRef, useState } from "react";

interface UseVisibleTagCountOptions {
  childClassName?: string;
  gap?: number;
}

export const useVisibleTagCount = <T>(
  items: T[],
  options: UseVisibleTagCountOptions = {},
) => {
  const { childClassName = "tag-skill", gap = 5 } = options;
  const tagListRef = useRef<HTMLDivElement>(null);
  const [visibleTagsCount, setVisibleTagsCount] = useState(items.length);

  useLayoutEffect(() => {
    const measureVisibleTags = () => {
      const tagList = tagListRef.current;
      if (!tagList) {
        setVisibleTagsCount(items.length);
        return;
      }

      const tagElements = tagList.getElementsByClassName(
        childClassName,
      ) as HTMLCollectionOf<HTMLElement>;
      const wrapperWidth = tagList.offsetWidth;
      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < tagElements.length; i++) {
        totalWidth += tagElements[i].offsetWidth + gap;
        if (totalWidth > wrapperWidth) {
          break;
        }
        count++;
      }

      setVisibleTagsCount(count);
    };

    measureVisibleTags();
    window.addEventListener("resize", measureVisibleTags);

    return () => {
      window.removeEventListener("resize", measureVisibleTags);
    };
  }, [childClassName, gap, items.length]);

  return {
    tagListRef,
    visibleTagsCount,
  };
};
