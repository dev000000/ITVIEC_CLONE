package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.ApplicationResponse;

import java.util.List;

public interface ApplicationService {
    List<ApplicationResponse> getAllApplications();
}
