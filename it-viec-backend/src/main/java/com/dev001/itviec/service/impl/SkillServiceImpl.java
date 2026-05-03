package com.dev001.itviec.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.SkillRepository;
import com.dev001.itviec.service.SkillService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillMapper skillMapper;
    private final SkillRepository skillRepository;

    @Override
    public List<SkillResponse> getAllSkills() {
        return skillMapper.toSkillResponse(skillRepository.findAll());
    }
}
