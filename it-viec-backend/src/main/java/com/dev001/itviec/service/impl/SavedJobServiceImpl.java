package com.dev001.itviec.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev001.itviec.dto.response.PageResponse;
import com.dev001.itviec.dto.response.SavedJobResponse;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.savedjob.SavedJob;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.exception.AppException;
import com.dev001.itviec.exception.ErrorCode;
import com.dev001.itviec.mapper.SavedJobMapper;
import com.dev001.itviec.repository.JobRepository;
import com.dev001.itviec.repository.SavedJobRepository;
import com.dev001.itviec.service.SavedJobService;
import com.dev001.itviec.service.SeekerService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SavedJobServiceImpl implements SavedJobService {

    private static final int SAVED_JOBS_MAX = 20;
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("expiresAt,asc", "expiresAt,desc");

    private final SavedJobRepository savedJobRepository;
    private final JobRepository jobRepository;
    private final SeekerService seekerService;
    private final SavedJobMapper savedJobMapper;

    @Transactional
    @Override
    public SavedJobResponse saveJob(Long jobId) {
        Seeker seeker = seekerService.getSeekerByCookie();

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new AppException(ErrorCode.JOB_NOT_FOUND));

        if (job.getStatus() == JobStatus.DRAFT) {
            throw new AppException(ErrorCode.JOB_NOT_SAVABLE);
        }

        // Idempotent: nếu đã lưu rồi thì trả về entity hiện có
        return savedJobRepository.findBySeekerAndJob(seeker, job)
                .map(savedJobMapper::toSavedJobResponse)
                .orElseGet(() -> {
                    long current = savedJobRepository.countBySeeker(seeker);
                    if (current >= SAVED_JOBS_MAX) {
                        throw new AppException(ErrorCode.SAVED_JOBS_LIMIT_EXCEEDED);
                    }
                    SavedJob saved = SavedJob.builder()
                            .seeker(seeker)
                            .job(job)
                            .build();
                    return savedJobMapper.toSavedJobResponse(savedJobRepository.save(saved));
                });
    }

    @Transactional
    @Override
    public void unsaveJob(Long jobId) {
        Seeker seeker = seekerService.getSeekerByCookie();

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new AppException(ErrorCode.JOB_NOT_FOUND));

        // Idempotent: nếu chưa lưu thì bỏ qua
        savedJobRepository.findBySeekerAndJob(seeker, job)
                .ifPresent(savedJobRepository::delete);
    }

    @Override
    public PageResponse<SavedJobResponse> getMySavedJobs(int page, int size, String sort) {
        Seeker seeker = seekerService.getSeekerByCookie();

        Sort resolvedSort = resolveSort(sort);
        Pageable pageable = PageRequest.of(page, size, resolvedSort);

        Page<SavedJob> savedPage = savedJobRepository.findBySeeker(seeker, pageable);
        List<SavedJobResponse> data = savedPage.getContent().stream()
                .map(savedJobMapper::toSavedJobResponse)
                .toList();

        return PageResponse.<SavedJobResponse>builder()
                .data(data)
                .page(savedPage.getNumber())
                .size(data.size())
                .totalElements(savedPage.getTotalElements())
                .totalPages(savedPage.getTotalPages())
                .isFirst(savedPage.isFirst())
                .isLast(savedPage.isLast())
                .build();
    }

    @Override
    public List<Long> getMySavedJobIds() {
        Seeker seeker = seekerService.getSeekerByCookie();
        return savedJobRepository.findJobIdsBySeeker(seeker);
    }

    private Sort resolveSort(String sort) {
        if (!ALLOWED_SORT_FIELDS.contains(sort)) {
            return Sort.by(Sort.Direction.ASC, "job.expiresAt");
        }
        String[] parts = sort.split(",");
        Sort.Direction direction = "desc".equalsIgnoreCase(parts[1])
                ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        return Sort.by(direction, "job.expiresAt");
    }
}
