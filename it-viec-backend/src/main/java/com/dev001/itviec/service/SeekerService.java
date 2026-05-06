package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.SeekerResponse;

public interface SeekerService {

    List<SeekerResponse> getAllSeekers();

    SeekerResponse getSeekerByCookie();
}
