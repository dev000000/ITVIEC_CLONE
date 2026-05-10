package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.EmployerResponse;
import com.dev001.itviec.entity.employer.Employer;

@Mapper(
        componentModel = "spring",
        uses = {UserMapper.class})
public interface EmployerMapper {
    List<EmployerResponse> toEmployerResponse(List<Employer> employers);

    EmployerResponse toEmployerResponse(Employer employer);
}
