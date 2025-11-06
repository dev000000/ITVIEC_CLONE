package com.dev001.itviec.entity.application;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@Table(name = "applications")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinColumn(name = "seeker_id")
    Seeker seeker;

    @ManyToOne
    @JoinColumn(name = "job_id")
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
    @Column(name = "status",nullable = false, columnDefinition = "ENUM('Pending','Accepted','Rejected') DEFAULT 'Pending'")
    ApplicationStatus status;

    @Column(name = "employer_message", columnDefinition = "MEDIUMTEXT")
    String employerMessage;

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

//    Noi lam viec mong muon trong don ung tuyen
    @ManyToMany
    @JoinTable(name = "application_city", joinColumns = @JoinColumn(name = "application_id"), inverseJoinColumns = @JoinColumn(name = "city_id"))
    Set<City> desiredLocations;
}
