package com.dev001.itviec.entity.employer;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.dev001.itviec.entity.user.User;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @OneToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(name = "full_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullName;

    @Column(name = "job_title", columnDefinition = "NVARCHAR(255)")
    String jobTitle;

    @Column(name = "phone_number", columnDefinition = "VARCHAR(10)")
    String phoneNumber;

    @Column(
            name = "created_at",
            insertable = false,
            updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    LocalDateTime createdAt;

    @Column(
            name = "updated_at",
            insertable = false,
            updatable = false,
            columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    LocalDateTime updatedAt;
}
