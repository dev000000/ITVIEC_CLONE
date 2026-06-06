package com.dev001.itviec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.seeker.SeekerAvatar;

public interface SeekerAvatarRepository extends JpaRepository<SeekerAvatar, String> {

    Optional<SeekerAvatar> findBySeekerId(String seekerId);

    boolean existsBySeekerId(String seekerId);

    void deleteBySeekerId(String seekerId);
}
