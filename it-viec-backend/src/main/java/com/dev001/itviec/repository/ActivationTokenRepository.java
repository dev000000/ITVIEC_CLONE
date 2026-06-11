package com.dev001.itviec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dev001.itviec.entity.activation.ActivationToken;
import com.dev001.itviec.entity.user.User;

public interface ActivationTokenRepository extends JpaRepository<ActivationToken, String> {

    Optional<ActivationToken> findByTokenAndUsedFalse(String token);

    Optional<ActivationToken> findFirstByUserOrderByCreatedAtDesc(User user);

    @Modifying
    @Query("UPDATE ActivationToken a SET a.used = true WHERE a.user = :user AND a.used = false")
    void markAllUsedByUser(@Param("user") User user);
}
