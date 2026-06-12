package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.INDUSTRY_DEPRECATED;
import static com.dev001.itviec.exception.ErrorCode.INDUSTRY_NAME_EXISTED;
import static com.dev001.itviec.exception.ErrorCode.INDUSTRY_NOT_FOUND;
import static com.dev001.itviec.exception.ErrorCode.SKILL_MERGE_INVALID;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.response.IndustryAdminResponse;
import com.dev001.itviec.dto.response.IndustryResponse;
import com.dev001.itviec.dto.response.IndustryUsageCountResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.industry.Industry;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.IndustryInUseException;
import com.dev001.itviec.mapper.IndustryMapper;
import com.dev001.itviec.repository.IndustryRepository;
import com.dev001.itviec.service.IndustryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IndustryServiceImpl implements IndustryService {

    private final IndustryMapper industryMapper;
    private final IndustryRepository industryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<IndustryResponse> getAllIndustries() {
        return industryMapper.toIndustryResponse(
                industryRepository.findAllByStatusOrderByIndustryNameAsc(SkillStatus.ACTIVE));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<IndustryAdminResponse> getAdminIndustries(
            SkillStatus status, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Industry> industryPage = industryRepository.findAllWithFilter(status, search, pageable);
        List<IndustryAdminResponse> data = industryPage.getContent().stream()
                .map(this::toIndustryAdminResponse)
                .toList();

        return PageResponse.<IndustryAdminResponse>builder()
                .data(data)
                .page(industryPage.getNumber())
                .size(data.size())
                .totalElements(industryPage.getTotalElements())
                .totalPages(industryPage.getTotalPages())
                .isFirst(industryPage.isFirst())
                .isLast(industryPage.isLast())
                .build();
    }

    @Override
    @Transactional
    public IndustryAdminResponse createIndustryAdmin(String industryName) {
        validateDuplicateName(industryName, null);

        Industry industry = Industry.builder()
                .industryName(industryName)
                .status(SkillStatus.ACTIVE)
                .build();
        return toIndustryAdminResponse(industryRepository.save(industry));
    }

    @Override
    @Transactional
    public IndustryAdminResponse updateIndustry(Long id, String industryName) {
        Industry industry = getIndustryOrThrow(id);

        if (industry.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(INDUSTRY_DEPRECATED);
        }

        validateDuplicateName(industryName, id);
        industry.setIndustryName(industryName);
        return toIndustryAdminResponse(industryRepository.save(industry));
    }

    @Override
    @Transactional
    public IndustryAdminResponse deprecateIndustry(Long id) {
        Industry industry = getIndustryOrThrow(id);

        if (industry.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(INDUSTRY_DEPRECATED);
        }

        IndustryUsageCountResponse usageCount = IndustryUsageCountResponse.builder()
                .companies(industryRepository.countCompanyUsage(id))
                .build();
        if (usageCount.getCompanies() > 0) {
            throw new IndustryInUseException(usageCount);
        }

        industry.setStatus(SkillStatus.DEPRECATED);
        return toIndustryAdminResponse(industryRepository.save(industry));
    }

    @Override
    @Transactional
    public IndustryAdminResponse restoreIndustry(Long id) {
        Industry industry = getIndustryOrThrow(id);

        if (industry.getStatus() != SkillStatus.DEPRECATED) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        if (industry.getMergedIntoId() != null) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        industry.setStatus(SkillStatus.ACTIVE);
        return toIndustryAdminResponse(industryRepository.save(industry));
    }

    private Industry getIndustryOrThrow(Long id) {
        return industryRepository.findById(id).orElseThrow(() -> new AppException(INDUSTRY_NOT_FOUND));
    }

    private void validateDuplicateName(String industryName, Long excludeId) {
        boolean exists = excludeId == null
                ? industryRepository.existsByIndustryNameIgnoreCase(industryName)
                : industryRepository.existsByIndustryNameIgnoreCaseAndIdNot(industryName, excludeId);
        if (exists) {
            throw new AppException(INDUSTRY_NAME_EXISTED);
        }
    }

    private IndustryAdminResponse toIndustryAdminResponse(Industry industry) {
        String mergedIntoName = null;
        if (industry.getMergedIntoId() != null) {
            mergedIntoName = industryRepository
                    .findById(industry.getMergedIntoId())
                    .map(Industry::getIndustryName)
                    .orElse(null);
        }

        return IndustryAdminResponse.builder()
                .id(industry.getId())
                .industryName(industry.getIndustryName())
                .status(industry.getStatus())
                .mergedIntoId(industry.getMergedIntoId())
                .mergedIntoName(mergedIntoName)
                .companyCount(industryRepository.countCompanyUsage(industry.getId()))
                .build();
    }
}
