package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.*;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;

@Mapper(
        componentModel = "spring",
        uses = {EmployerMapper.class, CountryMapper.class, SkillMapper.class})
public interface CompanyMapper {
    List<CompanyDetailResponse> toCompanyDetailResponse(List<Company> companies);

    List<CompanyBaseResponse> toCompanyBaseResponse(List<Company> companies);

    List<CompanyBriefResponse> toCompanyBriefResponse(List<Company> companies);

    List<CompanyCardResponse> toCompanyCardResponse(List<Company> companies);

    CompanyBaseResponse toCompanyBaseResponse(Company company);

    CompanyDetailResponse toCompanyDetailResponse(Company company);

    CompanyBriefResponse toCompanyBriefResponse(Company company);

    CompanyCardResponse toCompanyCardResponse(Company company);

    JobCardResponse toJobCardResponse(Job job);
}
