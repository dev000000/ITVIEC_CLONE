package com.dev001.itviec.repository;

import com.dev001.itviec.entity.employer.Employer;
import com.dev001.itviec.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, String> {

    Optional<Employer> findByUser(User user);

}
