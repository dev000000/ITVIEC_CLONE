package com.dev001.itviec.service;

import java.util.List;

import com.dev001.itviec.dto.request.PopularTagCreateRequest;
import com.dev001.itviec.dto.response.PopularTagResponse;

public interface PopularTagService {

    List<PopularTagResponse> getPopularTags();

    PopularTagResponse createPopularTag(PopularTagCreateRequest request);

    void deletePopularTag(Long id);
}
