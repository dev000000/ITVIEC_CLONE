package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dev001.itviec.dto.request.RegisterRequest;
import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.RegisterResponse;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.entity.user.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    //    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    List<UserResponse> toUserResponse(List<User> users);

    RegisterResponse toRegisterResponse(User user);

    User toUser(RegisterRequest request);

    //    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
