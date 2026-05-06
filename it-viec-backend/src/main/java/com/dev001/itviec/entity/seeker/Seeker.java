package com.dev001.itviec.entity.seeker;

import com.dev001.itviec.entity.base.BaseEntity;
import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Gender;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "seekers")
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

    @Column(name = "full_name", nullable = false, columnDefinition = "VARCHAR(255)")
    String fullName;

    @Column(name = "job_title", columnDefinition = "VARCHAR(255)")
    String jobTitle;

    @Column(name = "phone_number", columnDefinition = "VARCHAR(10)")
    String phoneNumber;

    @Column(name = "date_of_birth")
    LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    Gender gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    City city;

    @Column(name = "address", columnDefinition = "VARCHAR(255)")
    String address;

    @Column(name = "personal_link", columnDefinition = "VARCHAR(255)")
    String personalLink;

    @Column(name = "cover_letter", columnDefinition = "VARCHAR(500)")
    String coverLetter;

    @ManyToMany
    @JoinTable(
            name = "seeker_skills",
            joinColumns = @JoinColumn(name = "seeker_id"),
            inverseJoinColumns = @JoinColumn(name = "skill_id"))
    @Builder.Default
    Set<Skill> skills = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "seeker_cities",
            joinColumns = @JoinColumn(name = "seeker_id"),
            inverseJoinColumns = @JoinColumn(name = "city_id"))
    @Builder.Default
    Set<City> desiredLocations = new HashSet<>();
}
