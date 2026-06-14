package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.JobDomainAdminResponse;
import com.dev001.itviec.dto.response.JobDomainResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.enums.SkillStatus;

public interface JobDomainService {

    List<JobDomainResponse> getAllJobDomains();

    List<JobDomainResponse> getTopJobDomains(int limit);

    PageResponse<JobDomainAdminResponse> getAdminJobDomains(SkillStatus status, String search, int page, int size);

    JobDomainAdminResponse createJobDomainAdmin(String domainName);

    JobDomainAdminResponse updateJobDomain(Long id, String domainName);

    JobDomainAdminResponse deprecateJobDomain(Long id);

    JobDomainAdminResponse restoreJobDomain(Long id);
}
