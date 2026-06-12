package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.seeker.SeekerCv;

public interface SeekerCvRepository extends JpaRepository<SeekerCv, String> {

    List<SeekerCv> findBySeekerIdOrderByUpdatedAtDesc(String seekerId);

    long countBySeekerId(String seekerId);

    Optional<SeekerCv> findByIdAndSeekerId(String id, String seekerId);

    Optional<SeekerCv> findBySeekerIdAndIsPrimaryTrue(String seekerId);

    void deleteByIdAndSeekerId(String id, String seekerId);

    boolean existsByCvFileId(String cvFileId);
}
