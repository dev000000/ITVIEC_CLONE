package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.CountryResponse;
import com.dev001.itviec.mapper.CountryMapper;
import com.dev001.itviec.repository.CountryRepository;
import com.dev001.itviec.service.CountryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CountryServiceImpl implements CountryService {

    private final CountryMapper countryMapper;
    private final CountryRepository countryRepository;

    @Override
    public List<CountryResponse> getAllCountries() {
        return countryMapper.toCountryResponse(countryRepository.findAll());
    }
}
