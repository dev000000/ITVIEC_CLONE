package com.dev001.itviec.repository;

import com.dev001.itviec.entity.company.Company;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, String> {

    @EntityGraph(attributePaths = {"skillsCompany"})
    List<Company> findAll();
}
