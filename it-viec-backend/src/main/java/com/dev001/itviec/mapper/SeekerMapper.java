package com.dev001.itviec.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.seeker.Seeker;

@Mapper(componentModel = "spring")
public interface SeekerMapper {
    List<SeekerResponse> toSeekerResponse(List<Seeker> seekers);
}
