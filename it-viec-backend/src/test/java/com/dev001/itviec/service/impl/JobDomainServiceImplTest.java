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
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dev001.itviec.dto.response.JobDomainAdminResponse;
import com.dev001.itviec.dto.response.JobDomainUsageCountResponse;
import com.dev001.itviec.entity.jobdomain.JobDomain;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.exception.JobDomainInUseException;
import com.dev001.itviec.mapper.JobDomainMapper;
import com.dev001.itviec.repository.JobDomainRepository;

@ExtendWith(MockitoExtension.class)
class JobDomainServiceImplTest {

    @Mock
    private JobDomainMapper jobDomainMapper;

    @Mock
    private JobDomainRepository jobDomainRepository;

    @InjectMocks
    private JobDomainServiceImpl jobDomainService;

    @Test
    void createJobDomainAdminShouldRejectDuplicateNameCaseInsensitive() {
        when(jobDomainRepository.existsByDomainNameIgnoreCase("IT Services")).thenReturn(true);

        assertThatThrownBy(() -> jobDomainService.createJobDomainAdmin("IT Services"))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.JOB_DOMAIN_NAME_EXISTED);
    }

    @Test
    void deprecateJobDomainShouldDeprecateUnusedDomain() {
        JobDomain jobDomain = activeJobDomain(1L, "Banking");
        when(jobDomainRepository.findById(1L)).thenReturn(Optional.of(jobDomain));
        when(jobDomainRepository.countJobUsage(1L)).thenReturn(0L);
        when(jobDomainRepository.save(jobDomain)).thenReturn(jobDomain);

        JobDomainAdminResponse result = jobDomainService.deprecateJobDomain(1L);

        assertThat(result.getStatus()).isEqualTo(SkillStatus.DEPRECATED);
        assertThat(jobDomain.getStatus()).isEqualTo(SkillStatus.DEPRECATED);
    }

    @Test
    void deprecateJobDomainShouldThrowWhenDomainIsInUse() {
        JobDomain jobDomain = activeJobDomain(2L, "Software Development");
        when(jobDomainRepository.findById(2L)).thenReturn(Optional.of(jobDomain));
        when(jobDomainRepository.countJobUsage(2L)).thenReturn(3L);

        assertThatThrownBy(() -> jobDomainService.deprecateJobDomain(2L))
                .isInstanceOf(JobDomainInUseException.class)
                .satisfies(ex -> {
                    JobDomainInUseException inUseException = (JobDomainInUseException) ex;
                    assertThat(inUseException.getUsageCount())
                            .isEqualTo(JobDomainUsageCountResponse.builder()
                                    .jobs(3L)
                                    .build());
                });

        verify(jobDomainRepository, never()).save(any(JobDomain.class));
    }

    @Test
    void restoreJobDomainShouldRestoreNonMergedDeprecatedDomain() {
        JobDomain jobDomain = JobDomain.builder()
                .id(30L)
                .domainName("Legacy")
                .status(SkillStatus.DEPRECATED)
                .build();
        when(jobDomainRepository.findById(30L)).thenReturn(Optional.of(jobDomain));
        when(jobDomainRepository.countJobUsage(30L)).thenReturn(0L);
        when(jobDomainRepository.save(jobDomain)).thenReturn(jobDomain);

        JobDomainAdminResponse result = jobDomainService.restoreJobDomain(30L);

        assertThat(result.getStatus()).isEqualTo(SkillStatus.ACTIVE);
        assertThat(jobDomain.getStatus()).isEqualTo(SkillStatus.ACTIVE);
    }

    @Test
    void restoreJobDomainShouldRejectMergedDomain() {
        JobDomain jobDomain = JobDomain.builder()
                .id(31L)
                .domainName("Merged")
                .status(SkillStatus.DEPRECATED)
                .mergedIntoId(99L)
                .build();
        when(jobDomainRepository.findById(31L)).thenReturn(Optional.of(jobDomain));

        assertThatThrownBy(() -> jobDomainService.restoreJobDomain(31L))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_MERGE_INVALID);
    }

    private JobDomain activeJobDomain(Long id, String name) {
        return JobDomain.builder()
                .id(id)
                .domainName(name)
                .status(SkillStatus.ACTIVE)
                .build();
    }
}
