package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CountryResponse;
import com.dev001.itviec.entity.country.Country;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CountryMapper {
    CountryResponse toCountryResponse(Country country);
}
