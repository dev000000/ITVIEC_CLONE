package com.dev001.itviec.entity.city;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "cities")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "city_name", nullable = false, unique = true, columnDefinition = "VARCHAR(100)")
    String cityName;

    @Column(name = "slug", nullable = false, unique = true, length = 120)
    String slug;
}
