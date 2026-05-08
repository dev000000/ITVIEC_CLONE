package com.dev001.itviec.mapper;

import java.util.List;

import com.dev001.itviec.dto.response.CompanyBaseResponse;
import com.dev001.itviec.dto.response.CompanyBriefResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.entity.job.Job;
import org.mapstruct.Mapper;

import com.dev001.itviec.entity.company.Company;

@Mapper(componentModel = "spring",uses = {EmployerMapper.class, CountryMapper.class, SkillMapper.class})
public interface CompanyMapper {
    List<CompanyDetailResponse> toCompanyDetailResponse(List<Company> companies);
    List<CompanyBaseResponse> toCompanyBaseResponse(List<Company> companies);
    List<CompanyBriefResponse> toCompanyBriefResponse(List<Company> companies);

    CompanyBaseResponse toCompanyBaseResponse(Company company);
    CompanyDetailResponse toCompanyDetailResponse(Company company);
    CompanyBriefResponse toCompanyBriefResponse(Company company);

    JobCardResponse toJobCardResponse(Job job);
}
