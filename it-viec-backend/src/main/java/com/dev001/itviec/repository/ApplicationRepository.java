package com.dev001.itviec.repository;

import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {

    Optional<Application> findBySeekerAndJob(Seeker seeker, Job job);

    boolean existsBySeekerAndJob(Seeker seeker, Job job);

    List<Application> findBySeeker(Seeker seeker);
}
