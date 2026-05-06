package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.entity.application.Application;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SeekerMapper.class, JobMapper.class, CityMapper.class})
public interface ApplicationMapper {
    List<ApplicationResponse> toApplicationResponse(List<Application> applications);
    ApplicationResponse toApplicationResponse(Application application);
}
