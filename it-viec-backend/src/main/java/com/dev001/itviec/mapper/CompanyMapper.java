package com.dev001.itviec.mapper;

import java.util.List;

import com.dev001.itviec.dto.response.CompanySummaryResponse;
import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.CompanyResponse;
import com.dev001.itviec.entity.company.Company;

@Mapper(componentModel = "spring",uses = {EmployerMapper.class, CountryMapper.class, SkillMapper.class, JobMapper.class})
public interface CompanyMapper {
    List<CompanyResponse> toCompanyResponse(List<Company> companies);
    List<CompanySummaryResponse> toCompanySummaryResponse(List<Company> companies);

    CompanySummaryResponse toCompanySummaryResponse(Company company);
    CompanyResponse toCompanyResponse(Company company);
}
