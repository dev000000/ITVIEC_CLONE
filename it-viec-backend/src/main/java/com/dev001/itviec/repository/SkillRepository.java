package com.dev001.itviec.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.enums.SkillStatus;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    boolean existsBySkillNameIgnoreCase(String skillName);

    boolean existsBySkillNameIgnoreCaseAndIdNot(String skillName, Long id);

    List<Skill> findAllByStatusOrderBySkillNameAsc(SkillStatus status);

    @Query(
            """
		SELECT s FROM Skill s
		WHERE (:status IS NULL OR s.status = :status)
		AND (:search IS NULL OR :search = '' OR LOWER(s.skillName) LIKE LOWER(CONCAT('%', :search, '%')))
		ORDER BY s.skillName ASC
		""")
    Page<Skill> findAllWithFilter(
            @Param("status") SkillStatus status, @Param("search") String search, Pageable pageable);

    @Query(value = "SELECT COUNT(*) FROM job_skills WHERE skill_id = :skillId", nativeQuery = true)
    long countJobUsage(@Param("skillId") Long skillId);

    @Query(value = "SELECT COUNT(*) FROM seeker_skills WHERE skill_id = :skillId", nativeQuery = true)
    long countSeekerUsage(@Param("skillId") Long skillId);

    @Query(value = "SELECT COUNT(*) FROM company_skills WHERE skill_id = :skillId", nativeQuery = true)
    long countCompanyUsage(@Param("skillId") Long skillId);
}
