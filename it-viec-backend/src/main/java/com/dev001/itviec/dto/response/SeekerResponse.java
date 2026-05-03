package com.dev001.itviec.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

import com.dev001.itviec.entity.city.City;
import com.dev001.itviec.entity.skill.Skill;
import com.dev001.itviec.entity.user.User;
import com.dev001.itviec.enums.Gender;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SeekerResponse {
    String id;
    User user;
    String fullName;
    String jobTitle;
    String phoneNumber;
    LocalDate dob;
    Gender gender;
    City city;
    String address;
    String personalLink;
    String coverLetter;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    Set<Skill> skills;
    Set<City> desiredLocations;
}
