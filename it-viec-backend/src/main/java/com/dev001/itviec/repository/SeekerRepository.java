package com.dev001.itviec.repository;

import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.skill.Skill;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeekerRepository extends JpaRepository<Seeker, String> {

}
