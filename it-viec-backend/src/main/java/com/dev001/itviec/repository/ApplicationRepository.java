package com.dev001.itviec.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.application.Application;

public interface ApplicationRepository extends JpaRepository<Application, String> {}
