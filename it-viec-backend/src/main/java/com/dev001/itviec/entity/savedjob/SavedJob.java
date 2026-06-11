package com.dev001.itviec.entity.savedjob;

import jakarta.persistence.*;

import com.dev001.itviec.entity.base.BaseEntity;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(
        name = "saved_jobs",
        uniqueConstraints =
                @UniqueConstraint(
                        name = "uk_saved_jobs_seeker_job",
                        columnNames = {"seeker_id", "job_id"}))
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SavedJob extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", nullable = false)
    Seeker seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    Job job;
}
