package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.CountryResponse;

import java.util.List;

public interface CountryService {

    List<CountryResponse> getAllCountries();
}
