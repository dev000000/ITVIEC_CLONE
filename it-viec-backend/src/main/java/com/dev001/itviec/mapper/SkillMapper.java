package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.CityResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillMapper {
    List<SkillResponse> toSkillResponse(List<Skill> skills);
}
