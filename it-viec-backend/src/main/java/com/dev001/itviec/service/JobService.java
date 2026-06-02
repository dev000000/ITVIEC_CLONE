package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;

public interface JobService {

    JobDetailResponse getJobBySlug(String slug);

    JobDetailResponse createJob(JobCreateRequest jobCreateRequest);

    List<JobDetailResponse> getJobsByCurrentEmployer(String title, JobStatus status, JobType jobType, Long cityId);

    PageResponse<JobCardResponse> getJobCards(int page, int size);

    JobDetailResponse updateJob(Long id, JobUpdateRequest request);

    String normalizeToSlug(String input);

    String generateSlug(String jobTitle, String companyName, Long jobId);
}
