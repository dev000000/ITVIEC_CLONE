package com.dev001.itviec.repository;

import com.dev001.itviec.entity.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, String> {}
