package com.dev001.itviec.entity.company;

import com.dev001.itviec.entity.country.Country;
import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.CompanyModel;
import com.dev001.itviec.enums.CompanySize;
import com.dev001.itviec.enums.OvertimePolicy;
import com.dev001.itviec.enums.WorkingHours;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
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
    @JoinColumn(name = "employer_id")
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
    @Column(name = "company_model", columnDefinition = "ENUM('Product','Outsourcing','Consulting / Solution','Startup','Cloud / Platform','Research Lab')")
    CompanyModel companyModel;

    @Column(columnDefinition = "NVARCHAR(100)")
    String industry;

    @Enumerated(EnumType.STRING)
    @Column(name = "company_size", columnDefinition = "ENUM('1-10 employees','11-50 employees','51-150 employees','151-300 employees','301-500 employees','501-1000 employees','1000+ employees')")
    CompanySize companySize;

    @ManyToOne
    @JoinColumn(name = "country_id")
    Country country;

    @Enumerated(EnumType.STRING)
    @Column(name = "working_hours", columnDefinition = "ENUM('Monday – Friday','Monday – Saturday (half-day)','Monday – Saturday','Flexible (Flexible time)','Hybrid (Remote + Office)','Full Remote')")
    WorkingHours workingHours;

    @Enumerated(EnumType.STRING)
    @Column(name = "overtime_policy", columnDefinition = "ENUM('No overtime (No OT)','Optional (voluntary)','Occasional OT when necessary','Paid OT / Compensatory leave','Frequent OT')")
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

    @ManyToMany
    @JoinTable(name = "company_skill", joinColumns = @JoinColumn(name = "company_id"), inverseJoinColumns = @JoinColumn(name = "skill_id"))
    Set<Skill> skills;
}



