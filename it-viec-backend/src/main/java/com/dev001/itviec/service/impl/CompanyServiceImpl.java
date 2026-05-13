package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.request.CompanyUpdateRequest;
import com.dev001.itviec.dto.response.CompanyCardResponse;
import com.dev001.itviec.dto.response.CompanyDetailResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.CompanyMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.service.CompanyService;
import com.dev001.itviec.service.EmployerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyMapper companyMapper;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final EmployerService employerService;

    @Override
    @Transactional(readOnly = true)
    public List<CompanyCardResponse> getAllCompaniesWithJobCountActive() {
        List<Object[]> rows = companyRepository.findAllCompaniesWithJobCountActive(JobStatus.ACTIVE);

        return rows.stream()
                .map(row -> {
                    Company company = (Company) row[0];
                    int activeJobCount = ((Long) row[1]).intValue();

                    CompanyCardResponse response = companyMapper.toCompanyCardResponse(company);
                    response.setNumberOfJobsActive(activeJobCount);
                    return response;
                })
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyDetailResponse getCompanyWithJobsActive(String slug) {

        // 1. Tìm company theo slug
        Company company = companyRepository
                .findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND_BY_SLUG));

        // 2. Tìm job active của company đó
        List<Job> jobList = jobRepository.findByCompanyAndStatus(company, JobStatus.ACTIVE);

        // 3. Set job vào company
        company.setJobs(jobList);

        return companyMapper.toCompanyDetailResponse(company);
    }

    @Override
    public CompanyDetailResponse getMyCompany() {
        // 1.Lấy thông tin nhà tuyển dụng hiện tại từ cookie
        Employer employer = employerService.getEmployerByCookie();

        // 2.Lấy thông tin công ty của nhà tuyển dụng đó
        Company company = companyRepository.findByEmployer(employer).orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND_BY_EMPLOYER));
        return companyMapper.toCompanyDetailResponse(company);
    }

    @Override
    public CompanyDetailResponse updateMyCompany(CompanyUpdateRequest request) {
        // 1.Lấy thông tin nhà tuyển dụng hiện tại từ cookie
        Employer employer = employerService.getEmployerByCookie();

        // 2.Lấy thông tin công ty của nhà tuyển dụng đó
        Company company = companyRepository.findByEmployer(employer).orElseThrow(() -> new AppException(ErrorCode.COMPANY_NOT_FOUND_BY_EMPLOYER));

        // 3. Cập nhật thông tin company với dữ liệu từ request
        company.setCompanyName(request.getCompanyName());
        company.setDescription(request.getDescription());
        company.setWebsite(request.getWebsite());
        company.setLogoUrl(request.getLogoUrl());
        company.setAddress(request.getAddress());
        company.setCompanyModel(request.getCompanyModel());
        company.setIndustry(request.getIndustry());
        company.setCompanySize(request.getCompanySize());
        company.setCountry(request.getCountry());
        company.setWorkingHours(request.getWorkingHours());
        company.setOvertimePolicy(request.getOvertimePolicy());
        company.setCompanyIntroduction(request.getCompanyIntroduction());
        company.setOurExpertise(request.getOurExpertise());
        company.setWhyWorkHere(request.getWhyWorkHere());
        company.setCompanySkills(request.getCompanySkills());
        company.setSlug(generateCompanySlug(request.getCompanyName()));

        return companyMapper.toCompanyDetailResponse(companyRepository.save(company));
    }

    public String generateCompanySlug(String companyName) {
        if (companyName == null || companyName.trim().isEmpty()) {
            return "";
        }

        String slug = companyName.trim().toLowerCase(Locale.ROOT);

        // Chuẩn hóa unicode và bỏ dấu
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        // Xử lý riêng ký tự đ/Đ tiếng Việt
        slug = slug.replace("đ", "d").replace("Đ", "d");

        // Thay mọi ký tự không phải chữ hoặc số thành dấu -
        slug = slug.replaceAll("[^a-z0-9]+", "-");

        // Xóa dấu - ở đầu/cuối
        slug = slug.replaceAll("^-+|-+$", "");

        return slug;
    }

}
