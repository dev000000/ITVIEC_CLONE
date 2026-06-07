package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.CityCreateRequest;
import com.dev001.itviec.dto.response.CityResponse;

public interface CityService {

    List<CityResponse> getAllCities();

    CityResponse createCity(CityCreateRequest request);
}
