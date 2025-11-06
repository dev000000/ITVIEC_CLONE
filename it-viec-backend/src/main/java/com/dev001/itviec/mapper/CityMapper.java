package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.entity.city.City;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {
    List<CityResponse> toCityResponse(List<City> cities);
}
