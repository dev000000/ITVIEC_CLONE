package com.dev001.itviec.service;

import java.time.LocalDate;
import java.util.List;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;

public interface JobService {

    JobDetailResponse getJobBySlug(String slug);

    JobDetailResponse createJob(JobCreateRequest jobCreateRequest);

    List<JobDetailResponse> getJobsByCurrentEmployer(String title, JobStatus status, JobType jobType, Long cityId);

    PageResponse<JobCardResponse> getJobCards(int page, int size);

    PageResponse<JobCardResponse> searchJobs(
            int page, int size, String keyword, Long cityId, JobType jobType, ExperienceLevel experienceLevel);

    JobDetailResponse updateJob(Long id, JobUpdateRequest request);

    PageResponse<JobDetailResponse> getAdminJobs(
            int page,
            int size,
            String title,
            String companyName,
            JobStatus status,
            JobType jobType,
            Long cityId,
            LocalDate postedAtFrom,
            LocalDate postedAtTo);

    JobDetailResponse getAdminJobById(Long id);

    JobDetailResponse updateJobStatusByAdmin(Long id, JobStatus status);

    void deleteJobByCurrentEmployer(Long id);

    void deleteJobByAdmin(Long id);

    String normalizeToSlug(String input);

    String generateSlug(String jobTitle, String companyName, Long jobId);
}
