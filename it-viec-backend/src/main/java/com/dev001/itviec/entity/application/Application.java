package com.dev001.itviec.entity.application;

import com.dev001.itviec.entity.base.BaseEntity;
import jakarta.persistence.*;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.enums.ApplicationStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "application")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Application extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seeker_id", nullable = false)
    Seeker seeker;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    Job job;

    @Column(name = "full_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullName;

    @Column(name = "phone_number", columnDefinition = "VARCHAR(10)")
    String phoneNumber;

    @Column(name = "resume_url", columnDefinition = "VARCHAR(255)")
    String resumeUrl;

    @Column(name = "cover_letter", columnDefinition = "NVARCHAR(500)")
    String coverLetter;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    ApplicationStatus status;

    @Column(name = "employer_message", columnDefinition = "MEDIUMTEXT")
    String employerMessage;

    //    Noi lam viec mong muon trong don ung tuyen
    @ManyToMany
    @JoinTable(
            name = "application_city",
            joinColumns = @JoinColumn(name = "application_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    @Builder.Default
    Set<City> desiredLocations = new HashSet<>();
}
