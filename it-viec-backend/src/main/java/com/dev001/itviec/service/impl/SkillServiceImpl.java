package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.SKILL_DEPRECATED;
import static com.dev001.itviec.exception.ErrorCode.SKILL_MERGE_INVALID;
import static com.dev001.itviec.exception.ErrorCode.SKILL_NAME_EXISTED;
import static com.dev001.itviec.exception.ErrorCode.SKILL_NOT_FOUND;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.response.MergeSkillResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.dto.response.SkillAdminResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.dto.response.SkillUsageCountResponse;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.SkillInUseException;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.PopularTagRepository;
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
    private final PopularTagRepository popularTagRepository;
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getAllSkills() {
        return skillMapper.toSkillResponse(skillRepository.findAllByStatusOrderBySkillNameAsc(SkillStatus.ACTIVE));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<SkillAdminResponse> getAdminSkills(SkillStatus status, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Skill> skillPage = skillRepository.findAllWithFilter(status, search, pageable);
        List<SkillAdminResponse> data =
                skillPage.getContent().stream().map(this::toSkillAdminResponse).toList();

        return PageResponse.<SkillAdminResponse>builder()
                .data(data)
                .page(skillPage.getNumber())
                .size(data.size())
                .totalElements(skillPage.getTotalElements())
                .totalPages(skillPage.getTotalPages())
                .isFirst(skillPage.isFirst())
                .isLast(skillPage.isLast())
                .build();
    }

    @Override
    @Transactional
    public SkillAdminResponse createSkillAdmin(String skillName) {
        validateDuplicateName(skillName, null);

        Skill skill =
                Skill.builder().skillName(skillName).status(SkillStatus.ACTIVE).build();
        Skill saved = skillRepository.save(skill);
        return toSkillAdminResponse(saved);
    }

    @Override
    @Transactional
    public SkillAdminResponse updateSkill(Long id, String skillName) {
        Skill skill = getSkillOrThrow(id);

        if (skill.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(SKILL_DEPRECATED);
        }

        validateDuplicateName(skillName, id);

        skill.setSkillName(skillName);
        return toSkillAdminResponse(skillRepository.save(skill));
    }

    @Override
    @Transactional
    public SkillAdminResponse deprecateSkill(Long id) {
        Skill skill = getSkillOrThrow(id);

        if (skill.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(SKILL_DEPRECATED);
        }

        SkillUsageCountResponse usageCount = getUsageCount(id);
        if (usageCount.getJobs() > 0 || usageCount.getSeekers() > 0 || usageCount.getCompanies() > 0) {
            throw new SkillInUseException(usageCount);
        }

        skill.setStatus(SkillStatus.DEPRECATED);
        return toSkillAdminResponse(skillRepository.save(skill));
    }

    @Override
    @Transactional
    public MergeSkillResponse mergeSkill(Long sourceId, Long targetSkillId) {
        if (Objects.equals(sourceId, targetSkillId)) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        Skill source = getSkillOrThrow(sourceId);
        Skill target = getSkillOrThrow(targetSkillId);

        if (source.getStatus() != SkillStatus.ACTIVE || target.getStatus() != SkillStatus.ACTIVE) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        SkillUsageCountResponse migratedRecords = getUsageCount(sourceId);
        migrateSkillReferences(sourceId, targetSkillId);

        source.setStatus(SkillStatus.DEPRECATED);
        source.setMergedIntoId(targetSkillId);
        skillRepository.save(source);

        return MergeSkillResponse.builder()
                .message("Skill merged successfully")
                .migratedRecords(migratedRecords)
                .sourceSkill(toSkillAdminResponse(source))
                .targetSkill(toSkillAdminResponse(target))
                .build();
    }

    @Override
    @Transactional
    public SkillAdminResponse restoreSkill(Long id) {
        Skill skill = getSkillOrThrow(id);

        if (skill.getStatus() != SkillStatus.DEPRECATED) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        if (skill.getMergedIntoId() != null) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        skill.setStatus(SkillStatus.ACTIVE);
        return toSkillAdminResponse(skillRepository.save(skill));
    }

    private void migrateSkillReferences(Long sourceId, Long targetSkillId) {
        jdbcTemplate.update(
                "INSERT IGNORE INTO job_skills (job_id, skill_id) SELECT job_id, ? FROM job_skills WHERE skill_id = ?",
                targetSkillId,
                sourceId);
        jdbcTemplate.update(
                "INSERT IGNORE INTO seeker_skills (seeker_id, skill_id) SELECT seeker_id, ? FROM seeker_skills WHERE skill_id = ?",
                targetSkillId,
                sourceId);
        jdbcTemplate.update(
                "INSERT IGNORE INTO company_skills (company_id, skill_id) SELECT company_id, ? FROM company_skills WHERE skill_id = ?",
                targetSkillId,
                sourceId);

        jdbcTemplate.update("DELETE FROM job_skills WHERE skill_id = ?", sourceId);
        jdbcTemplate.update("DELETE FROM seeker_skills WHERE skill_id = ?", sourceId);
        jdbcTemplate.update("DELETE FROM company_skills WHERE skill_id = ?", sourceId);

        popularTagRepository.deleteBySkillId(sourceId);
    }

    private Skill getSkillOrThrow(Long id) {
        return skillRepository.findById(id).orElseThrow(() -> new AppException(SKILL_NOT_FOUND));
    }

    private void validateDuplicateName(String skillName, Long excludeId) {
        boolean exists = excludeId == null
                ? skillRepository.existsBySkillNameIgnoreCase(skillName)
                : skillRepository.existsBySkillNameIgnoreCaseAndIdNot(skillName, excludeId);
        if (exists) {
            throw new AppException(SKILL_NAME_EXISTED);
        }
    }

    private SkillUsageCountResponse getUsageCount(Long skillId) {
        return SkillUsageCountResponse.builder()
                .jobs(skillRepository.countJobUsage(skillId))
                .seekers(skillRepository.countSeekerUsage(skillId))
                .companies(skillRepository.countCompanyUsage(skillId))
                .build();
    }

    private SkillAdminResponse toSkillAdminResponse(Skill skill) {
        String mergedIntoName = null;
        if (skill.getMergedIntoId() != null) {
            mergedIntoName = skillRepository
                    .findById(skill.getMergedIntoId())
                    .map(Skill::getSkillName)
                    .orElse(null);
        }

        return SkillAdminResponse.builder()
                .id(skill.getId())
                .skillName(skill.getSkillName())
                .status(skill.getStatus())
                .mergedIntoId(skill.getMergedIntoId())
                .mergedIntoName(mergedIntoName)
                .usageCount(getUsageCount(skill.getId()))
                .build();
    }
}
