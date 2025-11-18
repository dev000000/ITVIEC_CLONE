package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.mapper.SeekerMapper;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.service.JobService;
import com.dev001.itviec.service.SeekerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobMapper jobMapper;
    private final JobRepository jobRepository;

    @Override
    public List<JobResponse> getAllJobs() {
        return jobMapper.toJobResponse(jobRepository.findAll());
    }
}
