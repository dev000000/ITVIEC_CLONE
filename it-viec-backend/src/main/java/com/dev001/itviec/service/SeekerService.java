package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.dto.response.SkillResponse;

import java.util.List;

public interface SeekerService {

    List<SeekerResponse> getAllSeekers();
}
