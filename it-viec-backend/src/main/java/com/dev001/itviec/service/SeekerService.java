package com.dev001.itviec.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.SeekerUpdateRequest;
import com.dev001.itviec.dto.response.SeekerCvContent;
import com.dev001.itviec.dto.response.SeekerCvMetadataResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.seeker.Seeker;

public interface SeekerService {

    List<SeekerResponse> getAllSeekers();

    SeekerResponse getMyProfile();

    Seeker getSeekerByCookie();

    SeekerResponse getSeekerById(String id);

    SeekerResponse updateMyProfile(SeekerUpdateRequest request);

    // CV
    SeekerResponse uploadMyCv(MultipartFile file);

    SeekerCvContent getMyCv();

    SeekerCvContent getCvBySeekerId(String seekerId);

    SeekerResponse deleteMyCv();

    SeekerCvMetadataResponse getMyCvMetadata();
}
