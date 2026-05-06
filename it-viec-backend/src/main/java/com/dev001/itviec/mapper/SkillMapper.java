package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.skill.Skill;

@Mapper(componentModel = "spring")
public interface SkillMapper {
    List<SkillResponse> toSkillResponse(List<Skill> skills);
    SkillResponse toSkillResponse(Skill skill);
}
