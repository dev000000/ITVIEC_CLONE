package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.jdbc.core.JdbcTemplate;

import com.dev001.itviec.dto.response.MergeSkillResponse;
import com.dev001.itviec.dto.response.SkillAdminResponse;
import com.dev001.itviec.dto.response.SkillUsageCountResponse;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.exception.SkillInUseException;
import com.dev001.itviec.mapper.SkillMapper;
import com.dev001.itviec.repository.PopularTagRepository;
import com.dev001.itviec.repository.SkillRepository;

@ExtendWith(MockitoExtension.class)
class SkillServiceImplTest {

    @Mock
    private SkillMapper skillMapper;

    @Mock
    private SkillRepository skillRepository;

    @Mock
    private PopularTagRepository popularTagRepository;

    @Mock
    private JdbcTemplate jdbcTemplate;

    @InjectMocks
    private SkillServiceImpl skillService;

    @Test
    void createSkillAdminShouldRejectDuplicateNameCaseInsensitive() {
        when(skillRepository.existsBySkillNameIgnoreCase("java")).thenReturn(true);

        assertThatThrownBy(() -> skillService.createSkillAdmin("java"))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_NAME_EXISTED);
    }

    @Test
    void deprecateSkillShouldDeprecateUnusedSkill() {
        Skill skill = activeSkill(1L, "Java");
        when(skillRepository.findById(1L)).thenReturn(Optional.of(skill));
        mockZeroUsage(1L);
        when(skillRepository.save(skill)).thenReturn(skill);

        SkillAdminResponse result = skillService.deprecateSkill(1L);

        assertThat(result.getStatus()).isEqualTo(SkillStatus.DEPRECATED);
        assertThat(skill.getStatus()).isEqualTo(SkillStatus.DEPRECATED);
    }

    @Test
    void deprecateSkillShouldThrowWhenSkillIsInUse() {
        Skill skill = activeSkill(2L, "React");
        when(skillRepository.findById(2L)).thenReturn(Optional.of(skill));
        when(skillRepository.countJobUsage(2L)).thenReturn(1L);
        when(skillRepository.countSeekerUsage(2L)).thenReturn(2L);
        when(skillRepository.countCompanyUsage(2L)).thenReturn(3L);

        assertThatThrownBy(() -> skillService.deprecateSkill(2L))
                .isInstanceOf(SkillInUseException.class)
                .satisfies(ex -> {
                    SkillInUseException skillInUseException = (SkillInUseException) ex;
                    assertThat(skillInUseException.getUsageCount())
                            .isEqualTo(SkillUsageCountResponse.builder()
                                    .jobs(1L)
                                    .seekers(2L)
                                    .companies(3L)
                                    .build());
                });

        verify(skillRepository, never()).save(any(Skill.class));
    }

    @Test
    void mergeSkillShouldDeprecateSourceAndMigrateReferences() {
        Skill source = activeSkill(10L, "JS");
        Skill target = activeSkill(20L, "JavaScript");
        when(skillRepository.findById(10L)).thenReturn(Optional.of(source));
        when(skillRepository.findById(20L)).thenReturn(Optional.of(target));
        when(skillRepository.countJobUsage(10L)).thenReturn(2L);
        when(skillRepository.countSeekerUsage(10L)).thenReturn(1L);
        when(skillRepository.countCompanyUsage(10L)).thenReturn(0L);
        when(skillRepository.countJobUsage(20L)).thenReturn(0L);
        when(skillRepository.countSeekerUsage(20L)).thenReturn(0L);
        when(skillRepository.countCompanyUsage(20L)).thenReturn(0L);
        when(skillRepository.save(source)).thenReturn(source);

        MergeSkillResponse result = skillService.mergeSkill(10L, 20L);

        assertThat(result.getSourceSkill().getStatus()).isEqualTo(SkillStatus.DEPRECATED);
        assertThat(result.getSourceSkill().getMergedIntoId()).isEqualTo(20L);
        assertThat(result.getMigratedRecords())
                .isEqualTo(SkillUsageCountResponse.builder()
                        .jobs(2L)
                        .seekers(1L)
                        .companies(0L)
                        .build());

        verify(jdbcTemplate)
                .update(
                        "INSERT IGNORE INTO job_skills (job_id, skill_id) SELECT job_id, ? FROM job_skills WHERE skill_id = ?",
                        20L,
                        10L);
        verify(jdbcTemplate)
                .update(
                        "INSERT IGNORE INTO seeker_skills (seeker_id, skill_id) SELECT seeker_id, ? FROM seeker_skills WHERE skill_id = ?",
                        20L,
                        10L);
        verify(jdbcTemplate)
                .update(
                        "INSERT IGNORE INTO company_skills (company_id, skill_id) SELECT company_id, ? FROM company_skills WHERE skill_id = ?",
                        20L,
                        10L);
        verify(jdbcTemplate).update("DELETE FROM job_skills WHERE skill_id = ?", 10L);
        verify(jdbcTemplate).update("DELETE FROM seeker_skills WHERE skill_id = ?", 10L);
        verify(jdbcTemplate).update("DELETE FROM company_skills WHERE skill_id = ?", 10L);
        verify(popularTagRepository).deleteBySkillId(10L);

        ArgumentCaptor<Skill> savedCaptor = ArgumentCaptor.forClass(Skill.class);
        verify(skillRepository).save(savedCaptor.capture());
        assertThat(savedCaptor.getValue().getStatus()).isEqualTo(SkillStatus.DEPRECATED);
        assertThat(savedCaptor.getValue().getMergedIntoId()).isEqualTo(20L);
    }

    @Test
    void mergeSkillShouldRejectSameSourceAndTarget() {
        assertThatThrownBy(() -> skillService.mergeSkill(5L, 5L))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_MERGE_INVALID);
    }

    @Test
    void mergeSkillShouldRejectDeprecatedSource() {
        Skill source = Skill.builder()
                .id(11L)
                .skillName("Old")
                .status(SkillStatus.DEPRECATED)
                .build();
        Skill target = activeSkill(12L, "New");
        when(skillRepository.findById(11L)).thenReturn(Optional.of(source));
        when(skillRepository.findById(12L)).thenReturn(Optional.of(target));

        assertThatThrownBy(() -> skillService.mergeSkill(11L, 12L))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_MERGE_INVALID);
    }

    @Test
    void mergeSkillShouldRejectDeprecatedTarget() {
        Skill source = activeSkill(13L, "Source");
        Skill target = Skill.builder()
                .id(14L)
                .skillName("Target")
                .status(SkillStatus.DEPRECATED)
                .build();
        when(skillRepository.findById(13L)).thenReturn(Optional.of(source));
        when(skillRepository.findById(14L)).thenReturn(Optional.of(target));

        assertThatThrownBy(() -> skillService.mergeSkill(13L, 14L))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_MERGE_INVALID);
    }

    @Test
    void restoreSkillShouldRestoreNonMergedDeprecatedSkill() {
        Skill skill = Skill.builder()
                .id(30L)
                .skillName("Legacy")
                .status(SkillStatus.DEPRECATED)
                .build();
        when(skillRepository.findById(30L)).thenReturn(Optional.of(skill));
        mockZeroUsage(30L);
        when(skillRepository.save(skill)).thenReturn(skill);

        SkillAdminResponse result = skillService.restoreSkill(30L);

        assertThat(result.getStatus()).isEqualTo(SkillStatus.ACTIVE);
        assertThat(skill.getStatus()).isEqualTo(SkillStatus.ACTIVE);
    }

    @Test
    void restoreSkillShouldRejectMergedSkill() {
        Skill skill = Skill.builder()
                .id(31L)
                .skillName("Merged")
                .status(SkillStatus.DEPRECATED)
                .mergedIntoId(99L)
                .build();
        when(skillRepository.findById(31L)).thenReturn(Optional.of(skill));

        assertThatThrownBy(() -> skillService.restoreSkill(31L))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_MERGE_INVALID);
    }

    private Skill activeSkill(Long id, String name) {
        return Skill.builder().id(id).skillName(name).status(SkillStatus.ACTIVE).build();
    }

    private void mockZeroUsage(Long skillId) {
        when(skillRepository.countJobUsage(skillId)).thenReturn(0L);
        when(skillRepository.countSeekerUsage(skillId)).thenReturn(0L);
        when(skillRepository.countCompanyUsage(skillId)).thenReturn(0L);
    }
}
