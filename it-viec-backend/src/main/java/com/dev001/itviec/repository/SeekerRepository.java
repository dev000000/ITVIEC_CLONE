package com.dev001.itviec.repository;

import com.dev001.itviec.entity.seeker.Seeker;
import com.dev001.itviec.entity.user.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeekerRepository extends JpaRepository<Seeker, String> {

    @EntityGraph(attributePaths = {"user", "city", "skills", "desiredLocations"})
    Optional<Seeker> findByUser(User user);

    @EntityGraph(attributePaths = {"user", "city", "skills", "desiredLocations"})
    List<Seeker> findAll();

    boolean existsByFullNameIgnoreCase(String fullName);

    @EntityGraph(attributePaths = {"user", "city", "skills", "desiredLocations"})
    Optional<Seeker> findById(String id);
}
