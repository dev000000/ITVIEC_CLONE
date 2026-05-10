package com.dev001.itviec.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.SkillRepository;
import com.dev001.itviec.service.SkillService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Triển khai nghiệp vụ cho tính năng quản lý Skill.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillMapper skillMapper;
    private final SkillRepository skillRepository;

    /**
     * Lấy toàn bộ skill trong hệ thống.
     */
    @Override
    public List<SkillResponse> getAllSkills() {
        return skillMapper.toSkillResponse(skillRepository.findAll());
    }

    /**
     * Tạo mới một skill:
     * - Khởi tạo entity từ tên skill.
     * - Lưu vào database.
     * - Ánh xạ sang DTO để trả về cho client.
     *
     * @param skillName tên skill cần tạo
     * @return SkillResponse chứa thông tin skill đã tạo
     */
    @Override
    public SkillResponse createSkill(String skillName) {
        log.info("Creating new skill with name: {}", skillName);

        // Khởi tạo entity Skill từ tên skill
        Skill newSkill = Skill.builder().skillName(skillName).build();

        // Lưu vào DB
        Skill saved = skillRepository.save(newSkill);
        log.info("Created skill id={}, name={}", saved.getId(), saved.getSkillName());

        // Trả về DTO
        return skillMapper.toSkillResponse(saved);
    }
}
