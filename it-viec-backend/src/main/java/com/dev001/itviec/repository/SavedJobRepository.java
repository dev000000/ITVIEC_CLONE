package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.savedjob.SavedJob;
import com.dev001.itviec.entity.seeker.Seeker;

public interface SavedJobRepository extends JpaRepository<SavedJob, String> {

    Optional<SavedJob> findBySeekerAndJob(Seeker seeker, Job job);

    boolean existsBySeekerAndJob(Seeker seeker, Job job);

    long countBySeeker(Seeker seeker);

    void deleteBySeekerAndJob(Seeker seeker, Job job);

    Page<SavedJob> findBySeeker(Seeker seeker, Pageable pageable);

    @Query("SELECT sj.job.id FROM SavedJob sj WHERE sj.seeker = :seeker")
    List<Long> findJobIdsBySeeker(@Param("seeker") Seeker seeker);
}
