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

import com.dev001.itviec.dto.response.IndustryAdminResponse;
import com.dev001.itviec.dto.response.IndustryUsageCountResponse;
import com.dev001.itviec.entity.industry.Industry;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.exception.IndustryInUseException;
import com.dev001.itviec.mapper.IndustryMapper;
import com.dev001.itviec.repository.IndustryRepository;

@ExtendWith(MockitoExtension.class)
class IndustryServiceImplTest {

    @Mock
    private IndustryMapper industryMapper;

    @Mock
    private IndustryRepository industryRepository;

    @InjectMocks
    private IndustryServiceImpl industryService;

    @Test
    void createIndustryAdminShouldRejectDuplicateNameCaseInsensitive() {
        when(industryRepository.existsByIndustryNameIgnoreCase("banking")).thenReturn(true);

        assertThatThrownBy(() -> industryService.createIndustryAdmin("banking"))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.INDUSTRY_NAME_EXISTED);
    }

    @Test
    void deprecateIndustryShouldDeprecateUnusedIndustry() {
        Industry industry = activeIndustry(1L, "Banking");
        when(industryRepository.findById(1L)).thenReturn(Optional.of(industry));
        when(industryRepository.countCompanyUsage(1L)).thenReturn(0L);
        when(industryRepository.save(industry)).thenReturn(industry);

        IndustryAdminResponse result = industryService.deprecateIndustry(1L);

        assertThat(result.getStatus()).isEqualTo(SkillStatus.DEPRECATED);
        assertThat(industry.getStatus()).isEqualTo(SkillStatus.DEPRECATED);
    }

    @Test
    void deprecateIndustryShouldThrowWhenIndustryIsInUse() {
        Industry industry = activeIndustry(2L, "E-commerce");
        when(industryRepository.findById(2L)).thenReturn(Optional.of(industry));
        when(industryRepository.countCompanyUsage(2L)).thenReturn(5L);

        assertThatThrownBy(() -> industryService.deprecateIndustry(2L))
                .isInstanceOf(IndustryInUseException.class)
                .satisfies(ex -> {
                    IndustryInUseException inUseException = (IndustryInUseException) ex;
                    assertThat(inUseException.getUsageCount())
                            .isEqualTo(IndustryUsageCountResponse.builder()
                                    .companies(5L)
                                    .build());
                });

        verify(industryRepository, never()).save(any(Industry.class));
    }

    @Test
    void restoreIndustryShouldRestoreNonMergedDeprecatedIndustry() {
        Industry industry = Industry.builder()
                .id(30L)
                .industryName("Legacy")
                .status(SkillStatus.DEPRECATED)
                .build();
        when(industryRepository.findById(30L)).thenReturn(Optional.of(industry));
        when(industryRepository.countCompanyUsage(30L)).thenReturn(0L);
        when(industryRepository.save(industry)).thenReturn(industry);

        IndustryAdminResponse result = industryService.restoreIndustry(30L);

        assertThat(result.getStatus()).isEqualTo(SkillStatus.ACTIVE);
        assertThat(industry.getStatus()).isEqualTo(SkillStatus.ACTIVE);
    }

    @Test
    void restoreIndustryShouldRejectMergedIndustry() {
        Industry industry = Industry.builder()
                .id(31L)
                .industryName("Merged")
                .status(SkillStatus.DEPRECATED)
                .mergedIntoId(99L)
                .build();
        when(industryRepository.findById(31L)).thenReturn(Optional.of(industry));

        assertThatThrownBy(() -> industryService.restoreIndustry(31L))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.SKILL_MERGE_INVALID);
    }

    private Industry activeIndustry(Long id, String name) {
        return Industry.builder()
                .id(id)
                .industryName(name)
                .status(SkillStatus.ACTIVE)
                .build();
    }
}
