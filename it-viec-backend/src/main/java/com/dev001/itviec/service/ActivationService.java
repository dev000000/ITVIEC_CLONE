package com.dev001.itviec.service;

import com.dev001.itviec.entity.user.User;

public interface ActivationService {

    void createAndSendActivation(User user);

    void activate(String token);

    void resendActivation(String email);

    void createAndSendEmployerActivation(User user);

    void activateEmployer(String token, String password, String confirmPassword);
}
