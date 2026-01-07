package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.entity.job.Job;

public interface JobService {

//    List<JobResponse> getAllJobs();
    List<Job> getAllJobs();

    JobResponse getJobBySlug(String slug);

    JobResponse createJob(JobCreateRequest jobCreateRequest);

    JobResponse updateJob(String slug, JobResponse job);

    List<Job> getJobsByCompanyId(String companyId);

    void deleteJob(String slug);
}
