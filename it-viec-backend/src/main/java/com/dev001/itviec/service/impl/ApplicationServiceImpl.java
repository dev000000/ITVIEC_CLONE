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
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.enums.ApplicationStatus;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.ApplicationMapper;
import com.dev001.itviec.repository.ApplicationRepository;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
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
    private final SeekerService seekerService;
    private final EmployerService employerService;
    private final CompanyRepository companyRepository;

    @Override
    public List<ApplicationResponse> getAllApplications() {
        return applicationMapper.toApplicationResponse(applicationRepository.findAll());
    }

    @Transactional
    @Override
    public ApplicationCreateResponse applyToJob(Long id, ApplicationRequest request, MultipartFile cvFile) {

        // 1. Kiểm tra job đó còn ACTIVE không
        Job job = jobRepository
                .findByIdAndStatus(id, JobStatus.ACTIVE)
                .orElseThrow(() -> new AppException(ErrorCode.JOB_NOT_FOUND));

        // 2. Kiểm tra người xin việc đó có tồn tại hay không
        Seeker seeker = seekerService.getSeekerByCookie();

        // 3. Kiểm tra người dùng đã ứng tuyển vào công việc đó chưa
        boolean isApplicationExited = applicationRepository.existsBySeekerAndJob(seeker, job);
        if (isApplicationExited) {
            throw new AppException(ErrorCode.APPLICATION_ALREADY_EXISTS);
        }

        // 4. Xác định resumeUrl:
        //    - Nếu người dùng gửi CV mới → upload CV mới, cập nhật seeker.cvUrl, dùng URL đó
        //    - Nếu không → dùng CV hiện tại của seeker
        String resumeUrl;
        if (cvFile != null && !cvFile.isEmpty()) {
            // Upload CV mới, đồng bộ seeker.cvUrl, reload để lấy cvUrl mới
            seekerService.uploadMyCv(cvFile);
            seeker = seekerService.getSeekerByCookie();
            resumeUrl = seeker.getCvUrl();
        } else {
            resumeUrl = seeker.getCvUrl();
        }

        // 5. Tạo mới đơn ứng tuyển
        Application application = Application.builder()
                .seeker(seeker)
                .job(job)
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .resumeUrl(resumeUrl)
                .coverLetter(request.getCoverLetter())
                .status(ApplicationStatus.PENDING)
                .desiredLocations(request.getDesiredLocations())
                .build();

        return applicationMapper.toApplicationCreateResponse(applicationRepository.save(application));
    }

    @Override
    public List<ApplicationResponse> getMyApplications() {
        // 1. Kiểm tra người xin việc đó có tồn tại hay không
        Seeker seeker = seekerService.getSeekerByCookie();

        // 2. Tìm tất cả đơn ứng tuyển của người xin việc đó
        return applicationMapper.toApplicationResponse(applicationRepository.findBySeeker(seeker));
    }

    @Override
    public ApplicationCheckResponse hasAppliedToJob(Long id) {
        Job job = jobRepository
                .findByIdAndStatus(id, JobStatus.ACTIVE)
                .orElseThrow(() -> new AppException(ErrorCode.JOB_NOT_FOUND));

        Seeker seeker = seekerService.getSeekerByCookie();

        return applicationRepository.findBySeekerAndJob(seeker, job)
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

        // 1. Kiểm tra nhà tuyển dụng đó có tồn tại hay không
        Employer employer = employerService.getEmployerByCookie();

        // 2. Kiểm tra công ty của nhà tuyển dụng
        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 3. Tìm tất cả đơn ứng tuyển của nhà tuyển dụng đó (công ty đó)
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
        // 1. Kiểm tra người xin việc đó có tồn tại hay không
        Seeker seeker = seekerService.getSeekerByCookie();

        // 2. Tìm đơn ứng tuyển theo id và đơn ứng tuyển đó phải của người xin việc đó hay không
        Application application = applicationRepository
                .findByIdAndSeeker(id, seeker)
                .orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));

        return applicationMapper.toApplicationResponse(application);
    }

    @Override
    public ApplicationResponse getApplicationById(String id) {
        // 1. Kiểm tra nhà tuyển dụng đó có tồn tại hay không
        Employer employer = employerService.getEmployerByCookie();

        // 2. Kiểm tra công ty của nhà tuyển dụng
        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 3. Tìm đơn ứng tuyển có id đó và check xem có phải của công ty đó không
        Application application = applicationRepository
                .findByIdAndCompany(id, company)
                .orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));

        return applicationMapper.toApplicationResponse(application);
    }

    @Override
    public List<ApplicationResponse> getApplicationsByJobId(Long id) {
        // 1. Kiểm tra nhà tuyển dụng đó có tồn tại hay không
        Employer employer = employerService.getEmployerByCookie();

        // 2. Kiểm tra công ty của nhà tuyển dụng
        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 3. Tìm toàn bộ đơn ứng tuyển của job đó, đảm bảo công ty đó mới được xem đơn ứng tuyển của job đó
        List<Application> applications = applicationRepository.findByJobIdAndCompany(id, company);

        return applicationMapper.toApplicationResponse(applications);
    }

    @Override
    public ApplicationResponse updateApplicationStatus(String id, ApplicationUpdateRequest request) {
        // 1. Kiểm tra nhà tuyển dụng đó có tồn tại hay không
        Employer employer = employerService.getEmployerByCookie();

        // 2. Kiểm tra công ty của nhà tuyển dụng
        boolean existsByEmployer = companyRepository.existsByEmployer(employer);

        if (!existsByEmployer) {
            throw new AppException(ErrorCode.COMPANY_NOT_FOUND);
        }

        // 3. tìm đơn ứng tuyển đó
        Application application =
                applicationRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));

        // 4. cập nhật đơn ứng tuyển ( status, employerMessage )
        application.setStatus(request.getStatus());
        application.setEmployerMessage(request.getEmployerMessage());

        return applicationMapper.toApplicationResponse(applicationRepository.save(application));
    }
}
