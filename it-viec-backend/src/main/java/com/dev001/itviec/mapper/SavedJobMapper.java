package com.dev001.itviec.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.dev001.itviec.dto.response.SavedJobItemResponse;
import com.dev001.itviec.dto.response.SavedJobResponse;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.savedjob.SavedJob;

@Mapper(
        componentModel = "spring",
        uses = {CityMapper.class, SkillMapper.class, CompanyMapper.class})
public interface SavedJobMapper {

    @Mapping(target = "savedAt", source = "createdAt")
    @Mapping(target = "job", source = "job")
    SavedJobResponse toSavedJobResponse(SavedJob savedJob);

    SavedJobItemResponse toSavedJobItemResponse(Job job);
}
