package com.dev001.itviec.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.mapper.SeekerMapper;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.service.SeekerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeekerServiceImpl implements SeekerService {

    private final SeekerMapper seekerMapper;
    private final SeekerRepository seekerRepository;

    @Override
    public List<SeekerResponse> getAllSeekers() {
        return seekerMapper.toSeekerResponse(seekerRepository.findAll());
    }
}
