package com.dev001.itviec.entity.job;


import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.ExperienceLevel;
import com.dev001.itviec.enums.JobStatus;
import com.dev001.itviec.enums.JobType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "jobs")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "company_id")
    Company company;

    @Column(name = "title", nullable = false, columnDefinition = "NVARCHAR(255)")
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

    @Column(columnDefinition = "NVARCHAR(255)")
    String location;

    @ManyToOne
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
    @Column(name = "status" ,nullable = false)
    JobStatus jobStatus;

    @Column(
            name = "created_at",
            insertable = false,
            updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    )
    LocalDateTime createdAt;

    @Column(
            name = "updated_at",
            insertable = false,
            updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
    )
    LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(name = "job_skill", joinColumns = @JoinColumn(name = "job_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    List<Skill> skills;

}
