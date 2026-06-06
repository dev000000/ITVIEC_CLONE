package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.CountryResponse;

public interface CountryService {

    List<CountryResponse> getAllCountries();
}
