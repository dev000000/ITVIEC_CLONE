package com.dev001.itviec.entity.jobdomain;

import jakarta.persistence.*;

import com.dev001.itviec.enums.SkillStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "job_domains")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "domain_name", nullable = false, columnDefinition = "VARCHAR(150)")
    String domainName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    SkillStatus status = SkillStatus.ACTIVE;

    @Column(name = "merged_into_id")
    Long mergedIntoId;
}
