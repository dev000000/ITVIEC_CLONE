package com.dev001.itviec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;

public interface EmployerRepository extends JpaRepository<Employer, String> {

    Optional<Employer> findByUser(User user);
}
