package com.dev001.itviec.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.dev001.itviec.dto.request.AuthenticationRequest;
import com.dev001.itviec.dto.request.RegisterRequest;
import com.dev001.itviec.dto.response.AuthenticationResponse;
import com.dev001.itviec.dto.response.RegisterResponse;

public interface AuthenticationService {

    AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response);

    RegisterResponse register(RegisterRequest request, HttpServletResponse response);

    void refreshToken(HttpServletRequest request, HttpServletResponse response);

}
