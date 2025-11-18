package com.dev001.itviec.mapper;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.dto.response.SkillResponse;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.skill.Skill;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SeekerMapper {
    List<SeekerResponse> toSeekerResponse(List<Seeker> seekers);
}
