package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.company.Company;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.entity.tag.PopularTag;

public interface PopularTagRepository extends JpaRepository<PopularTag, Long> {

    @Override
    @EntityGraph(attributePaths = {"skill", "company"})
    Optional<PopularTag> findById(Long id);

    @EntityGraph(attributePaths = {"skill", "company"})
    List<PopularTag> findAllByOrderByIdAsc();

    boolean existsBySkill(Skill skill);

    boolean existsByCompany(Company company);

    void deleteBySkillId(Long skillId);
}
