package com.dev001.itviec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.seeker.SeekerCv;

public interface SeekerCvRepository extends JpaRepository<SeekerCv, String> {

    Optional<SeekerCv> findBySeekerId(String seekerId);

    boolean existsBySeekerId(String seekerId);

    void deleteBySeekerId(String seekerId);
}
