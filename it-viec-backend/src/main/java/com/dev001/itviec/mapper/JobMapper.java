package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.skill.Skill;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JobMapper {
    List<JobResponse> toJobResponse(List<Job> jobs);
    JobResponse toJobResponse(Job job);
}
