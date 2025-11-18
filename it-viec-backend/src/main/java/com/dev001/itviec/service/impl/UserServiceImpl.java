package com.dev001.itviec.service.impl;

import static com.dev001.itviec.exception.ErrorCode.USER_NOT_FOUND;

import java.util.List;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dev001.itviec.configuration.JwtService;
import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.UserMapper;
import com.dev001.itviec.repository.UserRepository;
import com.dev001.itviec.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    //    @Override
    //    public UserResponse createUser(UserCreationRequest request) {
    //
    //        if (userRepository.existsByUsername(request.getUsername())) {
    //            throw new AppException(USER_EXISTED);
    //        }
    //        User user = userMapper.toUser(request);
    //        String hashedPassword = passwordEncoder.encode(request.getPassword());
    //        user.setPassword(hashedPassword);
    ////        Set<String> roles = new HashSet<>();
    ////        roles.add(Role.USER.name());;
    ////                user.setRoles(roles);
    //        user.setRole(USER);
    //        UserResponse userRes = userMapper.toUserResponse(userRepository.save(user));
    //        userRes.setToken(jwtService.generateToken(user, false));
    //        return userRes;
    //    }

    @Override
    //    @PreAuthorize("hasRole('ADMIN')")
    //    @PreAuthorize("hasAuthority('READ_DATA')")/
    public List<UserResponse> getAllUsers() {
        return userMapper.toUserResponse(userRepository.findAll());
    }

    @Override
    //    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse getUserDetail(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(USER_NOT_FOUND));
        return userMapper.toUserResponse(user);
    }

//    @Override
    //    @PostAuthorize("returnObject.userName == authentication.name")
//    public UserResponse getMyProfile() {
//        SecurityContext context = SecurityContextHolder.getContext();
//        String name = context.getAuthentication().getName();
//        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(USER_NOT_FOUND));
//        return userMapper.toUserResponse(user);
//    }

    @Override
    public UserResponse updateUser(String id, UserUpdateRequest request) {
//        var roles = roleRepository.findAllById(request.getRoles());
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(USER_NOT_FOUND));
        //        user.setRoles(new HashSet<>(roles));
        userMapper.updateUser(user, request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
}
