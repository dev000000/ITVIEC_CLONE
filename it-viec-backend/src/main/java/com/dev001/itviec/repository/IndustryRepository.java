package com.dev001.itviec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.industry.Industry;
import com.dev001.itviec.enums.SkillStatus;

public interface IndustryRepository extends JpaRepository<Industry, Long> {
    boolean existsByIndustryNameIgnoreCase(String industryName);

    boolean existsByIndustryNameIgnoreCaseAndIdNot(String industryName, Long id);

    List<Industry> findAllByStatusOrderByIndustryNameAsc(SkillStatus status);

    @Query(
            """
		SELECT i FROM Industry i
		WHERE (:status IS NULL OR i.status = :status)
		AND (:search IS NULL OR :search = '' OR LOWER(i.industryName) LIKE LOWER(CONCAT('%', :search, '%')))
		ORDER BY i.industryName ASC
		""")
    Page<Industry> findAllWithFilter(
            @Param("status") SkillStatus status, @Param("search") String search, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM companies WHERE industry_id = :id", nativeQuery = true)
    long countCompanyUsage(@Param("id") Long id);
}
