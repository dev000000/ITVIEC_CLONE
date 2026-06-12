package com.dev001.itviec.mapper;

import java.time.LocalDateTime;
import java.util.List;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import com.dev001.itviec.dto.response.CompanyBaseResponse;
import com.dev001.itviec.dto.response.CompanyBriefResponse;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.enums.JobStatus;

@Mapper(
        componentModel = "spring",
        uses = {
            CityMapper.class,
            SkillMapper.class,
            JobDomainMapper.class,
        })
public interface JobMapper {
    List<JobDetailResponse> toJobDetailResponse(List<Job> jobs);

    JobDetailResponse toJobDetailResponse(Job job);

    JobCardResponse toJobCardResponse(Job job);

    List<JobCardResponse> toJobCardResponse(List<Job> jobs);

    CompanyBriefResponse toCompanyBriefResponse(Company company);

    CompanyBaseResponse toCompanyBaseResponse(Company company);

    @AfterMapping
    default void computeEffectiveStatus(Job job, @MappingTarget JobDetailResponse.JobDetailResponseBuilder response) {
        if (job == null) {
            return;
        }
        if (job.getStatus() == JobStatus.ACTIVE) {
            LocalDateTime now = LocalDateTime.now();
            if (job.getPostedAt() != null && job.getPostedAt().isAfter(now)) {
                response.effectiveStatus("SCHEDULED");
            } else if (job.getExpiresAt() != null && !job.getExpiresAt().isAfter(now)) {
                response.effectiveStatus("EXPIRED_PENDING");
            } else {
                response.effectiveStatus("ACTIVE_VISIBLE");
            }
        } else {
            response.effectiveStatus(job.getStatus().name());
        }
    }
}
