package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.entity.application.Application;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ApplicationMapper {
    List<ApplicationResponse> toApplicationResponse(List<Application> applications);
}
