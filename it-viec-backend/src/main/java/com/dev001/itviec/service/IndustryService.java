package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.IndustryAdminResponse;
import com.dev001.itviec.dto.response.IndustryResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.SkillStatus;

public interface IndustryService {

    List<IndustryResponse> getAllIndustries();

    PageResponse<IndustryAdminResponse> getAdminIndustries(SkillStatus status, String search, int page, int size);

    IndustryAdminResponse createIndustryAdmin(String industryName);

    IndustryAdminResponse updateIndustry(Long id, String industryName);

    IndustryAdminResponse deprecateIndustry(Long id);

    IndustryAdminResponse restoreIndustry(Long id);
}
