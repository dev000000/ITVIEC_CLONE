package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.mapper.CityMapper;
import com.dev001.itviec.repository.CityRepository;
import com.dev001.itviec.service.CityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
