package com.dev001.itviec.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.mapper.ApplicationMapper;
import com.dev001.itviec.repository.ApplicationRepository;
import com.dev001.itviec.service.ApplicationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    @Override
    public List<ApplicationResponse> getAllApplications() {
        return applicationMapper.toApplicationResponse(applicationRepository.findAll());
    }
}
