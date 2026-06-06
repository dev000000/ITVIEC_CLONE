package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;

public interface ApplicationRepository
        extends JpaRepository<Application, String>, JpaSpecificationExecutor<Application> {

    Optional<Application> findBySeekerAndJob(Seeker seeker, Job job);

    boolean existsBySeekerAndJob(Seeker seeker, Job job);

    List<Application> findBySeeker(Seeker seeker);

    @Query("SELECT a FROM Application a JOIN a.job j WHERE j.company = :company")
    List<Application> findByCompany(@Param("company") Company company);

    Optional<Application> findByIdAndSeeker(String id, Seeker seeker);

    @Query("SELECT a FROM Application a JOIN a.job j WHERE j.company = :company AND a.id = :id")
    Optional<Application> findByIdAndCompany(@Param("id") String id, @Param("company") Company company);

    @Query("SELECT a FROM Application a JOIN a.job j WHERE j.company = :company AND j.id = :id")
    List<Application> findByJobIdAndCompany(@Param("id") Long id, @Param("company") Company company);
}
