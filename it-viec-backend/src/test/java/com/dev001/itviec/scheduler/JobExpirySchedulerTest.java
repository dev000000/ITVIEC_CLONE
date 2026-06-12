package com.dev001.itviec.scheduler;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.dev001.itviec.service.JobService;

@ExtendWith(MockitoExtension.class)
class JobExpirySchedulerTest {

    @Mock
    private JobService jobService;

    @InjectMocks
    private JobExpiryScheduler jobExpiryScheduler;

    @Test
    void expireOverdueJobsShouldDelegateToJobService() {
        when(jobService.expireOverdueJobs()).thenReturn(3);

        jobExpiryScheduler.expireOverdueJobs();

        verify(jobService).expireOverdueJobs();
    }

    @Test
    void expireOverdueJobsWhenNoMatchesShouldStillInvokeService() {
        when(jobService.expireOverdueJobs()).thenReturn(0);

        jobExpiryScheduler.expireOverdueJobs();

        verify(jobService).expireOverdueJobs();
    }
}
