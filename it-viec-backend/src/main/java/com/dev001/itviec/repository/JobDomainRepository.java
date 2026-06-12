package com.dev001.itviec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.jobdomain.JobDomain;
import com.dev001.itviec.enums.SkillStatus;

public interface JobDomainRepository extends JpaRepository<JobDomain, Long> {
    boolean existsByDomainNameIgnoreCase(String domainName);

    boolean existsByDomainNameIgnoreCaseAndIdNot(String domainName, Long id);

    List<JobDomain> findAllByStatusOrderByDomainNameAsc(SkillStatus status);

    @Query(
            """
		SELECT jd FROM JobDomain jd
		WHERE (:status IS NULL OR jd.status = :status)
		AND (:search IS NULL OR :search = '' OR LOWER(jd.domainName) LIKE LOWER(CONCAT('%', :search, '%')))
		ORDER BY jd.domainName ASC
		""")
    Page<JobDomain> findAllWithFilter(
            @Param("status") SkillStatus status, @Param("search") String search, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM jobs WHERE job_domain_id = :id", nativeQuery = true)
    long countJobUsage(@Param("id") Long id);
}
