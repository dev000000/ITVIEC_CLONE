package com.dev001.itviec.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.enums.JobStatus;

public interface JobRepository extends JpaRepository<Job, Long>, JpaSpecificationExecutor<Job> {

    @Override
    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findById(Long id);

    @Override
    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findAll(Specification<Job> spec);

    @Override
    @EntityGraph(attributePaths = {"company", "company.country", "city", "skills"})
    Page<Job> findAll(Specification<Job> spec, Pageable pageable);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findBySlug(String slug);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findBySlugAndStatus(String slug, JobStatus status);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    @Query("SELECT j FROM Job j WHERE j.slug = :slug AND j.status = com.dev001.itviec.enums.JobStatus.ACTIVE"
            + " AND j.postedAt <= :now AND (j.expiresAt IS NULL OR j.expiresAt > :now)")
    Optional<Job> findPublicVisibleBySlug(@Param("slug") String slug, @Param("now") LocalDateTime now);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findByIdAndStatus(Long id, JobStatus status);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findByCompany(Company company);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Page<Job> findByStatus(JobStatus status, Pageable pageable);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findByCompanyAndStatus(Company company, JobStatus status);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findByIdAndCompany(Long id, Company company);

    long countByCompanyAndStatus(Company company, JobStatus status);

    /**
     * Bulk-update ACTIVE jobs whose expires_at is non-null and <= now to EXPIRED.
     * Used by the hourly scheduler to auto-expire jobs.
     */
    @Modifying
    @Query("UPDATE Job j SET j.status = com.dev001.itviec.enums.JobStatus.EXPIRED, "
            + "j.updatedAt = :now "
            + "WHERE j.status = com.dev001.itviec.enums.JobStatus.ACTIVE "
            + "AND j.expiresAt IS NOT NULL AND j.expiresAt <= :now")
    int expireOverdueJobs(@Param("now") LocalDateTime now);
}
