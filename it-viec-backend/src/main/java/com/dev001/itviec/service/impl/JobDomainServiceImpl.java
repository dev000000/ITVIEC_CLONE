package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.JOB_DOMAIN_DEPRECATED;
import static com.dev001.itviec.exception.ErrorCode.JOB_DOMAIN_NAME_EXISTED;
import static com.dev001.itviec.exception.ErrorCode.JOB_DOMAIN_NOT_FOUND;
import static com.dev001.itviec.exception.ErrorCode.SKILL_MERGE_INVALID;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.response.JobDomainAdminResponse;
import com.dev001.itviec.dto.response.JobDomainResponse;
import com.dev001.itviec.dto.response.JobDomainUsageCountResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.jobdomain.JobDomain;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.JobDomainInUseException;
import com.dev001.itviec.mapper.JobDomainMapper;
import com.dev001.itviec.repository.JobDomainRepository;
import com.dev001.itviec.service.JobDomainService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobDomainServiceImpl implements JobDomainService {

    private final JobDomainMapper jobDomainMapper;
    private final JobDomainRepository jobDomainRepository;

    @Override
    @Transactional(readOnly = true)
    public List<JobDomainResponse> getAllJobDomains() {
        return jobDomainMapper.toJobDomainResponse(
                jobDomainRepository.findAllByStatusOrderByDomainNameAsc(SkillStatus.ACTIVE));
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobDomainResponse> getTopJobDomains(int limit) {
        int safeLimit = Math.max(1, Math.min(limit, 20));
        Pageable pageable = PageRequest.of(0, safeLimit);
        return jobDomainMapper.toJobDomainResponse(jobDomainRepository.findTopActiveDomainsByActiveJobCount(pageable));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<JobDomainAdminResponse> getAdminJobDomains(
            SkillStatus status, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<JobDomain> domainPage = jobDomainRepository.findAllWithFilter(status, search, pageable);
        List<JobDomainAdminResponse> data = domainPage.getContent().stream()
                .map(this::toJobDomainAdminResponse)
                .toList();

        return PageResponse.<JobDomainAdminResponse>builder()
                .data(data)
                .page(domainPage.getNumber())
                .size(data.size())
                .totalElements(domainPage.getTotalElements())
                .totalPages(domainPage.getTotalPages())
                .isFirst(domainPage.isFirst())
                .isLast(domainPage.isLast())
                .build();
    }

    @Override
    @Transactional
    public JobDomainAdminResponse createJobDomainAdmin(String domainName) {
        validateDuplicateName(domainName, null);

        JobDomain jobDomain = JobDomain.builder()
                .domainName(domainName)
                .status(SkillStatus.ACTIVE)
                .build();
        return toJobDomainAdminResponse(jobDomainRepository.save(jobDomain));
    }

    @Override
    @Transactional
    public JobDomainAdminResponse updateJobDomain(Long id, String domainName) {
        JobDomain jobDomain = getJobDomainOrThrow(id);

        if (jobDomain.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(JOB_DOMAIN_DEPRECATED);
        }

        validateDuplicateName(domainName, id);
        jobDomain.setDomainName(domainName);
        return toJobDomainAdminResponse(jobDomainRepository.save(jobDomain));
    }

    @Override
    @Transactional
    public JobDomainAdminResponse deprecateJobDomain(Long id) {
        JobDomain jobDomain = getJobDomainOrThrow(id);

        if (jobDomain.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(JOB_DOMAIN_DEPRECATED);
        }

        JobDomainUsageCountResponse usageCount = JobDomainUsageCountResponse.builder()
                .jobs(jobDomainRepository.countJobUsage(id))
                .build();
        if (usageCount.getJobs() > 0) {
            throw new JobDomainInUseException(usageCount);
        }

        jobDomain.setStatus(SkillStatus.DEPRECATED);
        return toJobDomainAdminResponse(jobDomainRepository.save(jobDomain));
    }

    @Override
    @Transactional
    public JobDomainAdminResponse restoreJobDomain(Long id) {
        JobDomain jobDomain = getJobDomainOrThrow(id);

        if (jobDomain.getStatus() != SkillStatus.DEPRECATED) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        if (jobDomain.getMergedIntoId() != null) {
            throw new AppException(SKILL_MERGE_INVALID);
        }

        jobDomain.setStatus(SkillStatus.ACTIVE);
        return toJobDomainAdminResponse(jobDomainRepository.save(jobDomain));
    }

    private JobDomain getJobDomainOrThrow(Long id) {
        return jobDomainRepository.findById(id).orElseThrow(() -> new AppException(JOB_DOMAIN_NOT_FOUND));
    }

    private void validateDuplicateName(String domainName, Long excludeId) {
        boolean exists = excludeId == null
                ? jobDomainRepository.existsByDomainNameIgnoreCase(domainName)
                : jobDomainRepository.existsByDomainNameIgnoreCaseAndIdNot(domainName, excludeId);
        if (exists) {
            throw new AppException(JOB_DOMAIN_NAME_EXISTED);
        }
    }

    private JobDomainAdminResponse toJobDomainAdminResponse(JobDomain jobDomain) {
        String mergedIntoName = null;
        if (jobDomain.getMergedIntoId() != null) {
            mergedIntoName = jobDomainRepository
                    .findById(jobDomain.getMergedIntoId())
                    .map(JobDomain::getDomainName)
                    .orElse(null);
        }

        return JobDomainAdminResponse.builder()
                .id(jobDomain.getId())
                .domainName(jobDomain.getDomainName())
                .status(jobDomain.getStatus())
                .mergedIntoId(jobDomain.getMergedIntoId())
                .mergedIntoName(mergedIntoName)
                .jobCount(jobDomainRepository.countJobUsage(jobDomain.getId()))
                .build();
    }
}
