package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserDetail(String id);

    UserResponse updateUserStatus(String id, UserUpdateRequest request);

    void deleteUser(String id);
}
