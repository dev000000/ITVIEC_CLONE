package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;

public interface JobService {

    //    List<JobResponse> getAllJobsActive();

    JobDetailResponse getJobBySlug(String slug);

    JobDetailResponse createJob(JobCreateRequest jobCreateRequest);

    JobDetailResponse updateJob(String slug, JobDetailResponse job);

    List<JobDetailResponse> getJobsByCompanyId(String companyId);

    void deleteJob(String slug);

    List<JobDetailResponse> getJobsByCurrentEmployer();

    PageResponse<JobCardResponse> getJobCards(int page, int size);
}
