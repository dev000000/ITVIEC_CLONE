package com.dev001.itviec.service.impl;

import com.dev001.itviec.configuration.JwtService;
import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Role;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.UserMapper;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.dev001.itviec.exception.ErrorCode.ADMIN_IS_NOT_ALLOWED_TO_UPDATE_STATUS_ADMIN;
import static com.dev001.itviec.exception.ErrorCode.USER_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public List<UserResponse> getAllUsers() {
        return userMapper.toUserResponse(userRepository.findAll());
    }

    @Override
    public UserResponse getUserDetail(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(USER_NOT_FOUND));
        return userMapper.toUserResponse(user);
    }

    @Override
    public UserResponse updateUserStatus(String id, UserUpdateRequest request) {
        // 1. Kiểm tra xem user có tồn tại hay không, nếu không tồn tại thì ném ra exception
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(USER_NOT_FOUND));

        // 2. Kiểm tra xem user có phải là admin hay không, nếu là admin thì không được phép cập nhật status
        if (user.getRole().equals(Role.ADMIN)) {
            throw new AppException(ADMIN_IS_NOT_ALLOWED_TO_UPDATE_STATUS_ADMIN);
        }
        user.setStatus(request.getStatus());
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
