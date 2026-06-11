package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dev001.itviec.dto.request.PopularTagCreateRequest;
import com.dev001.itviec.dto.response.PopularTagResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.entity.tag.PopularTag;
import com.dev001.itviec.enums.PopularTagCategory;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.PopularTagRepository;
import com.dev001.itviec.repository.SkillRepository;

@ExtendWith(MockitoExtension.class)
class PopularTagServiceImplTest {

    @Mock
    private PopularTagRepository popularTagRepository;

    @Mock
    private SkillRepository skillRepository;

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private PopularTagServiceImpl popularTagService;

    @Test
    void createPopularTagShouldCreateSkillPopularTag() {
        Skill skill = Skill.builder().id(7L).skillName("Java").build();
        PopularTag savedTag = PopularTag.builder()
                .id(1L)
                .category(PopularTagCategory.SKILL_AND_EXPERTISE)
                .skill(skill)
                .build();

        when(skillRepository.findById(7L)).thenReturn(Optional.of(skill));
        when(popularTagRepository.existsBySkill(skill)).thenReturn(false);
        when(popularTagRepository.save(org.mockito.ArgumentMatchers.any(PopularTag.class)))
                .thenReturn(savedTag);

        PopularTagResponse result = popularTagService.createPopularTag(PopularTagCreateRequest.builder()
                .category("Skill and Expertise")
                .sourceId("7")
                .build());

        assertThat(result.getCategory()).isEqualTo("Skill and Expertise");
        assertThat(result.getName()).isEqualTo("Java");
        assertThat(result.getSourceId()).isEqualTo("7");
    }

    @Test
    void createPopularTagShouldCreateCompanyPopularTag() {
        Company company = Company.builder()
                .id("company-1")
                .companyName("MB Bank")
                .slug("mb-bank")
                .build();
        PopularTag savedTag = PopularTag.builder()
                .id(2L)
                .category(PopularTagCategory.COMPANY)
                .company(company)
                .build();

        when(companyRepository.findById("company-1")).thenReturn(Optional.of(company));
        when(popularTagRepository.existsByCompany(company)).thenReturn(false);
        when(popularTagRepository.save(org.mockito.ArgumentMatchers.any(PopularTag.class)))
                .thenReturn(savedTag);

        PopularTagResponse result = popularTagService.createPopularTag(PopularTagCreateRequest.builder()
                .category("Company")
                .sourceId("company-1")
                .build());

        assertThat(result.getCategory()).isEqualTo("Company");
        assertThat(result.getName()).isEqualTo("MB Bank");
        assertThat(result.getCompanySlug()).isEqualTo("mb-bank");
    }

    @Test
    void createPopularTagShouldRejectDuplicateTag() {
        Skill skill = Skill.builder().id(8L).skillName("React").build();
        when(skillRepository.findById(8L)).thenReturn(Optional.of(skill));
        when(popularTagRepository.existsBySkill(skill)).thenReturn(true);

        assertThatThrownBy(() -> popularTagService.createPopularTag(PopularTagCreateRequest.builder()
                        .category("Skill and Expertise")
                        .sourceId("8")
                        .build()))
                .isInstanceOf(AppException.class)
                .extracting("errorCode")
                .isEqualTo(ErrorCode.POPULAR_TAG_ALREADY_EXISTS);
    }

    @Test
    void getPopularTagsShouldReturnGroupedResponses() {
        Skill skill = Skill.builder().id(5L).skillName("Java").build();
        Company company = Company.builder()
                .id("company-2")
                .companyName("Andpad")
                .slug("andpad")
                .build();

        when(popularTagRepository.findAllByOrderByIdAsc())
                .thenReturn(List.of(
                        PopularTag.builder()
                                .id(1L)
                                .category(PopularTagCategory.COMPANY)
                                .company(company)
                                .build(),
                        PopularTag.builder()
                                .id(2L)
                                .category(PopularTagCategory.SKILL_AND_EXPERTISE)
                                .skill(skill)
                                .build()));

        List<PopularTagResponse> result = popularTagService.getPopularTags();

        assertThat(result).hasSize(2);
        assertThat(result)
                .extracting(PopularTagResponse::getCategory)
                .containsExactly("Company", "Skill and Expertise");
    }

    @Test
    void deletePopularTagShouldDeleteExistingTag() {
        PopularTag popularTag =
                PopularTag.builder().id(9L).category(PopularTagCategory.COMPANY).build();
        when(popularTagRepository.findById(9L)).thenReturn(Optional.of(popularTag));

        popularTagService.deletePopularTag(9L);

        verify(popularTagRepository).delete(popularTag);
    }
}
