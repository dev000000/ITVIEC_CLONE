package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.seeker.Seeker;

@Mapper(
        componentModel = "spring",
        uses = {CityMapper.class, SkillMapper.class, UserMapper.class})
public interface SeekerMapper {

    List<SeekerResponse> toSeekerResponse(List<Seeker> seekers);

    SeekerResponse toSeekerResponse(Seeker seeker);
}
