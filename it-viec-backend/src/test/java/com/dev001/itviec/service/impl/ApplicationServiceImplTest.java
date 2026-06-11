package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dev001.itviec.dto.request.ApplicationRequest;
import com.dev001.itviec.dto.response.ApplicationCreateResponse;
import com.dev001.itviec.entity.application.Application;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.enums.ApplicationStatus;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.ApplicationMapper;
import com.dev001.itviec.repository.ApplicationRepository;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.SeekerRepository;
import com.dev001.itviec.service.EmployerService;
import com.dev001.itviec.service.SeekerService;

@ExtendWith(MockitoExtension.class)
class ApplicationServiceImplTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private ApplicationMapper applicationMapper;

    @Mock
    private SeekerRepository seekerRepository;

    @Mock
    private SeekerService seekerService;

    @Mock
    private EmployerService employerService;

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private ApplicationServiceImpl applicationService;

    @Test
    void applyToJobShouldRequireCvWhenSeekerHasNoCurrentCvAndNoUpload() {
        Job job = Job.builder().id(1L).status(JobStatus.ACTIVE).build();
        Seeker seeker = Seeker.builder().id("seeker-1").cvUrl(null).build();

        when(jobRepository.findByIdAndStatus(1L, JobStatus.ACTIVE)).thenReturn(Optional.of(job));
        when(seekerService.getSeekerByCookie()).thenReturn(seeker);
        when(applicationRepository.existsBySeekerAndJob(seeker, job)).thenReturn(false);

        assertThatThrownBy(() -> applicationService.applyToJob(1L, buildRequest(), null))
                .isInstanceOf(AppException.class)
                .satisfies(exception ->
                        assertThat(((AppException) exception).getErrorCode()).isEqualTo(ErrorCode.SEEKER_CV_REQUIRED));

        verify(applicationRepository, never()).save(any(Application.class));
        verify(seekerRepository, never()).save(any(Seeker.class));
    }

    @Test
    void applyToJobShouldPersistApplicationAndSyncSeekerInfo() {
        City firstCity = City.builder().id(1L).cityName("Ha Noi").build();
        City secondCity = City.builder().id(2L).cityName("Da Nang").build();
        City thirdCity = City.builder().id(3L).cityName("Can Tho").build();
        Set<City> desiredLocations = new LinkedHashSet<>(Set.of(firstCity, secondCity, thirdCity));

        Job job = Job.builder().id(2L).status(JobStatus.ACTIVE).build();
        Seeker seeker = Seeker.builder()
                .id("seeker-2")
                .fullName("Old Name")
                .phoneNumber("0988888888")
                .coverLetter("Old letter")
                .cvUrl("/api/v1/seekers/seeker-2/cv")
                .build();

        ApplicationRequest request = new ApplicationRequest();
        request.setFullName("New Name");
        request.setPhoneNumber("0912345678");
        request.setCoverLetter("New cover letter");
        request.setDesiredLocations(desiredLocations);

        ApplicationCreateResponse expectedResponse =
                ApplicationCreateResponse.builder().id("application-1").build();

        when(jobRepository.findByIdAndStatus(2L, JobStatus.ACTIVE)).thenReturn(Optional.of(job));
        when(seekerService.getSeekerByCookie()).thenReturn(seeker);
        when(applicationRepository.existsBySeekerAndJob(seeker, job)).thenReturn(false);
        when(applicationRepository.save(any(Application.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(seekerRepository.save(any(Seeker.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(applicationMapper.toApplicationCreateResponse(any(Application.class)))
                .thenReturn(expectedResponse);

        ApplicationCreateResponse result = applicationService.applyToJob(2L, request, null);

        ArgumentCaptor<Application> applicationCaptor = ArgumentCaptor.forClass(Application.class);
        verify(applicationRepository).save(applicationCaptor.capture());
        Application savedApplication = applicationCaptor.getValue();
        assertThat(savedApplication.getJob()).isSameAs(job);
        assertThat(savedApplication.getSeeker()).isSameAs(seeker);
        assertThat(savedApplication.getFullName()).isEqualTo("New Name");
        assertThat(savedApplication.getPhoneNumber()).isEqualTo("0912345678");
        assertThat(savedApplication.getCoverLetter()).isEqualTo("New cover letter");
        assertThat(savedApplication.getResumeUrl()).isEqualTo("/api/v1/seekers/seeker-2/cv");
        assertThat(savedApplication.getStatus()).isEqualTo(ApplicationStatus.PENDING);
        assertThat(savedApplication.getDesiredLocations()).containsExactlyInAnyOrderElementsOf(desiredLocations);

        ArgumentCaptor<Seeker> seekerCaptor = ArgumentCaptor.forClass(Seeker.class);
        verify(seekerRepository).save(seekerCaptor.capture());
        Seeker savedSeeker = seekerCaptor.getValue();
        assertThat(savedSeeker.getFullName()).isEqualTo("New Name");
        assertThat(savedSeeker.getPhoneNumber()).isEqualTo("0912345678");
        assertThat(savedSeeker.getCoverLetter()).isEqualTo("New cover letter");
        assertThat(savedSeeker.getDesiredLocations()).containsExactlyInAnyOrderElementsOf(desiredLocations);

        assertThat(result).isSameAs(expectedResponse);
    }

    private static ApplicationRequest buildRequest() {
        City firstCity = City.builder().id(1L).cityName("Ha Noi").build();
        City secondCity = City.builder().id(2L).cityName("Da Nang").build();
        City thirdCity = City.builder().id(3L).cityName("Can Tho").build();

        ApplicationRequest request = new ApplicationRequest();
        request.setFullName("Test User");
        request.setPhoneNumber("0912345678");
        request.setCoverLetter("Test cover letter");
        request.setDesiredLocations(new LinkedHashSet<>(Set.of(firstCity, secondCity, thirdCity)));
        return request;
    }
}
