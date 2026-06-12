package com.dev001.itviec.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.cvfile.CvFile;

public interface CvFileRepository extends JpaRepository<CvFile, String> {}
