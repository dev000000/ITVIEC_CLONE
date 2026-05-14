package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;

import java.util.List;

public interface JobService {

    JobDetailResponse getJobBySlug(String slug);

    JobDetailResponse createJob(JobCreateRequest jobCreateRequest);

    List<JobDetailResponse> getJobsByCurrentEmployer();

    PageResponse<JobCardResponse> getJobCards(int page, int size);

    JobDetailResponse updateJob(Long id, JobUpdateRequest request);

    String normalizeToSlug(String input);

    String generateSlug(String jobTitle, String companyName, Long jobId);
}
