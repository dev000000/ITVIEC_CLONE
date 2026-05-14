package com.dev001.itviec.service.impl;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.SeekerMapper;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.SeekerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SeekerServiceImpl implements SeekerService {

    private final SeekerMapper seekerMapper;
    private final SeekerRepository seekerRepository;
    private final UserRepository userRepository;

    @Override
    public List<SeekerResponse> getAllSeekers() {
        return seekerMapper.toSeekerResponse(seekerRepository.findAll());
    }

    @Override
    @Transactional
    public SeekerResponse getMyProfile() {
        return seekerMapper.toSeekerResponse(getSeekerByCookie());
    }

    @Override
    public Seeker getSeekerByCookie() {
        // 1. lấy email từ SecurityContext (do JwtAuthenticationFilter set)
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = authentication.getName();

        // 2. tìm user trong DB theo email
        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // 3. tìm seeker theo user
        Seeker seeker =
                seekerRepository.findByUser(user).orElseThrow(() -> new AppException(ErrorCode.SEEKER_NOT_FOUND));

        return seeker;
    }

    @Override
    public SeekerResponse getSeekerById(String id) {

        return seekerMapper.toSeekerResponse(seekerRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SEEKER_NOT_FOUND)));
    }
}
