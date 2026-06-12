package com.dev001.itviec.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dev001.itviec.dto.request.SeekerBasicInfoUpdateRequest;
import com.dev001.itviec.dto.request.SeekerCoverLetterUpdateRequest;
import com.dev001.itviec.dto.request.SeekerPersonalInfoUpdateRequest;
import com.dev001.itviec.dto.request.SeekerUpdateRequest;
import com.dev001.itviec.dto.response.SeekerAvatarContent;
import com.dev001.itviec.dto.response.SeekerCvContent;
import com.dev001.itviec.dto.response.SeekerCvMetadataResponse;
import com.dev001.itviec.dto.response.SeekerResponse;
import com.dev001.itviec.entity.cvfile.CvFile;
import com.dev001.itviec.entity.seeker.Seeker;

public interface SeekerService {

    List<SeekerResponse> getAllSeekers();

    SeekerResponse getMyProfile();

    Seeker getSeekerByCookie();

    SeekerResponse getSeekerById(String id);

    SeekerResponse updateMyProfile(SeekerUpdateRequest request);

    SeekerResponse updateMyCoverLetter(SeekerCoverLetterUpdateRequest request);

    SeekerResponse updateMyBasicInfo(SeekerBasicInfoUpdateRequest request);

    SeekerResponse updateMyPersonalInfo(SeekerPersonalInfoUpdateRequest request);

    SeekerResponse uploadMyAvatar(MultipartFile file);

    SeekerAvatarContent getSeekerAvatar(String seekerId);

    SeekerResponse deleteMyAvatar();

    SeekerResponse uploadMyCv(MultipartFile file);

    List<SeekerCvMetadataResponse> getMyCvsMetadata();

    SeekerCvMetadataResponse getMyCvMetadata();

    SeekerCvContent getMyCv();

    SeekerCvContent getCvBySeekerId(String seekerId);

    SeekerCvContent getCvBySeekerCvId(String cvId);

    SeekerCvContent getCvFileContent(String cvFileId);

    SeekerResponse deleteMyCv(String cvId);

    SeekerResponse deleteMyCv();

    SeekerResponse setPrimaryCv(String cvId);

    CvFile uploadCvFileForApplication(MultipartFile file);

    String buildCvUrl(String cvFileId);

    String buildCvPreviewUrl(String cvFileId);
}
