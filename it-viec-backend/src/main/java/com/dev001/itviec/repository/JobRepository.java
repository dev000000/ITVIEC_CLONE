package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.job.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    Optional<Job> findBySlug(String slug);
    List<Job> findByCompanyId(String companyId);
}
