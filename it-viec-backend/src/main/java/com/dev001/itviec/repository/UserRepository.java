package com.dev001.itviec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.user.User;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);
}
