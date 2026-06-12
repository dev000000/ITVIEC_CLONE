package com.dev001.itviec.entity.industry;

import jakarta.persistence.*;

import com.dev001.itviec.enums.SkillStatus;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "industries")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Industry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "industry_name", nullable = false, columnDefinition = "VARCHAR(150)")
    String industryName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    SkillStatus status = SkillStatus.ACTIVE;

    @Column(name = "merged_into_id")
    Long mergedIntoId;
}
