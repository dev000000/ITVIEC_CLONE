package com.dev001.itviec.service.impl;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dev001.itviec.dto.response.JobResponse;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.mapper.JobMapper;
import com.dev001.itviec.repository.JobRepository;

@ExtendWith(MockitoExtension.class)
class JobServiceImplTest {

    private JobServiceImpl underTest;

    @Mock
    private JobMapper jobMapper;

    @Mock
    private JobRepository jobRepository;

    @BeforeEach
    void setUp() {
        underTest = new JobServiceImpl(jobMapper, jobRepository, null);
    }

    @Test
    void getAllJobs_shouldReturnMappedJobResponses() {
        Job job = Job.builder().id(1L).title("Backend Java").build();
        JobResponse response = JobResponse.builder().id(1L).title("Backend Java").build();

        when(jobRepository.findAll()).thenReturn(List.of(job));
        when(jobMapper.toJobResponse(List.of(job))).thenReturn(List.of(response));

        List<JobResponse> output = underTest.getAllJobs();

        assertThat(output).hasSize(1);
        assertThat(output.get(0).getTitle()).isEqualTo("Backend Java");
        verify(jobRepository).findAll();
        verify(jobMapper).toJobResponse(List.of(job));
    }

    @Test
    void getJobsByCompanyId_shouldReturnMappedJobResponses() {
        String companyId = "COMPANY_001";
        Job job = Job.builder().id(2L).title("Frontend React").build();
        JobResponse response = JobResponse.builder().id(2L).title("Frontend React").build();

        when(jobRepository.findByCompanyId(companyId)).thenReturn(List.of(job));
        when(jobMapper.toJobResponse(List.of(job))).thenReturn(List.of(response));

        List<JobResponse> output = underTest.getJobsByCompanyId(companyId);

        assertThat(output).hasSize(1);
        assertThat(output.get(0).getTitle()).isEqualTo("Frontend React");
        verify(jobRepository).findByCompanyId(companyId);
        verify(jobMapper).toJobResponse(List.of(job));
    }
}


