package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import com.dev001.itviec.entity.employer.Employer;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.company.Company;
import org.springframework.data.jpa.repository.Query;

public interface CompanyRepository extends JpaRepository<Company, String> {

    Optional<Company> findById(String id);

    @EntityGraph(attributePaths = {"jobs"})
    @Query("SELECT DISTINCT c FROM Company c")
    List<Company> findAllWithJobs();

    Optional<Company> findByEmployer(Employer employer);
}
