package com.dev001.itviec.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.dev001.itviec.dto.request.AuthenticationRequest;
import com.dev001.itviec.dto.request.RegisterUserSeekerRequest;
import com.dev001.itviec.dto.response.AuthenticationResponse;
import com.dev001.itviec.dto.response.RegisterUserSeekerResponse;

public interface AuthenticationService {

    AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response);

    AuthenticationResponse getCurrentUser();

    RegisterUserSeekerResponse register(RegisterUserSeekerRequest request, HttpServletResponse response);

    void registerUserSeeker(RegisterUserSeekerRequest request, HttpServletResponse response);

    void refreshToken(HttpServletRequest request, HttpServletResponse response);
}
