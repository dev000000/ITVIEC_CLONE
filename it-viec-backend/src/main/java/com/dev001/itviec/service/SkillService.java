package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.dto.response.SkillResponse;

import java.util.List;

public interface SkillService {

    List<SkillResponse> getAllSkills();
}
