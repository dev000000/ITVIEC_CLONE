package com.dev001.itviec.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.country.Country;

public interface CountryRepository extends JpaRepository<Country, Long> {}
