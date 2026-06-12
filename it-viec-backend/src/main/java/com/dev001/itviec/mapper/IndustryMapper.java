package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.IndustryResponse;
import com.dev001.itviec.entity.industry.Industry;

@Mapper(componentModel = "spring")
public interface IndustryMapper {
    List<IndustryResponse> toIndustryResponse(List<Industry> industries);

    IndustryResponse toIndustryResponse(Industry industry);
}
