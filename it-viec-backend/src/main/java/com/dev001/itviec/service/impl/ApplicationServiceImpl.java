package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.dto.response.ApplicationResponse;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public ApplicationCreateResponse applyToJob(Long id, ApplicationRequest request) {

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

        // 4. Nếu job còn ACTIVE và người dùng chưa ứng tuyển thì tạo mới đơn ứng tuyển
        Application application = Application.builder()
                .seeker(seeker)
                .job(job)
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .coverLetter(request.getCoverLetter())
                .status(ApplicationStatus.PENDING)
                .desiredLocations(request.getDesiredLocations())
                .build();

        Application savedApplication = applicationRepository.save(application);

        // 5. Nếu apply job thành công, đồng bộ lại thông tin seeker (thông tin xin việc) // chưa triển khai

        return applicationMapper.toApplicationCreateResponse(savedApplication);
    }

    @Override
    public List<ApplicationResponse> getMyApplications() {
        // 1. Kiểm tra người xin việc đó có tồn tại hay không
        Seeker seeker = seekerService.getSeekerByCookie();

        // 2. Tìm tất cả đơn ứng tuyển của người xin việc đó
        return applicationMapper.toApplicationResponse(applicationRepository.findBySeeker(seeker));
    }

    @Override
    public List<ApplicationResponse> getMyCompanyApplications() {

        // 1. Kiểm tra nhà tuyển dụng đó có tồn tại hay không
        Employer employer = employerService.getEmployerByCookie();

        // 2. Kiểm tra công ty của nhà tuyển dụng
        Company company = companyRepository
                .findByEmployer(employer)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND));

        // 3. Tìm tất cả đơn ứng tuyển của nhà tuyển dụng đó (công ty đó)
        return applicationMapper.toApplicationResponse(applicationRepository.findByCompany(company));
    }

    @Override
    public ApplicationResponse getApplicationById(String id) {
        // 1. Kiểm tra người xin việc đó có tồn tại hay không
        Seeker seeker = seekerService.getSeekerByCookie();

        Application application = applicationRepository.findByIdAndSeeker(id, seeker).orElseThrow(() -> new AppException(ErrorCode.APPLICATION_NOT_FOUND));
        // 2. Tìm đơn ứng tuyển theo id và đơn ứng tuyển đó phải của
        return applicationMapper.toApplicationResponse(application);

    }
}
