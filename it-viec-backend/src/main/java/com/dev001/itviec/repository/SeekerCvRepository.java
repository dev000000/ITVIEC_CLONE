package com.dev001.itviec.repository;

import com.dev001.itviec.entity.seeker.SeekerCv;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SeekerCvRepository extends JpaRepository<SeekerCv, String> {

    Optional<SeekerCv> findBySeekerId(String seekerId);

    boolean existsBySeekerId(String seekerId);

    void deleteBySeekerId(String seekerId);
}

