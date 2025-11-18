package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.entity.company.Company;

import java.util.List;

public interface CompanyService {
    List<CompanyResponse> getAllCompanies();
}
