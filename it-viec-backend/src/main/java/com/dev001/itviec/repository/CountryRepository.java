package com.dev001.itviec.repository;

import com.dev001.itviec.entity.country.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
