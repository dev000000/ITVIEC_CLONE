package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.EmployerUpdateRequest;
import com.dev001.itviec.dto.response.EmployerResponse;
import com.dev001.itviec.entity.employer.Employer;

public interface EmployerService {

    Employer getEmployerByCookie();

    EmployerResponse getMyProfile();

    EmployerResponse updateMyProfile(EmployerUpdateRequest request);

    List<EmployerResponse> getAllEmployers();

    EmployerResponse getEmployerById(String id);
}
