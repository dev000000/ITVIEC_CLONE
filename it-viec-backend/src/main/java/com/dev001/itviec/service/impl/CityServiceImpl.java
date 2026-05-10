package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.CITY_NAME_EXISTED;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.CityMapper;
import com.dev001.itviec.repository.CityRepository;
import com.dev001.itviec.service.CityService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityMapper cityMapper;
    private final CityRepository cityRepository;

    @Override
    public List<CityResponse> getAllCities() {
        return cityMapper.toCityResponse(cityRepository.findAll());
    }

    @Override
    public CityResponse createCity(String cityName) {

        // 1. check city exist
        boolean isCityNameExisted = cityRepository.existsByCityName(cityName);
        if (isCityNameExisted) {
            throw new AppException(CITY_NAME_EXISTED);
        }

        // 2. create city
        City city = City.builder().cityName(cityName).build();

        // 3. save city
        City saved = cityRepository.save(city);

        // 4. return city
        return cityMapper.toCityResponse(saved);
    }
}
