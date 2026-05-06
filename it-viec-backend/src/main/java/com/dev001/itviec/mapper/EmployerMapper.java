package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.EmployerResponse;
import com.dev001.itviec.entity.employer.Employer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface EmployerMapper {
    List<EmployerResponse> toEmployerResponse(List<Employer> employers);
    EmployerResponse toEmployerResponse(Employer employer);
}
