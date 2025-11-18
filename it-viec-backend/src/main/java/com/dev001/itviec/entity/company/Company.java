package com.dev001.itviec.entity.company;

import com.dev001.itviec.entity.country.Country;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.job.Job;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.enums.OvertimePolicy;
import com.dev001.itviec.enums.WorkingHours;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "companies")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @OneToOne
    @JoinColumn(name = "employer_id", unique = true)
    Employer employer;

    @Column(name = "company_name", nullable = false, columnDefinition = "NVARCHAR(255)")
    String companyName;

    @Column(unique = true, columnDefinition = "VARCHAR(255)")
    String slug;

    @Column(columnDefinition = "NVARCHAR(255)")
    String description;

    @Column(columnDefinition = "VARCHAR(255)")
    String website;

    @Column(name = "logo_url",columnDefinition = "VARCHAR(255)")
    String logoUrl;

    @Column(columnDefinition = "NVARCHAR(255)")
    String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_model")
    CompanyModel companyModel;

    @Column(columnDefinition = "NVARCHAR(100)")
    String industry;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_size")
    CompanySize companySize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "country_id")
    Country country;

    @Enumerated(EnumType.STRING)
    @Column(name = "working_hours")
    WorkingHours workingHours;

    @Enumerated(EnumType.STRING)
    @Column(name = "overtime_policy")
    OvertimePolicy overtimePolicy;

    @Column(name = "company_introduction", columnDefinition = "MEDIUMTEXT")
    String companyIntroduction;

    @Column(name = "our_expertise", columnDefinition = "MEDIUMTEXT")
    String ourExpertise;

    @Column(name = "why_work_here", columnDefinition = "MEDIUMTEXT")
    String whyWorkHere;

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

    @ManyToMany()
    @JoinTable(name = "company_skill", joinColumns = @JoinColumn(name = "company_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    List<Skill> skillsCompany;
/*
    @OneToMany(mappedBy = "company", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    List<Job> jobs = new ArrayList<>();*/
}


