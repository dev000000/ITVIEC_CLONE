package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.dto.response.CompanySummaryResponse;
import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.skill.Skill;

@Mapper(componentModel = "spring")
public interface JobMapper {
    List<JobResponse> toJobResponse(List<Job> jobs);

    @Mapping(target = "jobStatus", source = "status")
    JobResponse toJobResponse(Job job);

    CompanySummaryResponse toCompanySummaryResponse(Company company);

    CityResponse toCityResponse(City city);

    SkillResponse toSkillResponse(Skill skill);
}
