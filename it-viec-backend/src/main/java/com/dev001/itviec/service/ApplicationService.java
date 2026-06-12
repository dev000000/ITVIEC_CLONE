package com.dev001.itviec.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.request.ApplicationUpdateRequest;
import com.dev001.itviec.dto.response.ApplicationCheckResponse;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.ApplicationStatus;

public interface ApplicationService {
    List<ApplicationResponse> getAllApplications();

    ApplicationCreateResponse applyToJob(Long id, ApplicationRequest request, MultipartFile cvFile, String cvId);

    List<ApplicationResponse> getMyApplications();

    ApplicationCheckResponse hasAppliedToJob(Long id);

    PageResponse<ApplicationResponse> getMyCompanyApplications(
            int page, int size, ApplicationStatus status, String jobTitle);

    ApplicationResponse getMyApplicationById(String id);

    ApplicationResponse getApplicationById(String id);

    List<ApplicationResponse> getApplicationsByJobId(Long id);

    ApplicationResponse updateApplicationStatus(String id, ApplicationUpdateRequest request);
}
