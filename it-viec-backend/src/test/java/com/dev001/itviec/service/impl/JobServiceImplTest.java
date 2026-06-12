package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.dev001.itviec.dto.request.JobPublishRequest;
import com.dev001.itviec.dto.request.JobRepostRequest;
import com.dev001.itviec.dto.response.JobCardResponse;
import com.dev001.itviec.dto.response.JobDetailResponse;
import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class JobServiceImplTest {

    private static final String EMPLOYER_EMAIL = "employer@example.com";

    @Mock
    private JobMapper jobMapper;

    @Mock
    private JobRepository jobRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmployerRepository employerRepository;

    @InjectMocks
    private JobServiceImpl jobService;

    private Company company;

    @BeforeEach
    void setUpEmployerContext() {
        company = Company.builder().id("company-1").build();
    }

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    private void authenticateEmployer() {
        SecurityContextHolder.getContext()
                .setAuthentication(new TestingAuthenticationToken(EMPLOYER_EMAIL, "secret", "ROLE_EMPLOYER"));

        User user = new User();
        Employer employer = new Employer();
        when(userRepository.findByEmail(EMPLOYER_EMAIL)).thenReturn(Optional.of(user));
        when(employerRepository.findByUser(user)).thenReturn(Optional.of(employer));
        when(companyRepository.findByEmployer(employer)).thenReturn(Optional.of(company));
    }

    private Job ownedJob(Long id, JobStatus status) {
        return Job.builder().id(id).status(status).company(company).build();
    }

    @Test
    void updateJobStatusByAdminShouldSaveNewStatus() {
        Job job = Job.builder().id(1L).status(JobStatus.DRAFT).build();
        JobDetailResponse expected = JobDetailResponse.builder().build();

        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job)).thenReturn(expected);

        JobDetailResponse result = jobService.updateJobStatusByAdmin(1L, JobStatus.ACTIVE);

        assertThat(job.getStatus()).isEqualTo(JobStatus.ACTIVE);
        assertThat(result).isSameAs(expected);
        verify(jobRepository).save(job);
    }

    @Test
    void deleteJobByAdminShouldMarkJobClosedWithClosedAt() {
        Job job = Job.builder().id(2L).status(JobStatus.ACTIVE).build();
        when(jobRepository.findById(2L)).thenReturn(Optional.of(job));

        jobService.deleteJobByAdmin(2L);

        assertThat(job.getStatus()).isEqualTo(JobStatus.CLOSED);
        assertThat(job.getClosedAt()).isNotNull();
        verify(jobRepository).save(job);
    }

    @Test
    void getAdminJobsShouldReturnPaginatedResponse() {
        Job job = Job.builder().id(3L).title("Backend Engineer").build();
        JobDetailResponse response = JobDetailResponse.builder().id(3L).build();

        when(jobRepository.findAll(org.mockito.ArgumentMatchers.<Specification<Job>>any(), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(job), Pageable.ofSize(10).withPage(0), 1));
        when(jobMapper.toJobDetailResponse(List.of(job))).thenReturn(List.of(response));

        PageResponse<JobDetailResponse> result = jobService.getAdminJobs(
                0,
                10,
                "backend",
                "itviec",
                JobStatus.ACTIVE,
                JobType.HYBRID,
                1L,
                LocalDate.of(2026, 6, 1),
                LocalDate.of(2026, 6, 30));

        ArgumentCaptor<Pageable> pageableCaptor = ArgumentCaptor.forClass(Pageable.class);
        verify(jobRepository).findAll(org.mockito.ArgumentMatchers.<Specification<Job>>any(), pageableCaptor.capture());

        Pageable pageable = pageableCaptor.getValue();
        assertThat(pageable.getPageNumber()).isZero();
        assertThat(pageable.getPageSize()).isEqualTo(10);
        assertThat(pageable.getSort()).isEqualTo(Sort.by(Sort.Order.desc("postedAt"), Sort.Order.desc("id")));
        assertThat(result.getData()).containsExactly(response);
        assertThat(result.getPage()).isZero();
        assertThat(result.getSize()).isEqualTo(1);
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getTotalPages()).isEqualTo(1);
        assertThat(result.isFirst()).isTrue();
        assertThat(result.isLast()).isTrue();
    }

    @Test
    void deleteJobByCurrentEmployerShouldOnlySoftDeleteOwnedJob() {
        authenticateEmployer();
        Job job = ownedJob(4L, JobStatus.ACTIVE);
        when(jobRepository.findByIdAndCompany(4L, company)).thenReturn(Optional.of(job));

        jobService.deleteJobByCurrentEmployer(4L);

        assertThat(job.getStatus()).isEqualTo(JobStatus.CLOSED);
        assertThat(job.getClosedAt()).isNotNull();
        verify(jobRepository).save(job);
    }

    @Test
    void searchJobsShouldReturnPaginatedCards() {
        Job job = Job.builder()
                .id(5L)
                .title("Java Developer")
                .status(JobStatus.ACTIVE)
                .build();
        JobCardResponse response =
                JobCardResponse.builder().id(5L).title("Java Developer").build();

        when(jobRepository.findAll(org.mockito.ArgumentMatchers.<Specification<Job>>any(), any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(job), Pageable.ofSize(10).withPage(0), 1));
        when(jobMapper.toJobCardResponse(List.of(job))).thenReturn(List.of(response));

        PageResponse<JobCardResponse> result = jobService.searchJobs(
                0, 10, "java", 1L, List.of(JobType.REMOTE), List.of(ExperienceLevel.SENIOR), null, null, null, null);

        assertThat(result.getData()).containsExactly(response);
        assertThat(result.getTotalElements()).isEqualTo(1);
        verify(jobRepository).findAll(org.mockito.ArgumentMatchers.<Specification<Job>>any(), any(Pageable.class));
    }

    @Test
    void getJobBySlugShouldOnlyFetchActiveJob() {
        Job job = Job.builder()
                .id(6L)
                .title("Data Engineer")
                .status(JobStatus.ACTIVE)
                .build();
        JobDetailResponse response = JobDetailResponse.builder().id(6L).build();

        when(jobRepository.findPublicVisibleBySlug(eq("data-engineer"), any())).thenReturn(Optional.of(job));
        when(jobMapper.toJobDetailResponse(job)).thenReturn(response);

        JobDetailResponse result = jobService.getJobBySlug("data-engineer");

        assertThat(result).isSameAs(response);
        verify(jobRepository).findPublicVisibleBySlug(eq("data-engineer"), any());
    }

    @Test
    void publishJobFromDraftSucceeds() {
        authenticateEmployer();
        Job job = ownedJob(10L, JobStatus.DRAFT);
        JobDetailResponse response = JobDetailResponse.builder().id(10L).build();

        when(jobRepository.findByIdAndCompany(10L, company)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job)).thenReturn(response);

        JobDetailResponse result = jobService.publishJob(10L, new JobPublishRequest());

        assertThat(job.getStatus()).isEqualTo(JobStatus.ACTIVE);
        assertThat(job.getPublishedAt()).isNotNull();
        assertThat(job.getPostedAt()).isNotNull();
        assertThat(job.getClosedAt()).isNull();
        assertThat(result).isSameAs(response);
    }

    @Test
    void publishJobFromDraftWithFuturePostedAt() {
        authenticateEmployer();
        Job job = ownedJob(11L, JobStatus.DRAFT);
        LocalDateTime futurePostedAt = LocalDateTime.now().plusDays(7);

        when(jobRepository.findByIdAndCompany(11L, company)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job))
                .thenReturn(JobDetailResponse.builder().build());

        jobService.publishJob(
                11L, JobPublishRequest.builder().postedAt(futurePostedAt).build());

        assertThat(job.getStatus()).isEqualTo(JobStatus.ACTIVE);
        assertThat(job.getPostedAt()).isEqualTo(futurePostedAt);
    }

    @Test
    void publishJobFromActiveThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(12L, company)).thenReturn(Optional.of(ownedJob(12L, JobStatus.ACTIVE)));

        assertThatThrownBy(() -> jobService.publishJob(12L, new JobPublishRequest()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_PUBLISHABLE);
    }

    @Test
    void publishJobFromClosedThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(13L, company)).thenReturn(Optional.of(ownedJob(13L, JobStatus.CLOSED)));

        assertThatThrownBy(() -> jobService.publishJob(13L, new JobPublishRequest()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_PUBLISHABLE);
    }

    @Test
    void publishJobFromExpiredThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(14L, company)).thenReturn(Optional.of(ownedJob(14L, JobStatus.EXPIRED)));

        assertThatThrownBy(() -> jobService.publishJob(14L, new JobPublishRequest()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_PUBLISHABLE);
    }

    @Test
    void publishJobPastPostedAtThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(15L, company)).thenReturn(Optional.of(ownedJob(15L, JobStatus.DRAFT)));

        assertThatThrownBy(() -> jobService.publishJob(
                        15L,
                        JobPublishRequest.builder()
                                .postedAt(LocalDateTime.now().minusDays(1))
                                .build()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
    }

    @Test
    void publishJobExpiresBeforePostedThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(16L, company)).thenReturn(Optional.of(ownedJob(16L, JobStatus.DRAFT)));

        LocalDateTime postedAt = LocalDateTime.now().plusDays(7);
        LocalDateTime expiresAt = LocalDateTime.now().plusDays(3);

        assertThatThrownBy(() -> jobService.publishJob(
                        16L,
                        JobPublishRequest.builder()
                                .postedAt(postedAt)
                                .expiresAt(expiresAt)
                                .build()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_EXPIRES_AT_MUST_BE_AFTER_POSTED);
    }

    @Test
    void closeJobFromActiveSucceeds() {
        authenticateEmployer();
        Job job = ownedJob(20L, JobStatus.ACTIVE);
        when(jobRepository.findByIdAndCompany(20L, company)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job))
                .thenReturn(JobDetailResponse.builder().build());

        jobService.closeJob(20L);

        assertThat(job.getStatus()).isEqualTo(JobStatus.CLOSED);
        assertThat(job.getClosedAt()).isNotNull();
    }

    @Test
    void closeJobFromDraftThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(21L, company)).thenReturn(Optional.of(ownedJob(21L, JobStatus.DRAFT)));

        assertThatThrownBy(() -> jobService.closeJob(21L))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_CLOSABLE);
    }

    @Test
    void closeJobFromClosedThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(22L, company)).thenReturn(Optional.of(ownedJob(22L, JobStatus.CLOSED)));

        assertThatThrownBy(() -> jobService.closeJob(22L))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_CLOSABLE);
    }

    @Test
    void repostJobFromClosedSucceeds() {
        authenticateEmployer();
        Job job = ownedJob(30L, JobStatus.CLOSED);
        job.setClosedAt(LocalDateTime.now().minusDays(1));
        LocalDateTime postedAt = LocalDateTime.now();
        LocalDateTime expiresAt = LocalDateTime.now().plusDays(30);

        when(jobRepository.findByIdAndCompany(30L, company)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job))
                .thenReturn(JobDetailResponse.builder().build());

        jobService.repostJob(
                30L,
                JobRepostRequest.builder()
                        .postedAt(postedAt)
                        .expiresAt(expiresAt)
                        .build());

        assertThat(job.getStatus()).isEqualTo(JobStatus.ACTIVE);
        assertThat(job.getPublishedAt()).isNotNull();
        assertThat(job.getClosedAt()).isNull();
        assertThat(job.getPostedAt()).isEqualTo(postedAt);
        assertThat(job.getExpiresAt()).isEqualTo(expiresAt);
    }

    @Test
    void repostJobFromExpiredSucceeds() {
        authenticateEmployer();
        Job job = ownedJob(31L, JobStatus.EXPIRED);
        when(jobRepository.findByIdAndCompany(31L, company)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job))
                .thenReturn(JobDetailResponse.builder().build());

        jobService.repostJob(
                31L,
                JobRepostRequest.builder()
                        .postedAt(LocalDateTime.now())
                        .expiresAt(LocalDateTime.now().plusDays(30))
                        .build());

        assertThat(job.getStatus()).isEqualTo(JobStatus.ACTIVE);
    }

    @Test
    void repostJobFromActiveThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(32L, company)).thenReturn(Optional.of(ownedJob(32L, JobStatus.ACTIVE)));

        assertThatThrownBy(() -> jobService.repostJob(
                        32L,
                        JobRepostRequest.builder()
                                .postedAt(LocalDateTime.now())
                                .expiresAt(LocalDateTime.now().plusDays(30))
                                .build()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_REPOSTABLE);
    }

    @Test
    void repostJobFromDraftThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(33L, company)).thenReturn(Optional.of(ownedJob(33L, JobStatus.DRAFT)));

        assertThatThrownBy(() -> jobService.repostJob(
                        33L,
                        JobRepostRequest.builder()
                                .postedAt(LocalDateTime.now())
                                .expiresAt(LocalDateTime.now().plusDays(30))
                                .build()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_REPOSTABLE);
    }

    @Test
    void repostJobPastExpiresAtThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(34L, company)).thenReturn(Optional.of(ownedJob(34L, JobStatus.CLOSED)));

        assertThatThrownBy(() -> jobService.repostJob(
                        34L,
                        JobRepostRequest.builder()
                                .postedAt(LocalDateTime.now())
                                .expiresAt(LocalDateTime.now().minusDays(1))
                                .build()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_EXPIRES_AT_STILL_IN_PAST);
    }

    @Test
    void repostJobPastPostedAtThrows() {
        authenticateEmployer();
        when(jobRepository.findByIdAndCompany(35L, company)).thenReturn(Optional.of(ownedJob(35L, JobStatus.CLOSED)));

        assertThatThrownBy(() -> jobService.repostJob(
                        35L,
                        JobRepostRequest.builder()
                                .postedAt(LocalDateTime.now().minusDays(1))
                                .expiresAt(LocalDateTime.now().plusDays(30))
                                .build()))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_POSTED_AT_MUST_BE_FUTURE);
    }

    @Test
    void expireOverdueJobsReturnsRepositoryCount() {
        when(jobRepository.expireOverdueJobs(any())).thenReturn(1);

        int count = jobService.expireOverdueJobs();

        assertThat(count).isEqualTo(1);
        verify(jobRepository).expireOverdueJobs(any());
    }

    @Test
    void expireOverdueJobsNoMatchesReturnsZero() {
        when(jobRepository.expireOverdueJobs(any())).thenReturn(0);

        assertThat(jobService.expireOverdueJobs()).isZero();
    }

    @Test
    void expireJobByAdminFromActiveSucceeds() {
        Job job = Job.builder().id(40L).status(JobStatus.ACTIVE).build();
        when(jobRepository.findById(40L)).thenReturn(Optional.of(job));
        when(jobRepository.save(job)).thenReturn(job);
        when(jobMapper.toJobDetailResponse(job))
                .thenReturn(JobDetailResponse.builder().build());

        jobService.expireJobByAdmin(40L);

        assertThat(job.getStatus()).isEqualTo(JobStatus.EXPIRED);
        assertThat(job.getClosedAt()).isNotNull();
    }

    @Test
    void expireJobByAdminFromDraftThrows() {
        when(jobRepository.findById(41L))
                .thenReturn(Optional.of(
                        Job.builder().id(41L).status(JobStatus.DRAFT).build()));

        assertThatThrownBy(() -> jobService.expireJobByAdmin(41L))
                .isInstanceOf(AppException.class)
                .extracting(ex -> ((AppException) ex).getErrorCode())
                .isEqualTo(ErrorCode.JOB_NOT_CLOSABLE);
    }
}
