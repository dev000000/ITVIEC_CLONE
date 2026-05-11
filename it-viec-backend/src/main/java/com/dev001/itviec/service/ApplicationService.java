package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.ApplicationResponse;

public interface ApplicationService {
    List<ApplicationResponse> getAllApplications();
}
