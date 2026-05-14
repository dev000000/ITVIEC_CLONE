package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.EmployerUpdateRequest;
import com.dev001.itviec.dto.response.EmployerResponse;
import com.dev001.itviec.entity.employer.Employer;

import java.util.List;

public interface EmployerService {

    Employer getEmployerByCookie();

    EmployerResponse getMyProfile();

    EmployerResponse updateMyProfile(EmployerUpdateRequest request);

    List<EmployerResponse> getAllEmployers();

    EmployerResponse getEmployerById(String id);
}
