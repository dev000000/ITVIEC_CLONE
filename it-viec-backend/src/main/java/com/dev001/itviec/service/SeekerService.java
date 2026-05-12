package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.seeker.Seeker;

import java.util.List;

public interface SeekerService {

    List<SeekerResponse> getAllSeekers();

    SeekerResponse getMyProfile();

    Seeker getSeekerByCookie();
}
