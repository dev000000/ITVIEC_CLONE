package com.dev001.itviec.entity.skill;

import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.seeker.Seeker;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "skills")
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

//    @ManyToMany(mappedBy = "skills")
//    List<Seeker> seekers;
//
//    @ManyToMany(mappedBy = "skillsCompany")
//    List<Company> companies;
}