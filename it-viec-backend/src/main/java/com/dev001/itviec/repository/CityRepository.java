package com.dev001.itviec.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev001.itviec.entity.city.City;

public interface CityRepository extends JpaRepository<City, Long> {

    boolean existsByCityName(String cityName);
}
