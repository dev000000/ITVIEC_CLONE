package com.dev001.itviec.service;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.dto.response.SeekerResponse;

import java.util.List;

public interface JobService {

    List<JobResponse> getAllJobs();
}
