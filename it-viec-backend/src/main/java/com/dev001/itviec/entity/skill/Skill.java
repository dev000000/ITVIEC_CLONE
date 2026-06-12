package com.dev001.itviec.entity.skill;

import jakarta.persistence.*;

import com.dev001.itviec.enums.SkillStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "skills")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "skill_name", nullable = false, columnDefinition = "VARCHAR(100)")
    String skillName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    SkillStatus status = SkillStatus.ACTIVE;

    @Column(name = "merged_into_id")
    Long mergedIntoId;
}
