package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

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
    Optional<Job> findByIdAndStatus(Long id, JobStatus status);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findByCompany(Company company);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Page<Job> findByStatus(JobStatus status, Pageable pageable);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findByCompanyAndStatus(Company company, JobStatus status);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findByIdAndCompany(Long id, Company company);
}
