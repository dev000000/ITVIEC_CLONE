package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.SkillRepository;
import com.dev001.itviec.service.SkillService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.dev001.itviec.exception.ErrorCode.SKILL_NAME_EXISTED;

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
        // 1. check skill exist
        boolean isSkillNameExisted = skillRepository.existsBySkillName(skillName);
        if (isSkillNameExisted) {
            throw new AppException(SKILL_NAME_EXISTED);
        }

        // 2. create skil
        Skill skill = Skill.builder().skillName(skillName).build();

        // 3. save skill
        Skill saved = skillRepository.save(skill);

        // 4. return skill
        return skillMapper.toSkillResponse(saved);
    }
}
