package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.entity.application.Application;

@Mapper(
        componentModel = "spring",
        uses = {SeekerMapper.class, JobMapper.class, CityMapper.class})
public interface ApplicationMapper {
    List<ApplicationResponse> toApplicationResponse(List<Application> applications);

    ApplicationResponse toApplicationResponse(Application application);
}
