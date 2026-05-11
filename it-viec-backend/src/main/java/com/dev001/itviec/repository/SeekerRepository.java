package com.dev001.itviec.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.user.User;

public interface SeekerRepository extends JpaRepository<Seeker, String> {

    @EntityGraph(attributePaths = {"user", "city", "skills", "desiredLocations"})
    Optional<Seeker> findByUser(User user);

    @EntityGraph(attributePaths = {"user", "city", "skills", "desiredLocations"})
    List<Seeker> findAll();

    boolean existsByFullNameIgnoreCase(String fullName);
}
