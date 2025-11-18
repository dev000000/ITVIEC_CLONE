package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;

import com.dev001.itviec.dto.response.UserResponse;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.mapper.UserMapper;
import com.dev001.itviec.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    //  InjectMocks: create an actual instance of the class under test and automatically inject the mock dependencies
    // into it.
    @InjectMocks
    private UserServiceImpl underTest;

    //  Mock: create a mock instance of the class under test and inject it into the class under test.
    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    private User user;
    private UserResponse userResponse;

    //  BeforeEach: run before each test method.
    @BeforeEach
    //    void setUp() {
    //        user = User.builder()
    //                .id("1")
    //                .userName("usernameTest")
    //                .passWord("ksdlfjsdlfk")
    //                .firstName("test")
    //                .lastName("test")
    //                .dob(LocalDate.parse("2007-08-28"))
    //                .roles(new HashSet<>())
    //                .build();
    //        userResponse = UserResponse.builder()
    //                .id("1")
    //                .userName("usernameTest")
    //                .passWord("ksdlfjsdlfk")
    //                .firstName("test")
    //                .lastName("test")
    //                .dob(LocalDate.parse("2007-08-28"))
    //                .roles(new HashSet<>())
    //                .build();
    //
    //        var auth = new UsernamePasswordAuthenticationToken(
    //                "usernameTest", "pwd", List.of(new SimpleGrantedAuthority("ROLE_USER")));
    //        SecurityContextHolder.getContext().setAuthentication(auth);
    //    }

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    //  @Test: marks a method as a unit test.
    @Test
    //  @Disabled: disable test method, this method will not be executed when you run the test class.
    @Disabled
    void createUser() {}

    @Test
    //  this is a naming convention for test method name
    //  methodName_StateUnderTest_ExpectedBehavior()
    void getAllUsers_shouldReturnMappedList() {
        // given: input, create mock bean behavior (input -> output)
        when(userRepository.findAll()).thenReturn(List.of(user));
        when(userMapper.toUserResponse(List.of(user))).thenReturn(List.of(userResponse));
        // when: method under test
        List<UserResponse> outPut = underTest.getAllUsers();
        // then: assert and verify expected behavior
        assertThat(outPut).hasSize(1);
        verify(userRepository).findAll();
        verify(userMapper).toUserResponse(List.of(user));
    }

    @Test
    @Disabled
    void getUserDetail() {}

    @Test
    @WithMockUser(username = "usernameTest")
    void getMyProfile_validUser_shouldReturnProfile() {
        // given
        //        when(userRepository.findByUserName("usernameTest")).thenReturn(Optional.of(user));
        when(userMapper.toUserResponse(user)).thenReturn(userResponse);
        // when
        UserResponse response = underTest.getMyProfile();
        // then
        //        assertThat(response.getUserName()).isEqualTo("usernameTest");
        assertThat(response.getFirstName()).isEqualTo("test");
        assertThat(response.getLastName()).isEqualTo("test");
        verify(userMapper).toUserResponse(user);
    }

    @Test
    void getMyProfile_invalidUser_shouldThrowException() {
        // given
        //        when(userRepository.findByUserName("usernameTest")).thenReturn(Optional.empty());
        // when
        assertThatThrownBy(() -> underTest.getMyProfile())
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode.code", 1002)
                .hasFieldOrPropertyWithValue("errorCode.message", "User not found");
        // then
        verify(userMapper, never()).toUserResponse(user);
    }

    @Test
    @Disabled
    void updateUser() {}

    @Test
    void deleteUser_shouldCallRepository() {
        // given
        // when
        underTest.deleteUser("1");
        // then
        verify(userRepository).deleteById("1");
    }
}
