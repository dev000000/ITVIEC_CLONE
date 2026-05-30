package com.dev001.itviec.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.company.CompanyLogo;

public interface CompanyLogoRepository extends JpaRepository<CompanyLogo, String> {

    Optional<CompanyLogo> findByCompanyId(String companyId);

    boolean existsByCompanyId(String companyId);

    void deleteByCompanyId(String companyId);
}
