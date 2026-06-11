package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.EmployerRegistrationResponse;

public interface AdminEmployerRegistrationService {

    List<EmployerRegistrationResponse> getPendingRegistrations();

    void approveRegistration(String userId);

    void rejectRegistration(String userId, String reason);
}
