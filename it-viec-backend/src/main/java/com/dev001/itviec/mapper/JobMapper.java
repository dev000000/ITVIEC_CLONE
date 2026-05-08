package com.dev001.itviec.mapper;

import java.util.List;

import com.dev001.itviec.dto.response.CompanyBaseResponse;
import com.dev001.itviec.dto.response.CompanyBriefResponse;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.entity.company.Company;
import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.entity.job.Job;

@Mapper(componentModel = "spring", uses = {CityMapper.class, SkillMapper.class, })
public interface JobMapper {
    List<JobDetailResponse> toJobDetailResponse(List<Job> jobs);
    JobDetailResponse toJobDetailResponse(Job job);

    JobCardResponse toJobCardResponse(Job job);
    List<JobCardResponse> toJobCardResponse(List<Job> jobs);

    CompanyBriefResponse toCompanyBriefResponse(Company company);
    CompanyBaseResponse toCompanyBaseResponse(Company company);

}
