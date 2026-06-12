package com.dev001.itviec.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.dev001.itviec.service.JobService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class JobExpiryScheduler {

    private final JobService jobService;

    /** Runs every hour at minute 0. Expires all ACTIVE jobs past their expires_at. */
    @Scheduled(cron = "0 0 * * * *")
    public void expireOverdueJobs() {
        log.info("Running scheduled job expiry check...");
        int count = jobService.expireOverdueJobs();
        log.info("Scheduled job expiry complete. Expired {} jobs.", count);
    }
}
