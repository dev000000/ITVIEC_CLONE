package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.dto.response.SavedJobResponse;

public interface SavedJobService {

    SavedJobResponse saveJob(Long jobId);

    void unsaveJob(Long jobId);

    PageResponse<SavedJobResponse> getMySavedJobs(int page, int size, String sort);

    List<Long> getMySavedJobIds();
}
