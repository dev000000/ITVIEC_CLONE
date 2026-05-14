package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.request.EmployerUpdateRequest;
import com.dev001.itviec.dto.response.EmployerResponse;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.EmployerMapper;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.EmployerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployerServiceImpl implements EmployerService {

    private final EmployerMapper employerMapper;
    private final EmployerRepository employerRepository;
    private final UserRepository userRepository;

    @Override
    public Employer getEmployerByCookie() {
        // 1. lấy email từ SecurityContext (do JwtAuthenticationFilter set)
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = authentication.getName();

        // 2. tìm user trong DB theo email
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // 3. tìm Employer theo user
        Employer Employer =
                employerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_NOT_FOUND));

        return Employer;
    }

    @Override
    public EmployerResponse getMyProfile() {
        return employerMapper.toEmployerResponse(getEmployerByCookie());
    }

    @Transactional
    @Override
    public EmployerResponse updateMyProfile(EmployerUpdateRequest request) {
        // 1. Lấy employer hiện tại từ cookie
        Employer employer = getEmployerByCookie();
        // 2. Cập nhật thông tin của employer
        employer.setFullName(request.getFullName());
        employer.setJobTitle(request.getJobTitle());
        employer.setPhoneNumber(request.getPhoneNumber());

        return employerMapper.toEmployerResponse(employerRepository.save(employer));
    }

    @Override
    public List<EmployerResponse> getAllEmployers() {
        return employerMapper.toEmployerResponse(employerRepository.findAll());
    }

    @Override
    public EmployerResponse getEmployerById(String id) {
        Employer employer =
                employerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.EMPLOYER_NOT_FOUND));
        return employerMapper.toEmployerResponse(employer);
    }
}
