package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.mapper.ApplicationMapper;
import com.dev001.itviec.repository.ApplicationRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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
