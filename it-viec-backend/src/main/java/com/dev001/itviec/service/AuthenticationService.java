package com.dev001.itviec.service;

import com.dev001.itviec.dto.request.AuthenticationRequest;
import com.dev001.itviec.dto.request.RegisterUserSeekerRequest;
import com.dev001.itviec.dto.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthenticationService {

    AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response);

    AuthenticationResponse getCurrentUser();

    void registerUserSeeker(RegisterUserSeekerRequest request, HttpServletResponse response);

    void refreshToken(HttpServletRequest request, HttpServletResponse response);
}
