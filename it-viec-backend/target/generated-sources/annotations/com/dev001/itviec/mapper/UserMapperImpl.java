package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.request.RegisterRequest;
import com.dev001.itviec.dto.request.UserUpdateRequest;
import com.dev001.itviec.dto.response.RegisterResponse;
import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.entity.user.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    comments = "version: 1.5.5.Final, compiler: Eclipse JDT (IDE) 3.44.0.v20251023-0518, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.id( user.getId() );
        userResponse.password( user.getPassword() );
        userResponse.role( user.getRole() );
        userResponse.username( user.getUsername() );

        return userResponse.build();
    }

    @Override
    public List<UserResponse> toUserResponse(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserResponse> list = new ArrayList<UserResponse>( users.size() );
        for ( User user : users ) {
            list.add( toUserResponse( user ) );
        }

        return list;
    }

    @Override
    public RegisterResponse toRegisterResponse(User user) {
        if ( user == null ) {
            return null;
        }

        RegisterResponse.RegisterResponseBuilder registerResponse = RegisterResponse.builder();

        registerResponse.id( user.getId() );
        registerResponse.password( user.getPassword() );
        registerResponse.role( user.getRole() );
        registerResponse.username( user.getUsername() );

        return registerResponse.build();
    }

    @Override
    public User toUser(RegisterRequest request) {
        if ( request == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.password( request.getPassword() );
        user.role( request.getRole() );

        return user.build();
    }

    @Override
    public void updateUser(User user, UserUpdateRequest request) {
        if ( request == null ) {
            return;
        }

        user.setPassword( request.getPassword() );
    }
}
