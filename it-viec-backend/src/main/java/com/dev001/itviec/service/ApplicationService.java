package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.request.ApplicationUpdateRequest;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.ApplicationStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplicationService {
    List<ApplicationResponse> getAllApplications();

    ApplicationCreateResponse applyToJob(Long id, ApplicationRequest request, MultipartFile cvFile);

    List<ApplicationResponse> getMyApplications();

    PageResponse<ApplicationResponse> getMyCompanyApplications(int page, int size, ApplicationStatus status, String jobTitle);

    ApplicationResponse getMyApplicationById(String id);

    ApplicationResponse getApplicationById(String id);

    List<ApplicationResponse> getApplicationsByJobId(Long id);

    ApplicationResponse updateApplicationStatus(String id, ApplicationUpdateRequest request);
}
