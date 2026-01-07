package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.entity.job.Job;

@Mapper(componentModel = "spring")
public interface JobMapper {
    List<JobResponse> toJobResponse(List<Job> jobs);

    JobResponse toJobResponse(Job job);
}
