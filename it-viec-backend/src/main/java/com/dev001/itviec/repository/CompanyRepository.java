package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.enums.JobStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.company.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends JpaRepository<Company, String> {

    Optional<Company> findById(String id);

    @EntityGraph(attributePaths = {"jobs"})
    @Query("SELECT DISTINCT c FROM Company c")
    List<Company> findAllWithJobs();

    Optional<Company> findByEmployer(Employer employer);

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
}
