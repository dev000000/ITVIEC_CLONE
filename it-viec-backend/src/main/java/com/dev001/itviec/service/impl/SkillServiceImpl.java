package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.mapper.CityMapper;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.CityRepository;
import com.dev001.itviec.repository.SkillRepository;
import com.dev001.itviec.service.CityService;
import com.dev001.itviec.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

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
