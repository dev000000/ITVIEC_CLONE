package com.dev001.itviec.controller;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.ApiResponse;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse<List<UserResponse>> getUsers() {

        // SecurityContextHolder chua thong tin ve user dang nhap hien tai
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: {}", authentication.getName());
        authentication.getAuthorities().forEach(authority -> log.info("Authority: {}", authority.getAuthority()));

        //      spotless:off
                return ApiResponse.<List<UserResponse>>builder()
                            .code(1000)
                            .result(userService.getAllUsers())
                        .build();
        //      spotless:on
    }

    //    @PostMapping
    //    public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreationRequest request) {
    //        return ApiResponse.<UserResponse>builder()
    //                .code(1000)
    //                .result(userService.createUser(request))
    //                .build();
    //    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUser(@PathVariable String id) {
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userService.getUserDetail(id))
                .build();
    }

//    @GetMapping("/my-profile")
//    public ApiResponse<UserResponse> getMyProfile() {
//        return ApiResponse.<UserResponse>builder()
//                .code(1000)
//                .result(userService.getMyProfile())
//                .build();
//    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@PathVariable String id, @RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(userService.updateUser(id, request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);

        return ApiResponse.<String>builder()
                .code(1000)
                .message("User deleted successfully")
                .build();
    }
}
