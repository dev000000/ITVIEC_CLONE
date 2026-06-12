package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.MergeSkillResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.dto.response.SkillAdminResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.enums.SkillStatus;

public interface SkillService {

    List<SkillResponse> getAllSkills();

    PageResponse<SkillAdminResponse> getAdminSkills(SkillStatus status, String search, int page, int size);

    SkillAdminResponse createSkillAdmin(String skillName);

    SkillAdminResponse updateSkill(Long id, String skillName);

    SkillAdminResponse deprecateSkill(Long id);

    MergeSkillResponse mergeSkill(Long sourceId, Long targetSkillId);

    SkillAdminResponse restoreSkill(Long id);
}
