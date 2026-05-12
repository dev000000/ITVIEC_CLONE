package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.job.Job;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {SeekerMapper.class, CityMapper.class})
public interface ApplicationMapper {
    List<ApplicationResponse> toApplicationResponse(List<Application> applications);

    ApplicationCreateResponse toApplicationCreateResponse(Application application);

    JobDetailResponse toJobDetailResponse(Job job);
}
