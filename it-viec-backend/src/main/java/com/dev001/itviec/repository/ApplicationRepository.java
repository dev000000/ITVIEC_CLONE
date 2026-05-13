package com.dev001.itviec.repository;

import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, String> {

    Optional<Application> findBySeekerAndJob(Seeker seeker, Job job);

    boolean existsBySeekerAndJob(Seeker seeker, Job job);

    List<Application> findBySeeker(Seeker seeker);

    @Query("SELECT a FROM Application a JOIN a.job j WHERE j.company = :company")
    List<Application> findByCompany(@Param("company") Company company);
}
