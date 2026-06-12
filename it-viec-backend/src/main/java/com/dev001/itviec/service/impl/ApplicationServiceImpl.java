package com.dev001.itviec.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import jakarta.persistence.criteria.Predicate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.request.ApplicationUpdateRequest;
import com.dev001.itviec.dto.response.ApplicationCheckResponse;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.cvfile.CvFile;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.seeker.SeekerCv;
import com.dev001.itviec.enums.ApplicationStatus;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.ApplicationMapper;
import com.dev001.itviec.repository.ApplicationRepository;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.SeekerCvRepository;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.service.ApplicationService;
import com.dev001.itviec.service.EmployerService;
import com.dev001.itviec.service.SeekerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final ApplicationMapper applicationMapper;
    private final SeekerRepository seekerRepository;
    private final SeekerCvRepository seekerCvRepository;
    private final SeekerService seekerService;
    private final EmployerService employerService;
    private final CompanyRepository companyRepository;

    @Override
    public List<ApplicationResponse> getAllApplications() {
        return applicationMapper.toApplicationResponse(applicationRepository.findAll());
    }

    @Transactional
    @Override
    public ApplicationCreateResponse applyToJob(
            Long id, ApplicationRequest request, MultipartFile cvFile, String cvId) {

        Job job = jobRepository
                .findByIdAndStatus(id, JobStatus.ACTIVE)
                .orElseThrow(() -> new AppException(ErrorCode.JOB_NOT_FOUND));

        Seeker seeker = seekerService.getSeekerByCookie();

        boolean isApplicationExited = applicationRepository.existsBySeekerAndJob(seeker, job);
        if (isApplicationExited) {
            throw new AppException(ErrorCode.APPLICATION_ALREADY_EXISTS);
        }

        CvFile selectedCvFile = resolveCvFileForApplication(seeker, cvFile, cvId);

        Application application = Application.builder()
                .seeker(seeker)
                .job(job)
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .resumeUrl(seekerService.buildCvUrl(selectedCvFile.getId()))
                .cvFile(selectedCvFile)
                .coverLetter(request.getCoverLetter())
                .status(ApplicationStatus.PENDING)
                .desiredLocations(request.getDesiredLocations())
                .build();

        Application savedApplication = applicationRepository.save(application);

        seeker.setFullName(request.getFullName());
        seeker.setPhoneNumber(request.getPhoneNumber());
        seeker.setDesiredLocations(request.getDesiredLocations());
        seeker.setCoverLetter(request.getCoverLetter());
        seekerRepository.save(seeker);

        return applicationMapper.toApplicationCreateResponse(savedApplication);
    }

    private CvFile resolveCvFileForApplication(Seeker seeker, MultipartFile cvFile, String cvId) {
        if (cvFile != null && !cvFile.isEmpty()) {
            return seekerService.uploadCvFileForApplication(cvFile);
        }

        if (cvId != null && !cvId.isBlank()) {
            SeekerCv seekerCv = seekerCvRepository
                    .findByIdAndSeekerId(cvId, seeker.getId())
                    .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_NOT_OWNED));
            return seekerCv.getCvFile();
        }

        SeekerCv primaryCv = seekerCvRepository
                .findBySeekerIdAndIsPrimaryTrue(seeker.getId())
                .orElseThrow(() -> new AppException(ErrorCode.SEEKER_CV_REQUIRED));
        return primaryCv.getCvFile();
    }

    @Override
    public List<ApplicationResponse> getMyApplications() {
        Seeker seeker = seekerService.getSeekerByCookie();
        return applicationMapper.toApplicationResponse(applicationRepository.findBySeeker(seeker));
    }

    @Override
    public ApplicationCheckResponse hasAppliedToJob(Long id) {
        Job job = jobRepository
                .findByIdAndStatus(id, JobStatus.ACTIVE)
                .orElseThrow(() -> new AppException(ErrorCode.JOB_NOT_FOUND));

        Seeker seeker = seekerService.getSeekerByCookie();

        return applicationRepository
                .findBySeekerAndJob(seeker, job)
                .map(application -> ApplicationCheckResponse.builder()
                        .applied(true)
                        .createdAt(application.getCreatedAt())
                        .build())
                .orElseGet(() -> ApplicationCheckResponse.builder()
                        .applied(false)
                        .createdAt(null)
                        .build());
    }

    @Override
    public PageResponse<ApplicationResponse> getMyCompanyApplications(
            int page, int size, ApplicationStatus status, String jobTitle) {

        Employer employer = employerService.getEmployerByCookie();

        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        Specification<Application> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            var jobJoin = root.join("job");

            predicates.add(cb.equal(jobJoin.get("company"), company));

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            if (jobTitle != null && !jobTitle.isBlank()) {
                predicates.add(cb.like(
                        cb.lower(jobJoin.get("title")), "%" + jobTitle.trim().toLowerCase(Locale.ROOT) + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Application> applicationPage = applicationRepository.findAll(spec, pageable);
        List<ApplicationResponse> applicationResponses =
                applicationMapper.toApplicationResponse(applicationPage.getContent());

        return PageResponse.<ApplicationResponse>builder()
                .data(applicationResponses)
                .page(applicationPage.getNumber())
                .size(applicationResponses.size())
                .totalElements(applicationPage.getTotalElements())
                .totalPages(applicationPage.getTotalPages())
                .isFirst(applicationPage.isFirst())
                .isLast(applicationPage.isLast())
                .build();
    }

    @Override
    public ApplicationResponse getMyApplicationById(String id) {
        Seeker seeker = seekerService.getSeekerByCookie();

        Application application = applicationRepository
                .findByIdAndSeeker(id, seeker)
                .orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));

        return applicationMapper.toApplicationResponse(application);
    }

    @Override
    public ApplicationResponse getApplicationById(String id) {
        Employer employer = employerService.getEmployerByCookie();

        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        Application application = applicationRepository
                .findByIdAndCompany(id, company)
                .orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));

        return applicationMapper.toApplicationResponse(application);
    }

    @Override
    public List<ApplicationResponse> getApplicationsByJobId(Long id) {
        Employer employer = employerService.getEmployerByCookie();

        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        List<Application> applications = applicationRepository.findByJobIdAndCompany(id, company);

        return applicationMapper.toApplicationResponse(applications);
    }

    @Override
    public ApplicationResponse updateApplicationStatus(String id, ApplicationUpdateRequest request) {
        Employer employer = employerService.getEmployerByCookie();

        boolean existsByEmployer = companyRepository.existsByEmployer(employer);

        if (!existsByEmployer) {
            throw new AppException(ErrorCode.COMPANY_NOT_FOUND);
        }

        Application application =
                applicationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));

        application.setStatus(request.getStatus());
        application.setEmployerMessage(request.getEmployerMessage());

        return applicationMapper.toApplicationResponse(applicationRepository.save(application));
    }
}
