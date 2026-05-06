package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.entity.job.Job;

@Mapper(componentModel = "spring", uses = {CityMapper.class, SkillMapper.class, CompanyMapper.class})
public interface JobMapper {
    List<JobResponse> toJobResponse(List<Job> jobs);

    JobResponse toJobResponse(Job job);

}
