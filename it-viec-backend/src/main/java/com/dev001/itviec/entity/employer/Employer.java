package com.dev001.itviec.entity.employer;

import jakarta.persistence.*;

import com.dev001.itviec.entity.base.BaseEntity;
import com.dev001.itviec.entity.user.User;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "employers")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Employer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    User user;

    @Column(name = "full_name", nullable = false, columnDefinition = "VARCHAR(255)")
    String fullName;

    @Column(name = "job_title", columnDefinition = "VARCHAR(255)")
    String jobTitle;

    @Column(name = "phone_number", columnDefinition = "VARCHAR(10)")
    String phoneNumber;
}
