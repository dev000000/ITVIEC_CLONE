package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;

import java.util.List;

public interface ApplicationService {
    List<ApplicationResponse> getAllApplications();

    ApplicationCreateResponse applyToJob(Long id, ApplicationRequest request);

    List<ApplicationResponse> getMyApplications();

    List<ApplicationResponse> getMyCompanyApplications();

    ApplicationResponse getMyApplicationById(String id);

    ApplicationResponse getApplicationById(String id);
}
