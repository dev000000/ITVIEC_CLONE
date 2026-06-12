package com.dev001.itviec.service.impl;

import static com.dev001.itviec.enums.JobStatus.ACTIVE;
import static com.dev001.itviec.enums.JobStatus.CLOSED;
import static com.dev001.itviec.exception.ErrorCode.JOB_NOT_FOUND;

import java.text.Normalizer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.request.JobCreateRequest;
import com.dev001.itviec.dto.request.JobPublishRequest;
import com.dev001.itviec.dto.request.JobRepostRequest;
import com.dev001.itviec.dto.request.JobUpdateRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.jobdomain.JobDomain;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;
import com.dev001.itviec.enums.SalaryCurrency;
import com.dev001.itviec.enums.SkillStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.JobDomainRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobMapper jobMapper;
    private final JobRepository jobRepository;
    private final JobDomainRepository jobDomainRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final EmployerRepository employerRepository;

    @Override
    public JobDetailResponse getJobBySlug(String slug) {
        Job job = jobRepository
                .findPublicVisibleBySlug(slug, LocalDateTime.now())
                .orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        return jobMapper.toJobDetailResponse(job);
    }

    @Override
    @Transactional
    public JobDetailResponse createJob(JobCreateRequest request) {
        Company company = getCurrentEmployerCompany();

        JobStatus status = request.getStatus();
        if (status != JobStatus.DRAFT && status != JobStatus.ACTIVE) {
            throw new AppException(ErrorCode.JOB_TRANSITION_NOT_ALLOWED);
        }

        Job job = Job.builder()
                .company(company)
                .title(request.getTitle())
                .jobReason(request.getJobReason())
                .jobDescription(request.getJobDescription())
                .jobRequirements(request.getJobRequirements())
                .whyJoinUs(request.getWhyJoinUs())
                .location(request.getLocation())
                .city(request.getCity())
                .jobDomain(resolveActiveJobDomain(request.getJobDomain()))
                .jobType(request.getJobType())
                .experienceLevel(request.getExperienceLevel())
                .expiresAt(request.getExpiresAt())
                .status(status)
                .skills(request.getSkills() == null ? new HashSet<>() : new HashSet<>(request.getSkills()))
                .build();

        LocalDateTime now = LocalDateTime.now();
        if (status == JobStatus.DRAFT) {
            job.setPostedAt(request.getPostedAt());
        } else {
            LocalDateTime postedAt = request.getPostedAt() != null ? request.getPostedAt() : now;
            if (postedAt.isBefore(now.minusMinutes(1))) {
                throw new AppException(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
            }
            LocalDateTime expiresAt = request.getExpiresAt();
            if (expiresAt != null && !expiresAt.isAfter(postedAt)) {
                throw new AppException(ErrorCode.JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED);
            }
            job.setPostedAt(postedAt);
            job.setPublishedAt(now);
        }

        applySalaryFields(job, request.getSalaryMin(), request.getSalaryMax(), request.getSalaryCurrency());

        job = jobRepository.save(job);
        job.setSlug(generateSlug(job.getTitle(), company.getCompanyName(), job.getId()));
        job = jobRepository.save(job);

        return jobMapper.toJobDetailResponse(job);
    }

    @Override
    public List<JobDetailResponse> getJobsByCurrentEmployer(
            String title, JobStatus status, JobType jobType, Long cityId) {
        Company company = getCurrentEmployerCompany();
        Specification<Job> spec =
                buildJobFilterSpecification(company, title, null, status, jobType, cityId, null, null, true);
        return jobMapper.toJobDetailResponse(jobRepository.findAll(spec));
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<JobDetailResponse> getAdminJobs(
            int page,
            int size,
            String title,
            String companyName,
            JobStatus status,
            JobType jobType,
            Long cityId,
            LocalDate postedAtFrom,
            LocalDate postedAtTo) {
        Specification<Job> spec = buildJobFilterSpecification(
                null, title, companyName, status, jobType, cityId, postedAtFrom, postedAtTo, false);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("postedAt"), Sort.Order.desc("id")));
        Page<Job> jobPage = jobRepository.findAll(spec, pageable);
        List<JobDetailResponse> jobResponses = jobMapper.toJobDetailResponse(jobPage.getContent());

        return PageResponse.<JobDetailResponse>builder()
                .data(jobResponses)
                .size(jobResponses.size())
                .page(jobPage.getNumber())
                .totalElements(jobPage.getTotalElements())
                .totalPages(jobPage.getTotalPages())
                .isFirst(jobPage.isFirst())
                .isLast(jobPage.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponse<JobCardResponse> getJobCards(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("postedAt"), Sort.Order.desc("id")));
        Page<Job> jobPage = jobRepository.findAll(buildPublicVisibilitySpecification(), pageable);
        List<JobCardResponse> jobCardResponseList = jobMapper.toJobCardResponse(jobPage.getContent());

        return PageResponse.<JobCardResponse>builder()
                .data(jobCardResponseList)
                .size(jobCardResponseList.size())
                .page(jobPage.getNumber())
                .totalElements(jobPage.getTotalElements())
                .totalPages(jobPage.getTotalPages())
                .isFirst(jobPage.isFirst())
                .isLast(jobPage.isLast())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<JobCardResponse> searchJobs(
            int page,
            int size,
            String keyword,
            Long cityId,
            List<JobType> jobTypes,
            List<ExperienceLevel> experienceLevels,
            Long jobDomainId,
            Long salaryMin,
            Long salaryMax,
            SalaryCurrency salaryCurrency) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("postedAt"), Sort.Order.desc("id")));
        Page<Job> jobPage = jobRepository.findAll(
                buildPublicJobSearchSpecification(
                        keyword, cityId, jobTypes, experienceLevels, jobDomainId, salaryMin, salaryMax, salaryCurrency),
                pageable);
        List<JobCardResponse> jobCardResponses = jobMapper.toJobCardResponse(jobPage.getContent());

        return PageResponse.<JobCardResponse>builder()
                .data(jobCardResponses)
                .size(jobCardResponses.size())
                .page(jobPage.getNumber())
                .totalElements(jobPage.getTotalElements())
                .totalPages(jobPage.getTotalPages())
                .isFirst(jobPage.isFirst())
                .isLast(jobPage.isLast())
                .build();
    }

    @Override
    public JobDetailResponse updateJob(Long id, JobUpdateRequest request) {
        Company company = getCurrentEmployerCompany();
        Job job = jobRepository.findByIdAndCompany(id, company).orElseThrow(() -> new AppException(JOB_NOT_FOUND));

        job.setTitle(request.getTitle());
        job.setJobReason(request.getJobReason());
        job.setJobDescription(request.getJobDescription());
        job.setJobRequirements(request.getJobRequirements());
        job.setWhyJoinUs(request.getWhyJoinUs());
        job.setLocation(request.getLocation());
        job.setCity(request.getCity());
        job.setJobDomain(resolveActiveJobDomain(request.getJobDomain()));
        applySalaryFields(job, request.getSalaryMin(), request.getSalaryMax(), request.getSalaryCurrency());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        if (request.getStatus() != null && request.getStatus() != job.getStatus()) {
            throw new AppException(ErrorCode.JOB_TRANSITION_NOT_ALLOWED);
        }
        job.setPostedAt(request.getPostedAt());
        job.setExpiresAt(request.getExpiresAt());
        job.setSkills(request.getSkills());
        job.setSlug(generateSlug(job.getTitle(), company.getCompanyName(), job.getId()));

        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    @Override
    public JobDetailResponse getAdminJobById(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        return jobMapper.toJobDetailResponse(job);
    }

    @Override
    public JobDetailResponse updateJobStatusByAdmin(Long id, JobStatus status) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        job.setStatus(status);
        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    @Override
    @Transactional
    public void deleteJobByCurrentEmployer(Long id) {
        Company company = getCurrentEmployerCompany();
        Job job = jobRepository.findByIdAndCompany(id, company).orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        job.setStatus(CLOSED);
        job.setClosedAt(LocalDateTime.now());
        jobRepository.save(job);
    }

    @Override
    @Transactional
    public void deleteJobByAdmin(Long id) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new AppException(JOB_NOT_FOUND));
        job.setStatus(CLOSED);
        job.setClosedAt(LocalDateTime.now());
        jobRepository.save(job);
    }

    @Override
    @Transactional
    public JobDetailResponse publishJob(Long jobId, JobPublishRequest request) {
        Company company = getCurrentEmployerCompany();
        Job job = jobRepository.findByIdAndCompany(jobId, company).orElseThrow(() -> new AppException(JOB_NOT_FOUND));

        if (job.getStatus() != JobStatus.DRAFT) {
            throw new AppException(ErrorCode.JOB_NOT_PUBLISHABLE);
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime postedAt = request.getPostedAt() != null ? request.getPostedAt() : now;

        if (postedAt.isBefore(now.minusMinutes(1))) {
            throw new AppException(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
        }

        LocalDateTime expiresAt = request.getExpiresAt() != null ? request.getExpiresAt() : job.getExpiresAt();

        if (expiresAt != null && !expiresAt.isAfter(postedAt)) {
            throw new AppException(ErrorCode.JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED);
        }

        job.setStatus(JobStatus.ACTIVE);
        job.setPostedAt(postedAt);
        job.setExpiresAt(expiresAt);
        job.setPublishedAt(now);
        job.setClosedAt(null);

        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    @Override
    @Transactional
    public JobDetailResponse closeJob(Long jobId) {
        Company company = getCurrentEmployerCompany();
        Job job = jobRepository.findByIdAndCompany(jobId, company).orElseThrow(() -> new AppException(JOB_NOT_FOUND));

        if (job.getStatus() != JobStatus.ACTIVE) {
            throw new AppException(ErrorCode.JOB_NOT_CLOSABLE);
        }

        job.setStatus(JobStatus.CLOSED);
        job.setClosedAt(LocalDateTime.now());

        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    @Override
    @Transactional
    public JobDetailResponse repostJob(Long jobId, JobRepostRequest request) {
        Company company = getCurrentEmployerCompany();
        Job job = jobRepository.findByIdAndCompany(jobId, company).orElseThrow(() -> new AppException(JOB_NOT_FOUND));

        if (job.getStatus() != JobStatus.CLOSED && job.getStatus() != JobStatus.EXPIRED) {
            throw new AppException(ErrorCode.JOB_NOT_REPOSTABLE);
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime postedAt = request.getPostedAt();
        LocalDateTime expiresAt = request.getExpiresAt();

        if (postedAt.isBefore(now.minusMinutes(1))) {
            throw new AppException(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
        }
        if (expiresAt != null && !expiresAt.isAfter(now)) {
            throw new AppException(ErrorCode.JOB_EXPIRES_AT_STILL_IN_PAST);
        }
        if (expiresAt != null && !expiresAt.isAfter(postedAt)) {
            throw new AppException(ErrorCode.JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED);
        }

        job.setStatus(JobStatus.ACTIVE);
        job.setPostedAt(postedAt);
        job.setExpiresAt(expiresAt);
        job.setPublishedAt(now);
        job.setClosedAt(null);

        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    @Override
    @Transactional
    public int expireOverdueJobs() {
        int count = jobRepository.expireOverdueJobs(LocalDateTime.now());
        if (count > 0) {
            log.info("Auto-expired {} overdue jobs", count);
        }
        return count;
    }

    @Override
    @Transactional
    public JobDetailResponse expireJobByAdmin(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new AppException(JOB_NOT_FOUND));

        if (job.getStatus() != JobStatus.ACTIVE) {
            throw new AppException(ErrorCode.JOB_NOT_CLOSABLE);
        }

        job.setStatus(JobStatus.EXPIRED);
        job.setClosedAt(LocalDateTime.now());

        return jobMapper.toJobDetailResponse(jobRepository.save(job));
    }

    @Override
    public String generateSlug(String jobTitle, String companyName, Long jobId) {
        if (jobId == null) {
            return "";
        }

        String titleSlug = normalizeToSlug(jobTitle);
        String companySlug = normalizeToSlug(companyName);

        return Stream.of(titleSlug, companySlug, String.valueOf(jobId))
                .filter(part -> part != null && !part.isBlank())
                .collect(Collectors.joining("-"));
    }

    @Override
    public String normalizeToSlug(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }

        String slug = input.trim().toLowerCase(Locale.ROOT);
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD).replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        slug = slug.replace("\u0111", "d").replace("\u0110", "d");
        slug = slug.replaceAll("[^a-z0-9]+", "-").replaceAll("^-+|-+$", "");

        return slug;
    }

    Specification<Job> buildPublicJobSearchSpecification(
            String keyword,
            Long cityId,
            List<JobType> jobTypes,
            List<ExperienceLevel> experienceLevels,
            Long jobDomainId,
            Long salaryMin,
            Long salaryMax,
            SalaryCurrency salaryCurrency) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            Join<Job, Skill> skillJoin = root.join("skills", JoinType.LEFT);

            if (query != null) {
                query.distinct(true);
            }

            addPublicVisibilityPredicates(predicates, root, cb, LocalDateTime.now());

            if (keyword != null && !keyword.isBlank()) {
                String normalizedKeyword = keyword.trim().toLowerCase(Locale.ROOT);
                String normalizedSlugKeyword = normalizeToSlug(keyword);
                Set<String> keywordTokens = Stream.of(normalizedKeyword.split("\\s+"))
                        .map(String::trim)
                        .filter(token -> !token.isBlank())
                        .collect(Collectors.toCollection(LinkedHashSet::new));

                List<Predicate> keywordPredicates = new ArrayList<>();
                keywordPredicates.add(cb.like(cb.lower(root.get("title")), "%" + normalizedKeyword + "%"));
                keywordPredicates.add(
                        cb.like(cb.lower(root.get("company").get("companyName")), "%" + normalizedKeyword + "%"));
                keywordPredicates.add(cb.like(cb.lower(skillJoin.get("skillName")), "%" + normalizedKeyword + "%"));

                if (!normalizedSlugKeyword.isBlank()) {
                    keywordPredicates.add(cb.like(cb.lower(root.get("slug")), "%" + normalizedSlugKeyword + "%"));
                }

                for (String keywordToken : keywordTokens) {
                    String tokenPattern = "%" + keywordToken + "%";
                    keywordPredicates.add(cb.like(cb.lower(root.get("title")), tokenPattern));
                    keywordPredicates.add(cb.like(cb.lower(root.get("company").get("companyName")), tokenPattern));
                    keywordPredicates.add(cb.like(cb.lower(skillJoin.get("skillName")), tokenPattern));
                    keywordPredicates.add(
                            cb.like(cb.lower(root.get("slug")), "%" + normalizeToSlug(keywordToken) + "%"));
                }

                predicates.add(cb.or(keywordPredicates.toArray(new Predicate[0])));
            }

            if (cityId != null) {
                predicates.add(cb.equal(root.get("city").get("id"), cityId));
            }

            if (jobTypes != null && !jobTypes.isEmpty()) {
                predicates.add(root.get("jobType").in(jobTypes));
            }

            if (experienceLevels != null && !experienceLevels.isEmpty()) {
                predicates.add(root.get("experienceLevel").in(experienceLevels));
            }

            if (jobDomainId != null) {
                predicates.add(cb.equal(root.get("jobDomain").get("id"), jobDomainId));
            }

            if (salaryCurrency != null && salaryMin != null && salaryMax != null) {
                predicates.add(cb.equal(root.get("salaryCurrency"), salaryCurrency));
                predicates.add(cb.isNotNull(root.get("salaryMin")));
                predicates.add(cb.isNotNull(root.get("salaryMax")));
                predicates.add(cb.lessThanOrEqualTo(root.get("salaryMin"), salaryMax));
                predicates.add(cb.greaterThanOrEqualTo(root.get("salaryMax"), salaryMin));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    Specification<Job> buildPublicVisibilitySpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            addPublicVisibilityPredicates(predicates, root, cb, LocalDateTime.now());
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private void addPublicVisibilityPredicates(
            List<Predicate> predicates,
            jakarta.persistence.criteria.Root<Job> root,
            jakarta.persistence.criteria.CriteriaBuilder cb,
            LocalDateTime now) {
        predicates.add(cb.equal(root.get("status"), ACTIVE));
        predicates.add(cb.lessThanOrEqualTo(root.get("postedAt"), now));
        predicates.add(cb.or(cb.isNull(root.get("expiresAt")), cb.greaterThan(root.get("expiresAt"), now)));
    }

    private void applySalaryFields(Job job, Long salaryMin, Long salaryMax, SalaryCurrency salaryCurrency) {
        if (salaryMin == null && salaryMax == null && salaryCurrency == null) {
            job.setSalaryMin(null);
            job.setSalaryMax(null);
            job.setSalaryCurrency(null);
            return;
        }

        if (salaryMin == null) {
            throw new AppException(ErrorCode.SALARY_MIN_REQUIRED);
        }
        if (salaryMax == null) {
            throw new AppException(ErrorCode.SALARY_MAX_REQUIRED);
        }
        if (salaryCurrency == null) {
            throw new AppException(ErrorCode.SALARY_CURRENCY_REQUIRED);
        }
        if (salaryMin > salaryMax) {
            throw new AppException(ErrorCode.SALARY_RANGE_INVALID);
        }

        job.setSalaryMin(salaryMin);
        job.setSalaryMax(salaryMax);
        job.setSalaryCurrency(salaryCurrency);
    }

    Specification<Job> buildJobFilterSpecification(
            Company company,
            String title,
            String companyName,
            JobStatus status,
            JobType jobType,
            Long cityId,
            LocalDate postedAtFrom,
            LocalDate postedAtTo,
            boolean applyDefaultSort) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (applyDefaultSort && query != null) {
                query.orderBy(cb.desc(root.get("postedAt")), cb.desc(root.get("id")));
            }

            if (company != null) {
                predicates.add(cb.equal(root.get("company"), company));
            }

            if (title != null && !title.isBlank()) {
                predicates.add(cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase(Locale.ROOT) + "%"));
            }

            if (companyName != null && !companyName.isBlank()) {
                predicates.add(cb.like(
                        cb.lower(root.get("company").get("companyName")),
                        "%" + companyName.toLowerCase(Locale.ROOT) + "%"));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            if (jobType != null) {
                predicates.add(cb.equal(root.get("jobType"), jobType));
            }

            if (cityId != null) {
                predicates.add(cb.equal(root.get("city").get("id"), cityId));
            }

            if (postedAtFrom != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("postedAt"), postedAtFrom.atStartOfDay()));
            }

            if (postedAtTo != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("postedAt"), postedAtTo.atTime(23, 59, 59, 999999999)));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private JobDomain resolveActiveJobDomain(JobDomain jobDomain) {
        if (jobDomain == null || jobDomain.getId() == null) {
            throw new AppException(ErrorCode.JOB_DOMAIN_REQUIRED);
        }

        JobDomain found = jobDomainRepository
                .findById(jobDomain.getId())
                .orElseThrow(() -> new AppException(ErrorCode.JOB_DOMAIN_NOT_FOUND));

        if (found.getStatus() == SkillStatus.DEPRECATED) {
            throw new AppException(ErrorCode.JOB_DOMAIN_DEPRECATED);
        }

        return found;
    }

    private Company getCurrentEmployerCompany() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Employer employer =
                employerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_NOT_FOUND));

        return companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));
    }
}
