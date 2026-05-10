package com.dev001.itviec.entity.job;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

import com.dev001.itviec.entity.base.BaseEntity;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    Company company;

    @Column(name = "title", nullable = false, columnDefinition = "VARCHAR(255)")
    String title;

    @Column(unique = true, columnDefinition = "VARCHAR(255)")
    String slug;

    @Column(name = "job_reason", columnDefinition = "MEDIUMTEXT")
    String jobReason;

    @Column(name = "job_description", columnDefinition = "MEDIUMTEXT")
    String jobDescription;

    @Column(name = "job_requirements", columnDefinition = "MEDIUMTEXT")
    String jobRequirements;

    @Column(name = "why_join_us", columnDefinition = "MEDIUMTEXT")
    String whyJoinUs;

    @Column(columnDefinition = "VARCHAR(255)")
    String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    City city;

    @Column(columnDefinition = "VARCHAR(100)")
    String salary;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    JobType jobType;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level")
    ExperienceLevel experienceLevel;

    @Column(name = "posted_at", columnDefinition = "DATETIME")
    LocalDateTime postedAt;

    @Column(name = "expires_at", columnDefinition = "DATETIME")
    LocalDateTime expiresAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    JobStatus status = JobStatus.ACTIVE;

    @ManyToMany
    @JoinTable(
            name = "job_skills",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @Builder.Default
    Set<Skill> skills = new HashSet<>();
}
