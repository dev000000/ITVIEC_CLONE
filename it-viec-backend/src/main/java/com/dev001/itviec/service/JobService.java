package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.dto.response.PageResponse;

public interface JobService {

//    List<JobResponse> getAllJobsActive();

    JobResponse getJobBySlug(String slug);

    JobResponse createJob(JobCreateRequest jobCreateRequest);

    JobResponse updateJob(String slug, JobResponse job);

    List<JobResponse> getJobsByCompanyId(String companyId);

    void deleteJob(String slug);

    List<JobResponse> getJobsByCurrentEmployer();

    PageResponse<JobCardResponse> getJobCards(int page, int size);
}
