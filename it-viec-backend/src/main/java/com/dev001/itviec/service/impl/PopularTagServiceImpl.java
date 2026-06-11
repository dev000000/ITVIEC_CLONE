package com.dev001.itviec.service.impl;

import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.dev001.itviec.service.PopularTagService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PopularTagServiceImpl implements PopularTagService {

    private final PopularTagRepository popularTagRepository;
    private final SkillRepository skillRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PopularTagResponse> getPopularTags() {
        return popularTagRepository.findAllByOrderByIdAsc().stream()
                .map(this::toPopularTagResponse)
                .sorted(Comparator.comparing(PopularTagResponse::getCategory)
                        .thenComparing(PopularTagResponse::getName, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    @Override
    @Transactional
    public PopularTagResponse createPopularTag(PopularTagCreateRequest request) {
        PopularTagCategory category = PopularTagCategory.fromValue(request.getCategory());
        if (category == null) {
            throw new AppException(ErrorCode.POPULAR_TAG_CATEGORY_INVALID);
        }

        PopularTag popularTag =
                switch (category) {
                    case SKILL_AND_EXPERTISE -> buildSkillPopularTag(request.getSourceId(), category);
                    case COMPANY -> buildCompanyPopularTag(request.getSourceId(), category);
                };

        return toPopularTagResponse(popularTagRepository.save(popularTag));
    }

    @Override
    @Transactional
    public void deletePopularTag(Long id) {
        PopularTag popularTag =
                popularTagRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.POPULAR_TAG_NOT_FOUND));
        popularTagRepository.delete(popularTag);
    }

    private PopularTag buildSkillPopularTag(String sourceId, PopularTagCategory category) {
        Long skillId = parseSkillId(sourceId);
        Skill skill = skillRepository.findById(skillId).orElseThrow(() -> new AppException(ErrorCode.SKILL_NOT_FOUND));

        if (popularTagRepository.existsBySkill(skill)) {
            throw new AppException(ErrorCode.POPULAR_TAG_ALREADY_EXISTS);
        }

        return PopularTag.builder().category(category).skill(skill).build();
    }

    private PopularTag buildCompanyPopularTag(String sourceId, PopularTagCategory category) {
        String companyId = sourceId == null ? "" : sourceId.trim();
        Company company =
                companyRepository.findById(companyId).orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        if (popularTagRepository.existsByCompany(company)) {
            throw new AppException(ErrorCode.POPULAR_TAG_ALREADY_EXISTS);
        }

        return PopularTag.builder().category(category).company(company).build();
    }

    private Long parseSkillId(String sourceId) {
        try {
            return Long.valueOf(sourceId.trim());
        } catch (RuntimeException exception) {
            throw new AppException(ErrorCode.POPULAR_TAG_SOURCE_ID_INVALID);
        }
    }

    private PopularTagResponse toPopularTagResponse(PopularTag popularTag) {
        PopularTagCategory category = popularTag.getCategory();
        if (category == PopularTagCategory.COMPANY && popularTag.getCompany() != null) {
            return PopularTagResponse.builder()
                    .id(popularTag.getId())
                    .category(category.getDisplayName())
                    .name(popularTag.getCompany().getCompanyName())
                    .sourceId(popularTag.getCompany().getId())
                    .companySlug(popularTag.getCompany().getSlug())
                    .build();
        }

        if (category == PopularTagCategory.SKILL_AND_EXPERTISE && popularTag.getSkill() != null) {
            return PopularTagResponse.builder()
                    .id(popularTag.getId())
                    .category(category.getDisplayName())
                    .name(popularTag.getSkill().getSkillName())
                    .sourceId(String.valueOf(popularTag.getSkill().getId()))
                    .companySlug(null)
                    .build();
        }

        throw new AppException(ErrorCode.POPULAR_TAG_CATEGORY_INVALID);
    }
}
