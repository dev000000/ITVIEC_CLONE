package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import com.dev001.itviec.entity.company.Company;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dev001.itviec.entity.job.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    @Query("select j from Job j")
    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findAllWithDetails();

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    Optional<Job> findBySlug(String slug);

    @EntityGraph(attributePaths = {"company", "city", "skills"})
    List<Job> findByCompany(Company company);
}
