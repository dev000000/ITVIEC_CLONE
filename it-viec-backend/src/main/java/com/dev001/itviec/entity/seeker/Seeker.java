package com.dev001.itviec.entity.seeker;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.dev001.itviec.entity.base.BaseEntity;
import jakarta.persistence.*;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Gender;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "seeker")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Seeker extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    User user;

    @Column(name = "full_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullName;

    @Column(name = "job_title", columnDefinition = "NVARCHAR(255)")
    String jobTitle;

    @Column(name = "phone_number", columnDefinition = "VARCHAR(10)")
    String phoneNumber;

    @Column(name = "date_of_birth")
    LocalDate dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    Gender gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    City city;

    @Column(name = "address", columnDefinition = "NVARCHAR(255)")
    String address;

    @Column(name = "personal_link", columnDefinition = "VARCHAR(255)")
    String personalLink;

    @Column(name = "cover_letter", columnDefinition = "NVARCHAR(500)")
    String coverLetter;

    @ManyToMany
    @JoinTable(
            name = "seeker_skill",
            joinColumns = @JoinColumn(name = "seeker_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @Builder.Default
    Set<Skill> skills = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "seeker_city",
            joinColumns = @JoinColumn(name = "seeker_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    @Builder.Default
    Set<City> desiredLocations = new HashSet<>();
}
