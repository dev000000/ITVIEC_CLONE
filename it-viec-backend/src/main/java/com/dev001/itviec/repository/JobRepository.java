package com.dev001.itviec.repository;

import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {

    Optional<Job> findBySlug(String slug);

}
