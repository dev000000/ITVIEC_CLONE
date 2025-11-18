package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.mapper.SeekerMapper;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.repository.SkillRepository;
import com.dev001.itviec.service.SeekerService;
import com.dev001.itviec.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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
