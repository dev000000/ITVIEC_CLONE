package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.job.Job;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {SeekerMapper.class, CityMapper.class})
public interface ApplicationMapper {
    List<ApplicationResponse> toApplicationResponse(List<Application> applications);

    ApplicationResponse toApplicationResponse(Application application);

    ApplicationCreateResponse toApplicationCreateResponse(Application application);

    List<ApplicationCreateResponse> toApplicationCreateResponse(List<Application> applications);

    JobDetailResponse toJobDetailResponse(Job job);

    @AfterMapping
    default void setResumePreviewUrl(Application application, @MappingTarget ApplicationResponse response) {
        if (application.getSeeker() != null && application.getResumeUrl() != null) {
            String seekerId = application.getSeeker().getId();
            response.setResumePreviewUrl("/api/v1/seekers/" + seekerId + "/cv/preview");
        }
    }

    @AfterMapping
    default void setResumePreviewUrl(Application application, @MappingTarget ApplicationCreateResponse response) {
        if (application.getSeeker() != null && application.getResumeUrl() != null) {
            String seekerId = application.getSeeker().getId();
            response.setResumePreviewUrl("/api/v1/seekers/" + seekerId + "/cv/preview");
        }
    }
}
