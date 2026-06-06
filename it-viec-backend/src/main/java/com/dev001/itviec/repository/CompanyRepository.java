package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.enums.JobStatus;

public interface CompanyRepository extends JpaRepository<Company, String>, JpaSpecificationExecutor<Company> {

    Optional<Company> findById(String id);

    @Override
    @EntityGraph(attributePaths = {"country"})
    Page<Company> findAll(Specification<Company> spec, Pageable pageable);

    @EntityGraph(attributePaths = {"employer", "country", "companySkills"})
    Optional<Company> findByEmployer(Employer employer);

    boolean existsByEmployer(Employer employer);

    /**
     * Fetch all companies cùng với số lượng job theo status nhất định.
     * Dùng LEFT JOIN để vẫn trả về company dù không có job nào.
     */
    @Query("""
			SELECT c, COUNT(j)
			FROM Company c
			LEFT JOIN c.jobs j ON j.status = :status
			GROUP BY c
			""")
    List<Object[]> findAllCompaniesWithJobCountActive(@Param("status") JobStatus status);

    @EntityGraph(attributePaths = {"jobs"})
    Optional<Company> findBySlug(String slug);
}
