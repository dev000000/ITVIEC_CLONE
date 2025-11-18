package com.dev001.itviec.repository;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {

}
