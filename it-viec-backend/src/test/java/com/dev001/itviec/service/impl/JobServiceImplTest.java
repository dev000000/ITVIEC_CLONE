package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
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
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.repository.CompanyRepository;
import com.dev001.itviec.repository.EmployerRepository;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class JobServiceImplTest {

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

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
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
    void deleteJobByAdminShouldMarkJobClosed() {
        Job job = Job.builder().id(2L).status(JobStatus.ACTIVE).build();
        when(jobRepository.findById(2L)).thenReturn(Optional.of(job));

        jobService.deleteJobByAdmin(2L);

        assertThat(job.getStatus()).isEqualTo(JobStatus.CLOSED);
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
        SecurityContextHolder.getContext()
                .setAuthentication(new TestingAuthenticationToken("employer@example.com", "secret", "ROLE_EMPLOYER"));

        User user = new User();
        Employer employer = new Employer();
        Company company = Company.builder().id("company-1").build();
        Job job = Job.builder().id(4L).status(JobStatus.ACTIVE).company(company).build();

        when(userRepository.findByEmail("employer@example.com")).thenReturn(Optional.of(user));
        when(employerRepository.findByUser(user)).thenReturn(Optional.of(employer));
        when(companyRepository.findByEmployer(employer)).thenReturn(Optional.of(company));
        when(jobRepository.findByIdAndCompany(4L, company)).thenReturn(Optional.of(job));

        jobService.deleteJobByCurrentEmployer(4L);

        assertThat(job.getStatus()).isEqualTo(JobStatus.CLOSED);
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

        PageResponse<JobCardResponse> result =
                jobService.searchJobs(0, 10, "java", 1L, JobType.REMOTE, ExperienceLevel.SENIOR, null, null, null);

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

        when(jobRepository.findBySlugAndStatus("data-engineer", JobStatus.ACTIVE))
                .thenReturn(Optional.of(job));
        when(jobMapper.toJobDetailResponse(job)).thenReturn(response);

        JobDetailResponse result = jobService.getJobBySlug("data-engineer");

        assertThat(result).isSameAs(response);
        verify(jobRepository).findBySlugAndStatus("data-engineer", JobStatus.ACTIVE);
    }
}
