package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.JobDomainResponse;
import com.dev001.itviec.entity.jobdomain.JobDomain;

@Mapper(componentModel = "spring")
public interface JobDomainMapper {
    List<JobDomainResponse> toJobDomainResponse(List<JobDomain> jobDomains);

    JobDomainResponse toJobDomainResponse(JobDomain jobDomain);
}
