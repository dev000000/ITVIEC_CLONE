package com.dev001.itviec.mapper;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.CountryResponse;
import com.dev001.itviec.entity.country.Country;

@Mapper(componentModel = "spring")
public interface CountryMapper {
    CountryResponse toCountryResponse(Country country);
}
