package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CountryResponse;
import com.dev001.itviec.entity.country.Country;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CountryMapper {
    CountryResponse toCountryResponse(Country country);

    List<CountryResponse> toCountryResponse(List<Country> countries);
}
