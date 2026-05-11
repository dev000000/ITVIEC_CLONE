package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.entity.city.City;

@Mapper(componentModel = "spring")
public interface CityMapper {
    List<CityResponse> toCityResponse(List<City> cities);

    CityResponse toCityResponse(City city);
}
